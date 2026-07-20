'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/reutilizables/button';

export default function NotFound() {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 text-center animate-in fade-in duration-700">
      {/* Indicador para motores de búsqueda de no indexar esto */}
      <meta name="robots" content="noindex, nofollow" />

      {/* Grid Background Effect */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      {/* Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/20 rounded-full blur-[100px] z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-8"
        >
          <h1 className="text-fluid-display font-black leading-[0.8] text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-800 uppercase tracking-tighter">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-fluid-h2 font-bold uppercase tracking-tight text-white mb-6">
            TE HAS PERDIDO EN EL CÓDIGO.
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Pero la arquitectura sigue en pie. La ruta que intentas buscar ha sido refactorizada,
            eliminada, o nunca existió.
          </p>

          <Button
            asChild
            variant="default"
            size="lg"
            className="h-16 px-10 text-lg uppercase tracking-widest group"
          >
            <Link href="/">
              <ArrowLeft
                className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform"
                strokeWidth={2.5}
              />
              Volver a la Base
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
