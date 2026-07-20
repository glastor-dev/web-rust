'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';

export function CartDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay oscuro (backdrop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-90"
          />

          {/* Drawer Lateral */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-[480px] h-full bg-[#0a0a0a] border-l border-white/10 z-100 flex flex-col shadow-2xl"
          >
            {/* Header del Cart */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-white" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-white mt-1">
                  CESTA DE COMPRA
                </h2>
              </div>
              <button
                onClick={closeDrawer}
                aria-label="Cerrar carrito"
                className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 rounded-md transition-colors"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {/* Content / Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4">
                  <ShoppingBag className="w-12 h-12 opacity-20" />
                  <p className="text-xs font-mono uppercase tracking-widest">
                    El carrito está vacío
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-[#0d0d0d] border border-white/5 rounded-lg p-4 relative group"
                  >
                    {/* Imagen */}
                    <div className="w-24 h-24 bg-white rounded-md flex items-center justify-center p-2 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://placehold.co/400x400/111/444?text=Item';
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col flex-1 justify-between">
                      <div className="pr-6">
                        <h3 className="text-xs font-extrabold tracking-wide text-white leading-snug line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="text-brand text-xs font-mono font-bold tracking-widest mt-2">
                          $ {item.price.toLocaleString('es-AR')} c/u.
                        </div>
                      </div>

                      {/* Controles de cantidad */}
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Reducir cantidad de ${item.name}`}
                          className="w-7 h-7 bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold font-mono text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Aumentar cantidad de ${item.name}`}
                          className="w-7 h-7 bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Botón Borrar */}
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Eliminar ${item.name} del carrito`}
                      className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Resumen */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#050505]">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-xs font-bold text-zinc-400">
                    Subtotal{' '}
                    <span className="font-mono text-[10px] tracking-widest">
                      (IVA 21% INCLUIDO)
                    </span>
                  </span>
                  <span className="font-mono text-sm font-bold text-white">
                    $ {subtotal.toLocaleString('es-AR')}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-zinc-400">Envío</span>
                  <span className="font-mono text-[10px] font-bold tracking-widest text-brand">
                    ¡GRATUITO!
                  </span>
                </div>

                <hr className="border-white/5 mb-6" />

                <div className="flex justify-between items-end border-t border-white/10 pt-6 mb-8">
                  <span className="text-sm font-bold uppercase tracking-wider text-white">
                    TOTAL A PAGAR
                  </span>
                  <span className="font-mono text-xl font-black text-brand">
                    $ {subtotal.toLocaleString('es-AR')}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full bg-brand text-black font-extrabold text-sm tracking-widest py-4 rounded-md hover:bg-brand/90 transition-colors shadow-[0_0_20px_rgba(0,255,102,0.15)] flex justify-center items-center gap-2 group"
                >
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin hidden group-hover:block" />
                  PROCEDER A MI ORDEN
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
