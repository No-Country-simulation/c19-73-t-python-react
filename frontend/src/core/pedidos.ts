import { estados_pedidos } from "./estados_pedidos";
import { productos } from "./productos";
import { tiendas } from "./tienda";
import { usuario } from "./user";

export type pedido ={
    id_pedido: number;
    id_usuario: usuario;
    id_tienda: tiendas;
    id_producto: productos;
    cantidad: number;
    id_estado_pedido: estados_pedidos ;
    Fecha_y_hora: Date;
    Total:  number;
}