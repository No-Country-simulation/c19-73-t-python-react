import React from 'react';
import banner from "../../../assets/images/banner/banner-aboutus.jpg";
import ourhistory from "../../../assets/images/aboutus/ourhistory.jpg";
import mision from "../../../assets/images/aboutus/mision.jpg";
import vision from "../../../assets/images/aboutus/vision.jpg";

const colaboradores = [
  {
    nombre: "Colaborador 1",
    ambito: "Desarrollo",
    foto: "ruta_a_la_foto_colaborador_1",
    linkedin: "https://www.linkedin.com/in/colaborador1/"
  },
  {
    nombre: "Colaborador 2",
    ambito: "Diseño",
    foto: "ruta_a_la_foto_colaborador_2",
    linkedin: "https://www.linkedin.com/in/colaborador2/"
  },
  {
    nombre: "Colaborador 3",
    ambito: "Marketing",
    foto: "ruta_a_la_foto_colaborador_3",
    linkedin: "https://www.linkedin.com/in/colaborador3/"
  },
  {
    nombre: "Colaborador 4",
    ambito: "Ventas",
    foto: "ruta_a_la_foto_colaborador_4",
    linkedin: "https://www.linkedin.com/in/colaborador4/"
  },
  {
    nombre: "Colaborador 5",
    ambito: "Soporte",
    foto: "ruta_a_la_foto_colaborador_5",
    linkedin: "https://www.linkedin.com/in/colaborador5/"
  },
  {
    nombre: "Colaborador 6",
    ambito: "Logística",
    foto: "ruta_a_la_foto_colaborador_6",
    linkedin: "https://www.linkedin.com/in/colaborador6/"
  }
];

const AboutUsPage: React.FC = () => {
  return (
    <div className=''>
      {/* Banner */}
      <div className='relative mb-8 bg-gray-800'>
        <img
          src={banner}
          alt='Banner'
          className='w-full h-80 object-cover'
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-black'>
          <h1 className='mb-2 text-4xl font-bold'>¿Quiénes Somos?</h1>
          <p className='text-xl'>Conoce más sobre nuestra historia y misión.</p>
        </div>
      </div>

      {/* Sección de Historia */}
      <section className='mb-12 px-24'>
        <div className='flex flex-col md:flex-row items-center'>
          <div className='md:w-1/2 md:pr-6'>
            <img
              src={ourhistory}
              alt='Historia'
              className='w-full h-60 object-cover mb-6 md:mb-0'
            />
          </div>
          <div className='md:w-1/2'>
            <h2 className='text-3xl font-bold mb-4'>Nuestra Historia</h2>
            <p className='text-lg'>
              Fundada en 2020, nuestra empresa ha crecido rápidamente para convertirse en un referente en el mercado de artesanías. Desde nuestros humildes comienzos, hemos trabajado con artesanos locales para ofrecer productos únicos y de alta calidad. Nuestra pasión por la artesanía y el compromiso con nuestros clientes nos ha permitido expandirnos y ofrecer una experiencia de compra inigualable.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Misión y Visión */}
      <section className='mb-12 px-24'>
        <div className='flex flex-col md:flex-row items-center'>
          <div className='md:w-1/2 md:pr-6'>
            <h2 className='text-3xl font-bold mb-4'>Misión</h2>
            <p className='text-lg'>
              Nuestra misión es conectar a los artesanos locales con un mercado global, proporcionando una plataforma donde puedan exhibir y vender sus productos únicos. Nos esforzamos por ofrecer una experiencia de compra excepcional y fomentar el aprecio por las artesanías tradicionales.
            </p>
          </div>
          <div className='md:w-1/2'>
            <img
              src={mision}
              alt='Misión'
              className='w-full h-60 object-cover'
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center mt-12'>
          <div className='md:w-1/2 md:pr-6'>
            <img
              src={vision}
              alt='Visión'
              className='w-full h-60 object-cover'
            />
          </div>
          <div className='md:w-1/2'>
            <h2 className='text-3xl font-bold mb-4'>Visión</h2>
            <p className='text-lg'>
              Aspiramos a ser la plataforma líder en la promoción y venta de artesanías a nivel mundial. Queremos apoyar a los artesanos en el desarrollo de sus negocios y contribuir al reconocimiento global de su talento y creatividad.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className='px-24 mb-12'>
        <h2 className='text-3xl font-bold mb-4'>Contáctanos</h2>
        <p className='text-lg mb-4'>
          Si tienes alguna pregunta o deseas saber más sobre nosotros, no dudes en ponerte en contacto con nosotros a través de este correo <strong> storeinspirarte@gmail.com</strong></p>
      </section>

      {/* Sección de Colaboradores */}
      <section className='px-24 mb-12'>
        <h2 className='text-3xl font-bold mb-8'>Nuestro Equipo</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {colaboradores.map((colaborador, index) => (
            <div key={index} className='flex flex-col items-center'>
              <img
                src={colaborador.foto}
                alt={colaborador.nombre}
                className='w-32 h-32 object-cover rounded-full mb-4'
              />
              <h3 className='text-xl font-bold mb-2'>{colaborador.nombre}</h3>
              <p className='text-lg mb-2'>{colaborador.ambito}</p>
              <a href={colaborador.linkedin} className='text-blue-500 hover:underline'>
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
