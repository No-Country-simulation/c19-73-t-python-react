import banner from '../../../assets/images/banner.png';
import decoracion from '../../../assets/images/categories/Decoracion.png';
import joyeria from '../../../assets/images/categories/Joyeria.png';
import { Button } from '../../../components/ui/button';

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
    image: '/path/to/ropa.jpg',
  },
  {
    id: 4,
    name: 'Papelería y artículos de oficina',
    description: 'Todo lo necesario para tu oficina.',
    image: '/path/to/papeleria.jpg',
  },
  {
    id: 5,
    name: 'Juguetes y juegos',
    description: 'Diversión garantizada para todas las edades.',
    image: '/path/to/juguetes.jpg',
  },
  {
    id: 6,
    name: 'Productos ecológicos',
    description: 'Productos amigables con el medio ambiente.',
    image: '/path/to/ecologicos.jpg',
  },
  {
    id: 7,
    name: 'Cerámica y vidrio',
    description: 'Artículos elegantes y sofisticados.',
    image: '/path/to/ceramica.jpg',
  },
  {
    id: 8,
    name: 'Cosmética y perfumería',
    description: 'Cuida tu belleza con productos especiales.',
    image: '/path/to/cosmetica.jpg',
  },
];

const InicioPage = () => {
  const handleCategoryClick = (id: number) => {
    // Redirige a la página de la categoría según el id
    window.location.href = `/categoria/${id}`;
  };

  return (
    <div className='p-6'>
      {/* Banner */}
      <div className='relative mb-8 rounded-lg bg-gray-800 px-6 py-16 text-gray-800'>
        <div className='absolute inset-0'>
          <img
            src={banner}
            alt='Banner'
            className='h-full w-full rounded-lg object-cover'
          />
        </div>
        <div className='relative z-10 text-center'>
          <h1 className='mb-2 text-4xl font-bold'>
            Descubre lo mejor de nuestro marketplace
          </h1>
          <p className='text-xl'>
            Encuentra artesanías únicas y especiales en cada categoría.
          </p>
        </div>
      </div>

      {/* Buscador de productos */}
      <div className='mb-8'>
        <div className='flex'>
          <input
            type='text'
            placeholder='Buscar productos...'
            className='h-12 flex-1 rounded-l-md border border-gray-300 p-3 shadow-md'
          />
          <Button className='h-12 flex-shrink-0 rounded-r-md border border-gray-300 p-3 shadow-md'>
            Buscar
          </Button>
        </div>
      </div>

      {/* Categorías */}
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
                <h2 className='mb-2 text-xl font-semibold'>{category.name}</h2>
                <p className='mb-4'>{category.description}</p>
              </div>
              <Button className='mt-auto w-full'>Ver productos</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InicioPage;
