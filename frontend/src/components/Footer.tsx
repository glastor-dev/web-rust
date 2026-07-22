'use client';

import { useEffect, useRef } from 'react';
import getCalApi from '@calcom/embed-react';

import { FooterCTA } from './footer/FooterCTA';
import { FooterNav } from './footer/FooterNav';
import { FooterSocial } from './footer/FooterSocial';
import { FooterBottom } from './footer/FooterBottom';

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

  return (
    <footer
      ref={footerRef}
      className="relative w-full border-t border-white/10 bg-[#050505] overflow-hidden"
      id="contacto"
    >
      {/* Efecto Ascendente (Suelo Luminoso) */}
      <div className="absolute bottom-0 left-0 w-full h-125 bg-linear-to-t from-brand/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-8 relative z-10">
        {/* Top Section: Formulario Express & Copy Emocional */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <FooterCTA />

          {/* Links de Navegación y Empatía */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-6">
            <FooterNav />
            <FooterSocial />
          </div>
        </div>

        <div className="w-full h-px bg-white/10 my-8"></div>

        {/* Bottom Bar: Copyright con Alma */}
        <FooterBottom />
      </div>
    </footer>
  );
}
