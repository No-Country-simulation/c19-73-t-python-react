import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { tiendas, getTiendas } from '../../../core/tienda';
import { ArrowRight } from 'lucide-react'; // Importar el icono de flecha para ver detalles

type Tienda = tiendas;

const TiendasPage: React.FC = () => {
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Fetch stores on mount
    getTiendas().then(setTiendas);
  }, []);

  // Filtrar tiendas basadas en el término de búsqueda
  const filteredTiendas = tiendas.filter(tienda =>
    tienda.nombre_tienda.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='p-6 py-12'>
      {/* Banner */}
      <div className='relative mb-8 bg-gray-800'>
        <img
          src='path_to_your_banner_image.jpg' // Cambia esto a la ruta de tu imagen de banner
          alt='Banner'
          className='w-full h-80 object-cover'
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
          <h1 className='mb-2 text-4xl font-bold'>Explora Nuestras Tiendas</h1>
          <p className='text-xl'>Descubre artesanías únicas y especiales en nuestras tiendas.</p>
        </div>
      </div>

      {/* Buscador de tiendas */}
      <div className='mb-8'>
        <input
          type='text'
          placeholder='Buscar tiendas...'
          className='w-full p-3 border rounded-md shadow-md'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tiendas */}
      <section className='tiendas'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredTiendas.map((tienda) => (
            <div key={tienda.id_tienda} className='border rounded-lg shadow-md overflow-hidden flex flex-col'>
              <img src={tienda.logo_tienda} alt={tienda.nombre_tienda} className='w-full h-40 object-cover' />
              <div className='p-4 flex flex-col flex-1'>
                <h2 className='text-xl font-semibold mb-2'>{tienda.nombre_tienda}</h2>
                <p className='text-lg mb-2'>{tienda.descripcion}</p>
                <div className='mt-auto'>
                  <Button
                    onClick={() => window.location.href = `/details-product/${tienda.id_tienda}`}
                    className='w-full flex items-center justify-center text-black'
                  >
                    <span>Ver tienda</span>
                    <ArrowRight className='ml-2' />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TiendasPage;
