import type { ReactNode } from 'react';

interface TerminalCardProps {
  title?: string;
  children?: ReactNode;
  imageSrc?: string;
  className?: string;
}

export function TerminalCard({
  title = 'bash',
  children,
  imageSrc,
  className = '',
}: TerminalCardProps) {
  return (
    <div
      className={`w-full rounded-sm bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden relative flex flex-col group ${className}`}
    >
      <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 transition-colors duration-500" />

      {/* Window Header */}
      <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-[#050505]">
        <div className="w-2 h-2 rounded-full bg-zinc-800 transition-colors group-hover:bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-zinc-800 transition-colors group-hover:bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-zinc-800 transition-colors group-hover:bg-green-500/50" />
        <span className="ml-4 text-[10px] font-mono text-zinc-500">{title}</span>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex-grow flex flex-col">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
