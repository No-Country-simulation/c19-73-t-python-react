import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Store, Tag, Users } from 'lucide-react';

import { Card } from '../../../components/ui/card';
import { getProductos } from '../../../core/productos';
import { getTiendas } from '../../../core/tienda';
import { getUser } from '../../../core/user';

const Dashboard: React.FC = () => {
  const [usuariosCount, setUsuariosCount] = useState(0);
  const [productosCount, setProductosCount] = useState(0);
  const [tiendasCount, setTiendasCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const [usuarios, tiendas, productos] = await Promise.all([
        getUser(),
        getTiendas(),
        getProductos(),
      ]);

      setUsuariosCount(usuarios.length);
      setTiendasCount(tiendas.length);
      setProductosCount(productos.length);
    };

    fetchCounts();
  }, []);

  return (
    <div className='flex flex-col items-center px-6 py-12'>
      <h1 className='mb-6 text-4xl'>Panel de control</h1>
      <div className='mb-8 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-4'>
        <Link to='users'>
          <Card className='flex h-40 flex-col items-center justify-center rounded-lg border-4 border-accent bg-white p-4 shadow'>
            <Users size={48} className='mb-2' />
            <h2 className='text-center text-xl'>Gestión de Usuarios</h2>
          </Card>
        </Link>
        <Link to='products'>
          <Card className='flex h-40 flex-col items-center justify-center rounded-lg border-4 border-accent bg-white p-4 shadow'>
            <Box size={48} className='mb-2' />
            <h2 className='text-center text-xl'>Gestión de Productos</h2>
          </Card>
        </Link>
        <Link to='stores'>
          <Card className='flex h-40 flex-col items-center justify-center rounded-lg border-4 border-accent bg-white p-4 shadow'>
            <Store size={48} className='mb-2' />
            <h2 className='text-center text-xl'>Gestión de Tiendas</h2>
          </Card>
        </Link>
        <Link to='categories'>
          <Card className='flex h-40 flex-col items-center justify-center rounded-lg border-4 border-accent bg-white p-4 shadow'>
            <Tag size={48} className='mb-2' />
            <h2 className='text-center text-xl'>Gestión de Categorías</h2>
          </Card>
        </Link>
      </div>
      <div className='grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3'>
        <Card className='flex h-40 flex-col items-center justify-center rounded-lg border p-4 shadow'>
          <div>
            <h2 className='text-center text-xl'>Cantidad de Usuarios</h2>
            <p className='text-center text-3xl'>{usuariosCount}</p>
          </div>
        </Card>
        <Card className='flex h-40 flex-col items-center justify-center rounded-lg border p-4 shadow'>
          <div>
            <h2 className='text-center text-xl'>Cantidad de Productos</h2>
            <p className='text-center text-3xl'>{productosCount}</p>
          </div>
        </Card>
        <Card className='flex h-40 flex-col items-center justify-center rounded-lg border p-4 shadow'>
          <div>
            <h2 className='text-center text-xl'>Cantidad de Tiendas</h2>
            <p className='text-center text-3xl'>{tiendasCount}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
