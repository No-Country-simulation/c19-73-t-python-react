import { AxiosError } from 'axios';

import axiosInstance from '../axiosConfig';

interface Props {
  email: string;
  password: string;
}

interface Response {
  access_token: string;
  token_type: string;
}

interface LoginSuccess {
  ok: true;
  accessToken: string;
  tokenType: string;
}

interface LoginFailure {
  ok: false;
  error: string;
}

type LoginResult = LoginSuccess | LoginFailure;

export const loginUser = async ({
  email,
  password,
}: Props): Promise<LoginResult> => {
  try {
    const response = await axiosInstance.post<Response>('/login', {
      correo: email,
      contrasenna: password,
    });

    return {
      ok: true,
      accessToken: response.data.access_token,
      tokenType: response.data.token_type,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { ok: false, error: error!.response!.data.detail as string };
    }
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message,
      };
    }
    return { ok: false, error: 'Error Desconocido' };
  }
};
