export type rol = {
  rol_id: number;
  nombre: string;
};

export async function getRol(): Promise<rol[]> {
  return [
    {
      rol_id: 1,
      nombre: 'administrador',
    },
    {
      rol_id: 2,
      nombre: 'usuario',
    },
    {
      rol_id: 3,
      nombre: 'vendedor',
    },
  ];
}
