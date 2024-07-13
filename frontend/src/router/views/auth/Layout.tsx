import { Outlet } from 'react-router-dom';

export const LayoutAuth = () => {
  return (
    <div className='flex items-center justify-center min-h-dvh'>
      <Outlet />
    </div>
  );
};
