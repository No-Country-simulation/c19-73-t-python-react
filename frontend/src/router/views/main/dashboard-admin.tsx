import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../../core/user';
import { getProductos } from '../../../core/productos';
import { getTiendas } from '../../../core/tienda';
import { Card } from '../../../components/ui/card';
import { Users, Box, Store } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [usuariosCount, setUsuariosCount] = useState(0);
  const [productosCount, setProductosCount] = useState(0);
  const [tiendasCount, setTiendasCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const [usuarios, tiendas, productos] = await Promise.all([
        getUser(),
        getTiendas(),
        getProductos()
      ]);

      setUsuariosCount(usuarios.length);
      setTiendasCount(tiendas.length);
      setProductosCount(productos.length);
    };

    fetchCounts();
  }, []);

  return (
    <div className="flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl mb-6">Panel de control</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/data">
          <Card className="p-4 border rounded-lg shadow flex flex-col items-center justify-center bg-white border-accent border-4 h-40">
            <Users size={48} className="mb-2" />
            <h2 className="text-xl text-center">Gestión de Usuarios</h2>
          </Card>
        </Link>
        <Link to="/gestion-productos">
          <Card className="p-4 border rounded-lg shadow flex flex-col items-center justify-center bg-white border-accent border-4 h-40">
            <Box size={48} className="mb-2" />
            <h2 className="text-xl text-center">Gestión de Productos</h2>
          </Card>
        </Link>
        <Link to="/gestion_tiendas">
          <Card className="p-4 border rounded-lg shadow flex flex-col items-center justify-center bg-white border-accent border-4 h-40">
            <Store size={48} className="mb-2" />
            <h2 className="text-xl text-center">Gestión de Tiendas</h2>
          </Card>
        </Link>
      </div>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border rounded-lg shadow flex flex-col items-center justify-center h-40">
          <div>
            <h2 className="text-xl text-center">Cantidad de Usuarios</h2>
            <p className="text-3xl text-center">{usuariosCount}</p>
          </div>
        </Card>
        <Card className="p-4 border rounded-lg shadow flex flex-col items-center justify-center h-40">
          <div>
            <h2 className="text-xl text-center">Cantidad de Productos</h2>
            <p className="text-3xl text-center">{productosCount}</p>
          </div>
        </Card>
        <Card className="p-4 border rounded-lg shadow flex flex-col items-center justify-center h-40">
          <div>
            <h2 className="text-xl text-center">Cantidad de Tiendas</h2>
            <p className="text-3xl text-center">{tiendasCount}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
