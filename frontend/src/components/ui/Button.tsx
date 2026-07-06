import React from 'react';

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'primary' | 'outline';
  size?: 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ href, variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300";
  
  const variants = {
    primary: "bg-brand text-black hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,102,0.4)]",
    outline: "border border-white/20 text-white hover:border-brand hover:text-brand"
  };

  const sizes = {
    md: "px-10 py-5 text-sm",
    lg: "px-12 py-6 text-lg"
  };

  return (
    <a 
      href={href}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
