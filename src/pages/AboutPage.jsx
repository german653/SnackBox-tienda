import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', duration: 0.8 } },
  exit: { opacity: 0, x: 100, transition: { duration: 0.3 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: "easeOut" 
    } 
  }
};

const AboutPage = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-brand-light-blue py-16 px-6"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.h2 
          className="text-5xl font-bold text-center text-brand-dark-blue mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        >
          Nuestra Historia: El Sabor de Trio Chill
        </motion.h2>

        <motion.div 
          className="bg-white rounded-lg shadow-xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="md:w-1/2">
            <h3 className="text-3xl font-semibold text-brand-red mb-4">Un Sueño Refrescante</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Trio Chill nació de la pasión por los sabores auténticos y el deseo de llevar alegría en cada bocado congelado. Lo que comenzó como un pequeño proyecto familiar, hoy es una marca que busca refrescar tus días con opciones deliciosas y creativas.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="/images/about-story.jpg"
              alt="Historia de Trio Chill" 
              className="rounded-lg shadow-md w-full max-w-sm md:max-w-full object-cover h-64 md:h-auto" 
            />
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-xl p-8 mb-12 flex flex-col md:flex-row-reverse items-center gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="md:w-1/2">
            <h3 className="text-3xl font-semibold text-brand-yellow mb-4">Nuestra Filosofía</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Creemos en la calidad y la frescura. Cada helado está elaborado con ingredientes seleccionados, buscando combinaciones que sorprendan y deleiten. Queremos ofrecer una experiencia inigualable que te haga sonreír.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="/images/about-philosophy.jpg"
              alt="Filosofía de Trio Chill" 
              className="rounded-lg shadow-md w-full max-w-sm md:max-w-full object-cover h-64 md:h-auto" 
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;