import { useNavigate } from 'react-router-dom';

import { Button } from '../../../components/ui/button';
import { RegisterForm } from './components/RegisterForm';

export const RegisterPage = () => {
  /**
   * Página de Registro de Usuario
   * está página es exclusiva para diseño
   */
  const navigate = useNavigate();
  return (
    <>
      <div className='m-4 w-full max-w-prose rounded-xl bg-primary p-6 text-primary-foreground md:hidden'>
        <h1 className='text-5xl'>Registrate</h1>
        <RegisterForm />
      </div>
      <div className='relative mx-2 hidden h-96 max-w-7xl rounded-xl bg-background pl-4 md:flex md:justify-end'>
        <div className='absolute -top-1/2 left-2 m-4 hidden w-1/2 max-w-prose rounded-xl bg-primary p-6 text-primary-foreground md:z-50 md:block'>
          <h1 className='text-5xl'>Registrate</h1>
          <RegisterForm />
        </div>
        <div className='flex w-3/6 flex-col justify-center gap-4 p-6 align-middle'>
          <h2 className='text-2xl'>¿Ya posees una cuenta?</h2>
          <p>
            Inicia sesión para comprar y vender artesanías únicas, y gestionar
            tus pedidos fácilmente.
          </p>
          <div className='flex justify-end'>
            <Button
              className='mt-4 rounded-full'
              onClick={() => navigate('/auth')}
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
