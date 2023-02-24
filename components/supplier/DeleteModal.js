import { useDeleteSupplier } from '@/hooks/useSupplier';
import { toast } from 'react-toastify';

export default function DeleteModal({ supplier, setShowDelete }) {
  const { isLoading, mutate } = useDeleteSupplier(supplier.id);

  const deleteHandler = () => {
    mutate(supplier.id, {
      onSuccess: () => setShowDelete(false),
    });
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-400 bg-opacity-50 outline-none backdrop-blur-sm focus:outline-none'>
      <div className='relative w-full h-full max-w-md md:h-auto'>
        <div className='relative bg-white rounded-lg shadow'>
          <button
            type='button'
            className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center '
            onClick={() => setShowDelete(false)}
          >
            <svg
              aria-hidden='true'
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clip-rule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='p-6 text-center'>
            <svg
              aria-hidden='true'
              className='mx-auto mb-4 text-gray-400 w-14 h-14'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <h3 className='mb-5 text-lg font-normal text-gray-500'>
              Are you sure you want to delete this product?
            </h3>
            <button
              type='button'
              onClick={deleteHandler}
              className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 disabled:cursor-not-allowed'
              disabled={isLoading ? true : false}
            >
              Yes, I&apos;m sure
            </button>
            <button
              type='button'
              onClick={() => setShowDelete(false)}
              className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 disabled:cursor-not-allowed'
              disabled={isLoading ? true : false}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
