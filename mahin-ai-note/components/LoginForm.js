'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'ভুল পাসওয়ার্ড');
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-1 block text-sm text-text-secondary">
          পাসওয়ার্ড
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="focus-ring h-11 w-full rounded-lg border border-border bg-card px-3 text-text-primary focus:ring-2 focus:ring-accent"
          required
        />
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="focus-ring flex h-11 w-full items-center justify-center rounded-lg bg-accent px-4 font-medium text-white hover:bg-accent-hover disabled:opacity-60"
      >
        {loading ? 'অপেক্ষা করো...' : 'লগইন করো'}
      </button>
    </form>
  );
}
