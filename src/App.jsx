// snackbox-tienda/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';

import Layout from './components/Layout'; // Importa el nuevo Layout
import AnimatedRoutes from './components/AnimatedRoutes';
import ShoppingCart from './components/ShoppingCart';
import ScrollToTop from './components/ScrollToTop';
import Notification from './components/Notification';

function App() {
  return (
    <div className="font-sans bg-white">
      <CartProvider>
        <Router>
          <ScrollToTop />
          {/* El Layout ahora envuelve las rutas animadas */}
          <Routes>
            <Route element={<Layout />}>
              <Route path="/*" element={<AnimatedRoutes />} />
            </Route>
          </Routes>
          <Toaster />
          <ShoppingCart />
          <Notification />
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;