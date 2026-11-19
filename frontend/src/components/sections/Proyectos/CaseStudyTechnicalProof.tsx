'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Terminal } from 'lucide-react';
import type { CaseStudy } from '@/lib/data/caseStudies';

interface CaseStudyTechnicalProofProps {
  proof: NonNullable<CaseStudy['technicalProof']>;
}

export function CaseStudyTechnicalProof({ proof }: CaseStudyTechnicalProofProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(proof.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <div className="mt-12 border border-white/10 bg-[#050505] overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#0b0b0b] border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-brand shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-brand font-bold">
            {proof.badge}
          </span>
        </div>

        <a
          href={proof.verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-zinc-300 hover:text-brand transition-colors"
        >
          <span>{proof.verificationLabel}</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-7 space-y-5">
        <h4 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase">
          {proof.title}
        </h4>

        {/* Copyable Command Row */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#0a0a0a] border border-brand/30">
          <div className="font-mono text-xs sm:text-sm text-zinc-100 overflow-x-auto whitespace-nowrap">
            <span className="text-brand select-none mr-2">$</span>
            <code>{proof.command}</code>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Comando copiado' : `Copiar comando: ${proof.command}`}
            className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/10 hover:border-brand/50 font-mono text-[11px] uppercase tracking-widest text-zinc-400 hover:text-brand transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand" aria-hidden="true" />
                <span className="text-brand">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Structured Verification Output */}
        <div className="p-4 bg-[#080808] border border-white/5 overflow-x-auto">
          <pre className="font-mono text-xs leading-relaxed text-zinc-300 space-y-1">
            {proof.outputLines.map((line, idx) => (
              <div
                key={`proof-line-${idx}`}
                className={
                  line.startsWith('[PASS]') || line.startsWith('✓')
                    ? 'text-brand'
                    : line.startsWith('//')
                      ? 'text-zinc-400'
                      : 'text-zinc-300'
                }
              >
                {line}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}
