import { ActionFunctionArgs } from 'react-router-dom';

export const loginUserAction = () => async (actionArg: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await actionArg.request.formData());
  console.log(formData);
  // store.dispatch(
  //   startRegisterUser({
  //     address: formData.address.toString(),
  //     email: formData.email.toString(),
  //     password: formData.password.toString(),
  //     displayName: formData.displayName.toString(),
  //     phone: formData.phone.toString(),
  //   }),
  // );

  return null;
};
