import React, { useState } from 'react'; // Se añade useState
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCookieBite, FaGlassWhiskey, FaBolt, FaGift, FaRegCopy, FaCheck } from 'react-icons/fa'; // Se añaden íconos
import toast from 'react-hot-toast'; // Se añade toast para la notificación

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.8, delayChildren: 0.3, staggerChildren: 0.2 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const HomePage = () => {
  // --- AÑADIDO --- Lógica para el botón de copiar
  const [isCopied, setIsCopied] = useState(false);
  const discountCode = 'expodescuentos';

  const handleCopy = () => {
    navigator.clipboard.writeText(discountCode);
    toast.success('¡Código copiado!');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Vuelve al estado original después de 2 segundos
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className=""
    >
      <div 
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-snackbox-white overflow-hidden" 
        style={{ backgroundImage: "url('/images/snackbox-hero-bg.jpg')" }}
      >
        <motion.div 
          className="absolute inset-0 bg-snackbox-primary/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div 
          className="relative z-10 p-10 rounded-xl text-center max-w-3xl"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-extrabold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }} 
          >
            SnackBox
          </motion.h1>
          <motion.p 
            className="text-xl md:text-3xl mb-10 font-light drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }} 
          >
            Juguitos, Alfajores y Más. Tu pausa perfecta.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 100 }}
          >
            <Link 
              to="/productos"
              className="group relative inline-block text-lg"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-snackbox-secondary to-snackbox-accent rounded-full opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative block py-4 px-10 bg-snackbox-secondary text-white font-bold rounded-full group-hover:bg-transparent transition-colors duration-300 shadow-xl">
                Explora Nuestros Snacks
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* --- SECCIÓN DE DESCUENTO COMPLETAMENTE REDISEÑADA --- */}
      <motion.div
        className="py-20 bg-snackbox-light-gray"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl mx-auto text-center border border-snackbox-primary/10">
                <FaGift className="text-5xl mx-auto mb-4 text-snackbox-secondary" />
                <h2 className="text-3xl font-bold mb-2 text-snackbox-primary">¡Un Regalo Para Vos!</h2>
                <p className="text-lg mb-6 text-gray-700">
                  Copiá el siguiente código y usalo en tu carrito para desbloquear ofertas exclusivas.
                </p>
                <div className="flex justify-center items-center gap-4 bg-snackbox-light-gray/70 border-2 border-dashed border-snackbox-primary/20 rounded-lg p-4">
                  <span className="text-snackbox-primary font-mono text-2xl tracking-widest">
                      {discountCode}
                  </span>
                  <button 
                    onClick={handleCopy}
                    className={`p-3 rounded-lg transition-colors duration-300 ${isCopied ? 'bg-green-500 text-white' : 'bg-snackbox-primary text-white hover:bg-snackbox-secondary'}`}
                  >
                    {isCopied ? <FaCheck size={20} /> : <FaRegCopy size={20} />}
                  </button>
                </div>
            </div>
        </div>
      </motion.div>

      <motion.div 
        className="py-20 bg-snackbox-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-snackbox-primary mb-6">Tu Momento de Disfrute</h2>
          <p className="text-xl text-snackbox-dark-gray max-w-3xl mx-auto mb-12">
            En SnackBox, seleccionamos los mejores juguitos Baggio y alfajores para que cada pausa sea una experiencia deliciosa y refrescante.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
                className="bg-snackbox-light-gray p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
            >
                <FaGlassWhiskey size={50} className="text-snackbox-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-snackbox-primary mb-3">Juguitos Baggio</h3>
                <p className="text-gray-700">Los sabores de siempre para refrescarte. Multifruta, Durazno y Manzana.</p>
            </motion.div>
            <motion.div 
                className="bg-snackbox-light-gray p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
            >
                <FaCookieBite size={50} className="text-snackbox-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-snackbox-primary mb-3">Alfajores Clásicos</h3>
                <p className="text-gray-700">El dulce perfecto para tu día. Chocolate Blanco.</p>
            </motion.div>
            <motion.div 
                className="bg-snackbox-light-gray p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
            >
                <FaBolt size={50} className="text-snackbox-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-snackbox-primary mb-3">Combos Irresistibles</h3>
                <p className="text-gray-700">Combina tus favoritos y disfruta de nuestras promos especiales.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="py-16 bg-gradient-to-br from-snackbox-primary to-snackbox-dark-gray text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl font-bold text-snackbox-white mb-6">¿Listo para un Snack?</h2>
        <p className="text-xl text-snackbox-white max-w-2xl mx-auto mb-8">
          Explora nuestra variedad y encuentra tu combinación ideal.
        </p>
        <Link 
          to="/productos"
          className="group relative inline-block text-lg"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-snackbox-accent to-snackbox-secondary rounded-full opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative block py-4 px-10 bg-snackbox-secondary text-white font-bold rounded-full group-hover:bg-transparent transition-colors duration-300 shadow-xl">
            Ver Todos los Productos
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;