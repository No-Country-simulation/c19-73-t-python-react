import { useMediaQuery } from '../hooks/useMediaQuery';
import { MenuDesktop } from './menu-desktop';
import { MenuMobile } from './menu-mobile';

export const Menu = () => {
  const matches = useMediaQuery('(min-width: 768px)');

  return (
<div className='fixed top-0 z-50 flex w-full justify-between gap-2 bg-white p-2 px-5 shadow-md border-b-2 border-primary'>
      {matches ? <MenuDesktop /> : <MenuMobile />}
    </div>
  );
};
