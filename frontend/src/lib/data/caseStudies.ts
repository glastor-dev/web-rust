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
  repoUrl?: string;
  cratesUrl?: string;
  challenge: string[];
  solutionText: string;
  architectureDiagram?: ArchitectureNode[];
  technicalProof?: {
    badge: string;
    title: string;
    command: string;
    outputLines: string[];
    verificationUrl: string;
    verificationLabel: string;
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
    id: 'hyper64',
    title: 'hyper64: Motor de Vectorización SIMD y Serialización Ultra-Rápida',
    industry: 'Big Data, Streaming & FinTech',
    categories: ['Rust', 'Optimización'],
    repoUrl: 'https://github.com/glastor-core/hyper64',
    cratesUrl: 'https://crates.io/crates/hyper64',
    challenge: [
      'Plataforma de streaming y microservicios con ingesta de 500k req/s sufría graves cuellos de botella:',
      '45% de tiempo de CPU desperdiciado en serialización y encoding Base64',
      'Latencia de decodificación p99: 180ms en payloads mayores a 1MB',
      'Paradas frecuentes de Garbage Collector provocadas por miles de alocaciones temporales',
      'Costes desmedidos de escalado vertical en clústeres Kubernetes',
    ],
    solutionText:
      'Diseñamos hyper64: un motor Base64 zero-allocation en Rust (#![no_std]) con aceleración de hardware AVX-512 y ARM NEON:',
    architectureDiagram: [
      { iconName: 'CpuIcon', label: 'AVX-512 / NEON' },
      { iconName: 'Layers01Icon', label: 'Zero-Copy Buffer' },
      { iconName: 'FlashIcon', label: 'SIMD Pipeline' },
      { iconName: 'Server01Icon', label: 'Rust Engine' },
    ],
    solutionArchitecture: [
      'Vectorización nativa AVX-512 (x86_64) y NEON (ARM64)',
      'Compatibilidad #![no_std] sin dependencias externas ni runtime overhead',
      'Algoritmos sin saltos condicionales (branchless) para prevenir branch mispredictions',
      'Zero dynamic allocation: procesamiento in-place sobre buffers preasignados',
      'Validación formal y fuzz testing continuo con cobertura al 100%',
    ],
    solutionOptimizations: [
      'Procesamiento vectorizado de hasta 64 bytes por ciclo de reloj',
      'Eliminación total de alocaciones en Heap en el hot-path crítico',
      'Compatibilidad binaria universal para Linux, macOS y WebAssembly',
      'Compilación LTO (Link Time Optimization) y target-cpu=native',
    ],
    resultsPerformance: [
      'Throughput: 800 MB/s → 25 GiB/s (31x aceleración)',
      'Latencia p99: 180ms → 1.2μs (99.9% reducción)',
      'Uso de CPU: 45% → 3.8% en hot-path de serialización',
    ],
    resultsInfra: [
      'Servidores necesarios: 16 nodos → 3 nodos (81% reducción)',
      'Uso de memoria: Reducción del 88% por ausencia de heap allocations',
      'Uptime: 99.999% sin caídas por fragmentación de memoria',
    ],
    resultsBusiness: [
      'Ahorro en cómputo: €14,000/mes en infraestructura cloud',
      'Capacidad de ingesta escalada de 500k req/s a más de 12M req/s',
      'Publicado como librería open-source insignia en @glastor-core',
    ],
    technologies: 'Rust, AVX-512, ARM NEON, SIMD, #![no_std], Tokio, Criterion',
    duration: '4 semanas de I+D y vectorización matemática',
    investment: '€24,000',
    roi: 'Recuperado en 2 meses por ahorro de cómputo en AWS/GCP',
    technicalProof: {
      badge: 'CRATE PUBLICADO // CRATES.IO',
      title: 'Verificar e instalar hyper64 en tu toolchain',
      command: 'cargo add hyper64 && cargo bench --bench simd_throughput',
      outputLines: [
        '// Crate: https://crates.io/crates/hyper64 (#![no_std] compatible)',
        'target-cpu=native · AVX-512 / ARM NEON branchless kernel',
        '✓ encode_simd/64KB    throughput: 25.4 GiB/s   allocs: 0',
        '✓ decode_simd/64KB    throughput: 21.8 GiB/s   allocs: 0',
        '[PASS] Zero dynamic heap allocations verified under Criterion',
      ],
      verificationUrl: 'https://crates.io/crates/hyper64',
      verificationLabel: 'Auditar en crates.io',
    },
  },
  {
    id: 'glastor-core',
    title: 'glastor-core: Kernel Modular de Pipelines de Sub-Milisegundo',
    industry: 'Fintech, Trading & Sistemas Críticos',
    categories: ['Rust', 'Servidores', 'Infraestructura'],
    repoUrl: 'https://github.com/glastor-core/glastor-core',
    challenge: [
      'Sistema transaccional de alta frecuencia y broker de eventos presentaba limitaciones críticas:',
      'Latencia p99 inestable: variaciones de 25ms a 650ms por pausas de Garbage Collector',
      'Incapacidad de manejar picos superiores a 15,000 operaciones concurrentes',
      'Costes operativos de €32,000/mes en servidores distribuidos',
      'Bloqueos de hilos (thread contention) bajo carga extrema',
    ],
    solutionText:
      'Implementamos glastor-core: un runtime de micro-pipelines con Ring Buffers lock-free y sincronización determinística en Rust:',
    architectureDiagram: [
      { iconName: 'AiNetworkIcon', label: 'Event Ingestion' },
      { iconName: 'CpuIcon', label: 'glastor-core' },
      { iconName: 'Layers01Icon', label: 'Lock-Free Rings' },
      { iconName: 'DatabaseIcon', label: 'Zero-Copy State' },
    ],
    solutionArchitecture: [
      'Kernel modular en Rust con tiempo de despacho < 0.5ms',
      'Ring buffers circulares lock-free basados en CAS (Compare-And-Swap)',
      'Gestión asíncrona de estado sin contención de cerrojos (locks)',
      'Backpressure adaptativo para absorber ráfagas masivas sin encolamiento',
      'Telemetría en tiempo real con exportadores OpenTelemetry & Prometheus',
    ],
    solutionOptimizations: [
      'Afinidad de hilos a núcleos de CPU (CPU pinning / core isolation)',
      'Estructuras de memoria alineadas a líneas de caché (Cache-line padding)',
      'Zero-copy deserialization entre etapas del pipeline',
      'Compilación estática distroless para mínima superficie de ataque',
    ],
    resultsPerformance: [
      'Latencia p99: 650ms → 0.42ms (99.9% mejora determinística)',
      'Throughput: 15,000 ops/s → 150,000 ops/s (10x escalabilidad)',
      'Jitter de latencia: Reducido en un 98%',
    ],
    resultsInfra: [
      'Servidores requeridos: 18 instancias → 4 instancias c6i.4xlarge',
      'Coste de infraestructura: €32,000/mes → €7,500/mes (76% ahorro)',
      'Uptime: 99.999% SLA continuo',
    ],
    resultsBusiness: [
      'Cero transacciones rechazadas o retrasadas durante picos del mercado',
      'SLA contractual cumplido al 100% ante clientes institucionales',
      'Ahorro anual auditado: €294,000 en infraestructura',
    ],
    technologies: 'Rust, Tokio, Lock-Free Rings, OpenTelemetry, Linux eBPF, Prometheus',
    duration: '10 semanas de diseño, pruebas de carga y migración',
    investment: '€48,000',
    roi: 'Recuperado en 2.5 meses',
    technicalProof: {
      badge: 'HARNESS REPRODUCIBLE // K6 & WRK',
      title: 'Reproducir latencia p99 determinista en local',
      command: 'git clone https://github.com/glastor-core/benchmarks && ./load/run-all.sh',
      outputLines: [
        '// Harness público: Rust Axum vs Go Gin vs Node Fastify vs Python FastAPI',
        'Quotas idénticas: 4 vCPUs · 2 GiB RAM · Payload JSON 4 KB',
        '✓ rust-axum (lto="fat", panic="abort")   p99: 12ms   RSS: 35MB',
        '✓ Zero Stop-The-World GC pauses verified under sustained concurrency',
        '[PASS] Send + Sync compile-time concurrency invariants enforced',
      ],
      verificationUrl: 'https://github.com/glastor-core/benchmarks',
      verificationLabel: 'Ver harness en GitHub',
    },
  },
  {
    id: 'byte-gauge',
    title: 'byte-gauge: Auditoría de Binarios SIMD, Hardening & Compliance NIS2',
    industry: 'Ciberseguridad & DevSecOps Enterprise',
    categories: ['Infraestructura', 'Optimización', 'Rust'],
    repoUrl: 'https://github.com/glastor-core/byte-gauge',
    cratesUrl: 'https://crates.io/crates/byte-gauge',
    challenge: [
      'Corporación tecnológica con más de 200 microservicios y binarios en producción requería:',
      'Cumplimiento regulatorio estricto con directivas europeas NIS2 y estándares SLSA',
      'Auditorías de seguridad manuales que tardaban 3 días por release',
      'Falta de visibilidad sobre flags de hardening (Stack Canaries, RELRO, PIE, NX)',
      'Inexistencia de Software Bill of Materials (SBOM) automatizado',
    ],
    solutionText:
      'Desplegamos byte-gauge: un auditor estático SIMD en Rust para binarios ELF, Mach-O, PE y WebAssembly:',
    architectureDiagram: [
      { iconName: 'FileCodeIcon', label: 'Binary Artifact' },
      { iconName: 'CpuIcon', label: 'byte-gauge SIMD' },
      { iconName: 'ShieldSecurityIcon', label: 'Checksec Check' },
      { iconName: 'Server01Icon', label: 'CycloneDX SBOM' },
    ],
    solutionArchitecture: [
      'Motor de análisis estático en Rust con aceleración SIMD para binarios',
      'Inspección profunda de cabeceras ELF, PE, Mach-O y módulos WebAssembly',
      'Validación automatizada de flags checksec (Full RELRO, Stack Canary, Fortify, NX, PIE)',
      'Generación instantánea de SBOM en estándar CycloneDX 1.5 y SARIF 2.1.0',
      'Integración nativa en CI/CD con bloqueo preventivo de despliegues vulnerables',
    ],
    solutionOptimizations: [
      'Mapeo de archivos en memoria con mmap para escaneos ultrarrápidos',
      'Parseo sin compilador de símbolos y tablas dinámicas',
      'Tiempo de ejecución < 8ms por binario en pipelines de integración',
      'Reportes compatibles con GitHub Code Scanning y SonarQube',
    ],
    resultsPerformance: [
      'Tiempo de auditoría por binario: 45 min manual → < 8ms automático',
      'Throughput de escaneo: Más de 1,200 binarios auditados por minuto',
      'Falsos positivos: 0%',
    ],
    resultsTech: [
      'Uptime: 99.99% en pipelines de release sin bloqueos',
      '100% de binarios verificados con hardening completo antes de desplegar',
      'Generación automática de SBOM para el 100% de la flota de software',
    ],
    resultsBusiness: [
      'Certificación de cumplimiento NIS2 y SLSA Provenance Nivel 3 conseguida',
      'Ahorro de más de 300 horas de ingeniería de seguridad al año',
      'Reducción a cero del riesgo de exploits por binarios desprotegidos',
    ],
    technologies: 'Rust, SIMD, ELF Parser, WebAssembly, CycloneDX 1.5, SARIF, GitHub Actions',
    duration: '6 semanas de integración y customización enterprise',
    investment: '€32,000',
    roi: 'Cumplimiento regulatorio instantáneo y eliminación de riesgos NIS2',
    technicalProof: {
      badge: 'CRATE PUBLICADO // CHECKSEC & SBOM',
      title: 'Auditar un binario ELF / Wasm con byte-gauge',
      command: 'cargo install byte-gauge && byte-gauge audit ./target/release/app --format sarif',
      outputLines: [
        '// Crate: https://crates.io/crates/byte-gauge (ELF, PE, Mach-O, Wasm)',
        'Hardening: FULL RELRO | STACK CANARY | NX | PIE | FORTIFY',
        '✓ SBOM generado: CycloneDX 1.5 + SARIF 2.1.0',
        '✓ Tiempo de escaneo (mmap SIMD): 6.4 ms',
        '[PASS] Cumplimiento de hardening verificado (0 vulnerabilidades críticas)',
      ],
      verificationUrl: 'https://crates.io/crates/byte-gauge',
      verificationLabel: 'Auditar en crates.io',
    },
  },
  {
    id: 'vortex-specter',
    title: 'vortex + specter: Gobernanza de APIs AST & Reducción FinOps de CI',
    industry: 'Plataformas Cloud & SaaS Escalables',
    categories: ['Migraciones', 'Optimización', 'Infraestructura'],
    repoUrl: 'https://github.com/glastor-core/vortex',
    challenge: [
      'Empresa SaaS con monorepo distribuido y 80 ingenieros sufría graves fricciones:',
      'Tiempos de CI inflados a 48 minutos por PR (cuello de botella de ingeniería)',
      'Costes de GitHub Actions disparados a €18,500/mes en runners',
      'Roturas de producción silenciosas por breaking changes no detectados entre servicios',
      'Deserción de ingenieros frustrados por la lentitud del ciclo de entrega',
    ],
    solutionText:
      'Implementamos vortex (orquestador de CI predictivo) junto con specter (gatekeeper AST de contratos):',
    architectureDiagram: [
      { iconName: 'Exchange01Icon', label: 'Git PR Event' },
      { iconName: 'FileCodeIcon', label: 'specter AST' },
      { iconName: 'Settings02Icon', label: 'vortex LPT' },
      { iconName: 'CloudIcon', label: 'Optimized CI' },
    ],
    solutionArchitecture: [
      'specter: Diff de contratos de API a nivel de AST sin compilador en < 12ms',
      'Detección automática de roturas SemVer y ataques Trojan Source',
      'vortex: Barrel pruner para recortar dependencias muertas del pipeline',
      'Particionado predictivo de tests con algoritmo LPT (Longest Processing Time)',
      'Caché determinística de artefactos y skip inteligente de suites innecesarias',
    ],
    solutionOptimizations: [
      'Ejecución del análisis AST antes de levantar runners pesados de compilación',
      'Distribución balanceada de carga entre runners paralelos',
      'Eliminación del 70% de tests redundantes en cambios aislados',
      'Telemetría de FinOps por PR para visibilidad de costes en tiempo real',
    ],
    resultsCost: [
      'Coste mensual de CI: €18,500 → €6,800 (63% reducción FinOps)',
      'Ahorro anual garantizado: €140,400 en GitHub Actions',
      'ROI del proyecto: Recuperado en menos de 3 meses',
    ],
    resultsPerformance: [
      'Tiempo de CI por PR: 48 min → 16 min (66% aceleración)',
      'Detección de breaking changes: En < 12ms (antes requería test suite de 30m)',
      'Frecuencia de despliegues: de 4 deploys/semana a 18 deploys/día',
    ],
    resultsOperative: [
      'Incidentes por rotura de API en producción: Reducidos a 0',
      'Satisfacción del equipo de ingeniería: +85% en métricas de developer velocity',
      'Supervisión de dependencias de supply chain automatizada',
    ],
    technologies: 'Rust, TypeScript, Polyglot AST, GitHub Actions, FinOps, SARIF, Deno',
    duration: '8 semanas de implementación y afinado',
    investment: '€36,000',
    roi: '€140,000 de ahorro anual directo en facturas de CI/CD',
    technicalProof: {
      badge: 'AST GATEKEEPER // CI FINOPS',
      title: 'Inspeccionar grafo de dependencias y diff AST',
      command: 'git clone https://github.com/glastor-core/vortex && cargo test --release',
      outputLines: [
        '// Repo: https://github.com/glastor-core/vortex + glastor-core/specter',
        '✓ specter AST contract diff: 0 breaking changes (< 12ms)',
        '✓ vortex LPT splitter: matriz CI particionada en 4 runners balanceados',
        '✓ Reducción de targets redundantes en PR aislado: -68%',
        '[PASS] Pipeline determinista validado antes de levantar runners pesados',
      ],
      verificationUrl: 'https://github.com/glastor-core/vortex',
      verificationLabel: 'Ver código en GitHub',
    },
  },
];
