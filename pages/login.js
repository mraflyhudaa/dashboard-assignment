import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (
      isAuthenticated &&
      (router.pathname == '/login' || router.pathname == '/register')
    ) {
      router.push('/barang');
    }
  }, [isAuthenticated, router]);
  return (
    <section className='bg-gray-200 '>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          className='flex items-center mb-6 text-3xl font-semibold text-gray-900 '
        >
          Dashboard
        </a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 '>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
              Sign in to your account
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
