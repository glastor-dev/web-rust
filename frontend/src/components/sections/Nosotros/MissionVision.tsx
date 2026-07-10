import { motion } from 'motion/react';
import { CheckCircle2Icon } from 'lucide-react';

const bullets = [
  {
    title: 'Innovación constante',
    desc: 'empujamos los límites de la tecnología en cada proyecto',
  },
  { title: 'Colaboración abierta', desc: 'código open source y aportes para la comunidad' },
  {
    title: 'Excelencia técnica',
    desc: 'infraestructura de alto rendimiento (HPC) sin concesiones',
  },
  {
    title: 'Estructura híbrida',
    desc: 'combinamos impacto tecnológico con crecimiento sostenible',
  },
];

export function MissionVision() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Izquierda: Misión y Visión */}
        <div>
          <div className="bg-brand text-black font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-8 rounded-sm inline-block">
            Misión & Visión
          </div>

          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-8 text-white">
            TECNOLOGÍA <br />
            <span className="text-zinc-500">AL SERVICIO</span> <br />
            <span className="text-brand">DE TODOS</span>
          </h2>

          <p className="text-zinc-300 text-lg leading-relaxed mb-6 max-w-xl">
            Nuestra misión original fue garantizar que las herramientas digitales avanzadas
            estuviesen disponibles en beneficio de toda la comunidad tecnológica.
          </p>

          <p className="text-zinc-400 text-base leading-relaxed mb-12 max-w-xl">
            En 2015 evolucionamos hacia una estructura híbrida — permitiéndonos atraer inversores y
            expandir nuestras capacidades operativas sin abandonar jamás nuestros valores
            fundacionales de calidad y precisión.
          </p>

          <ul className="space-y-4">
            {bullets.map((bullet, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2Icon className="text-brand w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-zinc-300 text-sm md:text-base">
                  <strong className="text-white font-medium">{bullet.title}</strong> —{' '}
                  <span className="text-zinc-500">{bullet.desc}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Derecha: Información Corporativa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0A0D0B] border border-brand/10 p-8 md:p-12 rounded-2xl sticky top-24 lg:mt-24"
        >
          <div className="flex items-center gap-3 mb-10">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-brand"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm">
              Información Corporativa
            </h3>
          </div>

          <div className="space-y-6">
            <div className="border-b border-white/5 pb-6">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold block mb-1">
                Empresa / Marca Registrada
              </span>
              <span className="text-white font-bold text-sm">
                GLASTOR® (INPI Reg. 4559568 y 4559567 — 19/08/2025)
              </span>
            </div>

            <div className="border-b border-white/5 pb-6">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold block mb-1">
                Fundación
              </span>
              <span className="text-white font-bold text-sm">
                2010 — Enfoque inicial de alto rendimiento
              </span>
            </div>

            <div className="border-b border-white/5 pb-6">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold block mb-1">
                Estructura Actual
              </span>
              <span className="text-white font-bold text-sm">Entidad híbrida desde 2015</span>
            </div>

            <div className="border-b border-white/5 pb-6">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold block mb-1">
                Sede Actual
              </span>
              <span className="text-white font-bold text-sm">Girona, España (desde 2023)</span>
            </div>

            <div className="border-b border-white/5 pb-6">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold block mb-1">
                Áreas de Actividad
              </span>
              <span className="text-white font-bold text-sm">
                Rust · Python · Diseño Creativo y Contenido
              </span>
            </div>

            <div className="pt-2">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold block mb-1">
                Contacto Comercial
              </span>
              <a
                href="mailto:ventas@glastor.es"
                className="text-brand font-bold text-sm hover:underline"
              >
                ventas@glastor.es
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
