import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { checkLockout, recordFailedAttempt } from '@/lib/security/rate-limiter';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: 'El número de teléfono es requerido' }, { status: 400 });
    }

    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = `+${formattedPhone}`;
    }

    // Security Check: Lockout Rate Limiting
    const lockout = checkLockout(formattedPhone);
    if (lockout.isLocked) {
      return NextResponse.json({
        error: lockout.message,
        isLocked: true,
        isBanned: lockout.isBanned,
        remainingSeconds: lockout.remainingSeconds,
        attempts: lockout.attempts,
      }, { status: 429 });
    }

    if (!accountSid || !authToken || !verifyServiceSid) {
      console.error('Faltan credenciales de Twilio en las variables de entorno.');
      return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    const client = twilio(accountSid, authToken);

    const verification = await client.verify.v2.services(verifyServiceSid)
      .verifications
      .create({ to: formattedPhone, channel: 'sms' });

    return NextResponse.json({
      success: true,
      status: verification.status,
      lockoutStatus: lockout,
    });
  } catch (error: any) {
    console.error('Twilio Send error:', error);
    
    let userMsg = error.message || 'Error al enviar el SMS';
    let isRateLimit = false;

    // Detect Twilio Max Check Attempts / Max Sending Rate Limits
    if (error.code === 60203 || error.code === 60202 || error.message?.includes('Max check attempts') || error.message?.includes('too many')) {
      userMsg = 'Has alcanzado el límite máximo de envíos o verificaciones de SMS.';
      isRateLimit = true;
    }

    const lockout = recordFailedAttempt(phone || 'unknown', isRateLimit);

    return NextResponse.json({
      error: userMsg,
      isLocked: lockout.isLocked,
      isBanned: lockout.isBanned,
      remainingSeconds: lockout.remainingSeconds,
      attempts: lockout.attempts,
    }, { status: isRateLimit || lockout.isLocked ? 429 : 500 });
  }
}
