import React from 'react';

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle: string;
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({ title, subtitle, className = '', titleClassName = 'text-fluid-h2' }: SectionHeaderProps) {
  return (
    <div className={`mb-16 border-b border-white/10 pb-4 ${className}`}>
      <h2 className={`${titleClassName} font-black uppercase tracking-tighter text-white mb-4 leading-none`}>
        {title}
      </h2>
      <p className="text-sm font-mono tracking-widest uppercase text-brand mt-2">
        {subtitle}
      </p>
    </div>
  );
}
