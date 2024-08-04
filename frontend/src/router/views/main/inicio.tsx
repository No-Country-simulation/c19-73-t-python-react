import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import banner from '../../../assets/images/banner/banner.jpg';
import decoracion from '../../../assets/images/categories/Decoracion.jpg';
import joyeria from '../../../assets/images/categories/Joyeria.jpg';
import ceramica from '../../../assets/images/categories/ceramica.jpg';
import cosmetica from '../../../assets/images/categories/cosmetica.jpg';
import ecologicos from '../../../assets/images/categories/ecologicos.jpg';
import juguetes from '../../../assets/images/categories/juguetes.jpg';
import papeleria from '../../../assets/images/categories/papeleria.jpg';
import ropa from '../../../assets/images/categories/ropa.jpg';
import { Button } from '../../../components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../components/ui/carousel';
import { getProductos, productos } from '../../../core/productos';
import { getTiendas, tiendas } from '../../../core/tienda';

// Datos de categorías con descripciones y rutas de imágenes
const categories = [
  {
    id: 1,
    name: 'Joyería',
    description: 'Encuentra piezas únicas para embellecerte.',
    image: joyeria,
  },
  {
    id: 2,
    name: 'Decoración para el hogar',
    description: 'Añade un toque especial a tu hogar.',
    image: decoracion,
  },
  {
    id: 3,
    name: 'Ropa y accesorios',
    description: 'Moda y estilo para todos.',
    image: ropa,
  },
  {
    id: 4,
    name: 'Papelería y artículos de oficina',
    description: 'Todo lo necesario para tu oficina.',
    image: papeleria,
  },
  {
    id: 5,
    name: 'Juguetes y juegos',
    description: 'Diversión garantizada para todas las edades.',
    image: juguetes,
  },
  {
    id: 6,
    name: 'Productos ecológicos',
    description: 'Productos amigables con el medio ambiente.',
    image: ecologicos,
  },
  {
    id: 7,
    name: 'Cerámica y vidrio',
    description: 'Artículos elegantes y sofisticados.',
    image: ceramica,
  },
  {
    id: 8,
    name: 'Cosmética y perfumería',
    description: 'Cuida tu belleza con productos especiales.',
    image: cosmetica,
  },
];

const InicioPage = () => {
  const [productos, setProductos] = useState<productos[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<productos[]>([]);
  const [tiendas, setTiendas] = useState<tiendas[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      const productosList = await getProductos();
      setProductos(productosList);
      setFilteredProductos(productosList);
    };

    const fetchTiendas = async () => {
      const tiendasList = await getTiendas();
      setTiendas(tiendasList);
    };

    fetchProductos();
    fetchTiendas();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProductos(productos);
    } else {
      const filtered = productos.filter((producto) =>
        producto.nombre_producto
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );
      setFilteredProductos(filtered);
    }
  }, [searchTerm, productos]);

  const handleCategoryClick = (id: number) => {
    navigate(`/categoryproduct/${id}`);
  };

  return (
    <div className='bg-gray-100 pb-12'>
      {/* Banner */}
      <div className='relative mb-8 bg-gray-800'>
        <img src={banner} alt='Banner' className='h-80 w-full object-cover' />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-gray-800'>
          <h1 className='mb-2 text-4xl font-bold text-black'>
            Descubre lo mejor de nuestro marketplace
          </h1>
          <p className='text-xl text-black'>
            Encuentra artesanías únicas y especiales en cada categoría.
          </p>
        </div>
      </div>

      {/* Buscador de productos */}
      <div className='mb-8 px-6'>
        <div className='flex'>
          <input
            type='text'
            placeholder='Buscar productos...'
            className='h-12 flex-1 rounded-l-md border border-gray-300 p-3 shadow-md'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className='h-12 flex-shrink-0 rounded-r-md border border-gray-300 p-3 shadow-md'>
            Buscar
          </Button>
        </div>
      </div>

      {/* Productos destacados */}
      <section className='productos-destacados mb-8 px-24'>
        <p className='text-sm font-semibold text-blue-800'>Productos</p>
        <h2 className='pb-12 text-3xl font-semibold'>
          Encuentra lo mejor en nuestra selección de productos.
        </h2>
        <div className='relative'>
          <Carousel className='relative'>
            <CarouselContent>
              {filteredProductos.map((producto) => (
                <CarouselItem
                  key={producto.id_producto}
                  className='flex-shrink-0 p-4 md:basis-1/3 lg:basis-1/4'
                >
                  <div className='flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md'>
                    <img
                      src={producto.foto_principal}
                      alt={producto.nombre_producto}
                      className='h-48 w-full object-cover'
                    />
                    <div className='flex flex-1 flex-col p-4'>
                      <h3 className='mb-2 text-lg font-semibold'>
                        {producto.nombre_producto}
                      </h3>
                      <p className='mb-2 text-gray-700'>
                        {producto.descripcion_producto}
                      </p>
                      <p className='mb-4 text-xl font-bold'>
                        ${producto.precio}
                      </p>
                      <Button
                        onClick={() =>
                          (window.location.href = `/detailProduct/${producto.id_producto}`)
                        }
                        className='mt-auto flex items-center space-x-2 text-black'
                      >
                        <span>Ver detalles</span>
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white shadow-lg'>
              <ArrowLeft size={48} />
            </CarouselPrevious>
            <CarouselNext className='absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white shadow-lg'>
              <ArrowRight size={48} />
            </CarouselNext>
          </Carousel>
        </div>
      </section>

      {/* Categorías */}
      <section className='categorias px-24'>
        <p className='text-sm font-semibold text-blue-800'>Categorías</p>
        <h2 className='pb-12 text-3xl font-semibold'>
          Explora nuestras categorías y descubre tu elección perfecta.
        </h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='flex flex-col overflow-hidden rounded-lg border shadow-md'
              onClick={() => handleCategoryClick(category.id)}
            >
              <img
                src={category.image}
                alt={category.name}
                className='h-40 w-full object-cover'
              />
              <div className='flex flex-1 flex-col p-4'>
                <div>
                  <h2 className='mb-2 text-xl font-semibold'>
                    {category.name}
                  </h2>
                  <p className='mb-4'>{category.description}</p>
                </div>
                <Button
                  className='mt-auto w-full'
                  onClick={() => handleCategoryClick(category.id)}
                >
                  Ver productos
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tiendas */}
      <section className='tiendas mb-8 px-24 pt-12'>
        <p className='text-sm font-semibold text-blue-800'>Tiendas</p>
        <h2 className='pb-12 text-3xl font-semibold'>
          Conoce las mejores tiendas de artesanías
        </h2>
        <div className='relative grid grid-cols-5 items-center gap-6 md:grid-cols-2 lg:grid-cols-5'>
          <div className='col-span-2 items-center text-xl'>
            <p>
              Sumérgete en un mundo de creatividad con nuestras tiendas. Cada
              una ofrece tesoros únicos, reflejo de pasión y maestría en
              artesanía. Explora y encuentra el producto perfecto para ti.
            </p>
            <Button
              className='my-12 p-5'
              onClick={() => (window.location.href = `/stores`)}
            >
              Ver tiendas
            </Button>
          </div>
          <Carousel className='relative col-span-3'>
            <CarouselContent>
              {tiendas.map((tienda) => (
                <CarouselItem
                  key={tienda.id_tienda}
                  className='flex-shrink-0 p-4 md:basis-1/2 lg:basis-1/3'
                >
                  <div className='flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md'>
                    <img
                      src={tienda.logo_tienda}
                      alt={tienda.nombre_tienda}
                      className='h-48 w-full object-cover'
                    />
                    <div className='flex flex-1 flex-col p-4'>
                      <h3 className='mb-2 text-lg font-semibold'>
                        {tienda.nombre_tienda}
                      </h3>
                      <p className='mb-2 text-gray-700'>{tienda.descripcion}</p>
                      <Button
                        onClick={() =>
                          (window.location.href = `/details-product/${tienda.id_tienda}`)
                        }
                        className='mt-auto flex items-center space-x-2 text-black'
                      >
                        <span>Ver tienda</span>
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white shadow-lg'>
              <ArrowLeft size={48} />
            </CarouselPrevious>
            <CarouselNext className='absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white shadow-lg'>
              <ArrowRight size={48} />
            </CarouselNext>
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default InicioPage;
