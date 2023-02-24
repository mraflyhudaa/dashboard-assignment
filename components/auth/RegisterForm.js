import api from '@/services/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    profileName: '',
    password: '',
    password2: '',
  });

  const { username, profileName, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        password,
        profileName,
        username,
      };
      try {
        const res = await api.post('auth/register', userData);
        const { message } = res.data;
        toast.success(message);
        router.push('/login');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor='username'
          className='block mb-2 text-sm font-medium text-gray-900 '
        >
          Your username
        </label>
        <input
          type='text'
          name='username'
          id='username'
          onChange={onChange}
          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
          placeholder='your username'
          required=''
        />
      </div>
      <div>
        <label
          htmlFor='name'
          className='block mb-2 text-sm font-medium text-gray-900 '
        >
          Your Name
        </label>
        <input
          type='text'
          name='profileName'
          id='profileName'
          onChange={onChange}
          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
          placeholder='your name'
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
      <div>
        <label
          htmlFor='confirm-password'
          className='block mb-2 text-sm font-medium text-gray-900 '
        >
          Confirm password
        </label>
        <input
          type='password'
          name='password2'
          id='password2'
          onChange={onChange}
          placeholder='••••••••'
          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 \'
          required=''
        />
      </div>
      <button
        type='submit'
        className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
      >
        Create an account
      </button>
      <p className='text-sm font-light text-gray-500 '>
        Already have an account?{' '}
        <Link
          href='/login'
          className='font-medium text-blue-600 hover:underline '
        >
          Login here
        </Link>
      </p>
    </form>
  );
}
