import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/auth';

export async function POST() {
  try {
    await clearSessionCookie();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'কিছু একটা সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}
