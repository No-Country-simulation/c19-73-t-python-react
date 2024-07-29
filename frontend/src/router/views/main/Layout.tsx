import { Outlet } from 'react-router-dom';

import { Menu } from '../../../components/menu';

export const LayoutMain = () => {
  return (
    <div className='flex flex-col w-full bg-white min-h-dvh mt-20'>
      <Menu />
      <Outlet />
    </div>
  );
};
