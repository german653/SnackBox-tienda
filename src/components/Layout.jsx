// snackbox-tienda/src/components/Layout.jsx
import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  // El footer no se mostrará en la página de checkout
  const showFooter = location.pathname !== '/checkout';

  return (
    <>
      <Navbar />
      <main>
        {/* Outlet renderiza el componente de la ruta actual (Home, ProductsPage, etc.) */}
        <Outlet /> 
      </main>
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;