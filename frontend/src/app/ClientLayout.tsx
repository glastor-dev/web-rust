'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { PostHogProvider } from '@/providers/PostHogProvider';

const NoiseOverlay = dynamic(
  () => import('@/components/ui/NoiseOverlay').then((mod) => mod.NoiseOverlay),
  { ssr: false },
);
const CustomCursor = dynamic(
  () => import('@/components/ui/CustomCursor').then((mod) => mod.CustomCursor),
  { ssr: false },
);
const FlashlightEffect = dynamic(
  () => import('@/components/ui/FlashlightEffect').then((mod) => mod.FlashlightEffect),
  { ssr: false },
);
const SmoothScroll = dynamic(
  () => import('@/components/SmoothScroll').then((mod) => mod.SmoothScroll),
  { ssr: false },
);
const PageTransitionWrapper = dynamic(() =>
  import('@/components/ui/PageTransitionWrapper').then((mod) => mod.PageTransitionWrapper),
);
const Toaster = dynamic(() => import('@/components/ui/sonner').then((mod) => mod.Toaster), {
  ssr: false,
});
const SplashScreen = dynamic(
  () => import('@/components/ui/SplashScreen').then((mod) => mod.SplashScreen),
  { ssr: false },
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30, // 30 segundos
      refetchOnWindowFocus: false,
      retry: 1, // Reducir reintentos para no saturar si hay error
    },
  },
});

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Set isIdle to true on first user interaction or after 3 seconds to defer non-critical UI
  useEffect(() => {
    const handleInteraction = () => setIsIdle(true);

    window.addEventListener('scroll', handleInteraction, { once: true, passive: true });
    window.addEventListener('mousemove', handleInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
    window.addEventListener('keydown', handleInteraction, { once: true, passive: true });

    const timeout = setTimeout(() => setIsIdle(true), 3000);

    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      clearTimeout(timeout);
    };
  }, []);

  // Legacy Rust store backend analytics disabled (PostHog handles active frontend telemetry)

  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider>
        <SmoothScroll>
          <SplashScreen />
          <FlashlightEffect />
          <NoiseOverlay />
          <CustomCursor />

          <Header />

          <main className="relative z-10">
            <PageTransitionWrapper>{children}</PageTransitionWrapper>
          </main>

          <Footer />

          {isIdle && <Toaster position="bottom-right" />}
        </SmoothScroll>
      </PostHogProvider>
    </QueryClientProvider>
  );
}
