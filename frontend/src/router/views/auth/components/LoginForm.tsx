import { Link } from 'react-router-dom';

import { Button } from '../../../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../components/ui/form';
import { Input } from '../../../../components/ui/input';
import { PasswordInput } from '../../../../components/ui/password-input';
import { useLoginForm } from './useLoginForm';

export const LoginForm = () => {
  const { form, onSubmit, handleSubmit } = useLoginForm();
  return (
    <>
      <Form {...form}>
        <form className='mt-6 flex flex-col gap-3'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                  {/* <Input type='password' /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className='my-4 flex md:justify-end'>
        <Button
          type='submit'
          className='w-full rounded-full md:w-auto'
          onClick={handleSubmit((formData) => onSubmit(formData))}
          variant={'outline'}
        >
          Iniciar Sesión
        </Button>
      </div>
      <p className='md:hidden'>
        ¿No posees una cuenta?{' '}
        <Link className='font-bold' to={'/auth/register'}>
          Registrate
        </Link>
      </p>
    </>
  );
};
