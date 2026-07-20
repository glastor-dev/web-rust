'use client';

import { motion } from 'motion/react';
import { MonitorIcon, GamepadIcon, CoffeeIcon, TerminalIcon } from 'lucide-react';

const team = [
  {
    id: 1,
    name: 'Khasis Dan',
    role: 'Sistemas Críticos',
    icon: TerminalIcon,
    image: '/images/khasis_dan.webp',
    publicDesc: 'Diseña la estructura de microservicios y clusters de alta disponibilidad.',
    secret: 'Escribe código en Vim sin plugins. Odia usar el ratón.',
    secretColor: '#00ff66',
  },
  {
    id: 2,
    name: 'Shane',
    role: 'UI / UX Pro Max',
    icon: MonitorIcon,
    image: '/images/Shane.webp',
    publicDesc: 'Convierte el caos de datos en interfaces brutalistas fluidas.',
    secret: 'Alinea los píxeles basándose en la proporción áurea. Duerme poco.',
    secretColor: '#ec4899',
  },
  {
    id: 3,
    name: 'Will',
    role: 'Gráficos & Shaders',
    icon: GamepadIcon,
    image: '/images/will.webp',
    publicDesc: 'Programa shaders en GLSL que rompen los límites del navegador.',
    secret: 'Trata de optimizar hasta el microondas de la oficina.',
    secretColor: '#3b82f6',
  },
  {
    id: 4,
    name: 'El Pingüino',
    role: 'DevOps & Linux',
    icon: CoffeeIcon,
    image: '/images/P1.webp', // Placeholder
    publicDesc: 'Asegura que los despliegues en AWS sean invisibles y perfectos.',
    secret: 'Su café es 90% espresso, 10% ansiedad por el uptime.',
    secretColor: '#f59e0b',
  },
];

export function TeamEasterEgg() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((member, idx) => {
        const Icon = member.icon;

        return (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="group relative h-100 rounded-none bg-zinc-900 border border-white/10 hover:border-brand/30 transition-colors duration-500 overflow-hidden cursor-crosshair flex flex-col justify-end p-6"
          >
            {/* Imagen de fondo (Foto Real) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent"></div>
            </div>

            {/* Ambient Aura on Hover */}
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-10 transition-opacity duration-700" />

            <div className="relative z-20 transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
              <div className="w-10 h-10 rounded-sm bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-brand mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Icon size={20} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                {member.name}
              </h3>
              <span className="text-xs font-mono text-brand uppercase tracking-widest block mb-2">
                {member.role}
              </span>

              <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden mt-2">
                <p className="text-sm text-zinc-300 leading-relaxed">{member.secret}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
