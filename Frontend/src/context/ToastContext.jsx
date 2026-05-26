import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    const newToast = { id, message, type, duration };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const showSuccess = useCallback((message, duration) => addToast(message, 'success', duration), [addToast]);
  const showError = useCallback((message, duration) => addToast(message, 'error', duration), [addToast]);
  const showInfo = useCallback((message, duration) => addToast(message, 'info', duration), [addToast]);

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo, addToast, removeToast }}>
      {children}
      
      {/* Floating Toasts Container */}
      <div className="fixed top-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full sm:w-auto px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }) {
  const { message, type } = toast;

  // Determine styles and icons based on toast type
  let icon, borderColor, progressColor, iconBg;
  switch (type) {
    case 'success':
      icon = (
        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      );
      borderColor = 'border-green-100';
      iconBg = 'bg-green-50';
      progressColor = 'bg-green-500';
      break;
    case 'error':
      icon = (
        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
      borderColor = 'border-red-100';
      iconBg = 'bg-red-50';
      progressColor = 'bg-red-500';
      break;
    case 'info':
    default:
      icon = (
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      borderColor = 'border-primary-light';
      iconBg = 'bg-primary-light/30';
      progressColor = 'bg-primary';
      break;
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`pointer-events-auto flex items-center justify-between w-full sm:min-w-[320px] bg-white/95 backdrop-blur-md border ${borderColor} rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden relative`}
    >
      <div className="flex items-center space-x-3 flex-grow pr-2">
        <div className={`flex-shrink-0 w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <p className="text-sm font-medium text-gray-800 leading-snug">{message}</p>
      </div>

      <button
        onClick={onClose}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50 cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Decorative progress animation bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: toast.duration / 1000, ease: 'linear' }}
        className={`absolute bottom-0 left-0 h-1 ${progressColor}`}
      />
    </motion.div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
