import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';
import { getPedidos, pedido } from '../../../core/pedidos';

const PedidosPage: React.FC = () => {
  const [pedidos, setPedidos] = useState<pedido[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('pendientes');
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchPedidos = async () => {
      const pedidos = await getPedidos();
      setPedidos(pedidos);
    };

    fetchPedidos();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset the page number when changing tabs
  };

  const filteredPedidos = pedidos.filter((p) => {
    if (activeTab === 'pendientes') return p.id_estado_pedido === 1;
    if (activeTab === 'completados') return p.id_estado_pedido === 2;
    if (activeTab === 'cancelados') return p.id_estado_pedido === 3;
    return false;
  });

  const paginate = (array: pedido[], page: number) => {
    return array.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  };

  const totalPages = (array: pedido[]) => {
    return Math.ceil(array.length / itemsPerPage);
  };

  const renderPagination = (array: pedido[]) => {
    const pages = totalPages(array);
    const paginationButtons = [];

    for (let i = 1; i <= pages; i++) {
      paginationButtons.push(
        <Button
          key={i}
          className={`mx-1 rounded px-4 py-2 ${i === currentPage ? 'text-white' : 'bg-accent'}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Button>,
      );
    }

    return <div className='mt-4 flex justify-center'>{paginationButtons}</div>;
  };

  return (
    <div className='flex min-h-screen flex-col items-center px-6 py-12'>
      <h1 className='mb-6 text-3xl'>Pedidos</h1>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className='w-full max-w-4xl'
      >
        <TabsList className='mb-4 w-full bg-primary text-white'>
          <TabsTrigger value='pendientes'>Pendientes</TabsTrigger>
          <TabsTrigger value='completados'>Completados</TabsTrigger>
          <TabsTrigger value='cancelados'>Cancelados</TabsTrigger>
        </TabsList>
        <div className='w-full max-w-4xl'>
          <TabsContent value='pendientes'>
            <div className='mb-4 space-y-4'>
              {paginate(filteredPedidos, currentPage).map((pedido) => (
                <Card
                  key={pedido.id_pedido}
                  className='flex w-full items-center justify-between rounded-lg border p-4 shadow'
                >
                  <div>
                    <div className='mb-2'>
                      <span>
                        <strong>ID del Pedido:</strong> {pedido.id_pedido}
                      </span>
                    </div>
                    <div className='mb-2'>
                      <span>
                        <strong>Cantidad de Productos:</strong>{' '}
                        {pedido.cantidad}
                      </span>
                    </div>
                    <div className='mb-2'>
                      <span>
                        <strong>Total de Compra:</strong> $
                        {pedido.Total.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span>
                        <strong>Fecha del Pedido:</strong>{' '}
                        {new Date(pedido.Fecha_y_hora).toLocaleDateString(
                          'es-ES',
                          { day: '2-digit', month: 'long', year: 'numeric' },
                        )}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/pedidos/detalle-pedido/${pedido.id_pedido}`}
                    className='text-white no-underline'
                  >
                    <Button className='rounded px-4 py-2 text-white transition hover:bg-accent'>
                      Ver detalle de pedido
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
            {filteredPedidos.length > itemsPerPage &&
              renderPagination(filteredPedidos)}
          </TabsContent>
          <TabsContent value='completados'>
            <div className='mb-4 space-y-4'>
              {paginate(filteredPedidos, currentPage).map((pedido) => (
                <Card
                  key={pedido.id_pedido}
                  className='flex w-full items-center justify-between rounded-lg border p-4 shadow'
                >
                  <div>
                    <div className='mb-2'>
                      <span>
                        <strong>ID del Pedido:</strong> {pedido.id_pedido}
                      </span>
                    </div>
                    <div className='mb-2'>
                      <span>
                        <strong>Cantidad de Productos:</strong>{' '}
                        {pedido.cantidad}
                      </span>
                    </div>
                    <div className='mb-2'>
                      <span>
                        <strong>Total de Compra:</strong> $
                        {pedido.Total.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span>
                        <strong>Fecha del Pedido:</strong>{' '}
                        {new Date(pedido.Fecha_y_hora).toLocaleDateString(
                          'es-ES',
                          { day: '2-digit', month: 'long', year: 'numeric' },
                        )}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/pedidos/detalle-pedido/${pedido.id_pedido}`}
                    className='text-white no-underline'
                  >
                    <Button className='rounded px-4 py-2 text-white transition hover:bg-accent'>
                      Ver detalle de pedido
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
            {filteredPedidos.length > itemsPerPage &&
              renderPagination(filteredPedidos)}
          </TabsContent>
          <TabsContent value='cancelados'>
            <div className='mb-4 space-y-4'>
              {paginate(filteredPedidos, currentPage).map((pedido) => (
                <Card
                  key={pedido.id_pedido}
                  className='flex w-full items-center justify-between rounded-lg border p-4 shadow'
                >
                  <div>
                    <div className='mb-2'>
                      <span>
                        <strong>ID del Pedido:</strong> {pedido.id_pedido}
                      </span>
                    </div>
                    <div className='mb-2'>
                      <span>
                        <strong>Cantidad de Productos:</strong>{' '}
                        {pedido.cantidad}
                      </span>
                    </div>
                    <div className='mb-2'>
                      <span>
                        <strong>Total de Compra:</strong> $
                        {pedido.Total.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span>
                        <strong>Fecha del Pedido:</strong>{' '}
                        {new Date(pedido.Fecha_y_hora).toLocaleDateString(
                          'es-ES',
                          { day: '2-digit', month: 'long', year: 'numeric' },
                        )}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/pedidos/detalle-pedido/${pedido.id_pedido}`}
                    className='text-white no-underline'
                  >
                    <Button className='rounded px-4 py-2 text-white transition hover:bg-accent'>
                      Ver detalle de pedido
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
            {filteredPedidos.length > itemsPerPage &&
              renderPagination(filteredPedidos)}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PedidosPage;
