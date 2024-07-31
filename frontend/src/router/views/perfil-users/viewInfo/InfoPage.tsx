import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../components/ui/button';
import { getUser, usuario } from '../../../../core/user';

// Asegúrate de ajustar la ruta

export const InfoPage = () => {
  const [user, setUser] = useState<usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const users = await getUser();
      // Suponiendo que obtienes el usuario con id_usuario 1 (ajusta según sea necesario)
      const currentUser = users.find((u) => u.id_usuario === 1);
      setUser(currentUser || null);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Manejo de estado de carga
  }

  return (
    <div className='flex items-center justify-center px-24 py-24'>
      <div className='flex w-full max-w-7xl flex-col rounded-lg border border-primary bg-accent p-12'>
        <h1 className='text-center text-3xl'>Mi Perfil</h1>
        <div className='user-info flex w-full flex-col'>
          <h3 className='mb-6 mt-3 text-center text-sm'>
            Información personal
          </h3>
          <hr className='text-black' />
          <div className='flex w-full flex-row justify-between pt-5'>
            <div className='flex w-1/4 flex-col space-y-2 text-right font-bold'>
              <span>Nombre:</span>
              <span>Telefono:</span>
              <span>Email:</span>
              <span>Direccion:</span>
            </div>
            <div className='ml-4 flex w-3/4 flex-col space-y-2'>
              <span>{user.nombre}</span>
              <span>{user.telefono}</span>
              <span>{user.correo}</span>
              <span>{user.direccion}</span>
            </div>
          </div>
        </div>
        <Button
          className='mt-6 h-14 w-full rounded-full text-white md:w-auto'
          onClick={() => navigate('/viewInfo/edit')}
          variant={'outline'}
        >
          Editar información
        </Button>
      </div>
    </div>
  );
};
