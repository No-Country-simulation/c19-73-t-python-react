import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../store';
import { Loader } from './Loader';

export const ProtectedRoute = () => {
  const { status } = useAppSelector((state) => state.auth);

  if (status === 'checking') {
    return <Loader />;
  }

  if (status !== 'authenticated') {
    return <Navigate to='/auth' replace />;
  }

  return <Outlet />;
};
