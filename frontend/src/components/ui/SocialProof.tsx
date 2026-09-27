'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell } from 'lucide-react';

const MESSAGES = [
  "Un comprador mayorista en Córdoba adquirió 5x Taladros M18",
  "Alguien de Rosario acaba de llevarse un combo Milwaukee",
  "Stock crítico: Solo 3 unidades del Set de Llaves de Impacto",
  "Nuevo registro B2B completado desde Neuquén",
  "Un usuario ahorró $150.000 con la compra por volumen hoy"
];

export function SocialProof() {
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);

  useEffect(() => {
    // Retraso inicial
    const timeout = setTimeout(() => {
      showRandomMessage();
      
      // Ciclo de mostrar y ocultar mensajes
      const interval = setInterval(() => {
        showRandomMessage();
      }, 25000); // Muestra un mensaje cada 25 segundos
      
      return () => clearInterval(interval);
    }, 10000); // Comienza a los 10 segundos

    return () => clearTimeout(timeout);
  }, []);

  const showRandomMessage = () => {
    const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setCurrentMessage(randomMsg);
    
    // Ocultar el mensaje después de 6 segundos
    setTimeout(() => {
      setCurrentMessage(null);
    }, 6000);
  };

  return (
    <AnimatePresence>
      {currentMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 left-6 z-100 bg-[#050505] border border-white/10 p-3 shadow-2xl rounded flex items-center gap-3 w-72 md:w-80"
        >
          <div className="w-8 h-8 rounded bg-brand/10 border border-brand/30 flex shrink-0 items-center justify-center">
            <Bell className="w-4 h-4 text-brand animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand mb-0.5">
              [SISTEMA] EVENTO RECIENTE
            </span>
            <p className="text-zinc-300 text-xs leading-tight">
              {currentMessage}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
