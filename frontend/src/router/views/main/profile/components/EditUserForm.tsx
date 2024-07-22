import { Button } from '../../../../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../../components/ui/form';
import { Input } from '../../../../../components/ui/input';
import { PasswordInput } from '../../../../../components/ui/password-input';
import { PhoneInput } from '../../../../../components/ui/phone-input';
import { useEditForm } from './useEditForm';

export const EditUserForm = () => {
  const { form, handleSubmit, onSubmit } = useEditForm();
  return (
    <>
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
                  <PasswordInput placeholder='*********' {...field} />
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
                  <PasswordInput placeholder='*********' {...field} />
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
          Actualizar Usuario
        </Button>
      </div>
    </>
  );
};
