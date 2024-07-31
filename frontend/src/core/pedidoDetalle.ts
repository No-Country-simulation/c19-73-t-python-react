export type pedidoDetalle = {
  id_producto: number;
  id_pedido: number;
  cantidad: number;
  total: number;
};

export const getPedidoDetalles = async (
  idPedido: number,
): Promise<pedidoDetalle[]> => {
  const pedidoDetalles = [
    {
      id_producto: 23,
      id_pedido: 1,
      cantidad: 2,
      total: 50.0,
    },
    {
      id_producto: 45,
      id_pedido: 1,
      cantidad: 1,
      total: 20.0,
    },
    {
      id_producto: 45,
      id_pedido: 1,
      cantidad: 1,
      total: 20.0,
    },
    {
      id_producto: 23,
      id_pedido: 1,
      cantidad: 2,
      total: 50.0,
    },
  ];

  return pedidoDetalles.filter((detalle) => detalle.id_pedido === idPedido);
};
