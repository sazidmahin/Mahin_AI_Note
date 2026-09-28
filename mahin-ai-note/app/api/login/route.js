import { NextResponse } from 'next/server';
import { checkPassword, createSessionCookie } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { password } = body;

    if (!password || !checkPassword(password)) {
      return NextResponse.json(
        { error: 'ভুল পাসওয়ার্ড' },
        { status: 401 }
      );
    }

    await createSessionCookie();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'কিছু একটা সমস্যা হয়েছে, একটু পরে আবার চেষ্টা করো' },
      { status: 500 }
    );
  }
}
