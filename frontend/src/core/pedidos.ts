export type pedido = {
  id_pedido: number;
  id_usuario: number;
  cantidad: number;
  id_estado_pedido: number;
  Fecha_y_hora: string;
  Total: number;
};

export const getPedidos = async (): Promise<pedido[]> => {
  return [
    {
      id_pedido: 1,
      id_usuario: 2,
      cantidad: 12,
      id_estado_pedido: 1,
      Fecha_y_hora: '2024-06-10T00:00:00Z',
      Total: 25.5,
    },
    {
      id_pedido: 2,
      id_usuario: 2,
      cantidad: 10,
      id_estado_pedido: 1,
      Fecha_y_hora: '2024-04-05T00:00:00Z',
      Total: 15.5,
    },
    {
      id_pedido: 3,
      id_usuario: 3,
      cantidad: 5,
      id_estado_pedido: 2,
      Fecha_y_hora: '2024-02-15T00:00:00Z',
      Total: 50.0,
    },
    {
      id_pedido: 4,
      id_usuario: 4,
      cantidad: 7,
      id_estado_pedido: 3,
      Fecha_y_hora: '2024-03-20T00:00:00Z',
      Total: 70.0,
    },
    {
      id_pedido: 5,
      id_usuario: 2,
      cantidad: 8,
      id_estado_pedido: 1,
      Fecha_y_hora: '2024-01-10T00:00:00Z',
      Total: 40.0,
    },
    {
      id_pedido: 6,
      id_usuario: 2,
      cantidad: 6,
      id_estado_pedido: 1,
      Fecha_y_hora: '2024-01-05T00:00:00Z',
      Total: 30.0,
    },
    {
      id_pedido: 7,
      id_usuario: 3,
      cantidad: 4,
      id_estado_pedido: 2,
      Fecha_y_hora: '2024-02-20T00:00:00Z',
      Total: 60.0,
    },
    {
      id_pedido: 8,
      id_usuario: 4,
      cantidad: 3,
      id_estado_pedido: 3,
      Fecha_y_hora: '2024-03-25T00:00:00Z',
      Total: 80.0,
    },
    {
      id_pedido: 9,
      id_usuario: 2,
      cantidad: 2,
      id_estado_pedido: 1,
      Fecha_y_hora: '2024-01-15T00:00:00Z',
      Total: 45.0,
    },
    {
      id_pedido: 10,
      id_usuario: 2,
      cantidad: 1,
      id_estado_pedido: 1,
      Fecha_y_hora: '2024-01-20T00:00:00Z',
      Total: 35.0,
    },
    {
      id_pedido: 11,
      id_usuario: 3,
      cantidad: 9,
      id_estado_pedido: 2,
      Fecha_y_hora: '2024-02-25T00:00:00Z',
      Total: 55.0,
    },
    {
      id_pedido: 12,
      id_usuario: 4,
      cantidad: 3,
      id_estado_pedido: 3,
      Fecha_y_hora: '2024-03-30T00:00:00Z',
      Total: 75.0,
    },
  ];
};
