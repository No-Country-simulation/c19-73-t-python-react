import { useNavigate } from 'react-router-dom';

import { Button } from '../../../components/ui/button';
import { LoginForm } from './components/LoginForm';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='m-4 w-full max-w-prose rounded-xl bg-background p-6 text-primary-foreground md:hidden'>
        <h1 className='text-5xl'>Inicia Sesión</h1>
        <LoginForm />
      </div>
      <div className='relative mx-2 hidden h-96 max-w-7xl rounded-xl bg-white pr-4 md:flex md:justify-start'>
        <div className='flex w-3/6 flex-col justify-center gap-4 p-6 align-middle'>
          <h2 className='text-2xl'>¿No tienes una cuenta?</h2>
          <p>
            Crea una para comprar y vender artesanias únicas, y gestionar tus
            pedidos facilmente.
          </p>
          <div className='flex justify-end'>
            <Button
              className='mt-4 rounded-full'
              onClick={() => navigate('/auth/register')}
            >
              Registrate
            </Button>
          </div>
        </div>
        <div className='absolute -top-1/4 right-2 m-4 hidden w-1/2 max-w-prose rounded-xl bg-primary p-6 py-24 text-primary-foreground md:z-50 md:block'>
          <h1 className='text-5xl'>Inicia Sesión</h1>
          <LoginForm />
        </div>
      </div>
    </>
  );
};
