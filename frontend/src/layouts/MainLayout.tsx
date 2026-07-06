import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NoiseOverlay } from '../components/ui/NoiseOverlay';
import { CustomCursor } from '../components/ui/CustomCursor';
import { SmoothScroll } from '../components/SmoothScroll';

export default function MainLayout() {
  const { pathname, hash } = useLocation();

  // Handle scrolling to hash on page load or navigation
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  // Telemetry: Custom Rust Analytics (No Cookies)
  useEffect(() => {
    const startTime = Date.now();
    const currentPath = pathname;

    // Send Pageview
    fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: currentPath,
        referrer: document.referrer || null,
        screen_size: `${window.innerWidth}x${window.innerHeight}`,
      }),
    }).catch((err) => console.debug('Analytics error:', err));

    // Send Leave Event on unmount (route change)
    return () => {
      const durationSeconds = Math.round((Date.now() - startTime) / 1000);

      // Use sendBeacon if available for better reliability on unload
      if (navigator.sendBeacon) {
        const blob = new Blob(
          [JSON.stringify({ path: currentPath, duration_seconds: durationSeconds })],
          {
            type: 'application/json',
          },
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
  }, [pathname]);

  return (
    <SmoothScroll>
      <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden selection:bg-brand selection:text-black">
        <NoiseOverlay />
        <CustomCursor />

        <Header />

        <main className="relative z-10">
          <Outlet />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
