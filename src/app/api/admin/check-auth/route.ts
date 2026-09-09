import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminSessionToken, ADMIN_CREDENTIALS } from '@/lib/adminAuth';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('salasar_admin_token')?.value;
  const isAuthenticated = verifyAdminSessionToken(token);

  return NextResponse.json({
    authenticated: isAuthenticated,
    email: isAuthenticated ? ADMIN_CREDENTIALS.email : null,
  });
}
