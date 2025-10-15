// src/components/AnimatedRoutes.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import AboutPage from '../pages/AboutPage';
import CheckoutPage from '../pages/CheckoutPage'; // 1. Importa la nueva página

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/sobre-nosotros" element={<AboutPage />} />
        <Route path="/checkout" element={<CheckoutPage />} /> {/* 2. Añade la ruta */}
      </Routes>
    </AnimatePresence>
  );
};
export default AnimatedRoutes;