import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { Button } from '../reutilizables/button';
import { Card } from '../reutilizables/card';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('glastor_cookie_consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('glastor_cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('glastor_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.5, type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 right-6 md:left-8 md:right-auto md:w-[450px] z-100"
        >
          {/* Glassmorphism Panel */}
          <Card className="bg-[#050505]/80 backdrop-blur-xl border border-white/10 shadow-2xl p-6 relative overflow-hidden rounded-none">
            {/* Subtle glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/10 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                  <Cookie size={16} />
                </div>
                <h3 className="text-white font-bold tracking-tight">Privacidad y Cookies</h3>
              </div>
              <button 
                onClick={handleRejectAll}
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label="Cerrar y rechazar"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-mono">
              Usamos cookies técnicas estrictamente necesarias. También nos gustaría usar cookies analíticas opcionales para medir el rendimiento, cumpliendo con el RGPD y la Ley 25.326.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleRejectAll}
                variant="outline"
                className="flex-1 uppercase tracking-widest text-xs h-10 border-white/10 text-zinc-300 hover:bg-white/5"
              >
                Solo Necesarias
              </Button>
              <Button 
                onClick={handleAcceptAll}
                variant="default"
                className="flex-1 uppercase tracking-widest text-xs h-10 shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:shadow-[0_0_25px_rgba(0,255,102,0.5)] transition-shadow"
              >
                Aceptar Todas
              </Button>
            </div>
            
            <div className="mt-4 text-center">
              <a href="#" className="text-zinc-500 hover:text-brand text-[10px] uppercase tracking-widest transition-colors">
                Configurar Preferencias
              </a>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
