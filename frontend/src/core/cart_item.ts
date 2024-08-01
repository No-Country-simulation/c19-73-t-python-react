// types.ts o cualquier archivo donde tengas tus definiciones de tipos

import { productos } from "./productos";

export interface CartItem {
  producto: productos; // Asegúrate de que `productos` esté correctamente importado
  cantidad: number;
}