import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'; // Importa los íconos de lucide-react

export const Footer = () => {
  return (
    <footer className="bg-accent text-gray-800 p-8 shadow-md border-t-2 border-primary">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 1era Columna: Acerca de Nosotros */}
        <div>
          <h3 className="text-xl font-bold mb-4">Acerca de Nosotros</h3>
          <ul>
            <li>
              <a href="/aboutUs" className="hover:underline">
                Quiénes Somos
              </a>
            </li>
            <li>
              <a href="/faqs" className="hover:underline">
                Preguntas Frecuentes
              </a>
            </li>
          </ul>
        </div>

        {/* 2da Columna: Política de Cookies */}
        <div>
          <h3 className="text-xl font-bold mb-4">Política de Cookies</h3>
          <ul>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacidad
              </a>
            </li>
            <li>
              <a href="/terms-and-conditions" className="hover:underline">
                Términos y Condiciones
              </a>
            </li>
          </ul>
        </div>

        {/* 3era Columna: Categorías */}
        <div>
          <h3 className="text-xl font-bold mb-4">Categorías</h3>
          <div className="grid grid-cols-2 gap-4">
            <ul>
              <li>
              <button
                onClick={() => (window.location.href = `/categoryproduct/1`)} 
                className="hover:underline  text-left">
                  Joyería
                </button>
              </li>
              <li>
              <button
                onClick={() => (window.location.href = `/categoryproduct/2`)} 
                className="hover:underline  text-left">
                  Decoración para el Hogar
                </button>
              </li>
              <li>
              <button
                onClick={() => (window.location.href = `/categoryproduct/3`)} 
                className="hover:underline  text-left">
                  Ropa y Accesorios
                </button>
              </li>
              <li>
              <button
                onClick={() => (window.location.href = `/categoryproduct/4`)} 
                className="hover:underline  text-left">
                  Papelería y Artículos de Oficina
                </button>
              </li>
            </ul>
            <ul>
              <li>
                <button
                onClick={() => (window.location.href = `/categoryproduct/5`)} 
                className="hover:underline  text-left">
                  Juguetes y Juegos
                </button>
              </li>
              <li>
              <button
                onClick={() => (window.location.href = `/categoryproduct/6`)} 
                className="hover:underline  text-left">
                  Productos Ecológicos
                </button>
              </li>
              <li>
              <button
                onClick={() => (window.location.href = `/categoryproduct/7`)} 
                className="hover:underline  text-left">
                  Cerámica y Vidrio
                </button>
              </li>
              <li>
              <button
                onClick={() => (window.location.href = `/categoryproduct/8`)} 
                className="hover:underline  text-left">
                  Cosmética y Perfumería
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 4ta Columna: Únete a la Comunidad */}
        <div>
          <h3 className="text-xl font-bold mb-4">Únete a la Comunidad</h3>
          <div className="flex space-x-4">
            <Link to="https://facebook.com" className="hover:text-gray-400">
              <Facebook size={24} />
            </Link>
            <Link to="https://twitter.com" className="hover:text-gray-400">
              <Twitter size={24} />
            </Link>
            <Link to="https://instagram.com" className="hover:text-gray-400">
              <Instagram size={24} />
            </Link>
            <Link to="https://linkedin.com" className="hover:text-gray-400">
              <Linkedin size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
