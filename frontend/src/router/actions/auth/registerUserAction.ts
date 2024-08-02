import { ActionFunctionArgs, redirect } from 'react-router-dom';

// import store from '../../../store';
// import { startRegisterUser } from '../../../store/auth/authThunks';
import API from '../../../api/apiServices';
import { toast } from '../../../components/ui/use-toast';

/**
 * action de React Router que se define en el router
 * este recibe el formData del formulario y lo envia
 * a un asyncThunk de Redux que maneja el error o
 * exito de la petición
 *
 * Para ver como funcionan visitar:
 * https://reactrouter.com/en/main/route/action
 */

export const registerUserAction =
  () => async (actionArg: ActionFunctionArgs) => {
    const formData = Object.fromEntries(await actionArg.request.formData());
    // console.log(formData);
    // store.dispatch(
    //   startRegisterUser({
    //     address: formData.address.toString(),
    //     email: formData.email.toString(),
    //     password: formData.password.toString(),
    //     displayName: formData.displayName.toString(),
    //     phone: formData.phone.toString(),
    //   }),
    // );

    const response = await API.auth.registerUser({
      address: formData.address.toString(),
      email: formData.email.toString(),
      password: formData.password.toString(),
      displayName: formData.displayName.toString(),
      phone: formData.phone.toString(),
    });

    if (!response.ok) {
      toast({
        title: 'Error al registrarse',
        description: response.error,
        variant: 'destructive',
      });
      return null;
    }

    toast({
      title: 'El registro ha sido un exito',
      description: 'Ahora ya puedes iniciar sesión con tus credenciales',
    });
    return redirect('/auth');
  };
