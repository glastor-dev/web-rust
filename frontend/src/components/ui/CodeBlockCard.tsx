'use client';

import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockCardProps {
  filename: string;
  language: string;
  code: string;
  caption?: string;
}

export function CodeBlockCard({ filename, language, code, caption }: CodeBlockCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in non-secure contexts
    }
  };

  return (
    <div className="my-8 border border-white/10 bg-[#080808] overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d0d0d] border-b border-white/10">
        <div className="flex items-center gap-2.5 min-w-0">
          <Terminal className="w-3.5 h-3.5 text-brand shrink-0" aria-hidden="true" />
          <span className="font-mono text-xs text-zinc-200 truncate">{filename}</span>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 border border-brand/30 bg-brand/5 text-brand">
            {language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Código copiado al portapapeles' : `Copiar código de ${filename}`}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-zinc-400 hover:text-brand px-2.5 py-1 border border-white/10 hover:border-brand/40 transition-colors cursor-pointer"
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

      {/* Code Body */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-200">
          <code>{code}</code>
        </pre>
      </div>

      {caption && (
        <div className="px-4 py-2.5 bg-[#0b0b0b] border-t border-white/5 text-xs font-mono text-zinc-400">
          {caption}
        </div>
      )}
    </div>
  );
}
