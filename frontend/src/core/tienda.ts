import { estados_tienda } from "./estados_tienda";
import { usuario } from "./user";

export type tiendas = {
    id_tienda: number;
    id_usuario: usuario;
    id_estado_tienda: estados_tienda;
    nombre_tienda: string;
    logo_tienda: string;
    descripcion: string;
    telefono_tienda: string;
    correo_tienda: string;
    nombre_banco: string;
    tipo_cuenta_bancaria: string;
    numero_de_cuenta: string;
    cci: string;
}