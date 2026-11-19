'use client';

import { useState } from 'react';
import { Terminal, Copy, Check, Cpu, Zap, ShieldCheck } from 'lucide-react';

interface CodeSnippet {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  badge: string;
  icon: typeof Cpu;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'axum-core',
    tabLabel: '01. Axum Sub-ms Endpoint',
    title: 'Pipeline HTTP Zero-Copy con Tokio & Axum',
    description:
      'Procesamiento in-place sin alocación dinámica en el hot-path. Maneja 50.000+ req/s por núcleo con latencia determinista p99 < 15ms.',
    badge: 'Throughput Extremo',
    icon: Zap,
    code: `use axum::{extract::State, routing::post, Json, Router};
use std::sync::Arc;
use tokio::net::TcpListener;

#[derive(Clone)]
pub struct AppState {
    pub ring_buffer: Arc<LockFreeQueue<OrderPayload>>,
}

/// Endpoint crítico: Cero copia en Heap y compilación LTO
#[inline(always)]
pub async fn ingest_order(
    State(state): State<AppState>,
    Json(payload): Json<OrderPayload>,
) -> Result<&'static str, SystemError> {
    // Dispatch lock-free a la cola en memoria compartida (< 120ns)
    state.ring_buffer.push_in_place(payload)?;
    Ok("ACK_INGESTED")
}

#[tokio::main(flavor = "multi_thread")]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let app = Router::new().route("/api/v1/orders", post(ingest_order));
    let listener = TcpListener::bind("0.0.0.0:8080").await?;
    axum::serve(listener, app).await?;
    Ok(())
}`,
  },
  {
    id: 'simd-avx',
    tabLabel: '02. SIMD Vectorization',
    title: 'Vectorización Hardware AVX-512 / ARM NEON (hyper64)',
    description:
      'Transformaciones vectorizadas procesando 64 bytes por ciclo de CPU. Totalmente #![no_std] y branchless para evitar branch mispredictions.',
    badge: 'Aceleración Hardware',
    icon: Cpu,
    code: `//! hyper64: SIMD Hardware-Accelerated Vectorization
#![no_std]
use core::arch::x86_64::*;

#[inline(always)]
#[target_feature(enable = "avx512f,avx512bw")]
pub unsafe fn encode_block_avx512(src: *const u8, dst: *mut u8) {
    // Carga de 64 bytes en un solo ciclo de CPU
    let chunk = _mm512_loadu_si512(src as *const __m512i);

    // Shift y máscara branchless sobre registros ZMM
    let hi = _mm512_srli_epi32(chunk, 4);
    let lo = _mm512_and_si512(chunk, _mm512_set1_epi8(0x0F));

    // Vectorized lookup table mapping
    let encoded = _mm512_permutexvar_epi8(lo, hi);
    _mm512_storeu_si512(dst as *mut __m512i, encoded);
}`,
  },
  {
    id: 'concurrency',
    tabLabel: '03. Memory Safety & Send+Sync',
    title: 'Concurrencia Matemática sin Data Races',
    description:
      'El modelo de propiedad y los traits Send + Sync garantizan en tiempo de compilación que ningún hilo corrompa la memoria, sin locks lentos.',
    badge: 'Seguridad Matemática',
    icon: ShieldCheck,
    code: `// Lock-Free Disruptor Pattern con Atomics & Cache Line Padding
use core::sync::atomic::{AtomicU64, Ordering};

#[repr(align(64))] // Previene False Sharing en caché L1/L2
pub struct Sequencer {
    cursor: AtomicU64,
    cached_gating: AtomicU64,
}

impl Sequencer {
    #[inline(always)]
    pub fn claim_next(&self, count: u64) -> u64 {
        // Fetch-Add atómico con ordenamiento Acquire/Release
        self.cursor.fetch_add(count, Ordering::AcqRel)
    }
}

// El compilador de Rust rechaza el binario si existe riesgo de data race
unsafe impl Send for Sequencer {}
unsafe impl Sync for Sequencer {}`,
  },
];

export function RustCodeShowcase() {
  const [activeTab, setActiveTab] = useState(SNIPPETS[0].id);
  const [copied, setCopied] = useState(false);

  const activeSnippet = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-20 border border-white/10 rounded-lg bg-[#080808] overflow-hidden shadow-2xl">
      {/* Top Header con pestañas estilo IDE */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-white/10 bg-[#050505] px-4 py-2 gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          <div className="flex items-center gap-1.5 mr-3 shrink-0">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          </div>

          {SNIPPETS.map((snippet) => {
            const isActive = snippet.id === activeTab;
            const Icon = snippet.icon;
            return (
              <button
                key={snippet.id}
                onClick={() => setActiveTab(snippet.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded transition-colors shrink-0 ${
                  isActive
                    ? 'bg-brand/10 text-brand border border-brand/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{snippet.tabLabel}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            Rust Edition 2024 / 1.85+
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:text-brand bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors"
            title="Copiar código fuente"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand" />
                <span className="text-brand">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Explicación Técnica del Snippet Activo */}
      <div className="p-6 md:p-8 bg-[#0a0a0a] border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-lg font-bold text-white font-mono">{activeSnippet.title}</h4>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-brand/10 text-brand border border-brand/20">
              {activeSnippet.badge}
            </span>
          </div>
          <p className="text-sm text-zinc-400 max-w-3xl font-light">{activeSnippet.description}</p>
        </div>
      </div>

      {/* Editor de Código con syntax styling */}
      <div className="relative p-6 overflow-x-auto bg-[#040404]">
        <pre className="font-mono text-xs md:text-sm text-zinc-300 leading-relaxed selection:bg-brand/20">
          <code>{activeSnippet.code}</code>
        </pre>
      </div>

      {/* Footer de compilación técnica */}
      <div className="px-6 py-3 bg-[#020202] border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Terminal className="w-3.5 h-3.5 text-brand" /> cargo build --release
          </span>
          <span className="hidden sm:inline-block text-zinc-600">|</span>
          <span className="text-zinc-400 hidden sm:inline-block">opt-level = 3</span>
          <span className="text-zinc-400 hidden sm:inline-block">lto = "fat"</span>
          <span className="text-zinc-400 hidden sm:inline-block">panic = "abort"</span>
        </div>
        <span className="text-brand">Zero Garbage Collector Pauses</span>
      </div>
    </div>
  );
}
