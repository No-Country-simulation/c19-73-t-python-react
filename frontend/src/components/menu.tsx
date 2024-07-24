import { useNavigate } from 'react-router-dom';

import logo from '../assets/images/Black.png';
import { useAppSelector } from '../hooks/useStore';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const Menu = () => {
  const { uid, displayName } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className='flex justify-between w-full gap-2 p-2 bg-primary px-5'>
      <div>
        <img src={logo} alt='Logo' className='w-auto h-20' />
      </div>
      <div className='my-auto'>
        {uid ? (
          <DropdownMenu>
            <DropdownMenuTrigger>Mi Perfil</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Mis Pedidos</DropdownMenuItem>
              <DropdownMenuItem>Panel de Control</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
