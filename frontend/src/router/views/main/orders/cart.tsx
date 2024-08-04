import React, { useEffect, useState } from 'react';

import { Button } from '../../../../components/ui/button';
import { CartItem } from '../../../../core/cart_item';
import { getPedidoDetalles } from '../../../../core/pedidoDetalle';
import { productos } from '../../../../core/productos';
import { tiendas } from '../../../../core/tienda';

// Datos simulados de productos
const productosList: productos[] = [
  {
    id_producto: 23,
    id_tienda: 1,
    id_categoría: 1,
    id_fotos_galeria: '1',
    nombre_producto: 'Collar colorido',
    descripcion_producto: 'Hermoso collar hecho a mano.',
    foto_principal:
      'https://i.pinimg.com/564x/0a/b4/64/0ab464705d5c9328dfd13e202e1d5fda.jpg',
    precio: '25.0',
    stock: 10,
  },
  {
    id_producto: 45,
    id_tienda: 1,
    id_categoría: 2,
    id_fotos_galeria: '2',
    nombre_producto: 'Jarrón de Cerámica',
    descripcion_producto: 'Elegante jarrón de cerámica pintado a mano.',
    foto_principal:
      'https://i.pinimg.com/564x/f2/58/3f/f2583fcb4f7e614cc4773bcabdcbbd3b.jpg',
    precio: '20.0',
    stock: 5,
  },
  {
    id_producto: 67,
    id_tienda: 2,
    id_categoría: 3,
    id_fotos_galeria: '3',
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
    id_fotos_galeria: '4',
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
        const uniqueProductIds = Array.from(
          new Set(pedidoDetalles.map((d) => d.id_producto)),
        );
        const productosResponse = await Promise.all(
          uniqueProductIds.map(async (id) => {
            const producto = await getProductoById(id);
            const cantidad =
              pedidoDetalles.find((d) => d.id_producto === id)?.cantidad || 0;
            return { producto, cantidad };
          }),
        );
        setCartItems(productosResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [pedidoId]);

  const handleViewPaymentInfo = (storeId: number) => {
    const store = tiendasData.find((tienda) => tienda.id_tienda === storeId);
    setSelectedStore(store || null);
  };

  const handleConfirmOrder = () => {
    alert('Pedido confirmado');
  };

  const getTotalByStore = (storeId: number) => {
    return (
      cartItems.filter((item) => item.producto.id_tienda === storeId) || []
    ).reduce(
      (total, item) => total + item.cantidad * parseFloat(item.producto.precio),
      0,
    );
  };

  return (
    <div className='container p-6 mx-auto'>
      <div className='gap-6 md:flex'>
        <div className='p-6 bg-white rounded-lg shadow-md lg:w-2/3'>
          <h2 className='mb-4 text-2xl font-bold'>Carrito de Compras</h2>
          {cartItems.map((item, i) => (
            <CartProduct
              key={`${item.cantidad} ${item.producto} ${i}`}
              {...item}
            />
          ))}
          <Button
            onClick={() =>
              handleViewPaymentInfo(cartItems[0]?.producto.id_tienda || 0)
            }
            className='px-4 py-2 text-white rounded-lg hover:bg-accent'
          >
            Ver Información de Pago
          </Button>
        </div>
        <div className='p-6 bg-white rounded-lg shadow-md lg:w-1/3'>
          <h2 className='mb-4 text-2xl font-bold'>Información de Pago</h2>
          <h4 className='pb-12 -mt-4 text-sm'>
            Realiza la transferencia a la cuenta de banco indicada
          </h4>
          {selectedStore ? (
            <div className='grid grid-cols-2 gap-4 -mt-4'>
              <div className='col-span-2 pb-2 text-3xl text-gray-800'>
                {selectedStore.nombre_tienda}
              </div>
              <div className='text-gray-600'>Banco:</div>
              <div className='text-gray-800'>{selectedStore.nombre_banco}</div>
              <div className='text-gray-600'>Tipo de cuenta:</div>
              <div className='text-gray-800'>
                {selectedStore.tipo_cuenta_bancaria}
              </div>
              <div className='text-gray-600'>Número de cuenta:</div>
              <div className='text-gray-800'>
                {selectedStore.numero_de_cuenta}
              </div>
              <div className='text-gray-600'>CCI:</div>
              <div className='text-gray-800'>{selectedStore.cci}</div>
              <div className='pt-2 text-gray-600'>Total de la compra:</div>
              <div className='pt-2 font-bold text-gray-800'>
                ${getTotalByStore(selectedStore.id_tienda)}
              </div>
              <h4 className='col-span-2 pt-12 pb-6 text-sm'>
                Por favor, realiza la transferencia bancaria a los datos
                proporcionados.
              </h4>
              <h4 className='col-span-2 pb-6 text-sm'>
                Plazo para realizar la transferencia: 48 horas
              </h4>
              <h4 className='col-span-2 pb-12 text-sm'>
                Envíanos el comprobante de pago a nuestro correo:{' '}
                <strong>artesaniaselsol@gmail.com</strong>
              </h4>
              <Button
                onClick={handleConfirmOrder}
                className='px-4 py-2 text-white rounded-lg hover:bg-accent'
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

export const CartProduct = (
  item: CartItem,
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
) => {
  const handleQuantityChange = (productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.producto.id_producto === productId
          ? { ...item, cantidad: quantity }
          : item,
      ),
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.producto.id_producto !== productId),
    );
  };

  return (
    <div
      key={item.producto.id_producto}
      className='flex flex-col items-center p-4 mb-4 bg-white rounded-lg shadow-md sm:flex-row'
    >
      <img
        src={item.producto.foto_principal}
        alt={item.producto.nombre_producto}
        className='object-cover w-48 h-48 mr-4 rounded-lg'
      />
      <div className='flex-1'>
        <h3 className='mb-1 text-xl font-semibold'>
          {item.producto.nombre_producto}
        </h3>
        <p className='pt-4 mb-2 text-sm text-gray-600'>
          {item.producto.descripcion_producto}
        </p>
        <p className='mb-2 text-gray-800'>
          Precio: ${item.producto.precio} c/u
        </p>
        <input
          type='number'
          value={item.cantidad}
          onChange={(e) =>
            handleQuantityChange(
              item.producto.id_producto,
              parseInt(e.target.value),
            )
          }
          className='px-2 py-2 mr-2 border rounded-lg'
          min='1'
        />
        <p className='pt-5 font-semibold'>
          {' '}
          Total:
          <strong> ${item.cantidad * parseFloat(item.producto.precio)}</strong>
        </p>
        <Button
          onClick={() => handleRemoveItem(item.producto.id_producto)}
          className='px-4 py-2 mt-5 text-white rounded-lg hover:bg-accent'
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};
