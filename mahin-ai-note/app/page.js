import { sql } from '@/lib/db';
import { site } from '@/lib/site';
import PostCard from '@/components/PostCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await sql`
    SELECT id, title, created_at, LEFT(content, 150) AS content
    FROM posts
    ORDER BY created_at DESC
  `;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <section className="mb-10 text-center">
        <h1 className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          {site.name}
        </h1>
        <p className="mt-3 text-text-secondary">{site.tagline}</p>
      </section>

      {posts.length === 0 ? (
        <p className="text-center text-text-secondary">এখনো কোনো পোস্ট নেই</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
