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

interface EditUserPayload extends RegisterUserPayload {
  uid: string;
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
