import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: 'El número de teléfono es requerido' }, { status: 400 });
    }

    if (!accountSid || !authToken || !verifyServiceSid) {
      console.error('Faltan credenciales de Twilio en las variables de entorno.');
      return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    const client = twilio(accountSid, authToken);

    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = `+${formattedPhone}`; 
    }

    const verification = await client.verify.v2.services(verifyServiceSid)
      .verifications
      .create({ to: formattedPhone, channel: 'sms' });

    return NextResponse.json({ success: true, status: verification.status });
  } catch (error: any) {
    console.error('Twilio error:', error);
    return NextResponse.json({ error: error.message || 'Error al enviar el SMS' }, { status: 500 });
  }
}
