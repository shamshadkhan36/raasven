import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const Toast = () => {
  const { toasts } = useCart();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#FFFDF9] border border-[#C5A059] shadow-2xl rounded-2xl p-3.5 flex items-center space-x-3 text-xs text-stone-800 transition-all duration-300 animate-slideInRight"
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-[#8C6B28] shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          )}

          <div className="flex-1 font-medium leading-snug">
            {toast.message}
          </div>
        </div>
      ))}
    </div>
  );
};
