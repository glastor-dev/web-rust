import { motion } from 'motion/react';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ManifestoCarousel } from '../components/ui/ManifestoCarousel';
import { TeamEasterEgg } from '../components/ui/TeamEasterEgg';
import { Button } from '../components/reutilizables/button';
import { SEO } from '../components/SEO';
import { EditorialCard } from '../components/reutilizables/EditorialCard';
import { FoundersSection } from '../components/sections/Nosotros/FoundersSection';
import { AntiTimeline } from '../components/sections/Nosotros/AntiTimeline';
import { SinceridadBrutal } from '../components/sections/Nosotros/SinceridadBrutal';
import { TextRevealGSAP } from '../components/ui/TextRevealGSAP';

export default function Nosotros() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SEO
        title="Glastor | Odiamos el software mediocre"
        description="Fundamos Glastor tras ver cómo ideas brillantes morían aplastadas por arquitecturas de papel. Conoce al equipo obcecado con la calidad."
        url="https://glastor.dev/nosotros"
      />

      {/* 1. Hero Manifiesto */}
      <PageHero
        title={
          <TextRevealGSAP
            lines={[
              'ODIAMOS EL',
              'SOFTWARE',
              'MEDIOCRE.',
              <span key="eso" className="text-zinc-500">
                POR ESO
                <br />
                EXISTIMOS.
              </span>,
            ]}
          />
        }
        titleClass="text-fluid-h2 mx-auto"
        description="Fundamos Glastor tras ver cómo ideas brillantes morían aplastadas por arquitecturas de papel, presupuestos inflados y tiempos de carga eternos. Queríamos construir algo inquebrantable."
        ctaPrimary={{ text: 'Ven a tomar un café (virtual)', href: '#contacto' }}
        minHeight="min-h-[90vh]"
      />

      {/* 2. Manifiesto en Movimiento (Rotator) */}
      <ManifestoCarousel />

      {/* 3. Filosofía y Valores */}
      <section id="quienes-somos" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <FoundersSection />
        <AntiTimeline />
      </section>

      {/* 4. Candor / Sinceridad Brutal */}
      <SinceridadBrutal />

      {/* 5. El Equipo (Tarjetas Easter Egg) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeader title="LA MANADA" subtitle="Gente Obcecada con la Calidad" />
        <TeamEasterEgg />
      </section>

      {/* 6. Plot Twist CTA Final (En lugar de form de contacto) */}
      <section className="py-32 px-6 md:px-12 bg-[#050505] border-t border-white/10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center"
        >
          <div className="w-full max-w-5xl mb-16 text-center">
            <EditorialCard
              title="¿TODAVÍA LEYENDO?"
              text="Eres curioso. Te caemos bien. En lugar de llenar un aburrido formulario de contacto que nadie quiere leer ni responder, hablemos directo. Sin fricción. Sin comerciales."
              fontFamily="Inter, sans-serif"
              fontSize={32}
              lineHeight={44}
            />
          </div>
          <Button
            asChild
            variant="default"
            size="lg"
            className="h-16 px-12 text-lg uppercase tracking-widest"
          >
            <a href="https://wa.me/5491132578591" target="_blank" rel="noopener noreferrer">
              Hablar con un Humano
            </a>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
