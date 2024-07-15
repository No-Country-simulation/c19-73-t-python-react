import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { useSubmit } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**
 * Este customHook lo que hace es que válida la información
 * del formulario por medio de zod, para ver más información de
 * zod revisar https://zod.dev/ zod permite validar campos sin
 * necesidad de if's o switches, además es compatible con
 * RegEx
 *
 * esté hook además inicializa los valores iniciales del formulario
 * y define que hacer al dar submit, en este caso, manda la
 * información al action de React Router Dom
 */

export const useRegisterForm = () => {
  const submit = useSubmit();
  const formSchema = z
    .object({
      email: z.string().email('Correo electronico invalido'),
      password: z
        .string()
        .min(6, 'Contraseña debe ser mayor a 6 caracteres')
        .max(50, 'Contraseña debe ser menor a 50 caracteres'),
      confirmPassword: z
        .string()
        .min(6, 'Contraseña debe ser mayor a 6 caracteres')
        .max(50, 'Contraseña debe ser menor a 50 caracteres'),
      phone: z
        .string()
        .refine(isValidPhoneNumber, { message: 'Número teléfonico no válido' }),
      address: z.string({
        required_error: 'La dirección es requerida',
      }),
      displayName: z
        .string()
        .min(6, 'Nombre debe ser mayor a 6 caracteres')
        .max(50, 'Nombre debe ser menor a 50 caracteres'),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'Las contraseñas no coinciden',
          path: ['confirmPassword'],
        });
      }
    });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submit(
      { ...values },
      {
        method: 'POST',
      },
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
    },
  });

  const { handleSubmit } = form;

  return {
    form,
    handleSubmit,
    onSubmit,
  };
};
