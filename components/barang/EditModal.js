import { useState } from 'react';
import Input from '../Input';
import Spinner from '../Spinner';
import { useUpdateBarang } from '@/hooks/useBarang';
import { useSupplierList } from '@/hooks/useSupplier';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from 'react-toastify';

export default function EditModal({ setShowEdit, barang }) {
  const [formData, setFormData] = useState({});
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const handleChange = async (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
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

  const { mutate, isLoading } = useUpdateBarang(
    barang.id,
    JSON.stringify(formData)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => setShowEdit(false),
      onError: (error) => toast.error(error.response.data.error),
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
            <form className='space-y-6' onSubmit={handleSubmit}>
              <Input
                label='Nama Barang'
                htmlFor='namaBarang'
                type='text'
                name='namaBarang'
                id='namaBarang'
                placeholder='Nama Barang'
                defaultValue={barang.namaBarang}
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
                defaultValue={barang.harga}
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
                defaultValue={barang.stok}
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
                  defaultValue={barang.supplier.namaSupplier}
                  onChange={({ target: { value } }) => setSearchValue(value)}
                  onInput={onInput}
                />
                <datalist
                  id='suppliers'
                  name='supplier'
                  defaultValue={barang.supplier.namaSupplier}
                >
                  {isSuccess
                    ? supplier.data.map((sup, index) => (
                        <option key={index} value={sup.namaSupplier} />
                      ))
                    : null}
                </datalist>
              </div>
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
