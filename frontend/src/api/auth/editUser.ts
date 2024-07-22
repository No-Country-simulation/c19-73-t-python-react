export interface Props {
  uid: string;
  email: string;
  password: string;
  displayName: string;
  address: string;
  phone: string;
}

export const editUser = async ({
  uid,
  address,
  displayName,
  email,
  password,
  phone,
}: Props) => {
  try {
    console.log(uid);
    const editedUser = {
      uid,
      address,
      displayName,
      email,
      password,
      phone,
    };
    if (password) {
      console.log('Contraseña cambiada');
      return {
        ok: true,
        ...editedUser,
        password,
      };
    }
    return {
      ok: true,
      ...editedUser,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message,
      };
    }
    return { ok: false, error: 'Error Desconocido' };
  }
};
