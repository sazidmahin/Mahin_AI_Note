import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm items-center px-4 md:px-6">
      <div className="w-full rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h1 className="mb-6 text-center text-xl font-bold text-text-primary">
          অ্যাডমিন লগইন
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
