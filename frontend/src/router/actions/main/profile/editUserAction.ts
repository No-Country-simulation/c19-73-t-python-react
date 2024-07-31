import { ActionFunctionArgs } from 'react-router-dom';

import store from '../../../../store';
import { startEditUser } from '../../../../store/auth/authThunks';

export const editUserAction = () => async (actionArg: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await actionArg.request.formData());
  console.log(formData);
  store.dispatch(
    startEditUser({
      uid: formData.uid.toString(),
      address: formData.address.toString(),
      email: formData.email.toString(),
      password: formData.password.toString(),
      displayName: formData.displayName.toString(),
      phone: formData.phone.toString(),
    }),
  );
  return null;
};
