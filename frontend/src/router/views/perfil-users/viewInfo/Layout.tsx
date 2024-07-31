import { Outlet } from 'react-router-dom';

import { Menu } from '../../../../components/menu';

export const LayoutView = () => {
  /**
   * Layout para las rutas de autenticación
   * es decir, Login, Registro y posiblemente
   * recuperación de contraseña
   *
   * Por medio del Outlet se renderizan las rutas
   * `hijas` definidas en el router
   */
  return (
    <div className='flex h-screen flex-col bg-white'>
      <header className='mb-2'>
        <Menu></Menu>
      </header>
      <main className='flex flex-1 flex-col items-center justify-center'>
        <Outlet />
      </main>
    </div>
  );
};
