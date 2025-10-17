import React, { useState } from 'react'; // --- AÑADIDO ---
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, discountsApplied } = useCart(); // --- AÑADIDO ---
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="flex items-center justify-between py-4 border-b border-gray-200 gap-4"
    >
      <img 
        src={item.image_urls?.[0]} 
        alt={item.name} 
        className="w-20 h-20 object-cover rounded-lg shadow-sm" 
      />

      <div className="flex-grow">
        <h4 className="font-bold text-lg text-snackbox-primary">{item.name}</h4>
        
        {/* --- MODIFICACIÓN MÍNIMA --- */}
        {discountsApplied && item.promo_price && item.promo_price < item.price ? (
          <div className="flex items-baseline gap-2 text-sm">
            <span className="text-gray-400 line-through">${item.price}</span>
            <span className="font-semibold text-red-500">${item.promo_price}</span>
          </div>
        ) : (
          <p className="text-snackbox-secondary font-semibold">${item.price}</p>
        )}
        
        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center justify-center">
            <FaMinus size={12}/>
          </button>
          <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center justify-center">
            <FaPlus size={12}/>
          </button>
        </div>
      </div>
      
      <button onClick={() => removeFromCart(item.id)} className="pr-2">
        <FaTrash className="text-gray-400 hover:text-snackbox-secondary transition-colors" />
      </button>
    </motion.div>
  );
};

const ShoppingCart = () => {
  const { isCartOpen, toggleCart, cartItems, total, clearCart, discountsApplied, applyDiscountCode } = useCart(); // --- AÑADIDO ---
  // --- AÑADIDO ---
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [code, setCode] = useState('');

  // --- AÑADIDO ---
  const handleApplyCode = () => {
    if (applyDiscountCode(code)) {
      setShowDiscountInput(false);
      setCode('');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={toggleCart} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-snackbox-white text-snackbox-dark-gray shadow-2xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-6 bg-gradient-to-br from-snackbox-light-gray to-snackbox-white border-b border-gray-200">
              <h2 className="text-2xl font-bold text-snackbox-primary">Tu Carrito</h2>
              <button onClick={toggleCart}>
                <FaTimes size={24} className="text-gray-600 hover:text-snackbox-secondary"/>
              </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
              {cartItems.length > 0 ? (
                <>
                  <div className="flex-grow overflow-y-auto -mr-6 pr-6">
                    <AnimatePresence>
                      {cartItems.map(item => <CartItem key={item.id} item={item} />)}
                    </AnimatePresence>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center text-2xl font-bold mb-4">
                      <span className="text-snackbox-primary">Total</span>
                      <span className="text-snackbox-secondary">${total.toFixed(2)}</span>
                    </div>

                    <Link to="/checkout" onClick={toggleCart} className="block text-center w-full group relative mb-2">
                      <span className="absolute inset-0 bg-gradient-to-r from-snackbox-secondary to-snackbox-accent rounded-lg opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative block w-full py-3 bg-snackbox-secondary text-white font-bold rounded-lg group-hover:bg-transparent transition-colors duration-300">
                        Comprar
                      </span>
                    </Link>

                    {/* --- AÑADIDO --- */}
                    {discountsApplied ? (
                      <button disabled className="w-full my-2 py-3 bg-green-200 text-green-800 rounded-lg font-bold opacity-80 cursor-not-allowed">Descuentos Añadidos</button>
                    ) : (
                      <button onClick={() => setShowDiscountInput(!showDiscountInput)} className="w-full my-2 py-3 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 font-bold transition">Descuento Combos</button>
                    )}
                    {!discountsApplied && showDiscountInput && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="flex gap-2 mb-2">
                        <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="expodescuentos" className="flex-grow p-2 border rounded"/>
                        <button onClick={handleApplyCode} className="px-4 bg-snackbox-primary text-white rounded">OK</button>
                      </motion.div>
                    )}
                    
                    <button onClick={clearCart} className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                      Vaciar Carrito
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-xl text-gray-500 mb-6">¡Tu SnackBox está esperando ser llenada!</p>
                  <Link to="/productos" onClick={toggleCart} className="py-3 px-6 bg-snackbox-primary text-white font-bold rounded-lg hover:bg-snackbox-secondary transition-colors shadow-lg">
                    Ver Nuestros Snacks
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;