import { NextResponse } from 'next/server';
import { ADMIN_CREDENTIALS, createAdminSessionToken } from '@/lib/adminAuth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const normalizedEmail = (email || '').trim().toLowerCase();
    const targetEmail = ADMIN_CREDENTIALS.email.trim().toLowerCase();

    if (normalizedEmail !== targetEmail || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin credentials provided.' },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken(normalizedEmail);

    const response = NextResponse.json({
      success: true,
      message: 'Admin authentication successful.',
    });

    response.cookies.set('salasar_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err) {
    console.error('[ADMIN LOGIN ERROR]:', err);
    return NextResponse.json({ success: false, error: 'Server error during login' }, { status: 500 });
  }
}
