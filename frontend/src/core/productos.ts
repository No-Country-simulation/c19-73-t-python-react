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
  {
    id_producto: 46,
    id_tienda: 1,
    id_categoría: 3,
    id_fotos_galeria: 'gallery3',
    nombre_producto: 'Portavelas de cerámica',
    descripcion_producto: 'Elegante portavelas de cerámica en forma de flor, pintado a mano en tonos pastel.',
    foto_principal: 'https://via.placeholder.com/150',
    precio: '12.50',
    stock: 150,
  },
  {
    id_producto: 47,
    id_tienda: 3,
    id_categoría: 1,
    id_fotos_galeria: 'gallery4',
    nombre_producto: 'Cuenco de madera',
    descripcion_producto: 'Cuenco hecho a mano de madera de roble, ideal para servir ensaladas o frutas.',
    foto_principal: 'https://via.placeholder.com/150',
    precio: '20.00',
    stock: 80,
  },
  {
    id_producto: 49,
    id_tienda: 1,
    id_categoría: 2,
    id_fotos_galeria: 'gallery6',
    nombre_producto: 'Cesta de mimbre',
    descripcion_producto: 'Cesta artesanal de mimbre con asas reforzadas, perfecta para usar en la cocina o en picnics.',
    foto_principal: 'https://via.placeholder.com/150',
    precio: '15.00',
    stock: 120,
  },
  {
    id_producto: 50,
    id_tienda: 3,
    id_categoría: 5,
    id_fotos_galeria: 'gallery7',
    nombre_producto: 'Alfombra tejida a mano',
    descripcion_producto: 'Alfombra de algodón tejida a mano, con patrones geométricos y colores vibrantes.',
    foto_principal: 'https://via.placeholder.com/150',
    precio: '45.00',
    stock: 40,
  },  
];

export const getProductoById = async (idProducto: number): Promise<productos> => {
  return productosList.find(p => p.id_producto === idProducto)!;
};

export const getProductos = async (): Promise<productos[]> => {
  return productosList;
};
