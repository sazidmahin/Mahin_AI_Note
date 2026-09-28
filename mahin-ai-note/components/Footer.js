import { site } from '@/lib/site';
import { toBengaliNumber } from '@/lib/format';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-6 text-center text-sm text-text-secondary md:px-6">
        © {toBengaliNumber(year)} {site.author}
      </div>
    </footer>
  );
}
