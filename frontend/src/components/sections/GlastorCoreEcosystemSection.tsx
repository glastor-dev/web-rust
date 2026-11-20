'use client';

import { motion } from 'motion/react';
import {
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  FileCode,
  Flame,
  ExternalLink,
  GitBranch,
  Package,
} from 'lucide-react';
import { GithubIcon } from 'hugeicons-react';

interface EcosystemRepo {
  name: string;
  repo: string;
  tag: string;
  metric: string;
  description: string;
  url: string;
  demoUrl?: string;
  cratesUrl?: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const REPOSITORIES: EcosystemRepo[] = [
  {
    name: 'pii-veil',
    repo: 'glastor-core/pii-veil',
    tag: 'AI Privacy & MCP DLP',
    metric: '165 µs · 212x Presidio',
    description:
      'Anonimizador reversible de PII y secretos en Rust para LLMs, agentes MCP y streams SSE. SDKs en Rust, Python, Node y Go + demo WASM.',
    url: 'https://github.com/glastor-core/pii-veil',
    demoUrl: 'https://pii-veil.glastor.es',
    cratesUrl: 'https://crates.io/crates/pii-veil-core',
    icon: <ShieldCheck className="w-6 h-6 text-brand" />,
    highlight: true,
  },
  {
    name: 'spec-stream',
    repo: 'glastor-core/spec-stream',
    tag: 'LLM Speculative Engine',
    metric: '2.0x–3.8x Throughput',
    description:
      'Motor en Rust puro de Speculative Decoding y Paged KV-Cache con rollback O(1) y soporte GGUF para acelerar inferencia LLM.',
    url: 'https://github.com/glastor-core/spec-stream',
    cratesUrl: 'https://crates.io/crates/spec-stream',
    icon: <Cpu className="w-6 h-6 text-brand" />,
    highlight: true,
  },
  {
    name: 'glastor-core',
    repo: 'glastor-core/glastor-core',
    tag: 'Runtime Kernel & Pipelines',
    metric: '< 0.5ms Dispatch',
    description:
      'Motor runtime de pipelines de estado y kernel modular de latencia ultra baja para plataformas críticas.',
    url: 'https://github.com/glastor-core/glastor-core',
    icon: <Cpu className="w-6 h-6 text-brand" />,
    highlight: true,
  },
  {
    name: 'hyper64',
    repo: 'glastor-core/hyper64',
    tag: 'SIMD Vector Engine',
    metric: '10–25 GiB/s Throughput',
    description:
      'Motor Base64 zero-allocation escrito en Rust (#![no_std]) con vectorización amplia AVX-512 y NEON SIMD.',
    url: 'https://github.com/glastor-core/hyper64',
    cratesUrl: 'https://crates.io/crates/hyper64',
    icon: <Zap className="w-6 h-6 text-brand" />,
    highlight: true,
  },
  {
    name: 'byte-gauge',
    repo: 'glastor-core/byte-gauge',
    tag: 'SIMD Binary Auditor',
    metric: '< 8ms Audit SLA',
    description:
      'Auditor de binarios (ELF, PE, Mach-O, Wasm) con validación de hardening checksec, SBOM CycloneDX 1.5 y reportes SARIF.',
    url: 'https://github.com/glastor-core/byte-gauge',
    cratesUrl: 'https://crates.io/crates/byte-gauge',
    icon: <ShieldCheck className="w-6 h-6 text-brand" />,
    highlight: true,
  },
  {
    name: 'glastor-aria-core',
    repo: 'glastor-core/strata',
    tag: 'Headless Accessibility',
    metric: 'WAI-ARIA 1.2 · 0 Node',
    description:
      'Primitivas determinísticas de accesibilidad WAI-ARIA 1.2 y gestión de estados en Rust puro sin dependencias Node.',
    url: 'https://github.com/glastor-core/strata',
    cratesUrl: 'https://crates.io/crates/glastor-aria-core',
    icon: <GitBranch className="w-6 h-6 text-brand" />,
    highlight: true,
  },
  {
    name: 'specter',
    repo: 'glastor-core/specter',
    tag: 'Polyglot AST Gatekeeper',
    metric: '< 5ms AST Diff',
    description:
      'Differ de contratos de API sin compilador, detector de ataques de supply chain y guardián SemVer con SARIF & SBOM.',
    url: 'https://github.com/glastor-core/specter',
    cratesUrl: 'https://crates.io/crates/specter-cli',
    icon: <FileCode className="w-6 h-6 text-brand" />,
    highlight: true,
  },
  {
    name: 'vortex',
    repo: 'glastor-core/vortex',
    tag: 'Predictive CI & FinOps',
    metric: '~60% CI Reduction',
    description:
      'Orquestador predictivo de CI impulsado por AST, barrel pruner y LPT splitter para minimizar costos en GitHub Actions.',
    url: 'https://github.com/glastor-core/vortex',
    icon: <Flame className="w-6 h-6 text-brand" />,
  },
  {
    name: 'nemesis',
    repo: 'glastor-core/nemesis',
    tag: 'DevSecOps & Hygiene',
    metric: '< 5s Full Repo Audit',
    description:
      'CLI y Action para auditoría automatizada de repositorios, postura de seguridad zero-trust y auto-fix de compliance.',
    url: 'https://github.com/glastor-core/nemesis',
    icon: <Terminal className="w-6 h-6 text-brand" />,
  },
  {
    name: 'zerho',
    repo: 'glastor-core/zerho',
    tag: 'Edge Documentation',
    metric: '< 15ms Edge TTFB',
    description:
      'Motor de documentación de alto rendimiento construido para Deno 2 y Edge con indexación nativa para llms.txt.',
    url: 'https://github.com/glastor-core/zerho',
    icon: <Layers className="w-6 h-6 text-brand" />,
  },
];

export function GlastorCoreEcosystemSection() {
  return (
    <section className="py-24 md:py-32 bg-[#050505] relative z-10 border-t border-white/10 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 text-brand text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              Arquitectura Dual-Core // Open-Source & Crates.io
            </div>
            <h2 className="text-fluid-h2 font-black uppercase tracking-tight text-white leading-none">
              El Ecosistema <br />
              <span className="text-brand">GLASTOR® Core.</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl font-light mt-4 leading-relaxed">
              No somos un taller de desarrollo genérico: somos los creadores del ecosistema
              open-source <span className="text-white font-medium">@glastor-core</span>. Diseñamos y
              publicamos crates SIMD, auditores binarios y primitivas en Rust verificables
              directamente en <span className="text-brand font-mono">crates.io</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="https://github.com/glastor-core"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:border-brand/40 group"
            >
              <GithubIcon className="w-4 h-4 text-brand" />
              github.com/glastor-core
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Dual-Core Architecture Concept Banner */}
        <div className="glass-panel p-8 md:p-10 border border-white/10 bg-[#080808] mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-brand" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-brand font-bold">
                El Modelo Dual-Core
              </span>
              <h3 className="text-2xl font-black uppercase text-white mt-2 mb-3">
                Fundamentos Open-Source + Ingeniería B2B
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Nuestra división de código abierto (
                <span className="text-white">@glastor-core</span>) investiga y publica primitivas de
                máximo rendimiento con vectorización SIMD y control formal. Nuestra división
                empresarial (<span className="text-white">glastor.es</span>) implementa
                arquitecturas a medida, migra infraestructuras legacy y opera sistemas de misión
                crítica bajo SLA.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 border border-white/10">
                <div className="text-2xl font-black text-white font-mono">
                  10-25 <span className="text-brand text-sm">GiB/s</span>
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mt-1">
                  Throughput SIMD (AVX-512)
                </div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10">
                <div className="text-2xl font-black text-white font-mono">
                  &lt; 0.5 <span className="text-brand text-sm">ms</span>
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mt-1">
                  Dispatch Pipeline Kernel
                </div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10">
                <div className="text-2xl font-black text-white font-mono">100%</div>
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mt-1">
                  SLSA Provenance & SBOM
                </div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10">
                <div className="text-2xl font-black text-white font-mono">~60%</div>
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mt-1">
                  Ahorro en FinOps CI/CD
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REPOSITORIES.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className={`group flex flex-col justify-between p-6 bg-[#080808] border transition-all duration-300 relative ${
                repo.highlight
                  ? 'border-brand/30 hover:border-brand shadow-[0_0_20px_rgba(0,255,102,0.05)]'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-brand/40 transition-all">
                    {repo.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-white/5 px-2 py-0.5 border border-white/10">
                    {repo.metric}
                  </span>
                </div>

                <div className="text-xs font-mono uppercase text-brand tracking-widest font-bold mb-1">
                  {repo.tag}
                </div>
                <h4 className="text-xl font-black tracking-tight text-white mb-2 group-hover:text-brand transition-colors">
                  <a
                    href={repo.demoUrl ?? repo.cratesUrl ?? repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full focus-visible:outline-none focus-visible:text-brand"
                  >
                    <span>{repo.name}</span>
                    <ExternalLink
                      className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity text-brand shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light mb-6">
                  {repo.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono tracking-widest uppercase">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>GitHub ↗</span>
                </a>

                <div className="flex items-center gap-1.5">
                  {repo.demoUrl && (
                    <a
                      href={repo.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/15 border border-emerald-400/50 text-emerald-300 hover:bg-emerald-400 hover:text-black font-bold transition-colors"
                    >
                      <span>Demo WASM ↗</span>
                    </a>
                  )}
                  {repo.cratesUrl ? (
                    <a
                      href={repo.cratesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand/10 border border-brand/40 text-brand hover:bg-brand hover:text-black font-bold transition-colors"
                    >
                      <Package className="w-3 h-3" aria-hidden="true" />
                      <span>crates.io ↗</span>
                    </a>
                  ) : (
                    !repo.demoUrl && <span className="text-zinc-400">OSS</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
