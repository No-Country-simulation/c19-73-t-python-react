import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { startCheckToken, startEditUser, startLoginUser } from './authThunks';

/**
 * Slice del estado de la autenticación
 *
 * TODO: Agregar otros reducers
 */

export interface AuthState {
  status: 'checking' | 'not-authenticated' | 'authenticated';
  uid: string | null;
  displayName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  roleId: number | null;
  errorMessage: string | null;
}

const initialState: AuthState = {
  status: 'checking',
  uid: null,
  displayName: null,
  email: null,
  phone: null,
  roleId: null,
  address: null,
  errorMessage: null,
};

// const initialStateLogged: AuthState = {
//   status: 'authenticated',
//   uid: '1',
//   displayName: 'John Doe',
//   email: 'john@doe.com',
//   phone: '+50378724055',
//   address: 'BINAES',
//   roleId: 1,
//   errorMessage: null,
// };

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        uid: string;
        displayName: string;
        email: string;
        phone: string;
        address: string;
      }>,
    ) => {
      state.status = 'authenticated';
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startEditUser.pending, (state) => {
        state.status = 'checking';
      })
      .addCase(startEditUser.fulfilled, (state, action) => {
        (state.address = action.payload.address!),
          (state.displayName = action.payload.displayName!),
          (state.email = action.payload.email!),
          (state.phone = action.payload.phone!);
      })
      .addCase(startEditUser.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
      })
      .addCase(startLoginUser.pending, (state) => {
        state.status = 'checking';
      })
      .addCase(startLoginUser.fulfilled, (state, action) => {
        (state.status = 'authenticated'), (state.uid = action.payload.user.sub);
        state.displayName = action.payload.user.nombre;
        state.email = action.payload.user.correo;
        state.phone = action.payload.user.telefono;
        state.address = action.payload.user.direccion;
        state.roleId = action.payload.user.role_id;
        state.errorMessage = null;
      })
      .addCase(startLoginUser.rejected, (state, action) => {
        state.status = 'not-authenticated';
        state.errorMessage = action.payload as string;
      })
      .addCase(startCheckToken.pending, (state) => {
        state.status = 'checking';
      })
      .addCase(startCheckToken.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.uid = action.payload.user.sub;
        state.displayName = action.payload.user.nombre;
        state.email = action.payload.user.correo;
        state.phone = action.payload.user.telefono;
        state.address = action.payload.user.direccion;
        state.roleId = action.payload.user.role_id;
        state.errorMessage = null;
      })
      .addCase(startCheckToken.rejected, (state) => {
        state.status = 'not-authenticated';
      });
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
