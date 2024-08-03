import { Link, useNavigate } from 'react-router-dom';

import { ShoppingCart } from 'lucide-react';

import logo from '../assets/images/Black.png';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/auth/authSlice';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

export const MenuDesktop = () => {
  const { uid, displayName, roleId } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const cartItemCount = 2; // Reemplaza este valor con la cantidad real de ítems en el carrito
  const dispatch = useAppDispatch();

  const onLogOut = () => {
    localStorage.removeItem('access_token');
    dispatch(logout());
  };

  return (
    <>
      <Link to='/'>
        <img src={logo} alt='Logo' className='h-20 w-auto' />
      </Link>
      <div className='text-md z-50 my-auto flex items-center gap-4 px-10 pl-2'>
        {uid ? (
          <>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className='relative bg-primary text-white'>
                    {displayName}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className='-m-1 mt-2 w-[300px] rounded-md shadow-lg'>
                    <ul className='grid gap-3 p-4'>
                      <li className='row-span-3'>
                        <NavigationMenuLink asChild>
                          <Link
                            to='profile'
                            className='flex h-full w-full select-none flex-col justify-end rounded-md p-2 no-underline outline-none hover:border-gray-500 hover:bg-accent focus:shadow-md'
                          >
                            Mi perfil
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li className='row-span-3'>
                        <NavigationMenuLink asChild>
                          <Link
                            to='orders'
                            className='flex h-full w-full select-none flex-col justify-end rounded-md p-2 no-underline outline-none hover:border-gray-500 hover:bg-accent focus:shadow-md'
                          >
                            Mis pedidos
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {roleId === 1 && (
                        <li className='row-span-3'>
                          <NavigationMenuLink asChild>
                            <Link
                              to='dashboard'
                              className='flex h-full w-full select-none flex-col justify-end rounded-md p-2 no-underline outline-none hover:border-gray-500 hover:bg-accent focus:shadow-md'
                            >
                              Panel de control
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      )}
                      <hr className='mt-2 border-gray-300' />
                      <li className='row-span-3'>
                        <NavigationMenuLink asChild>
                          <Button
                            onClick={() => onLogOut()}
                            variant={'ghost'}
                            className='flex h-full w-full select-none flex-col justify-end rounded-md p-2 pb-2 no-underline outline-none hover:border-gray-500 hover:bg-accent focus:shadow-md'
                          >
                            Cerrar sesión
                          </Button>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button className='relative' onClick={() => navigate('/cart')}>
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-black'>
                  {cartItemCount}
                </span>
              )}
            </Button>
          </>
        ) : (
          <>
            <Button variant={'outline'} onClick={() => navigate('/auth')}>
              Iniciar Sesión
            </Button>
            <Button
              variant={'ghost'}
              onClick={() => navigate('/auth/register')}
            >
              Registrarse
            </Button>
          </>
        )}
      </div>
    </>
  );
};
