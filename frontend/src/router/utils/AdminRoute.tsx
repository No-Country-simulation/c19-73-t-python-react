import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../store';
import { Loader } from './Loader';

export const AdminRoute = () => {
  const { status, roleId } = useAppSelector((state) => state.auth);

  if (status === 'checking') {
    return <Loader />;
  }

  if (status !== 'authenticated' || roleId !== 1) {
    return <Navigate to='/auth' replace />;
  }

  return <Outlet />;
};
