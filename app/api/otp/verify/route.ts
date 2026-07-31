import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { checkLockout, recordFailedAttempt, resetAttempts } from '@/lib/security/rate-limiter';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

export async function POST(request: Request) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json({ error: 'Teléfono y código son requeridos' }, { status: 400 });
    }

    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = `+${formattedPhone}`;
    }

    // 1. Lockout Check
    const currentLockout = checkLockout(formattedPhone);
    if (currentLockout.isLocked) {
      return NextResponse.json({
        error: currentLockout.message,
        isLocked: true,
        isBanned: currentLockout.isBanned,
        remainingSeconds: currentLockout.remainingSeconds,
        attempts: currentLockout.attempts,
      }, { status: 429 });
    }

    if (!accountSid || !authToken || !verifyServiceSid) {
      return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    const client = twilio(accountSid, authToken);

    let verificationCheck;
    try {
      verificationCheck = await client.verify.v2.services(verifyServiceSid)
        .verificationChecks
        .create({ to: formattedPhone, code });
    } catch (twilioErr: any) {
      console.error('Twilio Verify error:', twilioErr);
      
      const isMaxAttempts = twilioErr.code === 60203 || twilioErr.message?.includes('Max check attempts');
      const updatedLockout = recordFailedAttempt(formattedPhone, isMaxAttempts);

      let msg = 'Código de verificación incorrecto o expirado.';
      if (updatedLockout.isBanned) {
        msg = 'Número bloqueado permanentemente por superar el máximo de intentos (15+). Contacta al administrador.';
      } else if (updatedLockout.isLocked) {
        msg = updatedLockout.message || 'Demasiados intentos fallidos. Has sido bloqueado temporalmente.';
      } else if (isMaxAttempts) {
        msg = 'Límite de verificación alcanzado. Espera un momento antes de intentar de nuevo.';
      }

      return NextResponse.json({
        error: msg,
        isLocked: updatedLockout.isLocked,
        isBanned: updatedLockout.isBanned,
        remainingSeconds: updatedLockout.remainingSeconds,
        attempts: updatedLockout.attempts,
      }, { status: 400 });
    }

    if (verificationCheck.status === 'approved') {
      // Successful verification: Reset attempts count
      resetAttempts(formattedPhone);
      return NextResponse.json({ success: true });
    } else {
      // Failed verification
      const updatedLockout = recordFailedAttempt(formattedPhone);
      let errorMsg = `Código incorrecto (Intento ${updatedLockout.attempts}).`;

      if (updatedLockout.isBanned) {
        errorMsg = 'Bloqueado permanentemente por seguridad debido a 15+ intentos fallidos. Contacta al administrador.';
      } else if (updatedLockout.isLocked) {
        errorMsg = updatedLockout.message || `Código incorrecto. Has sido bloqueado por seguridad.`;
      }

      return NextResponse.json({
        error: errorMsg,
        isLocked: updatedLockout.isLocked,
        isBanned: updatedLockout.isBanned,
        remainingSeconds: updatedLockout.remainingSeconds,
        attempts: updatedLockout.attempts,
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Verify error:', error);
    return NextResponse.json({ error: error.message || 'Error al verificar el código' }, { status: 500 });
  }
}
