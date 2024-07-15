import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '../../api/apiServices';
import { toast } from '../../components/ui/use-toast';

/**
 * Thunk de Redux, para ver como funciona ver este enlace:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * TODO: Agregar más Thunks para el inicio de sesión y edición de usuario
 * TODO: Refactorizar este código
 */

// Define los tipos de los parámetros de entrada
interface RegisterUserPayload {
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

// Configuración adicional para el thunk (opcional)
interface AsyncThunkConfig {
  rejectValue: unknown;
}

export const startRegisterUser = createAsyncThunk<
  RegisterUserResponse,
  RegisterUserPayload,
  AsyncThunkConfig
>(
  'auth/registerUser',
  async (
    {
      email,
      password,
      displayName,
      phone,
      address,
    }: {
      email: string;
      password: string;
      displayName: string;
      phone: string;
      address: string;
    },
    { rejectWithValue },
  ) => {
    const result = await API.auth.registerUser({
      address,
      displayName,
      email,
      password,
      phone,
    });

    if (!result.ok) {
      toast({
        variant: 'destructive',
        title: 'Error al registrarse',
        description: result.error,
      });

      return rejectWithValue(result.error);
    }

    toast({
      title: 'Registro hecho de forma correcta',
      description: JSON.stringify(result),
    });

    return { ...result };
  },
);
