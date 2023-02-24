import { useAuth } from '@/context/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen';
import api from '@/services/api';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const router = useRouter();
  const { authenticate, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    password: '',
    username: '',
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('auth/login', formData);
      const { message } = res.data;
      if (message == 'LOGIN SUCCESS') {
        toast.success(message);
        const { token, username } = res.data.data;
        authenticate(token, username);
        router.push('/barang');
      }
      toast.info(message);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };
  return (
    <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor='username'
          className='block mb-2 text-sm font-medium text-gray-900 '
        >
          Username
        </label>
        <input
          type='text'
          name='username'
          id='username'
          onChange={onChange}
          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
          placeholder='Your username'
          required=''
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block mb-2 text-sm font-medium text-gray-900 '
        >
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          onChange={onChange}
          placeholder='••••••••'
          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
          required=''
        />
      </div>
      <button
        type='submit'
        className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center'
      >
        {isLoading ? <LoadingScreen /> : 'Sign in'}
      </button>
      <p className='text-sm font-light text-gray-500 '>
        Don&apos;t have an account yet?{' '}
        <Link
          href='/register'
          className='font-medium text-blue-600 hover:underline '
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
