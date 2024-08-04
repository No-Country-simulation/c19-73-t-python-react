import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { productos, getProductos } from '../../../core/productos';
import { tiendas, getTiendas } from '../../../core/tienda';
import { useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react'; // Importar el icono de carrito de compras

type Producto = productos;
type Tienda = tiendas;

const StoreProductsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tienda, setTienda] = useState<Tienda | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  useEffect(() => {
    // Fetch store and products on mount
    if (id) {
      Promise.all([
        getTiendas().then(tiendas => tiendas.find(tienda => tienda.id_tienda === parseInt(id, 10)) || null),
        getProductos()
      ]).then(([tienda, productos]) => {
        setTienda(tienda);
        setProductos(productos.filter(producto => producto.id_tienda === parseInt(id, 10)));
      });
    }
  }, [id]);

  const handleAddToCart = (id: number) => {
    // Lógica para agregar al carrito
    console.log(`Producto ${id} agregado al carrito`);
  };

  const filteredProductos = productos.filter(producto =>
    producto.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic for displaying current products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProductos = filteredProductos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProductos.length / itemsPerPage);

  return (
    <div className='p-6 py-12'>
      {/* Nombre de la tienda */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold'>
          {tienda ? tienda.nombre_tienda : 'Cargando...'}
        </h1>
      </div>

      {/* Buscador de productos */}
      <div className='mb-8'>
        <input
          type='text'
          placeholder='Buscar productos...'
          className='w-full p-3 border rounded-md shadow-md'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Lista de productos */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {currentProductos.length > 0 ? (
          currentProductos.map((producto) => (
            <div key={producto.id_producto} className='border rounded-lg shadow-md overflow-hidden flex flex-col'>
              <img src={producto.foto_principal} alt={producto.nombre_producto} className='w-full h-40 object-cover' />
              <div className='p-4 flex flex-col flex-1'>
                <h2 className='text-xl font-semibold mb-2'>{producto.nombre_producto}</h2>
                <p className='text-lg font-bold mb-2'>${producto.precio}</p>
                <div className='flex mt-auto'>
                  <Button className='w-1/2 mr-2' onClick={() => window.location.href = `/detailProduct/${producto.id_producto}`}>Ver producto</Button>
                  <Button className='w-1/2 flex items-center justify-center' onClick={() => handleAddToCart(producto.id_producto)}>
                    <ShoppingCart className='mr-1 h-6 w-6' />
                    <span>Agregar al carrito</span>
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center col-span-full'>No se encontraron productos.</p>
        )}
      </div>

      {/* Paginación */}
      <div className='flex justify-center mt-6'>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === pageNumber ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoreProductsPage;
