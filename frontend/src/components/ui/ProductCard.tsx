import { motion } from 'motion/react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useState } from 'react';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  rating: number;
  image: string;
  stock: number;
  material?: string;
  dimensions?: string;
  weight?: string;
  seo?: any;
}

export function ProductCard({
  product,
  viewMode = 'grid',
}: {
  product: Product;
  viewMode?: 'grid' | 'list';
}) {
  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartStore((state) => state.openDrawer);
  const [quantity, setQuantity] = useState(1);
  const [_isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock > 0) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
      openDrawer();
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
        className="group relative flex items-center bg-[#080808] border border-white/5 hover:border-brand/30 transition-colors p-4 gap-6"
      >
        <Link
          to={`/tienda/${product.id}`}
          className="relative w-24 h-24 shrink-0 bg-[#030303] flex items-center justify-center p-2 rounded-md overflow-hidden"
        >
          <img
            src={product.image || '/images/default-tool.png'}
            alt={product.name}
            className="object-contain w-full h-full max-h-20 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://placehold.co/400x400/111/444?text=Herramienta';
            }}
          />
        </Link>

        <div className="grow min-w-0">
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <Link to={`/tienda/${product.id}`} className="hover:text-brand transition-colors">
            <h3 className="text-lg font-bold text-white tracking-tight truncate">{product.name}</h3>
          </Link>
          <p className="text-sm text-zinc-400 font-mono mt-1">
            SKU: {product.id.split('-')[0].toUpperCase()}
          </p>
        </div>

        <div className="flex flex-col shrink-0 items-end min-w-[120px]">
          <span className="text-[10px] font-mono text-zinc-500">PRECIO</span>
          <span className="text-xl font-bold text-brand font-mono">
            ${product.price?.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0 border-l border-white/10 pl-6 ml-2">
          {product.stock > 0 ? (
            <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-md h-10 px-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 hover:text-brand transition-colors text-zinc-400"
              >
                <Minus size={14} />
              </button>
              <span className="font-mono text-sm w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-1 hover:text-brand transition-colors text-zinc-400"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <span className="text-red-500 text-xs font-mono tracking-widest px-4">AGOTADO</span>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="h-10 px-6 font-bold text-sm bg-brand text-black hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            AÑADIR
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col bg-[#080808] border border-white/5 hover:border-brand/30 transition-colors"
    >
      <Link
        to={`/tienda/${product.id}`}
        className="relative aspect-square overflow-hidden bg-[#030303] flex items-center justify-center p-8"
      >
        <motion.img
          src={product.image || '/images/default-tool.png'} // Fallback if no image
          alt={product.name}
          className="object-contain w-full h-full max-h-48 group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/400x400/111/444?text=Herramienta'; // Placeholder if missing
          }}
        />

        {product.stock <= 0 && (
          <div className="absolute top-4 right-4 bg-red-500/20 text-red-500 text-[10px] font-mono px-2 py-1 uppercase tracking-widest backdrop-blur-md">
            Agotado
          </div>
        )}
      </Link>

      <div className="p-6 flex flex-col grow">
        <div className="flex justify-between items-start mb-4 grow">
          <div>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <Link to={`/tienda/${product.id}`}>
              <h3 className="text-lg font-bold text-white tracking-tight leading-tight line-clamp-3 hover:text-brand transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
        </div>

        <div className="mt-auto border-t border-white/10 relative overflow-hidden h-16">
          {/* Capa Base (Precio y Flecha) */}
          <div className="absolute inset-0 flex items-center justify-between transition-transform duration-300 transform group-hover:-translate-y-full">
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-mono text-zinc-500">PRECIO B2B</span>
              <span className="text-xl font-bold text-brand font-mono">
                ${product.price?.toLocaleString()}
              </span>
            </div>
            <Link
              to={`/tienda/${product.id}`}
              className="w-10 h-10 flex items-center justify-center bg-white/5 text-white hover:bg-white/10 transition-colors rounded-sm"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Capa Hover (Controles de Carrito) */}
          <div className="absolute inset-0 flex items-center justify-between transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
            {product.stock > 0 ? (
              <div className="flex items-center w-full gap-2 pt-1">
                <div className="flex items-center bg-black/40 border border-white/10 rounded-sm h-10 px-1 flex-1">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setQuantity(Math.max(1, quantity - 1));
                    }}
                    className="p-2 hover:text-brand transition-colors text-zinc-400"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-mono text-sm flex-1 text-center">{quantity}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setQuantity(Math.min(product.stock, quantity + 1));
                    }}
                    className="p-2 hover:text-brand transition-colors text-zinc-400"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="h-10 px-4 font-bold text-xs bg-brand text-black hover:bg-white transition-colors flex items-center justify-center rounded-sm min-w-[90px]"
                >
                  AÑADIR
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full pt-1">
                <span className="text-red-500 font-mono text-xs tracking-widest bg-red-500/10 px-4 py-2 rounded-sm w-full text-center">
                  SIN STOCK
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
