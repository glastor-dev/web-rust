'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { PostHogProvider } from '@/providers/PostHogProvider';

const NoiseOverlay = dynamic(() => import('@/components/ui/NoiseOverlay').then((mod) => mod.NoiseOverlay), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor').then((mod) => mod.CustomCursor), { ssr: false });
const FlashlightEffect = dynamic(() => import('@/components/ui/FlashlightEffect').then((mod) => mod.FlashlightEffect), { ssr: false });
const CartDrawer = dynamic(() => import('@/components/ui/CartDrawer').then((mod) => mod.CartDrawer), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/SmoothScroll').then((mod) => mod.SmoothScroll), { ssr: false });
const PageTransitionWrapper = dynamic(() => import('@/components/ui/PageTransitionWrapper').then((mod) => mod.PageTransitionWrapper));
const Toaster = dynamic(() => import('@/components/ui/sonner').then((mod) => mod.Toaster), { ssr: false });
const SplashScreen = dynamic(() => import('@/components/ui/SplashScreen').then((mod) => mod.SplashScreen), { ssr: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5,
      refetchInterval: 1000 * 10,
      refetchOnWindowFocus: true,
    },
  },
});

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Analytics deferred after hydration to avoid blocking initial render
  useEffect(() => {
    const startTime = Date.now();
    const currentPath = pathname;
    let mounted = true;

    const send = () => {
      if (!mounted) return;
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_name: 'pageview', path: currentPath, data: null }),
      }).catch((err) => console.debug('Analytics error:', err));

      const durationSeconds = Math.round((Date.now() - startTime) / 1000);
      if (navigator.sendBeacon) {
        const blob = new Blob(
          [JSON.stringify({ path: currentPath, duration_seconds: durationSeconds })],
          { type: 'application/json' },
        );
        navigator.sendBeacon('/api/analytics/leave', blob);
      } else {
        fetch('/api/analytics/leave', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: currentPath, duration_seconds: durationSeconds }),
          keepalive: true,
        }).catch((err) => console.debug('Analytics leave error:', err));
      }
    };

    const id = requestAnimationFrame(() => setTimeout(send, 0));
    return () => {
      mounted = false;
      clearTimeout(id as unknown as number);
    };
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider>
        <SmoothScroll>
          <SplashScreen />
          <FlashlightEffect />
          <NoiseOverlay />
          <CustomCursor />
          <CartDrawer />

          <Header />

          <main className="relative z-10">
            <PageTransitionWrapper>{children}</PageTransitionWrapper>
          </main>

          <Footer />
          <Toaster position="bottom-right" />
        </SmoothScroll>
      </PostHogProvider>
    </QueryClientProvider>
  );
}
