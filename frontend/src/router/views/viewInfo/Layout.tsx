import { Outlet } from 'react-router-dom';
import { Menu } from "../../../components/menu";

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
    <div className="h-screen bg-white flex flex-col">
        <header className="mb-2">
            <Menu></Menu>
        </header>
        <main className='flex-1 flex flex-col justify-center items-center'>
            <Outlet />
        </main>
    </div>
  );
};
