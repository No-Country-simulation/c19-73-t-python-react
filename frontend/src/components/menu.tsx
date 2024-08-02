import { useMediaQuery } from '../hooks/useMediaQuery';
import { MenuDesktop } from './menu-desktop';
import { MenuMobile } from './menu-mobile';

export const Menu = () => {
  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <div className='flex w-full justify-between gap-2 bg-primary bg-opacity-50 p-2 px-5'>
      {matches ? <MenuDesktop /> : <MenuMobile />}
    </div>
  );
};
