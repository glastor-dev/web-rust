export type BenchmarkItem = {
  name: string;
  value: number;
  max: number;
  color: string;
  suffix: string;
};

export type BenchmarkCategory = {
  title: string;
  items: BenchmarkItem[];
};

export type Advantage = {
  title: string;
  desc: string;
};

export const benchmarks: BenchmarkCategory[] = [
  {
    title: 'LATENCIA p99 DETERMINISTA (ms) - menor es mejor',
    items: [
      { name: 'Python (FastAPI)', value: 450, max: 500, color: 'bg-zinc-700', suffix: 'ms' },
      { name: 'Node.js (Fastify)', value: 250, max: 500, color: 'bg-zinc-600', suffix: 'ms' },
      { name: 'Go (Gin + GC)', value: 80, max: 500, color: 'bg-zinc-500', suffix: 'ms' },
      { name: 'Rust (Axum + Glastor)', value: 12, max: 500, color: 'bg-brand', suffix: 'ms' },
    ],
  },
  {
    title: 'THROUGHPUT SATURADO (req/s) - mayor es mejor',
    items: [
      { name: 'Python (FastAPI)', value: 3000, max: 50000, color: 'bg-zinc-700', suffix: '' },
      { name: 'Node.js (Fastify)', value: 8000, max: 50000, color: 'bg-zinc-600', suffix: '' },
      { name: 'Go (Gin)', value: 22000, max: 50000, color: 'bg-zinc-500', suffix: '' },
      { name: 'Rust (Axum + Tokio)', value: 50000, max: 50000, color: 'bg-brand', suffix: '' },
    ],
  },
  {
    title: 'CONSUMO RESIDENT MEMORY (MB) - menor es mejor',
    items: [
      { name: 'Python', value: 420, max: 500, color: 'bg-zinc-700', suffix: 'MB' },
      { name: 'Node.js (V8 Heap)', value: 310, max: 500, color: 'bg-zinc-600', suffix: 'MB' },
      { name: 'Go (GC Overhead)', value: 160, max: 500, color: 'bg-zinc-500', suffix: 'MB' },
      { name: 'Rust (Zero-Allocation)', value: 35, max: 500, color: 'bg-brand', suffix: 'MB' },
    ],
  },
];

export const advantages: Advantage[] = [
  {
    title: 'Latencia Plana en p99 / p99.9',
    desc: 'Sin Garbage Collector. Se eliminan por completo las pausas Stop-The-World (100–300ms) típicas de Go y Java.',
  },
  {
    title: 'Concurrencia Matemática sin Locks',
    desc: 'Los traits Send y Sync verificados en compilación evitan data races sin recurrir a mutexes que estrangulan la CPU.',
  },
  {
    title: 'Zero-Allocation en el Hot-Path',
    desc: 'Estructuras alineadas a la caché L1/L2. Procesamiento de paquetes y streaming in-place sin fragmentación de heap.',
  },
  {
    title: 'Reducción Drástica de Costos Cloud',
    desc: 'Rust consume entre un 70% y un 90% menos memoria RAM, permitiendo consolidar clústeres Kubernetes a 1/5 de nodos.',
  },
  {
    title: 'Seguridad Matemática y Cero Panics',
    desc: 'Borrow checker y sistema de tipos algebraicos: sin null pointer exceptions ni buffer overflows en producción.',
  },
];
