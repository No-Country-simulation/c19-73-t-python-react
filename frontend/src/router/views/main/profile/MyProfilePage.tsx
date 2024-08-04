import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../components/ui/button';
import { useAppSelector } from '../../../../hooks/useStore';

export const MyProfilePage = () => {
  const user = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>; // Manejo de estado de carga
  }

  return (
    <div className='flex items-center justify-center p-8'>
      <div className='flex flex-col w-full max-w-xl p-8 border rounded-lg border-primary bg-accent'>
        <h1 className='text-3xl text-center'>Mi Perfil</h1>
        <div className='flex flex-col w-full user-info'>
          <h3 className='mt-3 mb-6 text-sm text-center'>
            Información personal
          </h3>
          <hr />
          <div className='grid w-full grid-cols-2 pt-5 sm:gap-8'>
            <p className='font-bold sm:text-right'>Nombre:</p>
            <p>{user.displayName}</p>
            <p className='font-bold sm:text-right'>Telefono:</p>
            <p>{user.phone}</p>
            <p className='font-bold sm:text-right'>Email:</p>
            <p className='truncate'>{user.email}</p>
            <p className='font-bold sm:text-right'>Direccion:</p>
            <p>{user.address}</p>
          </div>
        </div>
        <Button
          className='w-full mt-6 text-white rounded-full h-14 md:w-auto'
          onClick={() => navigate('/profile/edit')}
          variant={'outline'}
        >
          Editar información
        </Button>
      </div>
    </div>
  );
};
