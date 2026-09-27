'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Command, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearchQuery } from '@/lib/api/queries';
import Image from 'next/image';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce the query string so we don't spam the API on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const { data: searchResults = [], isLoading } = useSearchQuery(debouncedQuery);

  // Escuchar Cmd+K o Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const filteredProducts = searchResults.slice(0, 5);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredProducts.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredProducts.length) % Math.max(1, filteredProducts.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredProducts.length > 0) {
        handleSelect(filteredProducts[selectedIndex].id);
      } else if (query.trim() !== '') {
        // Redirigir a tienda con búsqueda
        router.push(`/tienda?q=${encodeURIComponent(query)}`);
        setIsOpen(false);
      }
    }
  };

  const handleSelect = (id: string) => {
    router.push(`/tienda/${id}`);
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#050505]/80 backdrop-blur-md z-[9999]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[10000] px-4"
            >
              <div className="bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                
                {/* Input Area */}
                <div className="relative flex items-center px-4 border-b border-white/10">
                  <Search className="w-5 h-5 text-brand shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Buscar herramientas, maquinaria, repuestos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none text-white px-4 py-5 outline-none placeholder:text-zinc-600 font-mono text-sm"
                  />
                  <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono uppercase tracking-widest shrink-0 border border-white/10 px-2 py-1 rounded bg-white/5">
                    <Command className="w-3 h-3" />
                    <span>K</span>
                  </div>
                </div>

                {/* Results Area */}
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                  {query.trim() === '' ? (
                    <div className="p-8 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest">
                      <Command className="w-8 h-8 mx-auto mb-3 opacity-20" />
                      Comienza a escribir para buscar en el catálogo
                    </div>
                  ) : isLoading ? (
                    <div className="p-8 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                      Buscando...
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    <div className="py-2">
                      <div className="px-4 py-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-white/5 mb-2">
                        Resultados sugeridos
                      </div>
                      {filteredProducts.map((product, index) => (
                        <div
                          key={product.id}
                          className={`flex items-center px-4 py-3 cursor-pointer transition-colors group ${
                            index === selectedIndex ? 'bg-brand/10 border-l-2 border-brand' : 'hover:bg-white/5 border-l-2 border-transparent'
                          }`}
                          onClick={() => handleSelect(product.id)}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <div className="relative w-12 h-12 bg-[#050505] border border-white/10 shrink-0 flex items-center justify-center overflow-hidden p-1">
                            <Image
                              src={product.image_url || '/images/products/placeholder.jpg'}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div className="ml-4 flex-1 min-w-0">
                            <h4 className={`text-sm font-bold truncate transition-colors ${index === selectedIndex ? 'text-brand' : 'text-white'}`}>
                              {product.name}
                            </h4>
                            <p className="text-xs text-zinc-500 font-mono mt-1">
                              {product.category}
                            </p>
                          </div>
                          <div className={`shrink-0 ml-4 transition-opacity ${index === selectedIndex ? 'opacity-100 text-brand' : 'opacity-0'}`}>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest">
                      No se encontraron resultados para &quot;{query}&quot;
                      <button
                        onClick={() => {
                          router.push(`/tienda?q=${encodeURIComponent(query)}`);
                          setIsOpen(false);
                        }}
                        className="mt-4 block w-full text-center py-2 bg-brand/10 text-brand hover:bg-brand hover:text-black transition-colors"
                      >
                        Ver todos los resultados
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 bg-[#050505] border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1"><kbd className="border border-white/10 rounded px-1">↑</kbd><kbd className="border border-white/10 rounded px-1">↓</kbd> Navegar</span>
                    <span className="flex items-center gap-1"><kbd className="border border-white/10 rounded px-1">↵</kbd> Seleccionar</span>
                  </div>
                  <div className="flex items-center gap-1 text-brand">
                    <span>GLASTOR B2B SYSTEM</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
