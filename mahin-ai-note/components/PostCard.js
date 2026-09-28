import Link from 'next/link';
import { formatDate, readingTime } from '@/lib/format';

export default function PostCard({ post }) {
  const summary = (post.content || '').slice(0, 150);

  return (
    <Link
      href={`/post/${post.id}`}
      className="focus-ring group block rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:border-accent hover:shadow-md"
    >
      <h2 className="text-xl font-bold text-text-primary">{post.title}</h2>
      <p className="mt-2 line-clamp-3 text-text-secondary">{summary}</p>
      <div className="mt-4 flex items-center gap-3 text-sm text-text-secondary">
        <span>{formatDate(post.created_at)}</span>
        <span>·</span>
        <span>{readingTime(post.content)}</span>
      </div>
    </Link>
  );
}
