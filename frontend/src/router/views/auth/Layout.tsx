import { Outlet } from 'react-router-dom';

export const LayoutAuth = () => {
  /**
   * Layout para las rutas de autenticación
   * es decir, Login, Registro y posiblemente
   * recuperación de contraseña
   *
   * Por medio del Outlet se renderizan las rutas
   * `hijas` definidas en el router
   */
  return (
    <div className='mt-20 flex min-h-dvh items-center justify-center'>
      <Outlet />
    </div>
  );
};
