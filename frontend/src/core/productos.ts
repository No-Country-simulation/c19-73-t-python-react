export type productos = {
  id_producto: number;
  id_tienda: number;
  id_categoría: number;
  id_fotos_galeria: string;
  nombre_producto: string;
  descripcion_producto: string;
  foto_principal: string;
  precio: string;
  stock: number;
};

const productosList: productos[] = [
  {
    id_producto: 23,
    id_tienda: 1,
    id_categoría: 1,
    id_fotos_galeria: 'gallery1',
    nombre_producto: 'Servicio de café',
    descripcion_producto: 'Juego de tres piezas en madera de olivo, formado por una taza tallada de una pieza, platillo circular y cucharilla de 12 cms.',
    foto_principal: 'https://via.placeholder.com/150',
    precio: '18.00',
    stock: 100,
  },
  {
    id_producto: 45,
    id_tienda: 2,
    id_categoría: 2,
    id_fotos_galeria: 'gallery2',
    nombre_producto: 'Presentador de sushi',
    descripcion_producto: 'Original presentación de una pizarra con medidas 25 x 15 cms sobre bases laterales de madera de olivo, para presentaciones de sushi',
    foto_principal: 'https://via.placeholder.com/150',
    precio: '25.00',
    stock: 200,
  },
  // Agrega más productos según sea necesario
];

export const getProductoById = async (idProducto: number): Promise<productos> => {
  return productosList.find(p => p.id_producto === idProducto)!;
};

export const getProductos = async (): Promise<productos[]> => {
  return productosList;
};
