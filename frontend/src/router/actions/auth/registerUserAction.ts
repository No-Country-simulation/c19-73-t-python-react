import { ActionFunctionArgs } from 'react-router-dom';

/**
 * action de React Router que se define en el router
 * este recibe el formData del formulario y lo procesa
 * a gusto
 *
 * Para ver como funcionan visitar:
 * https://reactrouter.com/en/main/route/action
 */

export const registerUserAction =
  () => async (actionArg: ActionFunctionArgs) => {
    const formData = Object.fromEntries(await actionArg.request.formData());
    console.log(formData);
    return null;
  };
