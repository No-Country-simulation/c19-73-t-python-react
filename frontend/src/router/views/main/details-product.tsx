import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductoById, productos } from '../../../core/productos';
import { categorias_productos, getCategorias } from '../../../core/categorias_productos';
import { tiendas, getTiendas } from '../../../core/tienda';
import { Button } from '../../../components/ui/button';
import { ShoppingCart } from 'lucide-react';

type Producto = productos;
type Categoria = categorias_productos;
type Tienda = tiendas;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [tiendas, setTiendas] = useState<Tienda[]>([]);

  useEffect(() => {
    getCategorias().then(setCategorias);
    getTiendas().then(setTiendas);
  }, []);

  useEffect(() => {
    if (id) {
      getProductoById(parseInt(id, 10)).then(setProducto);
    }
  }, [id]);

  const getCategoriaName = (idCategoria: number) => {
    const categoria = categorias.find(cat => cat.id_categoría_producto === idCategoria);
    return categoria ? categoria.nombre_categoría_producto : 'Desconocida';
  };

  const getStoreName = (idTienda: number) => {
    const tienda = tiendas.find(tienda => tienda.id_tienda === idTienda);
    return tienda ? tienda.nombre_tienda : 'Desconocida';
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <div className='p-6 py-12 pt-24 px-24'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Imagen del producto */}
        <div className='flex justify-center items-center'>
          <img src={producto.foto_principal} alt={producto.nombre_producto} className='w-full max-w-md h-auto object-cover rounded-md shadow-md' />
        </div>

        {/* Detalles del producto */}
        <div className='flex flex-col'>
          <h1 className='text-4xl font-bold mb-4'>{producto.nombre_producto}</h1>
          <p className='text-lg mb-2'>
            <strong>Categoría: </strong>
            {getCategoriaName(producto.id_categoría)}
          </p>
          <p className='text-lg mb-4'>
            <strong>Descripción: </strong>
            {producto.descripcion_producto}
          </p>
          <p className='text-2xl font-semibold mb-2'>
            <strong>Precio: </strong>${producto.precio}
          </p>
          <p className='text-lg mb-4'>
            <strong>Tienda: </strong>
            {getStoreName(producto.id_tienda)}
          </p>
          <Button className='w-full flex items-center justify-center'>
            <ShoppingCart className='mr-2 h-6 w-6' />
            Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
