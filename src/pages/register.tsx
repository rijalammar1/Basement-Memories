import RegisterForm from '@/components/auth/RegisterForm';
import { withGuest } from '@/utils/withGuest';

export const getServerSideProps = withGuest;
export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-6 md:px-7">
      <RegisterForm />
    </main>
  );
}
