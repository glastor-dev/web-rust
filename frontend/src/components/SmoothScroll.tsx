import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname, hash } = useLocation();

  // Reset scroll on route change (with delay for async layouts like loading screens)
  useEffect(() => {
    const forceReset = () => lenisRef.current?.scrollTo(0, { immediate: true });

    if (lenisRef.current && !hash) {
      forceReset();
      // Fallback para cuando el LoadingScreen se desmonta
      const timer = setTimeout(forceReset, 250);
      window.addEventListener('force-lenis-reset', forceReset);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('force-lenis-reset', forceReset);
      };
    }
  }, [pathname, hash]);

  useEffect(() => {
    // Disable native browser scroll restoration heuristic
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Check for reduced motion preference or Mobile Viewport
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Abort software scroll on mobile or if user prefers reduced motion
    if (prefersReducedMotion || isMobile) {
      return;
    }

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing inercial suave
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync GSAP with Lenis
    lenisRef.current.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.on('scroll', ScrollTrigger.update);
      gsap.ticker.remove((time) => lenisRef.current?.raf(time * 1000));
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
