// snackbox-tienda/src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { supabase } from '../supabaseClient';
import { FaBoxOpen } from 'react-icons/fa';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.8 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('todos');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        // --- LÓGICA CORREGIDA ---
        // Traemos TODOS los productos que no estén borrados.
        // La ProductCard se encargará de la lógica visual del stock.
        .eq('is_deleted', false)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        const formattedData = data.map(p => ({ ...p, category: p.categories?.name.toLowerCase() || 'sin-categoria' }));
        setProducts(formattedData);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const categories = [
    { name: 'Todos', value: 'todos' },
    { name: 'Jugos', value: 'jugos' },
    { name: 'Alfajores', value: 'alfajores' },
    { name: 'Promos', value: 'promos' },
  ];

  const filteredProducts = activeCategory === 'todos'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-snackbox-light-gray min-h-screen py-20"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-snackbox-primary mb-10">Nuestros Deliciosos Snacks</h2>
        
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`py-2 px-6 rounded-full font-semibold transition-all duration-300 shadow-md ${activeCategory === cat.value ? 'bg-snackbox-secondary text-white transform scale-105 shadow-snackbox-secondary/40' : 'bg-white text-snackbox-primary hover:bg-gray-200'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16"><p className="text-xl text-gray-500">Cargando productos...</p></div>
        ) : (
          <motion.div 
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <motion.div 
                    key={product.id} 
                    variants={itemVariants} 
                    exit="exit"
                    layout
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="col-span-full flex flex-col items-center justify-center text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <FaBoxOpen size={60} className="text-gray-300 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-500">¡Ups! No hay nada por aquí.</h3>
                  <p className="text-lg text-gray-400 mt-2">Pronto agregaremos más productos a esta categoría.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductsPage;