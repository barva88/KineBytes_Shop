import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

export async function POST(request: Request) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json({ error: 'Teléfono y código son requeridos' }, { status: 400 });
    }

    if (!accountSid || !authToken || !verifyServiceSid) {
      return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    const client = twilio(accountSid, authToken);
    
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = `+${formattedPhone}`; 
    }

    const verificationCheck = await client.verify.v2.services(verifyServiceSid)
      .verificationChecks
      .create({ to: formattedPhone, code });

    if (verificationCheck.status === 'approved') {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Código incorrecto o expirado' }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Twilio error:', error);
    return NextResponse.json({ error: error.message || 'Error al verificar el código' }, { status: 500 });
  }
}
