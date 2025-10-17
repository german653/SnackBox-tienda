import React from 'react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegCopy, FaCheckCircle, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// --- Componentes Internos para Estilo ---

const Stepper = ({ currentStep }) => {
    const steps = ['Datos', 'Pago', 'Confirmación'];
    return (
        <div className="flex justify-between items-center w-full mb-10">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="flex flex-col items-center text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${index + 1 <= currentStep ? 'bg-snackbox-secondary text-white shadow-md shadow-snackbox-secondary/50' : 'bg-gray-200 text-gray-500'}`}>
                            {index + 1}
                        </div>
                        <span className={`mt-2 font-semibold text-sm ${index + 1 <= currentStep ? 'text-snackbox-secondary' : 'text-gray-500'}`}>{step}</span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-4 transition-colors duration-300 rounded-full ${index + 1 < currentStep ? 'bg-snackbox-secondary' : 'bg-gray-200'}`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const AnimatedInput = (props) => (
    <div className="relative mb-6">
        <input 
            {...props}
            id={props.name}
            className="peer w-full p-3 bg-transparent rounded-lg border-2 border-gray-300 text-snackbox-dark-gray focus:border-snackbox-primary focus:outline-none placeholder-transparent transition-colors"
        />
        <label 
            htmlFor={props.name}
            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
            peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-snackbox-primary"
        >
            {props.placeholder}
        </label>
    </div>
);

const EpicButton = ({ children, onClick, type = 'button', className = '' }) => (
    <button onClick={onClick} type={type} className={`w-full group relative ${className}`}>
        <span className="absolute inset-0 bg-gradient-to-r from-snackbox-secondary to-snackbox-accent rounded-lg opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="relative block w-full py-3 bg-snackbox-secondary text-white font-bold rounded-lg group-hover:bg-transparent transition-colors duration-300 shadow-lg">
            {children}
        </span>
    </button>
);

// --- Componente Principal de Checkout ---

const CheckoutPage = () => {
  const { cartItems, total, clearCart } = useCart();
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState({ name: '', lastname: '' });
  const navigate = useNavigate();
  const alias = "snackboxcole";

  useEffect(() => {
    if (cartItems.length === 0 && step !== 'thanks') {
      toast.error("Tu carrito está vacío para continuar.");
      navigate('/productos');
    }
  }, [cartItems, step, navigate]);

  const recordSale = async (paymentMethod) => {
    const { data: saleData, error: saleError } = await supabase
      .from('sales')
      .insert({
        customer_name: `${formData.name} ${formData.lastname}`,
        total_amount: total,
        payment_method: paymentMethod
      })
      .select()
      .single();

    if (saleError) {
      console.error('Error al registrar la venta:', saleError);
      toast.error('Hubo un error al procesar tu pedido.');
      return;
    }

    const itemsToInsert = cartItems.map(item => ({
      sale_id: saleData.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_sale: item.promo_price && item.promo_price < item.price ? item.promo_price : item.price
    }));

    const { error: itemsError } = await supabase
      .from('sale_items')
      .insert(itemsToInsert);
    
    if (itemsError) {
      console.error('Error al registrar los items:', itemsError);
    }
    
    setStep('thanks');
    clearCart();
  };

  const handleNextStep = () => {
    if (step === 'form' && (!formData.name || !formData.lastname)) {
      toast.error('Por favor, completa tu nombre y apellido.');
      return;
    }
    setStep('payment');
  };
  
  const handleBackStep = (targetStep) => {
    setStep(targetStep);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(alias);
    toast.success('¡Alias copiado al portapapeles!');
  };
  
  const renderContent = () => {
    const summary = (
        <div className="border-t-2 border-dashed border-gray-200 mt-6 pt-6 text-gray-700">
            <h3 className="font-bold text-xl mb-3 text-snackbox-primary">Resumen de tu compra:</h3>
            <p className="mb-4"><span className="font-semibold">Nombre:</span> {formData.name} {formData.lastname}</p>
            <ul className="space-y-2">
                {cartItems.map(item => (
                  <li key={item.id} className="flex justify-between items-center text-sm">
                    <span>{item.name} (x{item.quantity})</span>
                    {item.promo_price && item.promo_price < item.price ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-400 line-through">${(item.price * item.quantity).toFixed(2)}</span>
                        <span className="font-bold text-red-500">${(item.promo_price * item.quantity).toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    )}
                  </li>
                ))}
            </ul>
            <p className="font-bold text-3xl text-snackbox-secondary mt-4 text-right">Total: ${total.toFixed(2)}</p>
        </div>
    );
    
    switch (step) {
      case 'form':
        return (
            <motion.div key="form" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                <Stepper currentStep={1} />
                <h3 className="text-3xl font-bold mb-6 text-snackbox-primary">¡Casi listo! Ingresa tus datos</h3>
                <AnimatedInput name="name" type="text" placeholder="Nombre" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <AnimatedInput name="lastname" type="text" placeholder="Apellido" value={formData.lastname} onChange={e => setFormData({...formData, lastname: e.target.value})} />
                <div className="mt-8 flex space-x-4">
                    <Link to="/productos" className="w-1/2 text-center py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold">Volver a Productos</Link>
                    <button onClick={handleNextStep} className="w-1/2 py-3 bg-snackbox-primary text-white rounded-lg hover:bg-snackbox-secondary transition-colors font-semibold">Siguiente</button>
                </div>
            </motion.div>
        );
      case 'payment':
        return (
            <motion.div key="payment" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
                <Stepper currentStep={2} />
                <h3 className="text-3xl font-bold mb-6 text-snackbox-primary">¿Cómo quieres pagar?</h3>
                <div className="space-y-4">
                    <button onClick={() => setStep('summary-cash')} className="w-full flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-snackbox-secondary hover:bg-snackbox-secondary/5 transition-all space-x-4">
                        <FaMoneyBillWave size={24} className="text-green-500"/>
                        <div>
                            <h4 className="font-bold text-lg text-left text-snackbox-primary">Efectivo</h4>
                            <p className="text-sm text-left text-gray-600">Paga al momento de recibir tu SnackBox.</p>
                        </div>
                    </button>
                    <button onClick={() => setStep('summary-transfer')} className="w-full flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-snackbox-secondary hover:bg-snackbox-secondary/5 transition-all space-x-4">
                        <FaCreditCard size={24} className="text-blue-500"/>
                        <div>
                            <h4 className="font-bold text-lg text-left text-snackbox-primary">Transferencia</h4>
                            <p className="text-sm text-left text-gray-600">Paga de forma segura y envía el comprobante.</p>
                        </div>
                    </button>
                </div>
                <button onClick={() => handleBackStep('form')} className="mt-8 w-full py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold">Anterior</button>
            </motion.div>
        );
      case 'summary-cash':
        return (
            <motion.div key="summary-cash" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <Stepper currentStep={3} />
                <h3 className="text-3xl font-bold mb-6 text-snackbox-primary">Confirma tu pedido (Efectivo)</h3>
                {summary}
                <div className="mt-8 flex space-x-4">
                    <button onClick={() => handleBackStep('payment')} className="w-1/2 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold">Anterior</button>
                    <EpicButton onClick={() => recordSale('Efectivo')}>Confirmar Compra</EpicButton>
                </div>
            </motion.div>
        );
      case 'summary-transfer':
        return (
            <motion.div key="summary-transfer" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <Stepper currentStep={3} />
                <h3 className="text-3xl font-bold mb-6 text-snackbox-primary">Confirma tu pedido (Transferencia)</h3>
                {summary}
                <div className="mt-6">
                    <h4 className="font-bold text-lg mb-2 text-snackbox-primary">Datos para transferir:</h4>
                    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg border border-gray-200 shadow-sm">
                        <span className="font-mono text-lg text-snackbox-dark-gray">{alias}</span>
                        <button onClick={handleCopy} className="py-2 px-3 bg-snackbox-primary text-white rounded-lg hover:bg-snackbox-secondary transition-colors flex items-center space-x-2 text-sm">
                            <FaRegCopy /><span>Copiar</span>
                        </button>
                    </div>
                </div>
                <div className="mt-8 flex space-x-4">
                    <button onClick={() => handleBackStep('payment')} className="w-1/2 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold">Anterior</button>
                    <EpicButton onClick={() => recordSale('Transferencia')}>Siguiente</EpicButton>
                </div>
            </motion.div>
        );
      case 'thanks':
        return (
            <motion.div 
                key="thanks" 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="text-center flex flex-col justify-center items-center h-full"
            >
               <FaCheckCircle size={80} className="text-green-500 mx-auto mb-6 drop-shadow-lg"/>
               <h2 className="text-5xl font-bold mb-4 text-snackbox-primary">¡Gracias por tu compra!</h2>
               <p className="text-xl text-gray-700 mb-12">Tu pedido ha sido registrado con éxito.</p>
               
               <div className="w-full max-w-xs">
                 <Link to="/">
                   <EpicButton>Volver al Inicio</EpicButton>
                 </Link>
               </div>
           </motion.div>
       );
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-snackbox-light-gray to-snackbox-white flex items-center justify-center p-4"
    >
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-2xl min-h-[70vh] flex flex-col">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;