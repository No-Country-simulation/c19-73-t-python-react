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
              <Link to="/about" className="hover:underline">
                Quiénes Somos
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline">
                Preguntas Frecuentes
              </Link>
            </li>
          </ul>
        </div>

        {/* 2da Columna: Política de Cookies */}
        <div>
          <h3 className="text-xl font-bold mb-4">Política de Cookies</h3>
          <ul>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacidad
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline">
                Términos y Condiciones
              </Link>
            </li>
          </ul>
        </div>

        {/* 3era Columna: Categorías */}
        <div>
          <h3 className="text-xl font-bold mb-4">Categorías</h3>
          <div className="grid grid-cols-2 gap-4">
            <ul>
              <li>
                <Link to="/category/jewelry" className="hover:underline">
                  Joyería
                </Link>
              </li>
              <li>
                <Link to="/category/home-decor" className="hover:underline">
                  Decoración para el Hogar
                </Link>
              </li>
              <li>
                <Link to="/category/clothing" className="hover:underline">
                  Ropa y Accesorios
                </Link>
              </li>
              <li>
                <Link to="/category/stationery" className="hover:underline">
                  Papelería y Artículos de Oficina
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/category/toys" className="hover:underline">
                  Juguetes y Juegos
                </Link>
              </li>
              <li>
                <Link to="/category/eco-products" className="hover:underline">
                  Productos Ecológicos
                </Link>
              </li>
              <li>
                <Link to="/category/ceramics" className="hover:underline">
                  Cerámica y Vidrio
                </Link>
              </li>
              <li>
                <Link to="/category/cosmetics" className="hover:underline">
                  Cosmética y Perfumería
                </Link>
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
