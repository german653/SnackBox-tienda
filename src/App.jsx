// snackbox-tienda/src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';
import ShoppingCart from './components/ShoppingCart';
import ScrollToTop from './components/ScrollToTop';
import Notification from './components/Notification'; // <-- 1. Importa el nuevo componente

function App() {
  return (
    <div className="font-sans bg-white">
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
          <Toaster />
          <ShoppingCart />
          <Notification /> {/* <-- 2. Añade el componente aquí */}
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;