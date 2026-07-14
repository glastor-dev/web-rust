import { useEffect, useRef } from 'react';
import { ArrowUpIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './reutilizables/button';
import getCalApi from '@calcom/embed-react';
import { trackEvent } from '../lib/analytics';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (footerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Lazy Load Cal.com API solo cuando el footer es visible
            (async function () {
              try {
                const cal = await getCalApi({ calLink: 'andres-zl5hcb/15min' });
                cal('ui', {
                  styles: { branding: { brandColor: '#00ff66' } },
                  hideEventTypeDetails: false,
                  layout: 'month_view',
                });
              } catch (err) {
                console.debug('Cal.com load bypassed for Lighthouse', err);
              }
            })();
            observer.disconnect();
          }
        },
        { threshold: 0.1 },
      );

      observer.observe(footerRef.current);
    }

    return () => observer?.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full border-t border-white/10 bg-[#050505] overflow-hidden"
      id="contacto"
    >
      {/* Efecto Ascendente (Suelo Luminoso) */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-linear-to-t from-brand/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-8 relative z-10">
        {/* Top Section: Formulario Express & Copy Emocional */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-5 pr-0 lg:pr-8">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4 leading-tight">
              ¿LISTOS PARA ESCALAR?
            </h2>
            <p className="text-zinc-400 text-sm md:text-base mb-8 max-w-md">
              Tu arquitectura técnica debería ser una ventaja competitiva, no un centro de costos.
              Agenda 15 minutos directos con nuestro Tech Lead. Cero fricción, cero comerciales.
            </p>

            <Button
              size="lg"
              variant="default"
              className="h-14 px-8 text-sm uppercase tracking-widest w-full sm:w-auto"
              onClick={() => trackEvent('click_cta_footer')}
              asChild
            >
              <a
                href="https://cal.com/andres-zl5hcb/15min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar Auditoría (15 Min)
              </a>
            </Button>
          </div>

          {/* Links de Navegación y Empatía */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-6">
            {/* Columna 1: Navegación Principal */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">
                Navegación
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-zinc-400 hover:text-brand transition-colors text-sm">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/servicios"
                    className="text-zinc-400 hover:text-brand transition-colors text-sm"
                  >
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    to="/proyectos"
                    className="text-zinc-400 hover:text-brand transition-colors text-sm"
                  >
                    Proyectos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/nosotros"
                    className="text-zinc-400 hover:text-brand transition-colors text-sm"
                  >
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tienda"
                    className="text-zinc-400 hover:text-brand transition-colors text-sm flex items-center gap-2"
                  >
                    Tienda en Acción
                    <span className="bg-brand text-black text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm">
                      B2B
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/arquitectura"
                    className="text-brand hover:text-white transition-colors text-sm font-bold"
                  >
                    Configurador B2B
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 2: Recursos */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">
                Recursos
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/recursos?tech=rust"
                    className="text-zinc-400 hover:text-brand transition-colors text-sm"
                  >
                    Rust
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recursos?tech=docker"
                    className="text-zinc-400 hover:text-brand transition-colors text-sm"
                  >
                    Docker
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recursos?tech=oxc"
                    className="text-zinc-400 hover:text-brand transition-colors text-sm"
                  >
                    Oxc
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recursos?tech=mongodb"
                    className="text-zinc-400 hover:text-brand transition-colors text-sm"
                  >
                    MongoDB
                  </Link>
                </li>
                <li className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                  <a
                    href="https://www.argentina.gob.ar/economia/industria-y-comercio/defensadelconsumidor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    Defensa del Consumidor
                  </a>
                  <Link
                    to="/arrepentimiento"
                    className="text-red-500 hover:text-brand transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    Botón de Arrepentimiento
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3: Síguenos */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">
                Síguenos
              </h4>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/glastor-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-50 hover:opacity-100 hover:scale-110 transition-all"
                  >
                    <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5 invert" />
                  </a>
                  <a
                    href="https://wa.me/5491132578591"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-50 hover:opacity-100 hover:text-brand hover:scale-110 transition-all"
                  >
                    <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-5 h-5" />
                  </a>
                  <a
                    href="https://t.me/zerhocool"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-50 hover:opacity-100 hover:text-brand hover:scale-110 transition-all"
                  >
                    <img src="/icons/telegram.svg" alt="Telegram" className="w-5 h-5 invert" />
                  </a>
                  <a
                    href="https://instagram.com/glastorgroup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-50 hover:opacity-100 hover:scale-110 transition-all"
                  >
                    <img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5 invert" />
                  </a>
                  <a
                    href="mailto:ventas@glastor.es"
                    className="opacity-50 hover:opacity-100 hover:scale-110 transition-all"
                  >
                    <img
                      src="/icons/aws-res-amazon-simple-email-service-email.svg"
                      alt="Email"
                      className="w-5 h-5"
                    />
                  </a>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <a
                    href="https://auth.afip.gob.ar/contribuyente_/login.xhtml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <img
                      src="/images/DATAWEB.jpg"
                      alt="Data Fiscal Argentina"
                      className="h-14 object-contain rounded-sm grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </a>
                  <img
                    src="https://res.cloudinary.com/dzualplqi/image/upload/v1783566465/iso-27001_hzcz5n.webp"
                    alt="ISO 27001 Certified"
                    className="h-14 object-contain opacity-60 hover:opacity-100 transition-opacity rounded-sm grayscale hover:grayscale-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 my-8"></div>

        {/* Bottom Bar: Copyright con Alma */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 relative">
          {/* Left: Copyright */}
          <div className="text-zinc-500 text-[10px] md:text-xs font-mono uppercase tracking-widest text-center lg:text-left flex flex-col gap-1 order-2 lg:order-1">
            <span>
              {new Date().getFullYear()} GLASTOR® es una marca registrada en Argentina (INPI — Reg.
              4559568 y 4559567, 19/08/2025).
            </span>
            <span>
              © 2010-{new Date().getFullYear()} GLASTOR-DEV, propiedad de GLASTOR®. Todos los
              derechos reservados.
            </span>
            <span className="text-zinc-500">
              Core Version v{import.meta.env.VITE_APP_VERSION || '1.0.0'}
            </span>
          </div>

          {/* Right: Social, Legal & Payments */}
          <div className="flex flex-col items-center lg:items-end gap-3 order-1 lg:order-2 w-full lg:w-auto pr-0 lg:pr-16">
            {/* Legal Links */}
            <div className="flex gap-4 text-[10px] md:text-xs font-mono uppercase tracking-widest">
              <Link to="/legales" className="text-zinc-400 hover:text-brand transition-colors">
                Portal Legal / Compliance
              </Link>
            </div>

            {/* Medios de Pago */}
            <div className="flex flex-wrap justify-center lg:justify-end items-center gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <img src="/icons/visa.svg" alt="Visa" className="h-6 object-contain" />
              <img src="/icons/mastercard.svg" alt="Mastercard" className="h-6 object-contain" />
              <img
                src="/icons/american-express.svg"
                alt="American Express"
                className="h-6 object-contain"
              />
              <div className="w-px h-5 bg-white/20 mx-1 hidden sm:block"></div>
              <img src="/icons/bitcoin.svg" alt="Bitcoin" className="h-6 object-contain" />
              <img src="/icons/tether.svg" alt="Tether" className="h-6 object-contain" />
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="absolute top-0 right-0 lg:-top-4 lg:-right-4 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 hover:border-brand hover:text-brand flex items-center justify-center text-zinc-400 transition-all duration-300 hover:-translate-y-2 group bg-black z-20"
            aria-label="Volver arriba"
          >
            <ArrowUpIcon size={18} className="group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </footer>
  );
}
