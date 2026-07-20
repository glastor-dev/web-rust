export type ProjectCategory =
  | 'Todos'
  | 'Rust'
  | 'Servidores'
  | 'Migraciones'
  | 'Optimización'
  | 'Infraestructura';

import type { ArchitectureNode } from '../../components/ui/ArchitectureDiagram';

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  categories: ProjectCategory[];
  challenge: string[];
  solutionText: string;
  architectureDiagram?: ArchitectureNode[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  solutionArchitecture?: string[];
  solutionOptimizations?: string[];
  solutionPhases?: { title: string; points: string[] }[];
  resultsPerformance?: string[];
  resultsInfra?: string[];
  resultsBusiness?: string[];
  resultsTech?: string[];
  resultsOperative?: string[];
  resultsCost?: string[];
  resultsScalability?: string[];
  technologies: string;
  duration: string;
  investment: string;
  roi?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'pagos-rust',
    title: 'API de Procesamiento de Pagos en Rust',
    industry: 'Fintech & Pagos',
    categories: ['Rust', 'Optimización'],
    challenge: [
      'Plataforma de pagos online con 50,000 transacciones diarias experimentaba:',
      'Latencia p99: 800ms (inaceptable para usuarios)',
      'Caídas frecuentes durante picos de tráfico',
      'Costos de servidor: €8,000/mes',
      'Tiempo de respuesta inconsistente',
    ],
    solutionText: 'Migramos el sistema completo de Node.js a Rust en 8 semanas:',
    architectureDiagram: [
      { iconName: 'UserGroupIcon', label: 'Client' },
      { iconName: 'Server01Icon', label: 'Nginx LB' },
      { iconName: 'CpuIcon', label: 'Rust API' },
      { iconName: 'DatabaseIcon', label: 'PostgreSQL' },
    ],
    solutionArchitecture: [
      'API REST en Rust con Actix-web',
      'PostgreSQL optimizado con connection pooling',
      'Redis para caché de transacciones frecuentes',
      'Load balancing con Nginx',
      'Monitoreo con Prometheus + Grafana',
    ],
    solutionOptimizations: [
      'Estructuras de datos zero-copy',
      'Async/await para I/O no bloqueante',
      'Connection pooling optimizado',
      'Caché multinivel',
      'Compresión de respuestas',
    ],
    resultsPerformance: [
      'Latencia p99: 800ms → 23ms (97% mejora)',
      'Throughput: 200 req/s → 15,000 req/s (75x mejora)',
      'Tiempo de respuesta p50: 150ms → 8ms',
    ],
    resultsInfra: [
      'Servidores necesarios: 8 → 2 (75% reducción)',
      'Costo mensual: €8,000 → €2,000 (75% ahorro)',
      'Uptime: 98.5% → 99.99%',
    ],
    resultsBusiness: [
      'Conversión de usuarios: +23% (por mejora de velocidad)',
      'Soporte tickets: -65% (menos problemas)',
      'Escalabilidad: lista para 500,000 transacciones/día',
    ],
    technologies: 'Rust, Actix-web, PostgreSQL, Redis, Docker, Nginx, Prometheus',
    duration: '8 semanas (2 análisis, 5 desarrollo, 1 despliegue)',
    investment: '€35,000',
    roi: 'Recuperado en 4 meses por ahorro en infraestructura',
    testimonial: {
      quote:
        'Estábamos perdiendo transacciones y clientes en las horas pico. Glastor no solo reescribió nuestro core, sino que redujo nuestros costes operativos a una fracción. La latencia dejó de ser un tema de conversación en la junta directiva.',
      author: 'Carlos M.',
      role: 'CTO, Plataforma Top 5 Fintech LATAM',
    },
  },
  {
    id: 'mensajeria-rt',
    title: 'Plataforma de Mensajería en Tiempo Real',
    industry: 'Social & Comunicaciones',
    categories: ['Rust', 'Servidores', 'Infraestructura'],
    challenge: [
      'Startup de mensajería necesitaba escalar de 10,000 a 1,000,000 usuarios concurrentes.',
      'Sistema actual en Python no podía manejar la carga.',
    ],
    solutionText: 'Sistema distribuido en Rust con arquitectura event-driven:',
    architectureDiagram: [
      { iconName: 'SmartPhone01Icon', label: 'Mobile' },
      { iconName: 'AiNetworkIcon', label: 'Load Balancer' },
      { iconName: 'FlashIcon', label: 'Rust WebSocket' },
      { iconName: 'Layers01Icon', label: 'Kafka' },
    ],
    solutionArchitecture: [
      'Servidor de WebSocket en Rust',
      'Sistema de colas distribuidas',
      'Base de datos de series temporales',
      'CDN para mensajes estáticos',
      'Sistema de notificaciones push',
    ],
    solutionOptimizations: [
      'Mensajes en <50ms globalmente',
      'Soporte para 1M conexiones concurrentes',
      'Persistencia de mensajes offline',
      'Encriptación end-to-end',
      'Sincronización multi-dispositivo',
    ],
    resultsScalability: [
      'Usuarios concurrentes: 10,000 → 1,200,000',
      'Mensajes/segundo: 500 → 50,000',
      'Servidores: 5 → 12 (escalado eficiente)',
    ],
    resultsPerformance: [
      'Latencia mensaje: 200ms → 35ms',
      'Uso de memoria por conexión: 5MB → 0.5MB',
      'CPU usage: 85% → 35%',
    ],
    resultsBusiness: [
      'Costo por usuario: -80%',
      'Retención de usuarios: +40%',
      'Tiempo de carga: -75%',
    ],
    technologies: 'Rust, Tokio, WebSocket, Cassandra, Kafka, Kubernetes',
    duration: '12 semanas',
    investment: '€65,000',
    testimonial: {
      quote:
        'Pasar de 10k a más de un millón de usuarios concurrentes sin que el sistema pestañee es ingeniería pura. El equipo de Glastor nos dio la arquitectura que necesitábamos para sobrevivir a nuestra propia viralidad.',
      author: 'Elena V.',
      role: 'VP of Engineering, Startup Mensajería',
    },
  },
  {
    id: 'erp-legacy',
    title: 'Migración de ERP Legacy a Arquitectura Moderna',
    industry: 'Manufactura & Logística',
    categories: ['Migraciones', 'Rust'],
    challenge: [
      'Empresa manufacturera con ERP de 15 años:',
      'Código en Visual Basic y ASP clásico',
      'Base de datos Access (límite de 2GB)',
      'Sin API, imposible integrar con otros sistemas',
      'Caídas diarias, backups manuales',
      'Imposible escalar o añadir funcionalidades',
    ],
    solutionText: 'Migración gradual en 6 meses sin downtime:',
    architectureDiagram: [
      { iconName: 'Globe02Icon', label: 'React SPA' },
      { iconName: 'Exchange01Icon', label: 'API Gateway' },
      { iconName: 'CpuIcon', label: 'Rust Core' },
      { iconName: 'HardDriveIcon', label: 'Legacy DB' },
    ],
    solutionPhases: [
      {
        title: 'Fase 1: Análisis y planificación (4 semanas)',
        points: [
          'Mapeo completo de funcionalidades',
          'Identificación de dependencias críticas',
          'Plan de migración por módulos',
          'Estrategia de coexistencia temporal',
        ],
      },
      {
        title: 'Fase 2: Nueva plataforma (16 semanas)',
        points: [
          'Backend en Rust (API REST)',
          'Frontend en React',
          'PostgreSQL como base de datos principal',
          'Sistema de autenticación moderno',
          'API para integraciones externas',
        ],
      },
      {
        title: 'Fase 3: Migración de datos (4 semanas)',
        points: [
          'Scripts de migración automatizados',
          'Validación de integridad',
          'Migración incremental por módulos',
          'Rollback plan en cada paso',
        ],
      },
      {
        title: 'Fase 4: Despliegue paralelo (4 semanas)',
        points: [
          'Sistema antiguo y nuevo funcionando simultáneamente',
          'Sincronización bidireccional',
          'Testing con usuarios reales',
          'Cutover final sin interrupciones',
        ],
      },
    ],
    resultsTech: [
      'Uptime: 85% → 99.95%',
      'Tiempo de respuesta: 5s → 200ms',
      'Concurrent users: 50 → 500',
      'Integraciones posibles: 0 → 15',
    ],
    resultsOperative: [
      'Tiempo en backups: 2h/día → 0 (automatizado)',
      'Incidencias reportadas: 15/semana → 1/semana',
      'Tiempo para nuevas funcionalidades: 3 meses → 2 semanas',
    ],
    resultsBusiness: [
      'Productividad empleados: +35%',
      'Costos de mantenimiento: -70%',
      'Nuevas integraciones habilitadas (CRM, e-commerce, BI)',
    ],
    technologies: 'Rust, React, PostgreSQL, Docker, Nginx, Redis',
    duration: '6 meses',
    investment: '€120,000',
    roi: 'Recuperado en 18 meses',
    testimonial: {
      quote:
        'Teníamos pánico de tocar un sistema con 15 años de antigüedad que operaba toda la fábrica. El plan de migración fue clínico, quirúrgico y, lo más importante, no paramos la producción ni un solo día.',
      author: 'Roberto D.',
      role: 'Director de Operaciones, Grupo Manufacturero',
    },
  },
  {
    id: 'infra-opt',
    title: 'Reducción de Costos de Infraestructura en 75%',
    industry: 'E-commerce & Retail',
    categories: ['Infraestructura', 'Optimización'],
    challenge: [
      'E-commerce con crecimiento explosivo:',
      'Costos AWS: €25,000/mes (insostenible)',
      '15 microservicios en Node.js',
      'Base de datos sobredimensionada',
      'Sin optimización de recursos',
      'Escalado manual y reactivo',
    ],
    solutionText: 'Auditoría completa + optimización en 10 semanas:',
    architectureDiagram: [
      { iconName: 'CloudIcon', label: 'AWS ALB' },
      { iconName: 'AiNetworkIcon', label: 'K8s Cluster' },
      { iconName: 'CpuIcon', label: 'Rust Nodes' },
      { iconName: 'DatabaseIcon', label: 'AWS RDS' },
    ],
    solutionPhases: [
      {
        title: 'Análisis inicial',
        points: [
          'Mapeo de uso real vs provisionado',
          'Identificación de recursos infrautilizados',
          'Análisis de patrones de tráfico',
          'Evaluación de alternativas técnicas',
        ],
      },
      {
        title: '1. Right-sizing de instancias',
        points: [
          'Reducción de 40% en tamaño de instancias',
          'Uso de instancias spot para cargas no críticas',
        ],
      },
      {
        title: '2. Optimización de base de datos',
        points: [
          'Migración de MongoDB a PostgreSQL',
          'Indexación optimizada',
          'Connection pooling',
          'Caché de consultas frecuentes',
        ],
      },
      {
        title: '3. Auto-scaling inteligente',
        points: [
          'Escalado basado en métricas reales',
          'Programación de capacidad según patrones',
          'Reducción automática en horas valle',
        ],
      },
      {
        title: '4. Optimización de código',
        points: [
          'Migración de 3 servicios críticos a Rust',
          'Reducción de memoria 80%',
          'Mejora de throughput 10x',
        ],
      },
      {
        title: '5. Arquitectura de caché',
        points: ['Redis cluster para sesiones', 'CDN para estáticos', 'Caché de API responses'],
      },
    ],
    resultsCost: [
      'AWS mensual: €25,000 → €6,200 (75% reducción)',
      'Ahorro anual: €225,000',
      'ROI del proyecto: 3 meses',
    ],
    resultsPerformance: [
      'Latencia promedio: 450ms → 120ms',
      'Throughput: 3,000 → 25,000 req/s',
      'Tiempo de carga página: 4.2s → 1.8s',
    ],
    resultsOperative: [
      'Incidentes por mes: 12 → 2',
      'Tiempo de despliegue: 45min → 8min',
      'Escalado: manual → automático',
    ],
    technologies: 'Rust, PostgreSQL, Redis, AWS, Terraform, Kubernetes',
    duration: '10 semanas',
    investment: '€28,000',
    roi: '8x en el primer año',
    testimonial: {
      quote:
        'Pensábamos que nuestra factura de AWS era el precio a pagar por crecer. Glastor nos demostró que estábamos desperdiciando miles de euros por mala arquitectura. Su optimización pagó el proyecto en solo 3 meses.',
      author: 'Ana S.',
      role: 'CEO, E-commerce Internacional',
    },
  },
];
