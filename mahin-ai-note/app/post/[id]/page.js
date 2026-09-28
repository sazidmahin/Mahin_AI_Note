import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sql } from '@/lib/db';
import { formatDate, readingTime } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const rows = await sql`
    SELECT id, title, content, created_at FROM posts WHERE id = ${Number(id)}
  `;
  const post = rows[0];

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:px-6">
      <Link
        href="/"
        className="focus-ring text-sm text-text-secondary hover:text-accent"
      >
        ← সব পোস্ট
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
        {post.title}
      </h1>

      <div className="mt-3 flex items-center gap-3 text-sm text-text-secondary">
        <span>{formatDate(post.created_at)}</span>
        <span>·</span>
        <span>{readingTime(post.content)}</span>
      </div>

      <p className="mt-8 whitespace-pre-wrap text-lg leading-8 text-text-primary">
        {post.content}
      </p>
    </div>
  );
}
