import React from 'react';
import banner from "../../../assets/images/banner/banner-aboutus.jpg";
import ourhistory from "../../../assets/images/aboutus/ourhistory.jpg";
import mision from "../../../assets/images/aboutus/mision.jpg";
import vision from "../../../assets/images/aboutus/vision.jpg";

const AboutUsPage: React.FC = () => {
  return (
    <div className=''>
      {/* Banner */}
      <div className='relative mb-8 bg-gray-800'>
        <img
          src={banner}// Cambia esto a la ruta de tu imagen de banner
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
              src={ourhistory} // Cambia esto a la ruta de tu imagen de historia
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
              src={mision} // Cambia esto a la ruta de tu imagen de misión
              alt='Misión'
              className='w-full h-60 object-cover'
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center mt-12'>
          <div className='md:w-1/2 md:pr-6'>
            <img
              src={vision} // Cambia esto a la ruta de tu imagen de visión
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
      <section className='px-24'>
        <h2 className='text-3xl font-bold mb-4'>Contáctanos</h2>
        <p className='text-lg mb-4'>
          Si tienes alguna pregunta o deseas saber más sobre nosotros, no dudes en ponerte en contacto con nosotros a través de este correo <strong> storeinspirarte@gmail.com</strong></p>
      </section>
    </div>
  );
};

export default AboutUsPage;
