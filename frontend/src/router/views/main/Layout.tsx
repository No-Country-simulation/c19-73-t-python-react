import { Outlet, useNavigate } from 'react-router-dom';

import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { useAppSelector } from '../../../hooks/useStore';

export const LayoutMain = () => {
  const { uid, displayName } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className='flex flex-col w-full bg-white min-h-dvh'>
      <div className='flex justify-end w-full gap-2 p-2 bg-primary'>
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
      <Outlet />
    </div>
  );
};
