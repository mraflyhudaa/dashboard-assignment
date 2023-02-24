import { useState } from 'react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

export default function SupplierList({
  data: suppliers,
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
        <thead className='text-xs text-gray-700 uppercase bg-gray-300 '>
          <tr>
            <th scope='col' className='px-6 py-3'>
              ID
            </th>
            <th scope='col' className='px-6 py-3'>
              Nama Supplier
            </th>
            <th scope='col' className='px-6 py-3'>
              Alamat
            </th>
            <th scope='col' className='px-6 py-3'>
              No Telp
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {!suppliers.length && (
            <tr>
              <td colSpan={6} className='p-4 text-center'>
                Supplier not found
              </td>
            </tr>
          )}
          {suppliers?.map((supplier, index) => (
            <tr key={index} className='bg-white border-b hover:bg-gray-50 '>
              <th
                scope='row'
                className='px-6 py-4 font-medium text-headline whitespace-nowrap '
              >
                {supplier.id}
              </th>
              <th
                scope='row'
                className='px-6 py-4 font-medium text-headline whitespace-nowrap '
              >
                {supplier.namaSupplier}
              </th>
              <td className='px-6 py-4'>{supplier.alamat}</td>
              <td className='px-6 py-4'>{supplier.noTelp}</td>
              <td className='flex gap-4 px-6 py-4'>
                <button
                  className='font-medium text-blue-600 hover:underline'
                  onClick={() => handleEdit(supplier)}
                >
                  Edit
                </button>
                <button
                  className='font-medium text-red-600 hover:underline'
                  onClick={() => handleDelete(supplier)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        className='flex items-center justify-between p-4'
        aria-label='Table navigation'
      >
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
          supplier={selectedRow}
          setSelectedId={setSelectedId}
          setShowDelete={setShowDelete}
        />
      ) : null}
      {showEdit ? (
        <EditModal setShowEdit={setShowEdit} supplier={selectedRow} />
      ) : null}
    </>
  );
}
