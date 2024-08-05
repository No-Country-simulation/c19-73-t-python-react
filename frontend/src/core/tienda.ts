import arte_tradicion from "../assets/images/stores/ARTE Y TRADICION.jpg";
import creaciones_naturales from "../assets/images/stores/CREACIONES NATURALES.jpg";
import manos_creativas from "../assets/images/stores/MANOS CREATIVAS.jpg";
import raices_artesanales from "../assets/images/stores/RAICES ARTESANALES.jpg";
import tesoros_artesanales from "../assets/images/stores/TESOROS ARTESANALES.jpg";
export type tiendas = {
  id_tienda: number;
  id_usuario: number;
  id_estado_tienda: number;
  nombre_tienda: string;
  logo_tienda: string;
  descripcion: string;
  nombre_banco: string;
  tipo_cuenta_bancaria: string;
  numero_de_cuenta: string;
  cci: string;
};

const tiendasData: tiendas[] = [
    {
      id_tienda: 1,
      id_usuario: 1,
      id_estado_tienda: 1,
      nombre_tienda: 'Arte y Tradición',
      logo_tienda: arte_tradicion,
      descripcion: 'Nuestra tienda ofrece una selección única de artesanías hechas a mano, destacando la habilidad y el talento de los artesanos locales. Cada pieza cuenta una historia y refleja el amor por la tradición y el arte.',
      nombre_banco: 'Banco Tradición',
      tipo_cuenta_bancaria: 'Ahorro',
      numero_de_cuenta: '1234567890',
      cci: '001234567890',
    },
    {
      id_tienda: 2,
      id_usuario: 2,
      id_estado_tienda: 1,
      nombre_tienda: 'Creaciones Naturales',
      logo_tienda: creaciones_naturales,
      descripcion: 'Descubre la belleza de lo natural en nuestra tienda. Ofrecemos productos artesanales hechos con materiales sostenibles y técnicas tradicionales que han sido transmitidas de generación en generación.',
      nombre_banco: 'Banco Natural',
      tipo_cuenta_bancaria: 'Corriente',
      numero_de_cuenta: '0987654321',
      cci: '009876543210',
    },
    {
      id_tienda: 3,
      id_usuario: 3,
      id_estado_tienda: 1,
      nombre_tienda: 'Manos Creativas',
      logo_tienda: manos_creativas,
      descripcion: 'En Manos Creativas, encontrarás artesanías que son verdaderas obras de arte. Cada artículo es cuidadosamente elaborado a mano, asegurando la más alta calidad y originalidad. Ideal para aquellos que buscan piezas únicas.',
      nombre_banco: 'Banco Creativo',
      tipo_cuenta_bancaria: 'Ahorro',
      numero_de_cuenta: '4561237890',
      cci: '004561237890',
    },
    {
      id_tienda: 4,
      id_usuario: 4,
      id_estado_tienda: 1,
      nombre_tienda: 'Tesoros Artesanales',
      logo_tienda: tesoros_artesanales,
      descripcion: 'Nuestra misión es preservar y compartir las técnicas artesanales tradicionales. En Tesoros Artesanales, cada pieza es un testimonio de la dedicación y la maestría de los artesanos. Ven y descubre tesoros únicos que enriquecerán tu vida.',
      nombre_banco: 'Banco Tesoros',
      tipo_cuenta_bancaria: 'Corriente',
      numero_de_cuenta: '7894561230',
      cci: '007894561230',
    },
    {
      id_tienda: 5,
      id_usuario: 5,
      id_estado_tienda: 1,
      nombre_tienda: 'Raíces Ancestrales',
      logo_tienda: raices_artesanales,
      descripcion: 'En Raíces Ancestrales, celebramos la rica herencia de las artesanías tradicionales. Nuestros productos son elaborados a mano con técnicas ancestrales, ofreciendo una conexión auténtica con el pasado y una belleza atemporal.',
      nombre_banco: 'Banco Ancestral',
      tipo_cuenta_bancaria: 'Ahorro',
      numero_de_cuenta: '3216549870',
      cci: '009321654987',
    },
  
];

export async function getTiendas(): Promise<tiendas[]> {
  // Simular una llamada a una API con una promesa
  return new Promise((resolve) => {
    setTimeout(() => resolve(tiendasData), 100);
  });
}


