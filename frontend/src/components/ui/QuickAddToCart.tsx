'use client';

import { useState } from 'react';
import { ShoppingCart01Icon, Tick01Icon, Loading02Icon } from 'hugeicons-react';
import { toast } from 'sonner';
import { useCartStore } from '../../store/cartStore';

export interface QuickProduct {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export function QuickAddToCart({ product }: { product: QuickProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const [addState, setAddState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (addState === 'idle') {
      setAddState('loading');

      // Simulate network request for premium tactile feedback
      await new Promise((resolve) => setTimeout(resolve, 300));

      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || '',
        quantity: 1,
      });

      setAddState('success');
      toast.success(`1x ${product.name} añadido al carrito`, {
        description: 'Inventario B2B reservado.',
        style: { background: '#050505', border: '1px solid rgba(0, 255, 102, 0.3)', color: '#fff' },
      });

      setTimeout(() => {
        setAddState('idle');
      }, 2000);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={addState !== 'idle'}
      aria-label="Añadir al carrito"
      className={`px-3 py-2 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        addState === 'success'
          ? 'bg-white text-black'
          : 'bg-brand text-black hover:bg-white'
      }`}
    >
      {addState === 'loading' ? (
        <Loading02Icon size={16} className="animate-spin" />
      ) : addState === 'success' ? (
        <Tick01Icon size={16} />
      ) : (
        <ShoppingCart01Icon size={16} />
      )}
    </button>
  );
}
