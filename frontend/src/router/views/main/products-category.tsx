import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { categorias_productos, getCategorias } from '../../../core/categorias_productos';
import { productos, getProductos } from '../../../core/productos';
import { tiendas, getTiendas } from '../../../core/tienda';
import { useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';

type Categoria = categorias_productos;
type Producto = productos;
type Tienda = tiendas;

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(parseInt(id || '1', 10));
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  useEffect(() => {
    getCategorias().then(setCategorias);
    getProductos().then(setProductos);
    getTiendas().then(setTiendas);
  }, []);

  const handleCategoryClick = (id: number) => {
    setSelectedCategory(id);
    setCurrentPage(1);
  };

  const handleAddToCart = (id: number) => {
    console.log(`Producto ${id} agregado al carrito`);
  };

  const filteredProductos = productos.filter(
    (producto) =>
      producto.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase()) &&
      producto.id_categoría === selectedCategory,
  );

  const getStoreName = (storeId: number) => {
    const store = tiendas.find((tienda) => tienda.id_tienda === storeId);
    return store ? store.nombre_tienda : 'Desconocida';
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProductos = filteredProductos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProductos.length / itemsPerPage);

  return (
    <div className='p-6 py-12'>
      <div className='text-center pb-8'>
        <label className='text-4xl font-bold mb-4'>
          {categorias.find((cat) => cat.id_categoría_producto === selectedCategory)?.nombre_categoría_producto}
        </label>
      </div>

      <div className='mb-8'>
        <input
          type='text'
          placeholder='Buscar productos...'
          className='w-full p-3 border rounded-md shadow-md'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='flex flex-col sm:flex-row'>
        <div className='w-full sm:w-1/4 pr-6'>
          <div className='sm:hidden md:hidden mb-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='w-full p-3 border rounded-md shadow-md'>
                  Seleccionar categoría
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-white border rounded-md shadow-md'>
                {categorias.map((categoria) => (
                  <DropdownMenuItem
                    key={categoria.id_categoría_producto}
                    onSelect={() => handleCategoryClick(categoria.id_categoría_producto!)}
                    className={`p-2 ${selectedCategory === categoria.id_categoría_producto ? 'bg-gray-200' : ''}`}
                  >
                    {categoria.nombre_categoría_producto}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ul className='list-none p-0 hidden sm:block md:block'>
            {categorias.map((categoria) => (
              <li
                key={categoria.id_categoría_producto}
                className={`cursor-pointer p-2 mb-2 rounded-md ${
                  selectedCategory === categoria.id_categoría_producto ? 'bg-gray-200' : ''
                }`}
                onClick={() => handleCategoryClick(categoria.id_categoría_producto!)}
              >
                {categoria.nombre_categoría_producto}
              </li>
            ))}
          </ul>
        </div>

        <div className='w-full sm:w-3/4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {currentProductos.map((producto) => (
              <div key={producto.id_producto} className='border rounded-lg shadow-md overflow-hidden flex flex-col'>
                <img src={producto.foto_principal} alt={producto.nombre_producto} className='w-full h-40 object-cover' />
                <div className='p-4 flex flex-col flex-1'>
                  <h2 className='text-xl font-semibold mb-2'>{producto.nombre_producto}</h2>
                  <p className='text-lg font-bold mb-2'>${producto.precio}</p>
                  <p className='mb-2'>Tienda: {getStoreName(producto.id_tienda)}</p>
                  <div className='flex mt-auto'>
                    <Button
                      className='w-1/2 mr-2'
                      onClick={() => (window.location.href = `/detailProduct/${producto.id_producto}`)}
                    >
                      Ver producto
                    </Button>
                    <Button className='w-1/2 flex items-center justify-center' onClick={() => handleAddToCart(producto.id_producto)}>
                      <ShoppingCart className='mr-1 h-6 w-6' />
                      <span>Agregar al carrito</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center mt-6'>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
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
      </div>
    </div>
  );
};

export default CategoryPage;
