import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { ServerIcon, SearchIcon, RocketIcon, ChevronDown, Code2Icon, CloudCogIcon, UsersIcon } from 'lucide-react';
import { ServiceDetail } from './ServiceDetail';

const tabs = ["Para Startups", "Para Enterprise", "Sistemas Críticos"];

const services = [
  // --- PARA STARTUPS ---
  {
    id: 's4',
    category: 'Para Startups',
    level: 'NIVEL 01',
    title: 'MVP de Alta Velocidad',
    short: 'Lanzamiento en semanas, no meses.',
    icon: Code2Icon,
    metrics: '-60% Time-to-Market',
    bullets: [
      'Arquitectura base en Rust/Next.js para no reescribir cuando escales.',
      'Diseño brutalista orientado a conversión.',
      'Despliegue automatizado continuo (CI/CD).'
    ],
    weeks: [
      { w: 'Semana 1-2', text: 'Discovery & Design System' },
      { w: 'Semana 3-6', text: 'Desarrollo MVP Core' }
    ]
  },
  {
    id: 's3',
    category: 'Para Startups',
    level: 'NIVEL 02',
    title: 'Frontend Reactivo (WebGL)',
    short: 'Interfaces 3D de 60fps.',
    icon: RocketIcon,
    metrics: '< 1.2s FCP',
    bullets: [
      'Motores de renderizado custom con React Three Fiber.',
      'Físicas de scroll inercial (Lenis).',
      'Optimización agresiva de LCP y Core Web Vitals.'
    ],
    weeks: [
      { w: 'Semana 1-2', text: 'UI Architecture & Design System' },
      { w: 'Semana 3-4', text: 'Integración WebGL y Shaders' }
    ]
  },

  // --- PARA ENTERPRISE ---
  {
    id: 's5',
    category: 'Para Enterprise',
    level: 'NIVEL 03',
    title: 'Refactorización Cloud',
    short: 'Bajamos tu factura de AWS.',
    icon: CloudCogIcon,
    metrics: '-60% Costos Server',
    star: true,
    bullets: [
      'Identificación de cuellos de botella en microservicios Java/Node.',
      'Reescritura de workers pesados a binarios nativos en Rust.',
      'Despliegue optimizado en contenedores ultraligeros (Scratch).'
    ],
    weeks: [
      { w: 'Semana 1-2', text: 'Análisis de Costos y Profiling' },
      { w: 'Semana 3-6', text: 'Migración y Stress Testing' }
    ]
  },
  {
    id: 's6',
    category: 'Para Enterprise',
    level: 'NIVEL 04',
    title: 'Staff Augmentation Élite',
    short: 'Ingenieros Rust en tu equipo.',
    icon: UsersIcon,
    metrics: 'Top 1% Talento',
    bullets: [
      'Inyección de desarrolladores Senior en tus operaciones diarias.',
      'Capacitación técnica de tu equipo interno en Rust.',
      'Establecimiento de estándares de calidad Glastor.'
    ],
    weeks: [
      { w: 'Semana 1', text: 'Onboarding de Arquitectura' },
      { w: 'Continuo', text: 'Desarrollo Core & Mentoring' }
    ]
  },

  // --- SISTEMAS CRÍTICOS ---
  {
    id: 's1',
    category: 'Sistemas Críticos',
    level: 'NIVEL 05',
    title: 'Auditoría & Discovery',
    short: 'Identificamos cuellos de botella.',
    icon: SearchIcon,
    metrics: '-40% Deuda Técnica',
    bullets: [
      'Análisis de arquitectura actual (Bottlenecks).',
      'Revisión de latencia y escalabilidad.',
      'Diseño de estrategia de migración a Rust/Bun.'
    ],
    weeks: [
      { w: 'Semana 1', text: 'Mapeo de Arquitectura y Telemetría' },
      { w: 'Semana 2', text: 'Profiling de Rendimiento y Memoria' }
    ]
  },
  {
    id: 's2',
    category: 'Sistemas Críticos',
    level: 'NIVEL 06',
    title: 'Core Backend en Rust',
    short: 'Reescritura del motor crítico.',
    icon: ServerIcon,
    metrics: '+800% Rendimiento',
    star: true,
    bullets: [
      'Microservicios ultra-ligeros y seguros en memoria.',
      'Integración con gRPC y WebSockets nativos.',
      'Tolerancia a fallos y concurrencia masiva.'
    ],
    weeks: [
      { w: 'Semana 1-2', text: 'Modelado de Datos y Setup gRPC' },
      { w: 'Semana 3-4', text: 'Desarrollo de Lógica Core' },
      { w: 'Semana 5-6', text: 'Stress Testing (10k+ TPS)' }
    ]
  }
];

export default function ServicesListSection() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(tabs[2]); // Default to "Sistemas Críticos"

  return (
    <section className="py-32 relative max-w-7xl mx-auto px-6 md:px-12" id="servicios">
      <SectionHeader title="NIVELES DE ESCALADO" subtitle="Nuestra Arquitectura Táctica" titleClassName="text-fluid-h3" />

      {/* Segmented Control / Pill Filters */}
      <div className="flex justify-start mb-16">
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 relative">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-colors duration-300 z-10 ${
                  isActive ? 'text-black' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-brand rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {services.filter(s => s.category === activeTab).map((service) => {
          const Icon = service.icon;
          const isActive = activeService === service.id;

          return (
            <motion.div 
              key={service.id}
              layout
              onClick={() => setActiveService(isActive ? null : service.id)}
              className={`group relative bg-[#050505] cursor-pointer transition-all duration-500 overflow-hidden 
                border-l-[6px] ${isActive ? 'border-brand bg-[#0a0a0a]' : 'border-transparent hover:border-brand/50 hover:bg-[#0a0a0a]'} 
                ${service.star ? 'border-y border-r border-brand/20 shadow-[0_0_40px_rgba(0,255,102,0.05)]' : 'border-y border-r border-white/10'}`}
            >
              {service.star && (
                <div className="absolute top-0 right-0 px-6 py-2 bg-brand text-black text-[10px] font-black tracking-widest uppercase origin-top-right transform translate-x-2 -translate-y-1 shadow-lg">
                  Módulo Estrella
                </div>
              )}

              {/* Header Row */}
              <div className="p-6 md:p-10 flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                <div className="flex items-center gap-6 md:w-5/12">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-sm transition-colors duration-300 ${
                    isActive ? 'bg-brand/20 text-brand' : 'bg-white/5 text-zinc-500 group-hover:text-white group-hover:bg-white/10'
                  }`}>
                    <Icon size={28} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 tracking-widest mb-2 block">{service.level}</span>
                    <h3 className={`text-xl md:text-3xl font-black uppercase tracking-tighter transition-colors duration-300 ${
                      isActive || service.star ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                    }`}>
                      {service.title}
                    </h3>
                  </div>
                </div>

                <div className="md:w-3/12 text-zinc-400 font-mono text-sm tracking-wide">
                  {service.short}
                </div>

                <div className="md:w-4/12 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Impacto Esperado</span>
                    <span className="text-brand font-mono font-bold tracking-tight text-lg">{service.metrics}</span>
                  </div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
                    isActive ? 'border-brand text-brand rotate-180 bg-brand/10' : 'border-white/10 text-zinc-500 group-hover:border-white/30 group-hover:text-white'
                  }`}>
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

              {/* Expanded Content (Hover/Click) */}
              <AnimatePresence>
                {isActive && (
                  <ServiceDetail bullets={service.bullets} weeks={service.weeks} />
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
