import { SignJWT, jwtVerify } from 'jose';
import { timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'session';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // ৭ দিন

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET সেট করা নেই বা ৩২ অক্ষরের কম। .env.local দেখো।');
  }
  return new TextEncoder().encode(secret);
}

export function checkPassword(inputPassword) {
  const adminPassword = process.env.ADMIN_PASSWORD || '';
  const input = Buffer.from(String(inputPassword || ''));
  const expected = Buffer.from(adminPassword);
  if (input.length !== expected.length) return false;
  if (expected.length === 0) return false;
  return timingSafeEqual(input, expected);
}

export async function createSessionCookie() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_MAX_AGE}s`)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function isLoggedIn() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    await jwtVerify(token, getSecretKey());
    return true;
  } catch {
    return false;
  }
}
