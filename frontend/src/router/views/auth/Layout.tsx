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
    <div className='flex items-center justify-center bg-white min-h-dvh'>
      <Outlet />
    </div>
  );
};
