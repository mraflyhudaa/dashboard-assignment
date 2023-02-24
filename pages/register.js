import RegisterForm from '@/components/auth/RegisterForm';
import Head from 'next/head';

export default function Register() {
  return (
    <>
      <Head>
        <title>Register - Dashboard App</title>
        <meta name='description' content='Dashboard app build with Next.js' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
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
                Create an account
              </h1>
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
