export type estados_tienda = {
    id_estado_tienda: number;
    nombre_estado_tienda: string;
}

export async function get_estado_tiendas(): Promise<estados_tienda[]> {
    return [
        {
            id_estado_tienda: 1,
            nombre_estado_tienda: 'Activo'
        },
        {
            id_estado_tienda: 2,
            nombre_estado_tienda: 'Inactivo'
        },
        {
            id_estado_tienda: 3,
            nombre_estado_tienda: 'Pendiente'
        }
    ];
}