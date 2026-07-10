export type PricingModel = {
  title: string;
  idealFor: string;
  features: string[];
  price: string;
  priceUnit: string;
  timeline: string;
  cta: string;
  link: string;
  featured: boolean;
};

export const models: PricingModel[] = [
  {
    title: 'Proyecto Fijo',
    idealFor: 'Proyectos con requisitos bien definidos',
    features: [
      'Alcance y presupuesto cerrados',
      'Entregas en fechas acordadas',
      'Pagos por hitos completados',
      'Incluye 3 meses de soporte post-lanzamiento',
    ],
    price: '€8,000',
    priceUnit: 'desde',
    timeline: 'Plazo típico: 4-12 semanas',
    cta: 'Solicitar presupuesto fijo',
    link: '#contacto',
    featured: false,
  },
  {
    title: 'Retainer Mensual',
    idealFor: 'Soporte continuo y desarrollo iterativo',
    features: [
      'Horas garantizadas cada mes',
      'Prioridad en atención',
      'Descuento del 15% sobre tarifa estándar',
      'Acumulación de horas no usadas (hasta 3 meses)',
    ],
    price: '€3,000',
    priceUnit: '/mes (40 horas)',
    timeline: 'Contrato: Mínimo 3 meses',
    cta: 'Contratar retainer',
    link: '#contacto',
    featured: true,
  },
  {
    title: 'Tiempo y Materiales',
    idealFor: 'Proyectos en evolución o mantenimiento continuo',
    features: [
      'Facturación por horas trabajadas',
      'Flexibilidad para cambiar prioridades',
      'Reporting semanal detallado',
      'Sin compromisos a largo plazo',
    ],
    price: '€75-95',
    priceUnit: '/hora según complejidad',
    timeline: 'Mínimo: 20 horas/mes',
    cta: 'Contratar horas',
    link: '#contacto',
    featured: false,
  },
];
