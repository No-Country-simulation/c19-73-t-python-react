import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../store';

export const ProtectedRoute = () => {
  const { status } = useAppSelector((state) => state.auth);

  if (status === 'checking') {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (status !== 'authenticated') {
    return <Navigate to='/auth' replace />;
  }

  return <Outlet />;
};
