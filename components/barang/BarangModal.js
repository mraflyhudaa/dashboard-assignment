import { useState } from 'react';
import Input from '../Input';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';
import { useCreateBarang } from '@/hooks/useBarang';
import { useSupplierList } from '@/hooks/useSupplier';
import { useDebounce } from '@/hooks/useDebounce';

export default function BarangModal({ setIsOpen }) {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const handleChange = async (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  function onInput() {
    var val = document.getElementById('input').value;
    var opts = document.getElementById('suppliers').childNodes;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value === val) {
        setFormData((prevState) => ({
          ...prevState,
          supplier: supplier.data[i],
        }));
        break;
      }
    }
  }

  const {
    data: supplier,
    isLoading: supplierLoad,
    isSuccess,
  } = useSupplierList(1, debouncedSearchValue, 100);

  const { mutate, isLoading } = useCreateBarang(formData);

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
                label='Nama Barang'
                htmlFor='namaBarang'
                type='text'
                name='namaBarang'
                id='namaBarang'
                placeholder='Nama Barang'
                onChange={handleChange}
                required
              />
              <Input
                label='Harga'
                htmlFor='harga'
                type='number'
                name='harga'
                id='harga'
                placeholder='Harga'
                onChange={handleChange}
                required
              />
              <Input
                label='Stok'
                htmlFor='stok'
                type='number'
                name='stok'
                id='stok'
                placeholder='No Telp'
                onChange={handleChange}
                required
              />
              <div>
                <Input
                  label='Supplier'
                  htmlFor='supplier'
                  type='text'
                  name='supplier'
                  placeholder='Cari Supplier..'
                  list='suppliers'
                  id='input'
                  onChange={({ target: { value } }) => setSearchValue(value)}
                  onInput={onInput}
                />
                <datalist id='suppliers' name='supplier'>
                  {isSuccess
                    ? supplier.data.map((sup, index) => (
                        <option key={index} value={sup.namaSupplier} />
                      ))
                    : null}
                </datalist>
              </div>
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
