import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Aviso de Privacidad</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Información General</h2>
        <p><strong>Nombre del sitio</strong>: Inspirarte</p>
        <p><strong>Correo de contacto</strong>: storeinspirarte@gmail.com</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Recopilación de Datos</h2>
        <p>En Inspirarte, recopilamos y utilizamos tus datos personales para ofrecerte nuestros servicios y mejorar tu experiencia de usuario. Los datos que recopilamos incluyen:</p>
        <ul className="list-disc pl-6">
          <li>Información de contacto, como nombre, correo electrónico y número de teléfono.</li>
          <li>Datos de pago, como detalles de tarjetas de crédito o cuentas bancarias.</li>
          <li>Información de uso, como tus interacciones con nuestra plataforma.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Uso de los Datos</h2>
        <p>Utilizamos tus datos personales para:</p>
        <ul className="list-disc pl-6">
          <li>Proveer y mejorar nuestros servicios.</li>
          <li>Procesar tus transacciones y pedidos.</li>
          <li>Comunicarnos contigo sobre tus pedidos y nuestras promociones.</li>
          <li>Personalizar tu experiencia en nuestro sitio.</li>
          <li>Cumplir con nuestras obligaciones legales y regulatorias.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Protección de Datos</h2>
        <p>En Inspirarte, tomamos medidas de seguridad razonables para proteger tus datos personales contra accesos no autorizados, alteraciones, divulgaciones o destrucciones. Utilizamos tecnologías de encriptación y otros procedimientos de seguridad para garantizar la confidencialidad de tus datos.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Compartición de Datos</h2>
        <p>No compartimos tus datos personales con terceros, excepto en las siguientes circunstancias:</p>
        <ul className="list-disc pl-6">
          <li>Con proveedores de servicios que nos ayudan a operar nuestro sitio y ofrecer nuestros servicios.</li>
          <li>Cuando es necesario para cumplir con nuestras obligaciones legales.</li>
          <li>En caso de una transacción corporativa, como una fusión o adquisición.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Derechos del Usuario</h2>
        <p>Como usuario, tienes derecho a:</p>
        <ul className="list-disc pl-6">
          <li>Acceder a tus datos personales que tenemos almacenados.</li>
          <li>Solicitar la corrección de cualquier dato inexacto.</li>
          <li>Solicitar la eliminación de tus datos personales, cuando sea aplicable.</li>
          <li>Oponerte al procesamiento de tus datos personales en ciertas circunstancias.</li>
        </ul>
        <p>Para ejercer estos derechos, por favor contacta con nosotros en storeinspirarte@gmail.com.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Cookies y Tecnologías Similares</h2>
        <p>Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio, analizar el uso del mismo y ofrecerte publicidad personalizada. Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar tu capacidad de usar ciertas funciones de nuestro sitio.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Cambios en el Aviso de Privacidad</h2>
        <p>Nos reservamos el derecho de modificar este aviso de privacidad en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en nuestro sitio. Te recomendamos revisar este aviso de privacidad periódicamente para estar informado sobre cómo protegemos tus datos.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Contacto</h2>
        <p>Si tienes alguna pregunta o inquietud sobre este aviso de privacidad, por favor contáctanos en storeinspirarte@gmail.com.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
