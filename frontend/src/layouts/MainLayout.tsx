import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NoiseOverlay } from '../components/ui/NoiseOverlay';
import { CustomCursor } from '../components/ui/CustomCursor';
import { CookieBanner } from '../components/ui/CookieBanner';
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

  return (
    <SmoothScroll>
      <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden selection:bg-brand selection:text-black">
        <NoiseOverlay />
        <CustomCursor />
        <CookieBanner />
        
        <Header />
        
        <main className="relative z-10">
          <Outlet />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
