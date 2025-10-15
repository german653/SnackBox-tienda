// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Extrae el "pathname" (ej: "/", "/productos") de la URL actual.
  const { pathname } = useLocation();

  // Este efecto se ejecuta cada vez que el "pathname" cambia.
  useEffect(() => {
    // Le ordena al navegador que se mueva a la posición (0, 0) de la página.
    window.scrollTo(0, 0);
  }, [pathname]); // El efecto depende del pathname.

  // Este componente no renderiza nada visual, solo ejecuta la lógica.
  return null;
};

export default ScrollToTop;