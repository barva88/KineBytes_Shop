import { NextResponse } from 'next/server';
import { unbanIdentifier, checkLockout } from '@/lib/security/rate-limiter';

export async function POST(request: Request) {
  try {
    const { identifier, secretKey } = await request.json();

    const expectedSecret = process.env.ADMIN_SECRET_KEY || 'kinebytes-admin-secret-2024';

    if (!secretKey || secretKey !== expectedSecret) {
      return NextResponse.json({ error: 'No tienes autorización para realizar esta acción' }, { status: 403 });
    }

    if (!identifier) {
      return NextResponse.json({ error: 'El identificador (teléfono o correo) es requerido' }, { status: 400 });
    }

    unbanIdentifier(identifier);
    const status = checkLockout(identifier);

    return NextResponse.json({
      success: true,
      message: `El identificador '${identifier}' ha sido desbloqueado con éxito.`,
      status,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al desbanear el usuario' }, { status: 500 });
  }
}
