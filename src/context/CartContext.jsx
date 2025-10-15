import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);

  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);
      
      if (itemExists) {
        const newQuantity = itemExists.quantity + quantity;
        // Control de stock al añadir
        if (newQuantity > product.stock) {
          toast.error(`¡Solo quedan ${product.stock} unidades de ${product.name}!`);
          return prevItems; // No hace ningún cambio si se supera el stock
        }
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      
      // Si el item es nuevo, se asegura que la cantidad inicial no supere el stock
      const initialQuantity = Math.min(quantity, product.stock);
      return [...prevItems, { ...product, quantity: initialQuantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.error('Producto eliminado del carrito.');
  }, []);
  
  const updateQuantity = useCallback((productId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        toast.error('Producto eliminado del carrito.');
        return prevItems.filter(item => item.id !== productId);
      }
      
      return prevItems.map(item => {
        if (item.id === productId) {
          // Control de stock al actualizar desde el carrito
          if (newQuantity > item.stock) {
            toast.error(`¡Solo quedan ${item.stock} unidades en stock!`);
            return { ...item, quantity: item.stock }; // Ajusta la cantidad al máximo disponible
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  }, []);
  
  const clearCart = useCallback(() => setCartItems([]), []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const showNotification = useCallback((product, quantity) => {
    setNotification({ product, quantity });
    // Temporizador para ocultar la notificación automáticamente después de 1.5 segundos
    setTimeout(() => {
      hideNotification();
    }, 1500); // 1500 milisegundos = 1.5 segundos
  }, [hideNotification]);
  
  const total = useMemo(() => 
    cartItems.reduce((acc, item) => {
      // Usa el precio de promoción si existe y es válido, si no, usa el precio normal
      const priceToUse = item.promo_price && item.promo_price < item.price 
        ? item.promo_price 
        : item.price;
      return acc + priceToUse * item.quantity;
    }, 0),
    [cartItems]
  );
  
  const totalItems = useMemo(() =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const value = useMemo(() => ({
    isCartOpen, cartItems, total, totalItems, notification,
    toggleCart, addToCart, removeFromCart, updateQuantity, clearCart,
    showNotification, hideNotification,
  }), [isCartOpen, cartItems, total, totalItems, notification, toggleCart, addToCart, removeFromCart, updateQuantity, clearCart, showNotification, hideNotification]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);