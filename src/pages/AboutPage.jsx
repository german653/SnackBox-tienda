import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo-snackbox.png';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.8 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const AboutPage = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-snackbox-light-gray min-h-screen pt-28 pb-16 px-4"
    >
      <div className="container mx-auto max-w-5xl space-y-16">

        {/* --- Sección 1: Nuestra Historia --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Columna de Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-snackbox-primary mb-4">Nuestra Historia</h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                <span className="font-bold text-snackbox-secondary">SnackBox</span> nació de una pasión compartida: la convicción de que una pausa puede transformar un día. En medio de la rutina y las corridas, notamos que faltaba una opción que combinara lo delicioso con lo práctico, lo rápido con lo reconfortante.
              </p>
              <p>
                Somos un emprendimiento que busca redefinir tus recreos. No solo te llevamos un jugo o un alfajor; te ofrecemos una experiencia cuidadosamente seleccionada.
              </p>
            </div>
          </motion.div>
          {/* Columna de Imagen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="h-80 rounded-2xl shadow-xl overflow-hidden"
          >
            <img src="/images/about-story.jpg" alt="Nuestra Historia" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* --- Sección 2: Nuestra Filosofía (ORDEN CORREGIDO PARA MÓVIL) --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Columna de Texto (con orden modificado para desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="md:order-last" // En desktop, este texto va al final (derecha). En móvil, esta clase se ignora.
          >
            <h2 className="text-3xl font-bold text-snackbox-primary mb-4">Nuestra Filosofía</h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Creemos en el poder de los pequeños detalles: un envoltorio prolijo, una entrega a tiempo y un servicio cercano. Cada producto en nuestra caja ha sido elegido por su sabor, calidad y la capacidad de dibujarte una sonrisa.
              </p>
              <p>
                Queremos ser ese aliado que te acompaña en la oficina, en tus horas de estudio o simplemente cuando te apetece un mimo.
              </p>
            </div>
          </motion.div>
          {/* Columna de Imagen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="h-80 rounded-2xl shadow-xl overflow-hidden"
          >
            <img src="/images/about-philosophy.jpg" alt="Nuestra Filosofía" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Mensaje Final */}
        <div className="text-center pt-12">
            <img src={logo} alt="SnackBox Logo" className="h-20 w-20 rounded-full object-cover mx-auto mb-4 shadow-md"/>
            <p className="font-semibold text-snackbox-primary text-2xl max-w-2xl mx-auto">
              ¡Gracias por dejarnos ser parte de tu pausa perfecta!
            </p>
        </div>

      </div>
    </motion.div>
  );
};

export default AboutPage;