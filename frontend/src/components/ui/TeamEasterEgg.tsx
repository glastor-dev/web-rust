import { motion } from 'motion/react';
import { MonitorIcon, GamepadIcon, CoffeeIcon, TerminalIcon } from 'lucide-react';

const team = [
  {
    id: 1,
    name: 'El Arquitecto',
    role: 'Sistemas Críticos',
    icon: TerminalIcon,
    publicDesc: 'Diseña la estructura de microservicios y clusters de alta disponibilidad.',
    secret: 'Escribe código en Vim sin plugins. Odia usar el ratón.',
    secretColor: '#00ff66'
  },
  {
    id: 2,
    name: 'La Creativa',
    role: 'UI / UX Pro Max',
    icon: MonitorIcon,
    publicDesc: 'Convierte el caos de datos en interfaces brutalistas fluidas.',
    secret: 'Alinea los píxeles basándose en la proporción áurea. Duerme poco.',
    secretColor: '#ec4899'
  },
  {
    id: 3,
    name: 'El Motor WebGL',
    role: 'Gráficos & Shaders',
    icon: GamepadIcon,
    publicDesc: 'Programa shaders en GLSL que rompen los límites del navegador.',
    secret: 'Trata de optimizar hasta el microondas de la oficina.',
    secretColor: '#3b82f6'
  },
  {
    id: 4,
    name: 'El Pingüino',
    role: 'DevOps & Linux',
    icon: CoffeeIcon,
    publicDesc: 'Asegura que los despliegues en AWS sean invisibles y perfectos.',
    secret: 'Su café es 90% espresso, 10% ansiedad por el uptime.',
    secretColor: '#f59e0b'
  }
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
            className="group relative h-72 rounded-sm bg-[#0a0a0a] border border-white/10 overflow-hidden cursor-crosshair perspective-[1000px]"
          >
            {/* Front Card (Public Profile) */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between transition-transform duration-700 backface-hidden group-hover:transform-[rotateY(180deg)]">
              <div className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center text-zinc-400">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">{member.name}</h3>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">{member.role}</span>
                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">{member.publicDesc}</p>
              </div>
            </div>

            {/* Back Card (Easter Egg Secret) */}
            <div 
              className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center transition-transform duration-700 backface-hidden transform-[rotateY(-180deg)] group-hover:transform-[rotateY(0deg)]"
              style={{ backgroundColor: `${member.secretColor}15`, border: `1px solid ${member.secretColor}50` }}
            >
              <span className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: member.secretColor }}>
                [ TOP SECRET ]
              </span>
              <p className="text-sm font-bold text-white leading-relaxed">{member.secret}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
