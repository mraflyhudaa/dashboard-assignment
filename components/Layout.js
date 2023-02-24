import { useAuth } from '@/context/auth';
import Link from 'next/link';
import { useState } from 'react';
import { HiLogout, HiOfficeBuilding } from 'react-icons/hi';
import { GiCardboardBox } from 'react-icons/gi';

export default function Layout({ children }) {
  const [isShow, setIsShow] = useState(false);

  const { logout } = useAuth();

  return (
    <div>
      <nav className='fixed top-0 z-50 w-full bg-gray-200 border-b border-gray-300 '>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button
                aria-controls='logo-sidebar'
                type='button'
                onClick={() => setIsShow(!isShow)}
                className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 '
              >
                <span className='sr-only'>Open sidebar</span>
                <svg
                  className='w-6 h-6'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    clipRule='evenodd'
                    fillRule='evenodd'
                    d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                  ></path>
                </svg>
              </button>
              <Link href='/' className='flex ml-2 md:mr-24'>
                <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap '>
                  Dashboard
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id='logo-sidebar'
        className={`fixed top-0 left-0 ${
          isShow ? ' ' : ' -translate-x-full'
        } z-40 w-64 h-screen pt-20 transition-transform sm:translate-x-0  bg-gray-200 border-r border-gray-300  `}
        aria-label='Sidebar'
      >
        <div className='h-full px-3 pb-4 overflow-y-auto bg-gray-200'>
          <ul className='space-y-2'>
            <li>
              <Link
                href='/barang'
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 '
              >
                <GiCardboardBox className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900' />
                <span className='ml-3'>Barang</span>
              </Link>
            </li>
            <li>
              <Link
                href='/supplier'
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 '
              >
                <HiOfficeBuilding className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900' />
                <span className='flex-1 ml-3 whitespace-nowrap'>Supplier</span>
              </Link>
            </li>
            <li>
              <a
                onClick={() => logout({ redirectLocation: '/login' })}
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg cursor-pointer hover:bg-gray-100'
              >
                <HiLogout className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900' />
                <span className='flex-1 ml-3 whitespace-nowrap'>Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className='p-4 sm:ml-64'>{children}</div>
    </div>
  );
}
