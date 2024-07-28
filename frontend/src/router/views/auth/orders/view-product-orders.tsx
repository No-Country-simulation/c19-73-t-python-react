import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pedido, getPedidos } from '../../../../core/pedidos';
import { pedidoDetalle, getPedidoDetalles } from '../../../../core/pedidoDetalle';
import { productos, getProductoById } from '../../../../core/productos';
import { Card } from '../../../../components/ui/card';
import { tiendas, getTiendas } from '../../../../core/tienda';

const PedidoDetallePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pedido, setPedido] = useState<pedido | null>(null);
  const [pedidoDetalles, setPedidoDetalles] = useState<pedidoDetalle[]>([]);
  const [productos, setProductos] = useState<productos[]>([]);
  const [tiendas, setTiendas] = useState<tiendas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPedidoDetalles = async () => {
      try {
        const [pedidoData, tiendasData] = await Promise.all([getPedidos(), getTiendas()]);
        const pedido = pedidoData.find(p => p.id_pedido === Number(id));
        setPedido(pedido || null);
        setTiendas(tiendasData);

        if (pedido) {
          const detalles = await getPedidoDetalles(pedido.id_pedido);
          setPedidoDetalles(detalles);

          const productosPromises = detalles.map(detalle =>
            getProductoById(detalle.id_producto)
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
    <div className="flex flex-col items-center py-12 px-6">
      <h1 className="text-3xl mb-6">Detalle del Pedido #{pedido.id_pedido}</h1>
      <div className="w-full max-w-4xl space-y-4">
        {pedidoDetalles.map(detalle => {
          const producto = productos.find(p => p.id_producto === detalle.id_producto);
          const tienda = tiendas.find(t => t.id_tienda === producto?.id_tienda);

          if (!producto || !tienda) return null;

          return (
            <Card key={detalle.id_producto} className="p-4 border rounded-lg shadow flex items-center">
              <img
                src={producto.foto_principal}
                alt={producto.nombre_producto}
                className="w-32 h-32 object-cover mr-4"
              />
              <div className="flex-grow">
                <div className="mb-2">
                  <span><strong>Nombre del Producto:</strong> {producto.nombre_producto}</span>
                </div>
                <div className="mb-2">
                  <span><strong>Detalle del Producto:</strong> {producto.descripcion_producto}</span>
                </div>
                <div className="mb-2">
                  <span><strong>Vendido por:</strong> {tienda.nombre_tienda}</span>
                </div>
                <div className="mb-2">
                  <span><strong>Precio Unitario:</strong> ${producto.precio}</span>
                </div>
                <div className="mb-2">
                  <span><strong>Cantidad:</strong> {detalle.cantidad}</span>
                </div>
                <div className="mb-2">
                  <span><strong>Total:</strong> ${detalle.total}</span>
                </div>
                <div className="mb-2">
                  <span><strong>Fecha del Pedido:</strong> {new Date(pedido.Fecha_y_hora).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PedidoDetallePage;
