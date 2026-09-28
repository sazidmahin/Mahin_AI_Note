'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch('/api/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="focus-ring flex h-11 items-center rounded-lg border border-border px-3 text-sm font-medium text-text-primary hover:border-accent disabled:opacity-60"
    >
      {loading ? 'অপেক্ষা করো...' : 'লগআউট'}
    </button>
  );
}
