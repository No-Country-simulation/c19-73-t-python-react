export type categorias_productos = {
  id_categoría_producto?: number;
  nombre_categoría_producto: string;
};

const categorias: categorias_productos[] = [
  { id_categoría_producto: 1, nombre_categoría_producto: 'Joyería' },
  {
    id_categoría_producto: 2,
    nombre_categoría_producto: 'Decoración para el hogar',
  },
  { id_categoría_producto: 3, nombre_categoría_producto: 'Ropa y accesorios' },
  {
    id_categoría_producto: 4,
    nombre_categoría_producto: 'Papelería y artículos de oficina',
  },
  { id_categoría_producto: 5, nombre_categoría_producto: 'Juguetes y juegos' },
  {
    id_categoría_producto: 6,
    nombre_categoría_producto: 'Productos ecológicos',
  },
  { id_categoría_producto: 7, nombre_categoría_producto: 'Cerámica y vidrio' },
  {
    id_categoría_producto: 8,
    nombre_categoría_producto: 'Cosmética y perfumería',
  },
];

export const getCategoriaById = async (
  idCategoria: number,
): Promise<categorias_productos | undefined> => {
  return categorias.find((c) => c.id_categoría_producto === idCategoria);
};

export const getCategorias = async (): Promise<categorias_productos[]> => {
  return categorias;
};
