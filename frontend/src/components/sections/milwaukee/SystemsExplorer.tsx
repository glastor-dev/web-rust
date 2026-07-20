'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useRef } from 'react';

function TiltCard({ cat }: { cat: { name: string; badge: string; promise: string; img: string } }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const { width, height, left, top } = rectRef.current;
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#0a0a0a] border border-white/5 flex flex-col relative group cursor-pointer overflow-hidden hover:border-brand/30 transition-colors h-full"
    >
      <div
        className="aspect-square bg-black/40 flex items-center justify-center p-6 relative w-full group-hover:p-4 transition-all"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div className="w-full h-full bg-black border border-white/5 group-hover:border-white/10 flex items-center justify-center transition-colors relative overflow-hidden">
          {cat.img ? (
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110"
            />
          ) : (
            <div className="text-center">
              <div className="text-zinc-700 text-xs font-mono font-bold uppercase tracking-widest">
                CATEGORÍA
              </div>
              <div className="text-zinc-400 text-[10px] font-mono mt-2 uppercase tracking-widest">
                {cat.badge}
              </div>
            </div>
          )}
          {/* Floating Title */}
          <div
            className="absolute bottom-4 left-0 w-full text-center z-10"
            style={{ transform: 'translateZ(40px)' }}
          >
            <span className="inline-block bg-brand text-black px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
              Ver {cat.name}
            </span>
          </div>
        </div>

        {/* Static Title (always visible, floats over image) */}
        <div
          className="absolute top-8 left-8 z-10 pointer-events-none"
          style={{ transform: 'translateZ(50px)' }}
        >
          <span className="text-white text-lg font-black uppercase tracking-tighter drop-shadow-md">
            {cat.name}
          </span>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-1 bg-brand transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
        style={{ transform: 'translateZ(20px)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-brand/10 to-transparent pointer-events-none"
        style={{ transform: 'translateZ(10px)' }}
      />
    </motion.div>
  );
}

export function SystemsExplorer() {
  const categories = [
    {
      name: 'Inalambricos',
      badge: '127 productos',
      promise: 'Envío en 24h',
      img: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_400/v1784392987/sis1_lj5pol.webp',
    },
    {
      name: 'Iluminacion',
      badge: '34 productos',
      promise: 'Stock permanente',
      img: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_400/v1784393069/sis2_ljbtwa.webp',
    },
    {
      name: 'Con cable',
      badge: '19 productos',
      promise: 'Garantía oficial',
      img: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_400/v1784393661/sis3_n6oobe.webp',
    },
    {
      name: 'Cargadores y baterias',
      badge: '45 productos',
      promise: 'Rango supervisión',
      img: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_400/v1784393798/sis4_tdusrf.webp',
    },
    {
      name: 'MAKTRAK',
      badge: 'Nuevo Sistema',
      promise: 'Almacenamiento Modular',
      img: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_400/v1784547815/maktrak-s_w1xoyl.webp',
    },
  ];

  return (
    <section
      className="w-full bg-[#050505] py-24 relative overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-brand font-mono text-xs uppercase tracking-widest font-bold">
              Ecosistema
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">
            EXPLORA LOS SISTEMAS
          </h2>
          <p className="mt-4 text-sm md:text-base text-zinc-400 font-medium max-w-2xl mx-auto">
            Elegí por sistema, familia o aplicación. Cada sección mezcla productos listos para
            cotizar, en stock y con despacho coherente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 pb-8"
        >
          {categories.map((cat, i) => (
            <TiltCard key={i} cat={cat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
