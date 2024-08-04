import React from 'react';

const FAQs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Preguntas Frecuentes</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. ¿Qué es Inspirarte?</h2>
        <p>Inspirarte es una plataforma que ofrece alojamiento a tiendas de artesanías para que puedan vender sus productos de manera fácil y sencilla. También permite a los compradores adquirir productos artesanales innovadores, hermosos y hechos a mano.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. ¿Cómo puedo crear una tienda en Inspirarte?</h2>
        <p>Para crear una tienda en Inspirarte, primero debes registrarte como usuario vendedor. Una vez registrado, puedes seguir las instrucciones en la sección de "Gestión de tienda" para configurar tu tienda, agregar productos y empezar a vender.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. ¿Qué métodos de pago se aceptan?</h2>
        <p>Los pagos se realizan mediante transferencias bancarias directas a la tienda. Para que el pedido sea procesado, debes enviar el comprobante de pago al correo electrónico que muestra la tienda.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. ¿Cómo funcionan las devoluciones y reembolsos?</h2>
        <p>Las devoluciones y reembolsos son responsabilidad de la tienda a la que adquiriste el producto. Si has tenido un problema mayor o consideras que has sido estafado, por favor infórmanos a través de nuestro correo electrónico con el asunto "ESTAFA TIENDA" y será atendido de manera urgente.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. ¿Cómo puedo contactar al soporte de Inspirarte?</h2>
        <p>Puedes contactar al soporte de Inspirarte enviando un correo electrónico a storeinspirarte@gmail.com. Nos esforzamos por responder a todas las consultas lo más rápido posible.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. ¿Puedo cancelar un pedido?</h2>
        <p>Como comprador, puedes solicitar la cancelación de un pedido si aún no ha sido procesado. Debes contactar directamente a la tienda para gestionar la cancelación. Los vendedores también pueden cancelar pedidos en caso de falta de stock o si el pago no ha sido realizado.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. ¿Es seguro comprar en Inspirarte?</h2>
        <p>En Inspirarte, tomamos medidas de seguridad para proteger tus datos personales y garantizar una experiencia de compra segura. Sin embargo, siempre recomendamos a los compradores que verifiquen las tiendas y los productos antes de realizar una compra.</p>
      </section>
    </div>
  );
};

export default FAQs;
