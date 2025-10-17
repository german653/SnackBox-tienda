import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);
  // --- AÑADIDO ---
  const [discountsApplied, setDiscountsApplied] = useState(false);

  // --- AÑADIDO ---
  const applyDiscountCode = useCallback((code) => {
    if (code === 'expodescuentos') {
      setDiscountsApplied(true);
      toast.success('¡Descuentos aplicados con éxito!');
      return true;
    } else {
      toast.error('El código de descuento no es válido.');
      return false;
    }
  }, []);

  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);
      
      if (itemExists) {
        const newQuantity = itemExists.quantity + quantity;
        if (newQuantity > product.stock) {
          toast.error(`¡Solo quedan ${product.stock} unidades de ${product.name}!`);
          return prevItems;
        }
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      
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
          if (newQuantity > item.stock) {
            toast.error(`¡Solo quedan ${item.stock} unidades en stock!`);
            return { ...item, quantity: item.stock };
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
    setTimeout(() => {
      hideNotification();
    }, 1500);
  }, [hideNotification]);
  
  const total = useMemo(() => 
    cartItems.reduce((acc, item) => {
      // --- MODIFICACIÓN MÍNIMA ---
      const priceToUse = discountsApplied && item.promo_price && item.promo_price < item.price 
        ? item.promo_price 
        : item.price;
      return acc + priceToUse * item.quantity;
    }, 0),
    [cartItems, discountsApplied] // Se añade dependencia
  );
  
  const totalItems = useMemo(() =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const value = useMemo(() => ({
    isCartOpen, cartItems, total, totalItems, notification, discountsApplied,
    toggleCart, addToCart, removeFromCart, updateQuantity, clearCart,
    showNotification, hideNotification, applyDiscountCode
  }), [isCartOpen, cartItems, total, totalItems, notification, discountsApplied, toggleCart, addToCart, removeFromCart, updateQuantity, clearCart, showNotification, hideNotification, applyDiscountCode]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);