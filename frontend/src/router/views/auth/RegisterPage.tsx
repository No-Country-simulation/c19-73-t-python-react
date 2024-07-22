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
      <div className='w-full p-6 m-4 max-w-prose rounded-xl bg-primary text-primary-foreground md:hidden'>
        <h1 className='text-5xl'>Registrate</h1>
        <RegisterForm />
      </div>
      <div className='relative hidden pl-4 mx-2 h-96 max-w-7xl rounded-xl bg-background md:flex md:justify-end'>
        <div className='absolute hidden w-1/2 p-6 m-4 -top-1/2 left-2 max-w-prose rounded-xl bg-primary text-primary-foreground md:z-50 md:block'>
          <h1 className='text-5xl'>Registrate</h1>
          <RegisterForm />
        </div>
        <div className='flex flex-col justify-center w-3/6 gap-4 p-6 align-middle'>
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
