'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EditorialCard } from '../reutilizables/EditorialCard';

const manifesto = [
  {
    title: 'Principio 01',
    text: 'ODIAMOS EL SOFTWARE MEDIOCRE. LA VELOCIDAD NO ES UN LUJO, ES UN REQUISITO TÉCNICO INNEGOCIABLE.',
  },
  {
    title: 'Principio 02',
    text: 'CREEMOS EN EL CÓDIGO COMPILADO A NIVEL MÁQUINA. SIN ABSTRACCIONES INNECESARIAS. SIN BLOATWARE.',
  },
  {
    title: 'Principio 03',
    text: 'DECIMOS "NO" A LOS PLAZOS IMPOSIBLES Y A LA DEUDA TÉCNICA CAMUFLADA DE AGILIDAD.',
  },
  {
    title: 'Principio 04',
    text: 'Rust no es una Moda. ES NUESTRA RELIGIÓN PARA CONSTRUIR SISTEMAS ROBUSTOS Y SEGUROS.',
  },
  {
    title: 'Principio 05',
    text: 'NOS GUSTA DORMIR 8 HORAS. POR ESO ESCRIBIMOS TESTS Y TIPADO ESTRICTO.',
  },
];

export function ManifestoCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % manifesto.length);
    }, 6000); // Dar más tiempo para leer (6 segundos)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 bg-[#050505] flex justify-center items-center px-6 md:px-12 w-full border-y border-white/10">
      <div className="w-full max-w-3xl relative h-[450px] md:h-87.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center w-full h-full"
          >
            <EditorialCard
              title={manifesto[index].title}
              text={manifesto[index].text}
              fontFamily="Inter, sans-serif"
              fontSize={24}
              lineHeight={36}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
