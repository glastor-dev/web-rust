import { useState, useEffect } from 'react';
import { ArrowUpIcon, AlertTriangleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './reutilizables/button';
import getCalApi from "@calcom/embed-react";

export default function Footer() {
  const [coffeeCups, setCoffeeCups] = useState(14023);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ calLink: "andres-zl5hcb/15min" });
      cal("ui", { styles: { branding: { brandColor: "#00ff66" } }, hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  // Simula el contador subiendo ocasionalmente
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCoffeeCups(prev => prev + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleEasterEgg = () => {
    setIsShaking(true);
    // Efecto de terremoto en toda la pantalla (vía clase en el body o wrapper)
    document.body.classList.add('animate-shake');
    setTimeout(() => {
      setIsShaking(false);
      document.body.classList.remove('animate-shake');
    }, 800);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#050505] overflow-hidden" id="contacto">
      {/* Efecto Ascendente (Suelo Luminoso) */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-linear-to-t from-brand/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12 relative z-10">
        
        {/* Top Section: Formulario Express & Copy Emocional */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-16 mb-24">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6 leading-tight">
              ¿LISTOS PARA ESCALAR?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-lg">
              Tu arquitectura técnica debería ser una ventaja competitiva, no un centro de costos. Agenda 15 minutos directos con nuestro Tech Lead. Cero fricción, cero comerciales.
            </p>
            
            <Button 
              size="lg"
              variant="default"
              className="h-16 px-10 text-base uppercase tracking-widest w-full sm:w-auto"
              asChild
            >
              <a href="https://cal.com/andres-zl5hcb/15min" target="_blank" rel="noopener noreferrer">
                Agendar Auditoría de 15 Minutos
              </a>
            </Button>
          </div>

          {/* Links de Navegación y Empatía */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:pl-8">
            {/* Columna 1: Navegación Principal */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Navegación</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-zinc-400 hover:text-brand transition-colors text-sm">Inicio</Link>
                </li>
                <li>
                  <Link to="/servicios" className="text-zinc-400 hover:text-brand transition-colors text-sm">Servicios</Link>
                </li>
                <li>
                  <Link to="/proyectos" className="text-zinc-400 hover:text-brand transition-colors text-sm">Proyectos</Link>
                </li>
                <li>
                  <Link to="/nosotros" className="text-zinc-400 hover:text-brand transition-colors text-sm">Nosotros</Link>
                </li>
                <li>
                  <Link to="/arquitectura" className="text-brand hover:text-white transition-colors text-sm font-bold">Configurador B2B</Link>
                </li>
              </ul>
            </div>

            {/* Columna 2: Mapa de Empatía */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Mapa de Empatía</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/servicios#como-escalamos" className="text-zinc-400 hover:text-brand transition-colors text-sm">¿Cómo escalamos tu app?</Link>
                </li>
                <li>
                  <Link to="/proyectos#funciona" className="text-zinc-400 hover:text-brand transition-colors text-sm">¿Funciona lo que hacemos?</Link>
                </li>
                <li>
                  <Link to="/nosotros#quienes-somos" className="text-zinc-400 hover:text-brand transition-colors text-sm">¿Quiénes somos realmente?</Link>
                </li>
                <li className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                  <a href="https://www.argentina.gob.ar/economia/industria-y-comercio/defensadelconsumidor" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                    Defensa del Consumidor
                  </a>
                  <Link to="/arrepentimiento" className="text-red-500 hover:text-brand transition-colors text-sm font-bold uppercase tracking-widest">
                    Botón de Arrepentimiento
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Columna 3: Síguenos */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Síguenos</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <a href="https://github.com/glastor-dev" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
                    <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5 invert" />
                  </a>
                  <a href="https://wa.me/5491132578591" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 hover:text-brand transition-all">
                    <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-5 h-5" />
                  </a>
                  <a href="https://t.me/glastordev" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 hover:text-brand transition-all">
                    <img src="/icons/telegram.svg" alt="Telegram" className="w-5 h-5 invert" />
                  </a>
                  <a href="https://instagram.com/glastordev" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-all">
                    <img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5 invert" />
                  </a>
                  <a href="mailto:ventas@glastor.es" className="opacity-50 hover:opacity-100 transition-opacity">
                    <img src="/icons/aws-res-amazon-simple-email-service-email.svg" alt="Email" className="w-5 h-5" />
                  </a>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <a href="https://auth.afip.gob.ar/contribuyente_/login.xhtml" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                    <img src="/images/DATAWEB.jpg" alt="Data Fiscal Argentina" className="h-12 object-contain rounded-sm grayscale hover:grayscale-0 transition-all duration-300" />
                  </a>
                  <img src="/images/iso-27001.webp" alt="ISO 27001 Certified" className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity rounded-sm grayscale hover:grayscale-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator with Stats */}
        <div className="border-y border-white/10 py-6 my-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-zinc-400 font-mono text-sm uppercase tracking-widest">
            <svg className="w-5 h-5 fill-brand" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>CoffeeScript</title><path d="M4.645 7.472c2.1.53 4.779.8 8.008.8 3.299 0 5.918-.27 8.008-.8 2.23-.52 3.299-1.22 3.299-1.88 0-.47-.48-.93-1.35-1.28.2.13.35.35.35.59 0 .67-1.01 1.22-3.039 1.68-1.88.41-4.279.7-7.198.7-2.82 0-5.329-.29-7.138-.68-1.95-.48-2.97-1-2.97-1.68 0-.28.13-.52.52-.8-1.22.47-1.88.87-1.88 1.47.07.68 1.16 1.36 3.39 1.88zm4.689-2.16c2.27-.2 2.929-1.659 5.588-1.899 1.31-.1 2.14.16 2.23.62.08.43-.57.72-1.36.78-1.09.11-1.54-.28-1.63-.65-.81.09-.94.43-.9.67.09.46 1.07.92 2.75.76 1.9-.15 2.54-.9 2.38-1.65-.2-.98-1.66-1.8-4.28-1.55-3.359.3-3.339 1.86-5.628 2.05-.94.09-1.46-.13-1.55-.5-.06-.37.4-.55.94-.59.5-.05 1.11.04 1.4.2.21-.11.28-.22.26-.35-.1-.35-.79-.5-1.66-.44-1.7.15-1.7.91-1.64 1.25.17.87 1.48 1.45 3.1 1.3zm11.417 3.84c-2.1.49-4.779.809-8.008.809-3.3 0-5.989-.34-8.078-.8-1.88-.48-2.88-1.01-3.23-1.56.18 1.23.49 2.42.89 3.55-.48.3-.91.67-1.3 1.17a4.519 4.519 0 00-1.019 3.098 3.6 3.599 0 001.42 2.62c.87.68 1.81.88 2.879.68.41-.07.87-.28 1.29-.42-.88 0-1.62-.28-2.36-.87a3.55 3.549 0 01-1.49-2.42c-.2-.94 0-1.81.53-2.579.12-.15.25-.28.39-.4.3.73.62 1.45.98 2.12.81 1.23 1.62 2.299 2.43 3.459.35.68.58 1.35.74 2.019a3.899 3.899 0 002.229 1.5c1.15.4 2.35.58 3.579.51h.13a10.197 10.197 0 003.689-.52 4.179 4.179 0 002.16-1.49h.07c.13-.67.35-1.34.67-2.02.799-1.17 1.619-2.229 2.419-3.458A20.995 20.993 0 0024 7.612c-.43.6-1.44 1.13-3.25 1.54z"/></svg>
            <span>{coffeeCups.toLocaleString()} Tazas de café optimizando código</span>
          </div>
          
          {/* Easter Egg Button */}
          <button 
            onClick={handleEasterEgg}
            className={`flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-sm transition-colors text-xs font-mono uppercase tracking-widest ${isShaking ? 'bg-red-500 text-white' : ''}`}
          >
            <AlertTriangleIcon size={14} />
            [ No Tocar ]
          </button>
        </div>

        {/* Bottom Bar: Copyright con Alma */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-4 w-full">
          
          {/* Left: Copyright */}
          <div className="text-zinc-500 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-center md:text-left flex flex-col gap-1 w-full md:w-auto">
            <span>{new Date().getFullYear()} GLASTOR® es una marca registrada en Argentina (INPI — Reg. 4559568 y 4559567, 19/08/2025).</span>
            <span>© 2010-{new Date().getFullYear()} GLASTOR-DEV, propiedad de GLASTOR®. Todos los derechos reservados.</span>
            <span className="mt-1 text-zinc-600">Core Version v{import.meta.env.VITE_APP_VERSION || "1.0.0"}</span>
          </div>
          
          {/* Right: Social, Legal & Payments */}
          <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-xs font-mono uppercase tracking-widest">
              <Link to="/legales" className="text-zinc-500 hover:text-brand transition-colors">Portal Legal / Compliance</Link>
            </div>
            
            {/* Medios de Pago */}
            <div className="flex items-center gap-4 mt-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <img src="/icons/visa.svg" alt="Visa" className="h-5 object-contain" />
              <img src="/icons/mastercard.svg" alt="Mastercard" className="h-5 object-contain" />
              <img src="/icons/american-express.svg" alt="American Express" className="h-5 object-contain" />
              <div className="w-px h-4 bg-white/20 mx-1"></div>
              <img src="/icons/bitcoin.svg" alt="Bitcoin" className="h-5 object-contain" />
              <img src="/icons/tether.svg" alt="Tether" className="h-5 object-contain" />
            </div>
          </div>

          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-white/10 hover:border-brand hover:text-brand flex items-center justify-center text-zinc-400 transition-all duration-300 hover:-translate-y-2 group bg-black"
            aria-label="Volver arriba"
          >
            <ArrowUpIcon size={20} className="group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </footer>
  );
}
