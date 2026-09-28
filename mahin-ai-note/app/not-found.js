import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl font-bold text-accent">৪০৪</span>
      <h2 className="mt-4 text-xl font-bold text-text-primary">
        এই পাতাটি খুঁজে পাওয়া যায়নি
      </h2>
      <p className="mt-2 text-sm text-text-secondary">
        যে পাতাটি খুঁজছ তা মুছে ফেলা হয়েছে অথবা ভুল ঠিকানায় এসেছ।
      </p>
      <Link
        href="/"
        className="focus-ring mt-6 inline-flex h-11 items-center rounded-lg bg-accent px-5 font-medium text-white hover:bg-accent-hover"
      >
        হোমে ফিরে যাও
      </Link>
    </div>
  );
}
