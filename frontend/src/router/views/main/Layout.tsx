import { Outlet } from 'react-router-dom';

import { Menu } from '../../../components/menu';

export const LayoutMain = () => {
  return (
    <div className='mt-20 flex min-h-dvh w-full flex-col bg-white'>
      <Menu />
      <Outlet />
    </div>
  );
};
