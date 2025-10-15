// snackbox-tienda/src/components/Notification.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const Notification = () => {
  const { notification } = useCart();

  return (
    <AnimatePresence>
      {notification && (
        // Overlay con desenfoque que bloquea la pantalla
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center w-80"
          >
            <div className="relative mb-5">
              <div className="absolute -inset-2 bg-green-200 rounded-full animate-pulse"></div>
              <FaCheckCircle className="text-green-500 text-6xl z-10 relative" />
            </div>
            
            <h2 className="text-2xl font-bold text-snackbox-primary mb-2">¡Añadido al Carrito!</h2>
            
            <div className="text-gray-600 my-4">
              <p className="font-semibold">{notification.product.name}</p>
              <p>Cantidad: {notification.quantity}</p>
            </div>
            
            {/* --- SECCIÓN DE BOTONES ELIMINADA --- */}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Notification;