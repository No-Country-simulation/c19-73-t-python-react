import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../../../components/ui/button';
import { Card } from '../../../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../components/ui/tabs';
import { getPedidos, pedido } from '../../../../core/pedidos';

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

    return <div className='flex justify-center mt-4'>{paginationButtons}</div>;
  };

  return (
    <div className='flex flex-col items-center min-h-screen px-2 py-12'>
      <h1 className='mb-6 text-3xl font-bold'>Pedidos</h1>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className='w-full max-w-4xl'
      >
        <TabsList className='w-full mb-4 text-white bg-primary'>
          <TabsTrigger value='pendientes'>Pendientes</TabsTrigger>
          <TabsTrigger value='completados'>Completados</TabsTrigger>
          <TabsTrigger value='cancelados'>Cancelados</TabsTrigger>
        </TabsList>
        <div className='w-full max-w-4xl'>
          <TabsContent value='pendientes'>
            <div className='mb-4 space-y-4'>
              {paginate(filteredPedidos, currentPage).map((pedido) => (
                <OrdersCard
                  key={pedido.id_pedido + pedido.id_usuario}
                  id={pedido.id_pedido}
                  date={pedido.Fecha_y_hora}
                  quantity={pedido.cantidad}
                  total={pedido.Total}
                />
              ))}
            </div>
            {filteredPedidos.length > itemsPerPage &&
              renderPagination(filteredPedidos)}
          </TabsContent>
          <TabsContent value='completados'>
            <div className='mb-4 space-y-4'>
              {paginate(filteredPedidos, currentPage).map((pedido) => (
                <OrdersCard
                  key={pedido.id_pedido + pedido.id_usuario}
                  id={pedido.id_pedido}
                  date={pedido.Fecha_y_hora}
                  quantity={pedido.cantidad}
                  total={pedido.Total}
                />
              ))}
            </div>
            {filteredPedidos.length > itemsPerPage &&
              renderPagination(filteredPedidos)}
          </TabsContent>
          <TabsContent value='cancelados'>
            <div className='mb-4 space-y-4'>
              {paginate(filteredPedidos, currentPage).map((pedido) => (
                <OrdersCard
                  key={pedido.id_pedido + pedido.id_usuario}
                  id={pedido.id_pedido}
                  date={pedido.Fecha_y_hora}
                  quantity={pedido.cantidad}
                  total={pedido.Total}
                />
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

interface OrderCardProps {
  id: number;
  quantity: number;
  total: number;
  date: string;
}

const OrdersCard = ({ id, date, total, quantity }: OrderCardProps) => {
  return (
    <Card
      key={id}
      className='grid w-full grid-cols-2 gap-4 p-4 border rounded-lg shadow'
    >
      <p className='font-bold'>ID del Pedido:</p>
      <p className='my-auto'>{id}</p>
      <p className='font-bold'>Cantidad de Productos:</p>
      <p className='my-auto'>{quantity}</p>
      <p className='font-bold'>Total de Compra:</p>
      <p className='my-auto'>${total.toFixed(2)}</p>
      <p className='font-bold'>Fecha del Pedido:</p>
      <p className='my-auto'>
        {new Date(date).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </p>

      <Link to={`/orders/${id}`} className='col-span-full'>
        <Button className='w-full'>Ver detalle de pedido</Button>
      </Link>
    </Card>
  );
};
