import { Link, useNavigate } from 'react-router-dom';

import { Menu, ShoppingCart } from 'lucide-react';

import logo from '../assets/images/White.png';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/auth/authSlice';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export const MenuMobile = () => {
  const cartItemCount = 2; // Reemplaza este valor con la cantidad real de ítems en el carrito
  const navigate = useNavigate();
  const { uid, roleId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onLogOut = () => {
    localStorage.removeItem('access_token');
    dispatch(logout());
  };

  return (
    <div className='flex w-full justify-between px-2 py-2'>
      <Sheet>
        <SheetTrigger>
          <Menu className='text-white' />
        </SheetTrigger>
        <SheetContent side={'left'}>
          <SheetHeader>
            <Link className='w-full' to='/'>
              <img src={logo} alt='Logo' className='mx-auto h-20 w-auto' />
            </Link>
            <SheetTitle className='sr-only'>Inspirarte</SheetTitle>
            <SheetDescription className='sr-only'>
              Tienda de Artesanias
            </SheetDescription>
          </SheetHeader>
          <div className='flex h-3/4 flex-col justify-between'>
            <div>
              <Link to={'/'}>
                <Button className='w-full'>Inicio</Button>
              </Link>
            </div>

            <div className='flex w-full flex-col gap-2'>
              {uid ? (
                <>
                  <Link to={'profile'}>
                    <Button className='w-full'>Mi Perfil</Button>
                  </Link>
                  <Link to={'orders'}>
                    <Button className='w-full'>Mis pedidos</Button>
                  </Link>
                  {roleId === 1 && (
                    <Link to={'dashboard'}>
                      <Button className='w-full'>Panel de control</Button>
                    </Link>
                  )}
                  <Button variant={'ghost'} onClick={() => onLogOut()}>
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Link to={'/auth'}>
                    <Button className='w-full'>Iniciar Sesión</Button>
                  </Link>
                  <Link to={'/auth/register'}>
                    <Button variant={'ghost'} className='w-full'>
                      Registrarse
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {uid && (
        <Button className='relative' onClick={() => navigate('/cart')}>
          <ShoppingCart size={24} />
          {cartItemCount > 0 && (
            <span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-black'>
              {cartItemCount}
            </span>
          )}
        </Button>
      )}
    </div>
  );
};
