import { useUpdateSupplier } from '@/hooks/useSupplier';
import { useState } from 'react';
import Input from '../Input';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';

export default function EditModal({ setShowEdit, supplier }) {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = async (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { mutate, isLoading } = useUpdateSupplier(supplier?.id, formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    mutate(formData, {
      onSuccess: () => setShowEdit(false),
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
            onClick={() => setShowEdit(false)}
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
              Edit user
            </h3>
            {errorMessage ? (
              <span className='p-2 mx-auto my-2 text-sm bg-red-200 rounded-md text-tertiary-hover'>
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
                defaultValue={supplier.namaSupplier}
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
                defaultValue={supplier.alamat}
                onChange={handleChange}
                required
              />
              <Input
                label='No Telp'
                htmlFor='noTelp'
                type='text'
                name='noTelp'
                id='noTelp'
                placeholder='No Telp'
                defaultValue={supplier.noTelp}
                onChange={handleChange}
                required
              />
              <div className='flex justify-end gap-2'>
                <button
                  type='submit'
                  className='flex justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed'
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? <Spinner /> : 'Edit'}
                </button>
                <button
                  type='button'
                  onClick={() => setShowEdit(false)}
                  className='text-gray-500 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10'
                  disabled={isLoading ? true : false}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
