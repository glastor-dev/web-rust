'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, Heart } from 'lucide-react';
import { Button } from './reutilizables/button';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { items, openDrawer } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItemCount = wishlistItems.length;

  // Física de Scroll: Esconder al bajar, mostrar al subir
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Cambiar fondo a Glassmorphism después de 50px
    if (latest > 50) setIsScrolled(true);
    else setIsScrolled(false);

    // Ocultar si baja rápido, mostrar si sube
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    /* 
    { name: 'Qué hacemos', path: '/servicios' },
    { name: 'Casos', path: '/proyectos' },
    { name: 'Recursos', path: '/recursos' },
    */
    { name: 'Tienda', path: '/tienda' },
    { name: 'Nosotros', path: '/nosotros' },
  ];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={hidden && !mobileMenuOpen ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo & Tagline */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 relative">
              <Image
                src="/images/isologo-copm.webp"
                alt="Glastor"
                fill
                quality={60}
                sizes="40px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight text-white leading-none">
                GLASTOR
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative text-sm font-bold tracking-widest transition-colors group py-2 ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                >
                  {link.name}
                  {/* CSS Animated Underline */}
                  <span
                    className={`absolute left-0 bottom-0 w-full h-0.5 bg-brand origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Greeting & CTA */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Link
                href="#"
                aria-label="Ver lista de deseos"
                className="relative p-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {mounted && wishlistItemCount > 0 && (
                  <span className="absolute top-0.5 right-0 bg-brand text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center translate-x-1/4 -translate-y-1/4">
                    {wishlistItemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={openDrawer}
                aria-label="Abrir carrito"
                className="relative p-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {mounted && cartItemCount > 0 && (
                  <span className="absolute 1 top-0.5 right-0 bg-brand text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center translate-x-1/4 -translate-y-1/4">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

            {/* 
            <Button
              asChild
              variant="default"
              size="sm"
              className="px-6 tracking-widest text-xs font-bold rounded-sm h-10 shadow-[0_0_15px_rgba(0,255,102,0.15)] hover:shadow-[0_0_25px_rgba(0,255,102,0.3)] transition-all"
            >
              <Link href="/arquitectura">Cotizar</Link>
            </Button>
            */}
          </div>

          {/* Mobile Menu Toggle & Cart */}
          <div className="md:hidden flex items-center gap-4">
            <Link
              href="#"
              aria-label="Ver lista de deseos"
              className="relative p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Heart className="w-5 h-5" />
              {mounted && wishlistItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center translate-x-1/4 -translate-y-1/4">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={openDrawer}
              aria-label="Abrir carrito"
              className="relative p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center translate-x-1/4 -translate-y-1/4">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              className="text-zinc-400 hover:text-white p-2 z-50 relative transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#050505] z-40 flex flex-col justify-center px-6"
          >
            {/* Ambient Line */}
            <div className="absolute top-0 left-6 w-px h-full bg-linear-to-b from-brand/0 via-brand/20 to-brand/0 pointer-events-none" />

            <nav className="flex flex-col gap-8 ml-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                >
                  <Link
                    href={link.path}
                    className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white hover:text-brand transition-colors block leading-[0.9]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + navLinks.length * 0.1 }}
                className="mt-12"
              >
                {/* 
                <Button
                  asChild
                  variant="default"
                  size="lg"
                  className="w-full h-16 text-lg uppercase tracking-widest"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/arquitectura">Cotizar</Link>
                </Button>
                */}
              </motion.div>
            </nav>

            <div className="absolute bottom-12 left-10 text-xs font-mono uppercase tracking-widest text-zinc-500">
              GLASTOR · Código Inquebrantable
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
