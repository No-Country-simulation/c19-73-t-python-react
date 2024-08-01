import React, { useState, useEffect } from 'react';
import { productos } from '../../../../core/productos';
import { getTiendas, tiendas } from '../../../../core/tienda';
import { getPedidoDetalles } from '../../../../core/pedidoDetalle';
import { CartItem } from '../../../../core/cart_item';

// Datos simulados de productos
const productosList: productos[] = [
  {
    id_producto: 23,
    id_tienda: 1,
    id_categoría: 1,
    id_fotos_galeria: "1",
    nombre_producto: 'Producto A',
    descripcion_producto: 'Descripción del Producto A',
    foto_principal: '/path/to/imageA.jpg',
    precio: '25.0',
    stock: 10,
  },
  {
    id_producto: 45,
    id_tienda: 1,
    id_categoría: 2,
    id_fotos_galeria: "2",
    nombre_producto: 'Producto B',
    descripcion_producto: 'Descripción del Producto B',
    foto_principal: '/path/to/imageB.jpg',
    precio: '20.0',
    stock: 5,
  },
  {
    id_producto: 67,
    id_tienda: 2,
    id_categoría: 3,
    id_fotos_galeria: "3",
    nombre_producto: 'Producto C',
    descripcion_producto: 'Descripción del Producto C',
    foto_principal: '/path/to/imageC.jpg',
    precio: '15.0',
    stock: 8,
  },
  {
    id_producto: 89,
    id_tienda: 2,
    id_categoría: 4,
    id_fotos_galeria: "4",
    nombre_producto: 'Producto D',
    descripcion_producto: 'Descripción del Producto D',
    foto_principal: '/path/to/imageD.jpg',
    precio: '30.0',
    stock: 12,
  },
];

// Aquí se simula el obtener un producto por su ID
const getProductoById = async (idProducto: number): Promise<productos> => {
  return productosList.find((p) => p.id_producto === idProducto)!;
};

const Carrito: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [tiendasData, setTiendasData] = useState<tiendas[]>([]);
  const [selectedStore, setSelectedStore] = useState<tiendas | null>(null);
  const [pedidoId] = useState<number>(1); // Puedes obtener el id del pedido de otro lugar, si es dinámico

  useEffect(() => {
    // Simula la obtención de datos de tiendas y detalles del pedido
    const fetchData = async () => {
      const tiendasResponse = await getTiendas(); // Asegúrate de tener esta función disponible
      setTiendasData(tiendasResponse);

      const pedidoDetalles = await getPedidoDetalles(pedidoId);
      // Suponiendo que tienes una función `getProductoById` para obtener productos por ID
      const productosResponse: CartItem[] = await Promise.all(
        pedidoDetalles.map(async detalle => {
          const producto = await getProductoById(detalle.id_producto);
          return {
            producto,
            cantidad: detalle.cantidad
          };
        })
      );
      setCartItems(productosResponse);
    };
    
    fetchData();
  }, [pedidoId]);

  const handleQuantityChange = (productId: number, quantity: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.producto.id_producto === productId
          ? { ...item, cantidad: quantity }
          : item
      );
      return updatedItems;
    });
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.producto.id_producto !== productId));
  };

  const handleViewPaymentInfo = (storeId: number) => {
    const store = tiendasData.find(tienda => tienda.id_tienda === storeId);
    setSelectedStore(store || null);
  };

  const handleConfirmOrder = () => {
    // Implementa la lógica para confirmar el pedido
    alert('Pedido confirmado');
  };

  const renderCartItems = () => {
    // Agrupa los productos por tienda
    const groupedItems = cartItems.reduce<Record<number, CartItem[]>>((acc, item) => {
      if (!acc[item.producto.id_tienda]) {
        acc[item.producto.id_tienda] = [];
      }
      acc[item.producto.id_tienda].push(item);
      return acc;
    }, {});

    return Object.entries(groupedItems).map(([storeId, items]) => {
      const store = tiendasData.find(tienda => tienda.id_tienda === parseInt(storeId));
      const storeTotal = items.reduce((total, item) => total + item.cantidad * parseFloat(item.producto.precio), 0);

      return (
        <div key={storeId} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">{store?.nombre_tienda || 'Tienda Desconocida'}</h2>
          {items.map(item => (
            <div key={item.producto.id_producto} className="bg-gray-100 p-4 rounded-lg mb-4 flex items-center">
              <img
                src={item.producto.foto_principal}
                alt={item.producto.nombre_producto}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{item.producto.nombre_producto}</h3>
                <p className="text-gray-600 mb-2">{item.producto.descripcion_producto}</p>
                <p className="text-gray-800 mb-2">Precio: ${item.producto.precio}</p>
                <input
                  type="number"
                  value={item.cantidad}
                  onChange={(e) => handleQuantityChange(item.producto.id_producto, parseInt(e.target.value))}
                  className="border rounded-lg px-2 py-1 mr-2"
                  min="1"
                />
                <p className="font-semibold">Total: ${item.cantidad * parseFloat(item.producto.precio)}</p>
                <button
                  onClick={() => handleRemoveItem(item.producto.id_producto)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => handleViewPaymentInfo(parseInt(storeId))}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Ver Información de Pago
          </button>
          <p className="font-semibold mt-2">Total de Compra: ${storeTotal.toFixed(2)}</p>
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="lg:flex gap-6">
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
          {renderCartItems()}
        </div>
        <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Información de Pago</h2>
          {selectedStore ? (
            <>
              <div className="mb-2">
                <p className="font-medium">Nombre del Banco:</p>
                <p className="text-gray-600">{selectedStore.nombre_banco}</p>
              </div>
              <div className="mb-2">
                <p className="font-medium">Tipo de Cuenta:</p>
                <p className="text-gray-600">{selectedStore.tipo_cuenta_bancaria}</p>
              </div>
              <div className="mb-2">
                <p className="font-medium">Número de Cuenta:</p>
                <p className="text-gray-600">{selectedStore.numero_de_cuenta}</p>
              </div>
              <div className="mb-4">
                <p className="font-medium">CCI:</p>
                <p className="text-gray-600">{selectedStore.cci}</p>
              </div>
              <button
                onClick={handleConfirmOrder}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Confirmar Pedido
              </button>
            </>
          ) : (
            <p>No hay información de pago disponible</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carrito;
