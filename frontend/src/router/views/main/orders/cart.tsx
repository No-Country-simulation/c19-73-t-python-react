import React, { useState, useEffect } from 'react';
import { productos } from '../../../../core/productos';
import { tiendas } from '../../../../core/tienda';
import { getPedidoDetalles } from '../../../../core/pedidoDetalle';
import { CartItem } from '../../../../core/cart_item';
import { Button } from '../../../../components/ui/button';

// Datos simulados de productos
const productosList: productos[] = [
  {
    id_producto: 23,
    id_tienda: 1,
    id_categoría: 1,
    id_fotos_galeria: "1",
    nombre_producto: 'Collar colorido',
    descripcion_producto: 'Hermoso collar hecho a mano.',
    foto_principal: 'https://i.pinimg.com/564x/0a/b4/64/0ab464705d5c9328dfd13e202e1d5fda.jpg',
    precio: '25.0',
    stock: 10,
  },
  {
    id_producto: 45,
    id_tienda: 1,
    id_categoría: 2,
    id_fotos_galeria: "2",
    nombre_producto: 'Jarrón de Cerámica',
    descripcion_producto: 'Elegante jarrón de cerámica pintado a mano.',
    foto_principal: 'https://i.pinimg.com/564x/f2/58/3f/f2583fcb4f7e614cc4773bcabdcbbd3b.jpg',
    precio: '20.0',
    stock: 5,
  },
  {
    id_producto: 67,
    id_tienda: 2,
    id_categoría: 3,
    id_fotos_galeria: "3",
    nombre_producto: 'Bolsa de Tela',
    descripcion_producto: 'Bolsa ecológica de tela con diseño exclusivo.',
    foto_principal: '/images/bolsa_de_tela.jpg',
    precio: '15.0',
    stock: 8,
  },
  {
    id_producto: 89,
    id_tienda: 2,
    id_categoría: 4,
    id_fotos_galeria: "4",
    nombre_producto: 'Juguete de Madera',
    descripcion_producto: 'Juguete artesanal de madera para niños.',
    foto_principal: '/images/juguete_de_madera.jpg',
    precio: '30.0',
    stock: 12,
  },
];

const tiendasData: tiendas[] = [
  {
    id_tienda: 1,
    id_usuario: 1,
    id_estado_tienda: 1,
    nombre_tienda: 'Artesanías del Sol',
    logo_tienda: '/images/logo_tienda1.jpg',
    descripcion: 'Tienda de artesanías hechas a mano con materiales naturales.',
    nombre_banco: 'Banco Nacional',
    tipo_cuenta_bancaria: 'Cuenta Corriente',
    numero_de_cuenta: '123-456-789',
    cci: '00123456789',
  },
  {
    id_tienda: 2,
    id_usuario: 2,
    id_estado_tienda: 1,
    nombre_tienda: 'EcoJuguetes',
    logo_tienda: '/images/logo_tienda2.jpg',
    descripcion: 'Juguetes ecológicos y sostenibles para todas las edades.',
    nombre_banco: 'Banco de la Ciudad',
    tipo_cuenta_bancaria: 'Cuenta de Ahorros',
    numero_de_cuenta: '987-654-321',
    cci: '00987654321',
  },
];

const getProductoById = async (idProducto: number): Promise<productos> => {
  return productosList.find((p) => p.id_producto === idProducto)!;
};

const Carrito: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedStore, setSelectedStore] = useState<tiendas | null>(null);
  const [pedidoId] = useState<number>(1); // Puedes obtener el id del pedido de otro lugar, si es dinámico

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulación de obtención de datos
        const pedidoDetalles = await getPedidoDetalles(pedidoId);
        const uniqueProductIds = Array.from(new Set(pedidoDetalles.map(d => d.id_producto)));
        const productosResponse = await Promise.all(
          uniqueProductIds.map(async (id) => {
            const producto = await getProductoById(id);
            const cantidad = pedidoDetalles.find(d => d.id_producto === id)?.cantidad || 0;
            return { producto, cantidad };
          })
        );
        setCartItems(productosResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [pedidoId]);

  const handleQuantityChange = (productId: number, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item =>
        item.producto.id_producto === productId
          ? { ...item, cantidad: quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.producto.id_producto !== productId)
    );
  };

  const handleViewPaymentInfo = (storeId: number) => {
    const store = tiendasData.find(tienda => tienda.id_tienda === storeId);
    setSelectedStore(store || null);
  };

  const handleConfirmOrder = () => {
    alert('Pedido confirmado');
  };

  const getTotalByStore = (storeId: number) => {
    return (cartItems.filter(item => item.producto.id_tienda === storeId) || [])
      .reduce((total, item) => total + item.cantidad * parseFloat(item.producto.precio), 0);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="lg:flex gap-6">
        <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
          {cartItems.map(item => {
            return (
              <div key={item.producto.id_producto} className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
                <img
                  src={item.producto.foto_principal}
                  alt={item.producto.nombre_producto}
                  className="w-48 h-48 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{item.producto.nombre_producto}</h3>
                  <p className="text-gray-600 mb-2 text-sm pt-4">{item.producto.descripcion_producto}</p>
                  <p className="text-gray-800 mb-2">Precio: ${item.producto.precio} c/u</p>
                  <input
                    type="number"
                    value={item.cantidad}
                    onChange={(e) => handleQuantityChange(item.producto.id_producto, parseInt(e.target.value))}
                    className="border rounded-lg px-2 py-2 mr-2"
                    min="1"
                  />
                  <p className="font-semibold pt-5"> Total:<strong> ${item.cantidad * parseFloat(item.producto.precio)}</strong></p>
                  <Button
                    onClick={() => handleRemoveItem(item.producto.id_producto)}
                    className="text-white px-4 py-2 rounded-lg hover:bg-accent mt-5"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            );
          })}
          <Button
            onClick={() => handleViewPaymentInfo(cartItems[0]?.producto.id_tienda || 0)}
            className="text-white px-4 py-2 rounded-lg hover:bg-accent"
          >
            Ver Información de Pago
          </Button>
        </div>
        <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Información de Pago</h2>
          <h4 className='-mt-4 text-sm pb-12'>Realiza la transferencia a la cuenta de banco indicada</h4>
          {selectedStore ? (
            <div className="grid grid-cols-2 gap-4 -mt-4">

              <div className="text-gray-800 text-3xl col-span-2 pb-2">{selectedStore.nombre_tienda}</div>
              <div className="text-gray-600">Banco:</div>
              <div className="text-gray-800">{selectedStore.nombre_banco}</div>
              <div className="text-gray-600">Tipo de cuenta:</div>
              <div className="text-gray-800">{selectedStore.tipo_cuenta_bancaria}</div>
              <div className="text-gray-600">Número de cuenta:</div>
              <div className="text-gray-800">{selectedStore.numero_de_cuenta}</div>
              <div className="text-gray-600">CCI:</div>
              <div className="text-gray-800">{selectedStore.cci}</div>
              <div className="text-gray-600 pt-2">Total de la compra:</div>
              <div className="text-gray-800 font-bold pt-2">${getTotalByStore(selectedStore.id_tienda)}</div>
              <h4 className='text-sm pt-12 pb-6 col-span-2'>Por favor, realiza la transferencia bancaria a los datos proporcionados.</h4>
          <h4 className='text-sm pb-6 col-span-2'>Plazo para realizar la transferencia: 48 horas</h4>
          <h4 className='text-sm pb-12 col-span-2'>Envíanos el comprobante de pago a nuestro correo: <strong>artesaniaselsol@gmail.com</strong></h4> 
          <Button
            onClick={handleConfirmOrder}
            className="text-white px-4 py-2 rounded-lg hover:bg-accent"
          >
            Confirmar Pedido
          </Button>
            </div>
          ) : (
            <p>No hay información de pago disponible</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Carrito;
