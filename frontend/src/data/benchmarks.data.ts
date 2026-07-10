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
    title: 'LATENCIA p99 (ms) - menor es mejor',
    items: [
      { name: 'Python', value: 450, max: 500, color: 'bg-zinc-700', suffix: 'ms' },
      { name: 'Node.js', value: 250, max: 500, color: 'bg-zinc-600', suffix: 'ms' },
      { name: 'Go', value: 80, max: 500, color: 'bg-zinc-500', suffix: 'ms' },
      { name: 'Rust (Glastor)', value: 15, max: 500, color: 'bg-brand', suffix: 'ms' },
    ],
  },
  {
    title: 'THROUGHPUT (req/s) - mayor es mejor',
    items: [
      { name: 'Python', value: 3000, max: 50000, color: 'bg-zinc-700', suffix: '' },
      { name: 'Node.js', value: 8000, max: 50000, color: 'bg-zinc-600', suffix: '' },
      { name: 'Go', value: 20000, max: 50000, color: 'bg-zinc-500', suffix: '' },
      { name: 'Rust (Glastor)', value: 50000, max: 50000, color: 'bg-brand', suffix: '' },
    ],
  },
  {
    title: 'USO DE MEMORIA (MB) - menor es mejor',
    items: [
      { name: 'Python', value: 400, max: 500, color: 'bg-zinc-700', suffix: 'MB' },
      { name: 'Node.js', value: 300, max: 500, color: 'bg-zinc-600', suffix: 'MB' },
      { name: 'Go', value: 150, max: 500, color: 'bg-zinc-500', suffix: 'MB' },
      { name: 'Rust (Glastor)', value: 50, max: 500, color: 'bg-brand', suffix: 'MB' },
    ],
  },
];

export const advantages: Advantage[] = [
  {
    title: 'Menos servidores',
    desc: 'Rust usa 70-90% menos memoria, necesitas menos infraestructura',
  },
  { title: 'Más velocidad', desc: 'Respuestas en milisegundos, no segundos' },
  { title: 'Más escalabilidad', desc: 'Maneja 10x más tráfico con los mismos recursos' },
  { title: 'Menos bugs', desc: 'El compilador elimina clases enteras de errores' },
  { title: 'Menos costos', desc: 'Ahorra miles de euros al mes en servidores' },
];
