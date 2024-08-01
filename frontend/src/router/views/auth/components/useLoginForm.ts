import { useForm } from 'react-hook-form';
import { useSubmit } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('Correo electronico invalido'),
  password: z
    .string()
    .min(6, 'Contraseña debe ser mayor a 6 caracteres')
    .max(50, 'Contraseña debe ser menor a 50 caracteres'),
});
export const useLoginForm = () => {
  const submit = useSubmit();

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
    },
  });

  const { handleSubmit } = form;

  return {
    form,
    handleSubmit,
    onSubmit,
  };
};
