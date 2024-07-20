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
import { PhoneInput } from '../../../../components/ui/phone-input';
import { useRegisterForm } from './useRegisterForm';

export const RegisterForm = () => {
  /**
   * Formulario basado en el diseño de Shadcn en:
   * https://ui.shadcn.com/docs/components/form
   * pero con la lógica de validación separada en
   * un customHook
   */
  const { form, onSubmit, handleSubmit } = useRegisterForm();

  return (
    <div>
      <Form {...form}>
        <form className='flex flex-col gap-3 mt-6'>
          <FormField
            control={form.control}
            name='displayName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <PhoneInput international={false} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input {...field} />
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
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repita la contraseña</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                  {/* <Input type='password' {...field} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className='flex my-4 md:justify-end'>
        <Button
          type='submit'
          className='w-full rounded-full md:w-auto'
          onClick={handleSubmit((formData) => onSubmit(formData))}
          variant={'outline'}
        >
          Registrarse
        </Button>
      </div>
      <p className='md:hidden'>
        ¿Ya posees una cuenta?{' '}
        <Link className='font-bold' to={'/auth'}>
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
};
