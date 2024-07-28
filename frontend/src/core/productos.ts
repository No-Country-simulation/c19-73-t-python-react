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
  
  export const getProductoById = async (idProducto: number): Promise<productos> => {
    const productos = [
      {
        id_producto: 23,
        id_tienda: 1,
        id_categoría: 1,
        id_fotos_galeria: 'gallery1',
        nombre_producto: 'Producto A',
        descripcion_producto: 'Descripción del Producto A',
        foto_principal: 'https://via.placeholder.com/150',
        precio: '25.00',
        stock: 100,
      },
      {
        id_producto: 45,
        id_tienda: 2,
        id_categoría: 2,
        id_fotos_galeria: 'gallery2',
        nombre_producto: 'Producto B',
        descripcion_producto: 'Descripción del Producto B',
        foto_principal: 'https://via.placeholder.com/150',
        precio: '20.00',
        stock: 200,
      },
      // Agrega más productos según sea necesario
    ];
  
    return productos.find(p => p.id_producto === idProducto)!;
  };
  