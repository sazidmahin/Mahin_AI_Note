import { redirect } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';
import AdminForm from '@/components/AdminForm';

export default async function AdminPage() {
  const loggedIn = await isLoggedIn();

  if (!loggedIn) {
    redirect('/login');
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:px-6">
      <h1 className="mb-6 text-2xl font-bold text-text-primary">নতুন পোস্ট লেখো</h1>
      <AdminForm />
    </div>
  );
}
