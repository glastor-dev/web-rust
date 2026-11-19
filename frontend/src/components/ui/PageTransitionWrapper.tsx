'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll and lenis on navigation
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    window.dispatchEvent(new Event('force-lenis-reset'));
  }, [pathname]);

  return <div className="relative z-0 min-h-screen bg-[#050505]">{children}</div>;
}
