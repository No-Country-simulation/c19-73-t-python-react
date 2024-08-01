import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../store';

export const AdminRoute = () => {
  const { status, roleId } = useAppSelector((state) => state.auth);

  if (status === 'checking') {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (status !== 'authenticated' || roleId !== 1) {
    return <Navigate to='/auth' replace />;
  }

  return <Outlet />;
};
