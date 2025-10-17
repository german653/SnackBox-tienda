import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaCheckCircle, FaTicketAlt } from 'react-icons/fa';

const DiscountActivator = () => {
  const { discountsApplied, applyDiscountCode } = useCart();
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (applyDiscountCode(code)) {
      setCode('');
    }
  };

  if (discountsApplied) {
    return (
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md flex items-center gap-4 animate-pulse">
        <FaCheckCircle size={24} />
        <p className="font-bold text-lg">¡Descuentos aplicados!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-lg shadow-lg">
      <FaTicketAlt className="text-snackbox-secondary text-2xl hidden sm:block"/>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Código de Descuento"
        className="w-full sm:w-auto flex-grow p-3 border-2 border-gray-200 rounded-md focus:outline-none focus:border-snackbox-primary transition"
      />
      <button type="submit" className="w-full sm:w-auto bg-snackbox-primary text-white font-bold py-3 px-6 rounded-md hover:bg-snackbox-secondary transition-colors">
        Aplicar
      </button>
    </form>
  );
};

export default DiscountActivator;