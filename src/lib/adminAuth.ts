import crypto from 'crypto';
import { cookies } from 'next/headers';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@salasaraluminium.shop';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Salasar@2026';
const ADMIN_SECRET = process.env.ADMIN_SESSION_SECRET || 'salasar_secret_auth_session_key_2026';

export const ADMIN_CREDENTIALS = {
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
};

export function createAdminSessionToken(email: string): string {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const payload = `${email}:${expiresAt}`;
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(payload).digest('hex');
  return `${Buffer.from(payload).toString('base64url')}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  try {
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return false;

    const payload = Buffer.from(payloadB64, 'base64url').toString('utf-8');
    const expectedSignature = crypto.createHmac('sha256', ADMIN_SECRET).update(payload).digest('hex');

    if (signature !== expectedSignature) return false;

    const [, expiresAtStr] = payload.split(':');
    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

    return true;
  } catch {
    return false;
  }
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('salasar_admin_token')?.value;
  return verifyAdminSessionToken(token);
}
