import { useCreateSupplier } from '@/hooks/useSupplier';
import { useState } from 'react';
import Input from '../Input';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';

export default function SupplierModal({ setIsOpen }) {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = async (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { mutate, isLoading } = useCreateSupplier(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    mutate(formData, {
      onSuccess: () => {
        setIsOpen(false);
        toast.success('Supplier berhasil ditambahkan');
      },
      onError: (error) =>
        setErrorMessage(
          `${error.response.data[0].field} ${error.response.data[0].message}`
        ),
    });
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-400 outline-none bg-opacity-60 focus:outline-none backdrop-blur-sm'>
      <div className='relative w-full max-w-md md:h-auto'>
        <div className='relative bg-white rounded-lg shadow'>
          <button
            type='button'
            className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-headline rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
            onClick={() => setIsOpen(false)}
          >
            <svg
              aria-hidden='true'
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='flex flex-col px-6 py-6 lg:px-8'>
            <h3 className='mb-4 text-xl font-medium text-headline'>
              Create new user
            </h3>
            {errorMessage ? (
              <span className='p-2 mx-auto text-base text-tertiary-hover'>
                {errorMessage}
              </span>
            ) : null}
            <form className='space-y-6' onSubmit={handleSubmit}>
              <Input
                label='Nama Supplier'
                htmlFor='namaSupplier'
                type='text'
                name='namaSupplier'
                id='namaSupplier'
                placeholder='Nama Supplier'
                onChange={handleChange}
                required
              />
              <Input
                label='Alamat'
                htmlFor='alamat'
                type='text'
                name='alamat'
                id='alamat'
                placeholder='Alamat Anda'
                onChange={handleChange}
                required
              />
              <Input
                label='No Telp'
                htmlFor='noTelp'
                type='number'
                name='noTelp'
                id='noTelp'
                placeholder='No Telp'
                onChange={handleChange}
                required
              />
              <button
                type='submit'
                className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center'
              >
                {isLoading ? <Spinner /> : 'Create Supplier'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
