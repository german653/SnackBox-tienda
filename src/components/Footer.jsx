// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo-snackbox.png'; // Asegúrate que la ruta al logo es correcta

const Footer = () => {
  return (
    <footer className="bg-snackbox-primary text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Columna 1: Logo y Marca */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              {/* --- LÍNEA MODIFICADA --- */}
              <img 
                src={logo} 
                alt="SnackBox Logo" 
                className="w-14 h-14 rounded-full object-cover" // Clases para hacerlo circular
              />
              <span className="text-3xl font-bold text-snackbox-white">SnackBox</span>
            </Link>
            <p className="text-sm text-gray-300 max-w-xs">
              Tu pausa perfecta con los mejores juguitos, alfajores y más.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="text-lg font-bold mb-4 tracking-wider uppercase">Navegación</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-snackbox-secondary transition-colors">Inicio</Link></li>
              <li><Link to="/productos" className="text-gray-300 hover:text-snackbox-secondary transition-colors">Productos</Link></li>
              <li><Link to="/sobre-nosotros" className="text-gray-300 hover:text-snackbox-secondary transition-colors">Sobre Nosotros</Link></li>
            </ul>
          </div>

          {/* Columna 3: Redes Sociales */}
          <div>
            <h4 className="text-lg font-bold mb-4 tracking-wider uppercase">Síguenos</h4>
            <div className="flex justify-center md:justify-start space-x-6 text-2xl">
              <a href="https://www.instagram.com/german__oviedo/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-snackbox-secondary transition-transform hover:scale-110">
                <FaInstagram />
              </a>
              <a href="https://wa.me/+5493513427543" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-snackbox-secondary transition-transform hover:scale-110">
                <FaWhatsapp />
              </a>
            </div>
          </div>

        </div>

        {/* Barra inferior de Copyright e Instituto */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-gray-400 text-center flex flex-col md:flex-row justify-between">
          <p className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} SnackBox. Todos los derechos reservados.</p>
          <p>
            Un proyecto del <span className="font-semibold text-snackbox-light-gray">Instituto Remedios Escalada de San Martín</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;