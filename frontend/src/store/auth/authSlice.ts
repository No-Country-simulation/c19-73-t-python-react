import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { startRegisterUser } from './authThunks';

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
  errorMessage: string | null;
}

// const initialState: AuthState = {
//   status: 'checking',
//   uid: null,
//   displayName: null,
//   email: null,
//   phone: null,
//   address: null,
//   errorMessage: null,
// };

const initialStateLogged: AuthState = {
  status: 'authenticated',
  uid: '1',
  displayName: 'John Doe',
  email: 'john@doe.com',
  phone: '+50378724055',
  address: 'BINAES',
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateLogged,
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
      .addCase(startRegisterUser.pending, (state) => {
        state.status = 'checking';
      })
      .addCase(startRegisterUser.fulfilled, (state, action) => {
        state.status = 'authenticated';
        (state.uid = action.payload.uid!),
          (state.address = action.payload.address!),
          (state.displayName = action.payload.displayName!),
          (state.email = action.payload.email!),
          (state.phone = action.payload.phone!);
      })
      .addCase(startRegisterUser.rejected, (state, action) => {
        state.status = 'not-authenticated';
        state.errorMessage = action.payload as string;
      });
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
