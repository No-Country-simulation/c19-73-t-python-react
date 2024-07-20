import { useState } from 'react';
import logo from '../assets/images/Black.png';
import { Button } from './ui/button';

export const Menu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='bg-white'>
      <header className='header flex items-center justify-between px-8 py-4  bg-gray-200 text-black'>
        <div>
          <img src={logo} alt='Logo' className='h-20 w-auto' />
        </div>
        <div className='dropdown relative inline-block'>
          <Button
            onClick={toggleDropdown}
            className='bg-gray-200 inline-flex items-center rounded px-8 py-5 font-semibold text-gray-700'
            variant={'ghost'}
          >
            <span className='mr-1'>Usuario</span>
            <svg
              className='h-4 w-4 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </Button>
          <ul className={`dropdown-menu absolute pt-1 text-gray-700 ${dropdownOpen ? 'block' : 'hidden'}`}>
            <li className=''>
              <a
                className='whitespace-no-wrap block rounded-t px-4 py-2 hover:bg-gray-200'
                href='#'
              >
                Mi perfil
              </a>
            </li>
            <li className=''>
              <a
                className='whitespace-no-wrap block  px-4 py-2 hover:bg-gray-200'
                href='#'
              >
                Mis pedidos
              </a>
            </li>
            <li className=''>
              <a
                className='whitespace-no-wrap block rounded-b px-4 py-2 hover:bg-gray-200'
                href='#'
              >
                Dashboard
              </a>
            </li>
            <li className=''>
              <a
                className='whitespace-no-wrap block rounded-b px-4 py-2 hover:bg-gray-200'
                href='#'
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};
