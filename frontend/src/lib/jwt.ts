import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  sub: string;
  nombre: string;
  telefono: string;
  direccion: string;
  correo: string;
  rol_id: number;
  exp: number;
}

export const decodeToken = (token: string): DecodedToken => {
  return jwtDecode<DecodedToken>(token);
};
