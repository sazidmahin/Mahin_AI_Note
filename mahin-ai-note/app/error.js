'use client';

export default function Error({ reset }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h2 className="text-xl font-bold text-text-primary">
        কিছু একটা সমস্যা হয়েছে, একটু পরে আবার চেষ্টা করো
      </h2>
      <button
        onClick={() => reset()}
        className="focus-ring mt-6 inline-flex h-11 items-center rounded-lg bg-accent px-5 font-medium text-white hover:bg-accent-hover"
      >
        আবার চেষ্টা করো
      </button>
    </div>
  );
}
