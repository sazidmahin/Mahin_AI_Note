import Link from 'next/link';
import { site } from '@/lib/site';
import { isLoggedIn } from '@/lib/auth';
import LogoutButton from '@/components/LogoutButton';

export default async function Header() {
  const loggedIn = await isLoggedIn();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="focus-ring rounded text-xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent"
        >
          {site.name}
        </Link>

        {loggedIn && (
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="focus-ring flex h-11 items-center rounded-lg px-3 text-sm font-medium text-text-primary hover:text-accent"
            >
              নতুন পোস্ট
            </Link>
            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  );
}
