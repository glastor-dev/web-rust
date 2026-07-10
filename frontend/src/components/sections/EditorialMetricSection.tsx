import { motion } from 'motion/react';
import { Button } from '../reutilizables/button';
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EditorialMetricSection() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 bg-[#050505]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left: Editorial Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight font-sans tracking-tight">
            Glastor es el partner estratégico de ingeniería para sistemas que no pueden fallar.
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-8 font-light max-w-2xl">
            Las empresas más exigentes confían en nuestra profunda especialización en Rust y
            arquitecturas distribuidas para procesar millones de transacciones, reducir latencias al
            mínimo teórico y optimizar drásticamente sus costos operativos en la nube.
          </p>
          <Button
            variant="outline"
            className="group rounded-none border-editorial text-white hover:bg-white hover:text-black transition-colors"
            asChild
          >
            <Link to="/nosotros">
              Conoce nuestra metodología
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        {/* Right: Vertical Metric */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="border-l-4 border-brand pl-8 py-2">
            <h3 className="text-2xl md:text-3xl text-white font-medium mb-4 leading-snug">
              Nuestros clientes reducen sistemáticamente sus facturas de nube tras migrar su core a
              Rust.
            </h3>
            <p className="text-sm text-zinc-500 font-mono tracking-wide">
              Fuente: Auditorías internas de rendimiento y facturación AWS/GCP (2024-2025).
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
