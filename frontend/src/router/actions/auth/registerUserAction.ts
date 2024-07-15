import { ActionFunctionArgs } from 'react-router-dom';

import store from '../../../store';
import { startRegisterUser } from '../../../store/auth/authThunks';

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
    store.dispatch(
      startRegisterUser({
        address: formData.address.toString(),
        email: formData.email.toString(),
        password: formData.address.toString(),
        displayName: formData.password.toString(),
        phone: formData.phone.toString(),
      }),
    );
    return null;
  };
