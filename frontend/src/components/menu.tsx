import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/images/White.png';
import { useAppSelector } from '../hooks/useStore';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

export const Menu = () => {
  const { uid, displayName } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className='fixed top-0 z-50 flex w-full justify-between gap-2 bg-primary bg-opacity-50 p-2 px-5'>
      <div>
        <Link to='/inicio'>
          <img src={logo} alt='Logo' className='h-20 w-auto' />
        </Link>
      </div>
      <div className='bg-default text-md my-auto px-10 pl-2'>
        {uid ? (
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
                          to='/viewInfo'
                          className='flex h-full w-full select-none flex-col justify-end rounded-md p-2 no-underline outline-none hover:border-gray-500 hover:bg-accent focus:shadow-md'
                        >
                          Mi perfil
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className='row-span-3'>
                      <NavigationMenuLink asChild>
                        <Link
                          to='/pedidos'
                          className='flex h-full w-full select-none flex-col justify-end rounded-md p-2 no-underline outline-none hover:border-gray-500 hover:bg-accent focus:shadow-md'
                        >
                          Mis pedidos
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className='row-span-3'>
                      <NavigationMenuLink asChild>
                        <Link
                          to='/panel'
                          className='flex h-full w-full select-none flex-col justify-end rounded-md p-2 no-underline outline-none hover:border-gray-500 hover:bg-accent focus:shadow-md'
                        >
                          Panel de control
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <hr className='mt-2 border-gray-300' />
                    <li className='row-span-3'>
                      <NavigationMenuLink asChild>
                        <Link
                          to=''
                          className='flex h-full w-full select-none flex-col justify-end rounded-md p-2 pb-2 no-underline outline-none hover:border-gray-500 hover:bg-accent focus:shadow-md'
                        >
                          Cerrar sesión
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <>
            <Button variant={'secondary'} onClick={() => navigate('/auth')}>
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
    </div>
  );
};
