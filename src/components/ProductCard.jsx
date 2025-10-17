import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCartPlus, FaPlus, FaMinus, FaTimesCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart, showNotification, cartItems, discountsApplied } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const isOutOfStock = !product.in_stock || product.stock <= 0;

  const handleQuantityChange = (amount) => {
    setQuantity(prev => {
      const newQuantity = prev + amount;
      if (newQuantity < 1) return 1;
      if (newQuantity > product.stock) {
        toast.error(`¡Solo quedan ${product.stock} en stock!`);
        return product.stock;
      }
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("Este producto no está disponible.");
      return;
    }
    const itemInCart = cartItems.find(item => item.id === product.id);
    const currentQuantityInCart = itemInCart ? itemInCart.quantity : 0;
    if (currentQuantityInCart + quantity > product.stock) {
      toast.error('No puedes añadir más de la cantidad disponible en stock.');
      return;
    }
    addToCart(product, quantity);
    showNotification(product, quantity);
    setQuantity(1);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6 flex flex-col h-full hover:shadow-xl transition-shadow duration-300" 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }}   
      transition={{ duration: 0.5 }}      
    >
      <div className="relative">
        <img src={product.image_urls?.[0]} alt={product.name} className={`w-full h-56 object-cover rounded-lg mb-4 shadow-sm ${isOutOfStock ? 'opacity-40 grayscale' : ''}`} />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg mb-4">
            <span className="text-white font-black text-3xl tracking-widest uppercase bg-black bg-opacity-70 px-4 py-2 rounded-md shadow-lg border border-white/50">SIN STOCK</span>
          </div>
        )}
      </div>
      
      <h3 className="text-2xl font-bold text-snackbox-primary mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
      
      <div className="mb-4 min-h-[44px]">
        {discountsApplied && product.promo_price && product.promo_price < product.price ? (
          // --- LÍNEA MODIFICADA --- Se añadió 'justify-center' para centrar el contenido
          <div className="flex justify-center items-baseline gap-3">
            <span className="text-xl text-gray-400 line-through">
              ${product.price}
            </span>
            <span className="text-3xl font-extrabold text-red-500">
              ${product.promo_price}
            </span>
          </div>
        ) : (
          <div className="text-3xl font-extrabold text-snackbox-secondary">
            ${product.price}
          </div>
        )}
      </div>

      <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100 gap-4 min-h-[52px]">
        {!isOutOfStock ? (
          <>
            <div className="flex items-center gap-2">
              <button onClick={() => handleQuantityChange(-1)} className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center justify-center"><FaMinus /></button>
              <span className="text-xl font-bold w-10 text-center">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center justify-center"><FaPlus /></button>
            </div>
            <button onClick={handleAddToCart} className="bg-snackbox-secondary hover:bg-snackbox-primary text-white font-bold py-2 px-4 rounded-md text-base transition-all duration-300 flex items-center space-x-2 shadow-md"><FaCartPlus size={18} /><span>Añadir</span></button>
          </>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-gray-100 text-gray-500 font-semibold cursor-not-allowed"><FaTimesCircle /><span>No disponible</span></div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;