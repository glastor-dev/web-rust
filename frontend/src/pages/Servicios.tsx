import { motion } from 'motion/react';
import ServicesListSection from '../components/sections/ServicesListSection';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/reutilizables/button';
import { ROICalculator } from '../components/ui/ROICalculator';
import { TrustBar } from '../components/ui/TrustBar';
import { EditorialCard } from '../components/reutilizables/EditorialCard';
import { Card } from '../components/reutilizables/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/reutilizables/accordion';
import { TextRevealGSAP } from '../components/ui/TextRevealGSAP';

import { SEO } from '../components/SEO';

export default function Servicios() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SEO
        title="Glastor | Ingeniería y Rendimiento Extremo"
        description="No escribimos código por moda. Diseñamos infraestructuras en Rust para que tus servidores cuesten un 60% menos y tus usuarios nunca vean una pantalla de carga."
        url="https://glastor.dev/servicios"
      />

      {/* 1. Hero Dedicado (Antes vs Después + ROI Calculator) */}
      <PageHero
        title={
          <>
            TRANSFORMAMOS
            <br />
            <span className="text-brand">
              EL CAOS
              <br />
              OPERATIVO.
            </span>
          </>
        }
        description="No escribimos código por moda. Diseñamos infraestructuras en Rust para que tus servidores cuesten un 60% menos y tus usuarios nunca vean una pantalla de carga."
        ctaPrimary={{ text: 'Agendar Diagnóstico Técnico', href: '#contacto' }}
        ctaSecondary={{ text: 'Ver Casos de Estudio', href: '/proyectos' }}
        minHeight="min-h-screen"
        visualElement={
          <div className="w-full max-w-lg mx-auto lg:mr-0">
            <ROICalculator />
          </div>
        }
      />

      {/* 2. Filtro de Confianza (Marquee de Tecnologías) */}
      <TrustBar />

      {/* 3. Lista de Servicios (Niveles Horizontales Expansivos) */}
      <div className="mt-8">
        <ServicesListSection />
      </div>

      {/* 3.5. Respuesta al Mapa de Empatía: ¿Cómo escalamos tu app? */}
      <section
        id="como-escalamos"
        className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 mt-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.9]">
              <TextRevealGSAP
                lines={[
                  '¿CÓMO ESCALAMOS',
                  <span key="app" className="text-brand">
                    TU APP?
                  </span>,
                ]}
              />
            </h2>
            <TextRevealGSAP
              text="No lo hacemos tirando dinero en servidores de AWS y rezando. Lo hacemos reescribiendo los cuellos de botella en Rust."
              className="text-zinc-400 text-lg leading-relaxed mb-8"
              delay={0.2}
            />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>01/ Concurrencia Real, no Simulada</AccordionTrigger>
                <AccordionContent>
                  JavaScript maneja un hilo a la vez. Rust usa todos los núcleos del procesador al
                  mismo tiempo sin miedo a colisiones en memoria. Eso significa manejar 10,000
                  requests concurrentes donde Node colapsa en 500.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>02/ Eliminación de Máquina Virtual</AccordionTrigger>
                <AccordionContent>
                  Killed the Garbage Collector. Al compilar directamente a binario nativo, no hay
                  pausas para limpiar memoria. Latencia plana y constante. Siempre.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>03/ Seguridad de Memoria</AccordionTrigger>
                <AccordionContent>
                  Si compila, no hay segmentation faults. Todo el ecosistema de Rust previene
                  errores de memoria en tiempo de compilación. Tu backend literalmente no puede
                  fallar por las razones habituales.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="relative pt-4">
            <Card className="rounded-none border-editorial p-8 bg-black">
              <h3 className="text-zinc-300 font-mono text-sm uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
                Telemetría de Escalado
              </h3>
              <div className="space-y-8 font-mono text-xs text-zinc-500">
                {/* Node.js Bar */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white">Legacy Node.js</span>
                    <span className="text-red-500">2.4GB RAM / 100 RPS</span>
                  </div>
                  <div className="w-full bg-red-500/10 h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '80%' }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      className="bg-red-500 h-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                    />
                  </div>
                </div>

                {/* Rust Bar */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white">Glastor Rust Core</span>
                    <span className="text-brand">40MB RAM / 10,000 RPS</span>
                  </div>
                  <div className="w-full bg-brand/10 h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '10%' }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                      className="bg-brand h-full shadow-[0_0_10px_rgba(0,255,102,0.5)]"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. CTA Masivo Final */}
      <section className="py-48 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full flex flex-col items-center"
        >
          <div className="w-full max-w-5xl mb-16">
            <EditorialCard
              title="¿LISTO PARA ESCALAR SIN FRICCIÓN?"
              text="Agenda una sesión técnica con nuestros ingenieros. Analizaremos tu arquitectura actual, detectaremos los cuellos de botella y diseñaremos un plan de migración a Rust que dividirá tus costos de servidor a la vez que multiplica tu velocidad por diez. No es magia, es ingeniería exacta."
              fontFamily="Inter, sans-serif"
              fontSize={32}
              lineHeight={44}
            />
          </div>

          <Button variant="default" size="lg" className="h-16 px-12 text-lg">
            Agendar Sesión de 15 Minutos
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
