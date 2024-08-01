import { createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

import API from '../../api/apiServices';
import { toast } from '../../components/ui/use-toast';
import { DecodedToken } from '../../lib/jwt';

/**
 * Thunk de Redux, para ver como funciona ver este enlace:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * TODO: Agregar más Thunks para el inicio de sesión y edición de usuario
 * TODO: Refactorizar este código
 */

// Define los tipos de los parámetros de entrada

interface EditUserPayload {
  uid: string;
  email: string;
  password: string;
  displayName: string;
  phone: string;
  address: string;
}

// Define los tipos del resultado exitoso y del error
interface RegisterUserResponse {
  ok: boolean;
  uid?: string;
  address?: string;
  displayName?: string;
  email?: string;
  password?: string;
  phone?: string;
  error?: string;
}

// Configuración adicional para el thunk
interface AsyncThunkConfig {
  rejectValue: unknown;
}

export const startEditUser = createAsyncThunk<
  RegisterUserResponse,
  EditUserPayload,
  AsyncThunkConfig
>(
  'auth/editUser',
  async (
    {
      uid,
      email,
      password,
      displayName,
      phone,
      address,
    }: {
      uid: string;
      email: string;
      password: string;
      displayName: string;
      phone: string;
      address: string;
    },
    { rejectWithValue },
  ) => {
    const result = await API.auth.editUser({
      uid,
      address,
      displayName,
      email,
      password,
      phone,
    });

    if (!result.ok) {
      toast({
        variant: 'destructive',
        title: 'Error al editar usuario',
        description: result.error,
      });

      return rejectWithValue(result.error);
    }

    toast({
      title: 'Usuario editado adecuadamente',
      description: JSON.stringify(result),
    });

    return { ...result };
  },
);

export const startLoginUser = createAsyncThunk<
  {
    token: string;
    user: DecodedToken;
  },
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async (credentials, { rejectWithValue }) => {
  const result = await API.auth.loginUser(credentials);

  if (result.ok) {
    const { accessToken } = result;
    const decodedToken = jwtDecode<DecodedToken>(accessToken);
    localStorage.setItem('access_token', accessToken);
    toast({
      title: 'Sesión iniciada',
      description: `Bienvenido ${decodedToken.nombre}`,
    });
    return {
      token: accessToken,
      user: decodedToken,
    };
  } else {
    toast({
      variant: 'destructive',
      title: 'Ha ocurrido un error al iniciar sesión',
      description: 'Porfavor, intentar más tarde',
    });
    return rejectWithValue(result.error);
  }
});

export const startCheckToken = createAsyncThunk<
  {
    token: string;
    user: DecodedToken;
  },
  undefined,
  { rejectValue: string }
>('auth/checkToken', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      // Opcional: Verificar si el token ha expirado
      if (decodedToken.exp * 1000 < Date.now()) {
        throw new Error('Token expired');
      }
      return { token, user: decodedToken };
    } catch (error) {
      localStorage.removeItem('access_token');
      return rejectWithValue('Invalid token');
    }
  } else {
    return rejectWithValue('No token found');
  }
});
