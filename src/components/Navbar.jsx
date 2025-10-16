import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo-snackbox.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();

  const navLinks = [
    { title: 'Inicio', path: '/' },
    { title: 'Productos', path: '/productos' },
    { title: 'Sobre Nosotros', path: '/sobre-nosotros' },
  ];

  // Función para cerrar el menú móvil al hacer clic en un enlace
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-lg shadow-md z-40">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            {/* --- LOGO MODIFICADO --- */}
            <img src={logo} alt="SnackBox Logo" className="w-12 h-12 rounded-full object-cover" />
            {/* --- TÍTULO AHORA VISIBLE EN MÓVIL Y ESCRITORIO --- */}
            <span className="text-2xl font-bold text-snackbox-primary">SnackBox</span>
          </Link>

          {/* === NAVEGACIÓN PARA COMPUTADORA === */}
          <div className="hidden md:flex items-center space-x-2 bg-snackbox-light-gray/50 p-1 rounded-full">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-5 py-2 text-lg font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-snackbox-primary hover:text-snackbox-secondary'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-snackbox-secondary rounded-full"
                        style={{ borderRadius: 9999 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.title}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
              <button onClick={toggleCart} className="hidden md:block relative text-snackbox-primary hover:text-snackbox-secondary transition-colors duration-300">
                  <FaShoppingCart size={28}/>
                  {totalItems > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-snackbox-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                      >
                          {totalItems}
                      </motion.span>
                  )}
              </button>
              
              {/* === BOTÓN DE MENÚ PARA CELULAR === */}
              <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-snackbox-primary z-50 relative">
                  {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                  {!isOpen && totalItems > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-snackbox-secondary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold"
                      >
                          {totalItems}
                      </motion.span>
                  )}
                </button>
              </div>
          </div>
        </div>
      </nav>

      {/* === MENÚ MÓVIL A PANTALLA COMPLETA === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-white/90 backdrop-blur-lg z-30 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `text-4xl font-bold transition-colors duration-300 ${isActive ? 'text-snackbox-secondary' : 'text-snackbox-primary'}`
                  }
                >
                  {link.title}
                </NavLink>
              ))}
              <hr className="w-2/3 my-4"/>
              <button 
                onClick={() => {
                  closeMobileMenu();
                  toggleCart();
                }} 
                className="relative flex items-center gap-4 text-4xl font-bold text-snackbox-primary"
              >
                  <span>Carrito</span>
                  <FaShoppingCart size={32}/>
                  {totalItems > 0 && (
                      <span className="absolute -top-2 -right-4 bg-snackbox-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {totalItems}
                      </span>
                  )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;