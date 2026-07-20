'use client';

import { motion } from 'motion/react';
import { Button } from '../reutilizables/button';
import { Mail, Calendar } from 'lucide-react';

export function FinalCTA() {
  return (
    <section
      id="contacto"
      className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden"
    >
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            ¿Listo para Construir Algo <span className="text-brand">Inquebrantable??</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-light mb-12">
            Cuéntanos tu proyecto y te daremos una estimación técnica en 48 horas. Sin compromiso.
            Sin comerciales. Hablarás directamente con ingenieros.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <Button
            asChild
            variant="default"
            className="h-16 px-8 text-lg w-full sm:w-auto animate-pulse flex items-center justify-center gap-2"
          >
            <a href="https://cal.com/glastor">
              <Calendar className="w-5 h-5" /> AGENDAR LLAMADA DE 30 MIN
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-16 px-8 text-lg w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <a href="mailto:hola@glastor.es">
              <Mail className="w-5 h-5" /> Enviar email
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
