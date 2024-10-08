import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../../store';
import { Loader } from '../../utils/Loader';

export const LayoutAuth = () => {
  /**
   * Layout para las rutas de autenticación
   * es decir, Login, Registro y posiblemente
   * recuperación de contraseña
   *
   * Por medio del Outlet se renderizan las rutas
   * `hijas` definidas en el router
   */

  const { status } = useAppSelector((state) => state.auth);

  if (status === 'checking') {
    return <Loader />;
  }

  if (status == 'authenticated') {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='mt-20 flex min-h-dvh items-center justify-center'>
      <Outlet />
    </div>
  );
};
