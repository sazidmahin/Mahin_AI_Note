import { NextResponse } from 'next/server';
import { isLoggedIn } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function POST(request) {
  try {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
      return NextResponse.json({ error: 'অনুমতি নেই' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const title = (body.title || '').trim();
    const content = (body.content || '').trim();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'শিরোনাম আর লেখা দুটোই দাও' },
        { status: 400 }
      );
    }

    if (title.length > 200) {
      return NextResponse.json(
        { error: 'শিরোনাম সর্বোচ্চ ২০০ অক্ষরের হতে পারবে' },
        { status: 400 }
      );
    }

    if (content.length > 100000) {
      return NextResponse.json(
        { error: 'লেখা সর্বোচ্চ ১,০০,০০০ অক্ষরের হতে পারবে' },
        { status: 400 }
      );
    }

    const rows = await sql`
      INSERT INTO posts (title, content)
      VALUES (${title}, ${content})
      RETURNING id, title, created_at
    `;

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'কিছু একটা সমস্যা হয়েছে, একটু পরে আবার চেষ্টা করো' },
      { status: 500 }
    );
  }
}
