import React from 'react';
import { ArrowRightIcon } from 'lucide-react';

interface PremiumCardProps {
  title: string;
  subtitle: string;
  description: string;
  href?: string;
  icon?: React.ReactNode;
}

export function PremiumCard({ title, subtitle, description, href, icon }: PremiumCardProps) {
  const content = (
    <div className="group relative w-full h-full overflow-hidden bg-[#050505] p-8 md:p-10 border border-white/10 transition-all duration-500 hover:bg-white/[0.02] hover:border-brand/40 flex flex-col">
      {/* Ambient Glow */}
      <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-brand/10 blur-[80px] transition-all duration-700 group-hover:bg-brand/20 group-hover:scale-150 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6 h-full">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand">
            {subtitle}
          </span>
          {icon && (
            <div className="text-zinc-500 group-hover:text-brand transition-colors duration-300">
              {icon}
            </div>
          )}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          {title}
        </h3>

        <p className="text-base text-zinc-400 leading-relaxed font-light grow">{description}</p>

        {/* Interactive Element */}
        {href && (
          <div className="relative z-10 mt-auto pt-6 border-t border-white/10">
            <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white transition-colors group-hover:text-brand">
              Explorar
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block w-full h-full">
        {content}
      </a>
    );
  }

  return content;
}
