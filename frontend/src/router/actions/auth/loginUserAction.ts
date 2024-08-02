import { ActionFunctionArgs } from 'react-router-dom';

import store from '../../../store';
import { startLoginUser } from '../../../store/auth/authThunks';

export const loginUserAction = () => async (actionArg: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await actionArg.request.formData());

  store.dispatch(
    startLoginUser({
      email: formData.email.toString(),
      password: formData.password.toString(),
    }),
  );

  return null;
};
