'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('শিরোনাম আর লেখা দুটোই দাও');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'কিছু একটা সমস্যা হয়েছে');
      return;
    }

    const post = await res.json();
    router.push(`/post/${post.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm text-text-secondary">
          শিরোনাম
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          className="focus-ring h-12 w-full rounded-lg border border-border bg-card px-3 text-xl text-text-primary focus:ring-2 focus:ring-accent"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="mb-1 block text-sm text-text-secondary">
          লেখা
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={100000}
          rows={15}
          className="focus-ring w-full rounded-lg border border-border bg-card px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent"
          required
        />
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="focus-ring flex h-11 w-full items-center justify-center rounded-lg bg-accent px-4 font-medium text-white hover:bg-accent-hover disabled:opacity-60 md:w-auto md:px-8"
      >
        {loading ? 'অপেক্ষা করো...' : 'প্রকাশ করো'}
      </button>
    </form>
  );
}
