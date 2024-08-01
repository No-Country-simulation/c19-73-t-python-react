import axiosInstance from '../axiosConfig';

interface Props {
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

  return await axiosInstance
    .post('/register_user', {
      nombre: displayName,
      telefono: phone,
      direccion: address,
      correo: email,
      contrasenna: password,
      rol_id: 2,
    })
    .then((response) => {
      return {
        ok: true,
        response: response.data,
        error: null,
      };
    })
    .catch((error) => {
      if (error.response.data.detail) {
        return { ok: false, error: error.response.data.detail };
      }
      if (error instanceof Error) {
        return {
          ok: false,
          error: error.message,
        };
      }
      return { ok: false, error: 'Error Desconocido' };
    });
};
