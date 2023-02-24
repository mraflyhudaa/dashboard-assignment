import { useState } from 'react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

export default function BarangList({
  data: barangs,
  page,
  setPage,
  isPreviousData,
}) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [selectedRow, setSelectedRow] = useState({});

  const handleDelete = (row) => {
    setShowDelete(true);
    setSelectedRow(row);
  };

  const handleEdit = (row) => {
    setShowEdit(true);
    setSelectedRow(row);
  };

  return (
    <>
      <table className='z-0 w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-200 '>
          <tr>
            <th scope='col' className='px-6 py-3'>
              ID
            </th>
            <th scope='col' className='px-6 py-3'>
              Nama Barang
            </th>
            <th scope='col' className='px-6 py-3'>
              Stok
            </th>
            <th scope='col' className='px-6 py-3'>
              Harga
            </th>
            <th scope='col' className='px-6 py-3'>
              Supplier
            </th>
            <th scope='col' className='px-6 py-3'>
              Alamat Supplier
            </th>
            <th scope='col' className='px-6 py-3'>
              No. Telp Supplier
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {!barangs.length && (
            <tr>
              <td colSpan={6} className='p-4 text-center'>
                Supplier not found
              </td>
            </tr>
          )}
          {barangs?.map((barang, index) => (
            <tr key={index} className='bg-white border-b hover:bg-gray-50 '>
              <td className='px-6 py-4  '>{barang.id}</td>
              <td className='px-6 py-4  '>{barang.namaBarang}</td>
              <td className='px-6 py-4'>{barang.stok}</td>
              <td className='px-6 py-4'>{barang.harga}</td>
              <td className='px-6 py-4'>{barang.supplier?.namaSupplier}</td>
              <td className='px-6 py-4'>{barang.supplier?.alamat}</td>
              <td className='px-6 py-4'>{barang.supplier?.noTelp}</td>
              <td className='flex gap-4 px-6 py-4'>
                <button
                  className='font-medium text-blue-600 hover:underline'
                  onClick={() => handleEdit(barang)}
                >
                  Edit
                </button>
                <button
                  className='font-medium text-red-600 hover:underline'
                  onClick={() => handleDelete(barang)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className='flex items-center justify-between p-4'>
        <span className='text-sm text-headline'>Current Page: {page}</span>
        <ul className='inline-flex items-center -space-x-px'>
          <li>
            <button
              className='block px-3 py-2 ml-0 text-sm leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:text-gray-500 '
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 1}
            >
              Previous
            </button>
          </li>
          <li>
            <button
              className='block px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:text-gray-500 '
              onClick={() => {
                if (!isPreviousData) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={isPreviousData}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      {showDelete ? (
        <DeleteModal
          barang={selectedRow}
          setSelectedId={setSelectedId}
          setShowDelete={setShowDelete}
        />
      ) : null}
      {showEdit ? (
        <EditModal setShowEdit={setShowEdit} barang={selectedRow} />
      ) : null}
    </>
  );
}
