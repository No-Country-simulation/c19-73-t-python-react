import React from 'react';
import { Button } from '../../../components/ui/button';
import banner from "../../../assets/images/banner.png"
import joyeria from "../../../assets/images/categories/Joyeria.png";
import decoracion from "../../../assets/images/categories/Decoracion.png";

// Datos de categorías con descripciones y rutas de imágenes
const categories = [
  { id: 1, name: 'Joyería', description: 'Encuentra piezas únicas para embellecerte.', image: joyeria },
  { id: 2, name: 'Decoración para el hogar', description: 'Añade un toque especial a tu hogar.', image: decoracion },
  { id: 3, name: 'Ropa y accesorios', description: 'Moda y estilo para todos.', image: '/path/to/ropa.jpg' },
  { id: 4, name: 'Papelería y artículos de oficina', description: 'Todo lo necesario para tu oficina.', image: '/path/to/papeleria.jpg' },
  { id: 5, name: 'Juguetes y juegos', description: 'Diversión garantizada para todas las edades.', image: '/path/to/juguetes.jpg' },
  { id: 6, name: 'Productos ecológicos', description: 'Productos amigables con el medio ambiente.', image: '/path/to/ecologicos.jpg' },
  { id: 7, name: 'Cerámica y vidrio', description: 'Artículos elegantes y sofisticados.', image: '/path/to/ceramica.jpg' },
  { id: 8, name: 'Cosmética y perfumería', description: 'Cuida tu belleza con productos especiales.', image: '/path/to/cosmetica.jpg' },
];

const InicioPage = () => {
  const handleCategoryClick = (id: number) => {
    // Redirige a la página de la categoría según el id
    window.location.href = `/categoria/${id}`;
  };

  return (
    <div className='p-6'>
      {/* Banner */}
      <div className='relative bg-gray-800 text-gray-800 py-16 px-6 rounded-lg mb-8'>
        <div className='absolute inset-0'>
          <img src={banner} alt='Banner' className='w-full h-full object-cover rounded-lg' />
        </div>
        <div className='relative z-10 text-center'>
          <h1 className='text-4xl font-bold mb-2'>Descubre lo mejor de nuestro marketplace</h1>
          <p className='text-xl'>Encuentra artesanías únicas y especiales en cada categoría.</p>
        </div>
      </div>

      {/* Buscador de productos */}
      <div className='mb-8'>
        <div className='flex'>
          <input
            type='text'
            placeholder='Buscar productos...'
            className='flex-1 p-3 border border-gray-300 rounded-l-md shadow-md h-12'
          />
          <Button className='flex-shrink-0 p-3 border border-gray-300 rounded-r-md shadow-md h-12'>
            Buscar
          </Button>
        </div>
      </div>

      {/* Categorías */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {categories.map((category) => (
          <div
            key={category.id}
            className='border rounded-lg shadow-md overflow-hidden flex flex-col'
            onClick={() => handleCategoryClick(category.id)}
          >
            <img src={category.image} alt={category.name} className='w-full h-40 object-cover' />
            <div className='p-4 flex flex-col flex-1'>
              <div>
                <h2 className='text-xl font-semibold mb-2'>{category.name}</h2>
                <p className='mb-4'>{category.description}</p>
              </div>
              <Button className='w-full mt-auto'>Ver productos</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InicioPage;
