import { Outlet } from 'react-router-dom';

import { Menu } from '../../../components/menu';
import { Footer } from '../../../components/footer';

export const LayoutMain = () => {
  return (
    <div className='flex min-h-dvh w-full flex-col bg-white mt-24'>
      <Menu />
      <Outlet />
      <Footer/>
    </div>
  );
};
