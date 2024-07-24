import { categorias_productos } from "./categorias_productos";
import { fotos_galeria_producto } from "./fotos_galeria_producto";
import { tiendas } from "./tienda";

export type productos ={
    id_producto: number;
    id_tienda: tiendas;
    id_categoría: categorias_productos;
    id_fotos_galeria: fotos_galeria_producto;
    nombre_producto: string,
    descripcion_producto: string;
    foto_principal: string;
    precio: string;
    stock: number;
}