import {
  ServerIcon,
  SearchIcon,
  RocketIcon,
  Code2Icon,
  CloudCogIcon,
  UsersIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const tabs = ['Startups', 'Enterprise', 'Sistemas Críticos'];

export type ServiceWeek = {
  w: string;
  text: string;
};

export type ServiceData = {
  id: string;
  category: string;
  level: string;
  title: string;
  short: string;
  icon: LucideIcon;
  metrics: string;
  star?: boolean;
  bullets: string[];
  weeks: ServiceWeek[];
};

export const services: ServiceData[] = [
  // --- PARA STARTUPS ---
  {
    id: 's4',
    category: 'Startups',
    level: 'NIVEL 01',
    title: 'MVP de Alta Velocidad',
    short: 'Lanzamiento en semanas, no meses.',
    icon: Code2Icon,
    metrics: '-60% Time-to-Market',
    bullets: [
      'Arquitectura base en Rust/Next.js para no reescribir cuando escales.',
      'Diseño brutalista orientado a conversión.',
      'Despliegue automatizado continuo (CI/CD).',
    ],
    weeks: [
      { w: 'Semana 1-2', text: 'Discovery & Design System' },
      { w: 'Semana 3-6', text: 'Desarrollo MVP Core' },
    ],
  },
  {
    id: 's3',
    category: 'Startups',
    level: 'NIVEL 02',
    title: 'Frontend Reactivo (WebGL)',
    short: 'Interfaces 3D de 60fps.',
    icon: RocketIcon,
    metrics: '< 1.2s FCP',
    bullets: [
      'Motores de renderizado custom con React Three Fiber.',
      'Físicas de scroll inercial (Lenis).',
      'Optimización agresiva de LCP y Core Web Vitals.',
    ],
    weeks: [
      { w: 'Semana 1-2', text: 'UI Architecture & Design System' },
      { w: 'Semana 3-4', text: 'Integración WebGL y Shaders' },
    ],
  },

  // --- PARA ENTERPRISE ---
  {
    id: 's5',
    category: 'Enterprise',
    level: 'NIVEL 03',
    title: 'Refactorización Cloud',
    short: 'Bajamos tu factura de AWS.',
    icon: CloudCogIcon,
    metrics: '-60% Costos Server',
    star: true,
    bullets: [
      'Identificación de cuellos de botella en microservicios Java/Node.',
      'Reescritura de workers pesados a binarios nativos en Rust.',
      'Despliegue optimizado en contenedores ultraligeros (Scratch).',
    ],
    weeks: [
      { w: 'Semana 1-2', text: 'Análisis de Costos y Profiling' },
      { w: 'Semana 3-6', text: 'Migración y Stress Testing' },
    ],
  },
  {
    id: 's6',
    category: 'Enterprise',
    level: 'NIVEL 04',
    title: 'Staff Augmentation Élite',
    short: 'Ingenieros Rust en tu equipo.',
    icon: UsersIcon,
    metrics: 'Top 1% Talento',
    bullets: [
      'Inyección de desarrolladores Senior en tus operaciones diarias.',
      'Capacitación técnica de tu equipo interno en Rust.',
      'Establecimiento de estándares de calidad Glastor.',
    ],
    weeks: [
      { w: 'Semana 1', text: 'Onboarding de Arquitectura' },
      { w: 'Continuo', text: 'Desarrollo Core & Mentoring' },
    ],
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
      'Diseño de estrategia de migración a Rust/Bun.',
    ],
    weeks: [
      { w: 'Semana 1', text: 'Mapeo de Arquitectura y Telemetría' },
      { w: 'Semana 2', text: 'Profiling de Rendimiento y Memoria' },
    ],
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
      'Tolerancia a fallos y concurrencia masiva.',
    ],
    weeks: [
      { w: 'Semana 1-2', text: 'Modelado de Datos y Setup gRPC' },
      { w: 'Semana 3-4', text: 'Desarrollo de Lógica Core' },
      { w: 'Semana 5-6', text: 'Stress Testing (10k+ TPS)' },
    ],
  },
];
