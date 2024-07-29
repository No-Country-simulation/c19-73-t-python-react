import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import {
  getPedidoDetalles,
  pedidoDetalle,
} from '../../../core/pedidoDetalle';
import { getPedidos, pedido } from '../../../core/pedidos';
import { getProductoById, productos } from '../../../core/productos';
import { getTiendas, tiendas } from '../../../core/tienda';

const PedidoDetallePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pedido, setPedido] = useState<pedido | null>(null);
  const [pedidoDetalles, setPedidoDetalles] = useState<pedidoDetalle[]>([]);
  const [productos, setProductos] = useState<productos[]>([]);
  const [tiendas, setTiendas] = useState<tiendas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchPedidoDetalles = async () => {
      try {
        const [pedidoData, tiendasData] = await Promise.all([
          getPedidos(),
          getTiendas(),
        ]);
        const pedido = pedidoData.find((p) => p.id_pedido === Number(id));
        setPedido(pedido || null);
        setTiendas(tiendasData);

        if (pedido) {
          const detalles = await getPedidoDetalles(pedido.id_pedido);
          setPedidoDetalles(detalles);

          const productosPromises = detalles.map((detalle) =>
            getProductoById(detalle.id_producto),
          );
          const productos = await Promise.all(productosPromises);
          setProductos(productos);
        }
      } catch (e) {
        setError('Error al cargar los detalles del pedido.');
      } finally {
        setLoading(false);
      }
    };

    fetchPedidoDetalles();
  }, [id]);

  const paginate = (array: pedidoDetalle[], page: number): pedidoDetalle[] => {
    return array.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  };

  const totalPages = (array: pedidoDetalle[]): number => {
    return Math.ceil(array.length / itemsPerPage);
  };

  const renderPagination = (array: pedidoDetalle[]): JSX.Element => {
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

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!pedido) {
    return <div>Pedido no encontrado.</div>;
  }

  return (
    <div className='flex flex-col items-center px-6 py-24'>
      <h1 className='mb-6 mt-12 text-3xl'>
        Detalle del Pedido #{pedido.id_pedido}
      </h1>
      <div className='w-full max-w-4xl space-y-4'>
        {paginate(pedidoDetalles, currentPage).map((detalle) => {
          const producto = productos.find(
            (p) => p.id_producto === detalle.id_producto,
          );
          const tienda = tiendas.find(
            (t) => t.id_tienda === producto?.id_tienda,
          );

          if (!producto || !tienda) return null;

          return (
            <Card
              key={detalle.id_producto}
              className='flex items-center rounded-lg border p-4 shadow'
            >
              <img
                src={producto.foto_principal}
                alt={producto.nombre_producto}
                className='mr-4 h-40 w-40 object-cover'
              />
             <div className="flex-grow">
                <div className="mb-2">
                  <span className='text-2xl'>{producto.nombre_producto}</span>
                </div>
                <div className="mb-2">
                  <span>{producto.descripcion_producto}</span>
                </div>
                <div className="mb-2">
                  <span>${producto.precio} c/u</span>
                </div>
                <div className="mb-2 text-xs">
                  <span><strong>Vendido por:</strong> {tienda.nombre_tienda}</span>
                </div>
                <div className="mb-2 text-xs">
                  <span><strong>Cantidad solicitada:</strong> {detalle.cantidad}</span>
                </div>
                <div className="mb-2 text-xs">
                  <span><strong>Total:</strong> ${detalle.total}</span>
                </div>
              </div>
            </Card>
          );
        })}
        {pedidoDetalles.length > itemsPerPage &&
          renderPagination(pedidoDetalles)}
      </div>
    </div>
  );
};

export default PedidoDetallePage;
