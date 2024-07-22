import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { useSubmit } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAppSelector } from '../../../../../hooks/useStore';

export const useEditForm = () => {
  const submit = useSubmit();
  const { uid, displayName, address, email, phone } = useAppSelector(
    (state) => state.auth,
  );
  const formSchema = z
    .object({
      email: z.string().email('Correo electronico invalido'),
      password: z
        .string()
        .optional()
        .transform((val) => val || '')
        .refine(
          (val) => val.length === 0 || (val.length >= 6 && val.length <= 50),
          {
            message:
              'Contraseña debe ser mayor a 6 caracteres y menor a 50 caracteres',
          },
        ),
      confirmPassword: z
        .string()
        .optional()
        .transform((val) => val || '')
        .refine(
          (val) => val.length === 0 || (val.length >= 6 && val.length <= 50),
          {
            message:
              'Contraseña debe ser mayor a 6 caracteres y menor a 50 caracteres',
          },
        ),
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
      { ...values, uid },
      {
        method: 'POST',
      },
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email!,
      password: '',
      confirmPassword: '',
      address: address!,
      phone: phone!,
      displayName: displayName!,
    },
  });

  const { handleSubmit } = form;

  return {
    form,
    handleSubmit,
    onSubmit,
  };
};
