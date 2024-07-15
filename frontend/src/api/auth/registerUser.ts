export interface Props {
  email: string;
  password: string;
  displayName: string;
  address: string;
  phone: string;
}

export const registerUser = async ({
  address,
  displayName,
  email,
  password,
  phone,
}: Props) => {
  /**
   * TODO: Agregar la lógica de conexión al backend
   */
  try {
    // throw new Error('Error desconocido');
    return {
      ok: true,
      uid: '1',
      address,
      displayName,
      email,
      password,
      phone,
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
