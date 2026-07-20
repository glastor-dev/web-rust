'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  ActivityIcon,
  UsersIcon,
  GlobeIcon,
  RefreshCwIcon,
  PackageIcon,
  Edit2Icon,
  Image as ImageIcon,
  PlusIcon,
  Trash2Icon,
  LockIcon,
  LogOutIcon,
} from 'lucide-react';
import { ProductEditorModal } from '@/components/Admin/ProductEditorModal';

interface TopPage {
  path: string;
  views: number;
}

interface TopEvent {
  event_name: string;
  count: number;
}

interface AnalyticsSummary {
  total_pageviews: number;
  unique_visitors: number;
  average_duration: number;
  top_pages: TopPage[];
  top_events: TopEvent[];
}

interface Product {
  id: string;
  name: string | null;
  price: number | null;
  stock: number | null;
  description: string | null;
  image: string | null;
  gallery: any | null;
}

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('glastor_admin_token');
    if (savedToken) setToken(savedToken);
    setIsCheckingAuth(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword }),
      });
      if (!res.ok) throw new Error('Contraseña incorrecta');
      const data = await res.json();
      localStorage.setItem('glastor_admin_token', data.token);
      setToken(data.token);
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('glastor_admin_token');
    router.push('/');
  };
  const [activeTab, setActiveTab] = useState<'telemetry' | 'catalog'>('telemetry');

  // Telemetry using React Query
  const {
    data = null,
    isLoading,
    error,
    isFetching: isRefreshing,
    refetch: refetchMetrics,
  } = useQuery<AnalyticsSummary | null>({
    queryKey: ['telemetry'],
    queryFn: async () => {
      const res = await fetch('/api/analytics/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch telemetry data');
      return res.json();
    },
    refetchInterval: 30000, // Auto-refresh every 30s
    enabled: activeTab === 'telemetry' && !!token,
  });

  // Catalog using React Query
  const {
    data: products = [],
    isLoading: isProductsLoading,
    refetch: refetchProducts,
  } = useQuery<Product[]>({
    queryKey: ['adminProducts'],
    queryFn: async () => {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
    enabled: activeTab === 'catalog' && !!token,
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // Optimistic Mutation for Saving Product
  const saveProductMutation = useMutation({
    mutationFn: async ({ payload, options, variants, isCreating, productId }: any) => {
      const method = isCreating ? 'POST' : 'PUT';
      const endpoint = isCreating ? '/api/products' : `/api/products/${productId}`;

      const res = await fetch(endpoint, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        method,

        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Error al guardar producto');

      if (options.length > 0 || variants.length > 0) {
        const variantsRes = await fetch(`/api/products/${productId}/variants`, {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          method: 'PUT',

          body: JSON.stringify({ options, variants }),
        });
        if (!variantsRes.ok) console.warn('Error al guardar variantes');
      }
      return payload;
    },
    onMutate: async ({ payload, isCreating }) => {
      await queryClient.cancelQueries({ queryKey: ['adminProducts'] });
      await queryClient.cancelQueries({ queryKey: ['products'] }); // Store cache
      const previousProducts = queryClient.getQueryData<Product[]>(['adminProducts']);

      // Optimistic Update
      if (isCreating) {
        queryClient.setQueryData<Product[]>(['adminProducts'], (old = []) => [
          ...old,
          payload as Product,
        ]);
      } else {
        queryClient.setQueryData<Product[]>(['adminProducts'], (old = []) =>
          old.map((p) => (p.id === payload.id ? { ...p, ...payload } : p)),
        );
      }
      return { previousProducts };
    },
    onError: (err, newProduct, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['adminProducts'], context.previousProducts);
      }
      alert('Error guardando los cambios.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Optimistic Mutation for Deleting Product
  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error eliminando producto');
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['adminProducts'] });
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const previousProducts = queryClient.getQueryData<Product[]>(['adminProducts']);

      // Optimistic Update
      queryClient.setQueryData<Product[]>(['adminProducts'], (old = []) =>
        old.filter((p) => p.id !== id),
      );
      return { previousProducts };
    },
    onError: (err, id, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['adminProducts'], context.previousProducts);
      }
      alert('Error eliminando producto.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleSaveProduct = async (
    updatedFields: Partial<Product>,
    options: any[] = [],
    variants: any[] = [],
  ) => {
    if (!editingProduct) return;
    const payload = isCreatingProduct
      ? { ...updatedFields, id: (updatedFields as any).id || `p-${Date.now()}` }
      : updatedFields;
    const productId = isCreatingProduct ? payload.id : editingProduct.id;

    saveProductMutation.mutate({
      payload,
      options,
      variants,
      isCreating: isCreatingProduct,
      productId,
    });

    setEditingProduct(null);
    setIsCreatingProduct(false);
  };

  const handleCreateNewProduct = () => {
    setEditingProduct({
      id: '',
      name: '',
      category: '',
      status: 'draft',
      price: 0,
      stock: 0,
      description: '',
      image: '',
      gallery: [],
    } as any);
    setIsCreatingProduct(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (
      !window.confirm('¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.')
    )
      return;
    deleteProductMutation.mutate(id);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <ActivityIcon className="animate-pulse text-brand w-8 h-8" />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-sans relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 w-full max-w-sm p-8 border border-white/10 bg-white/5 backdrop-blur-md relative"
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center border border-brand/20">
              <LockIcon className="text-brand w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter text-white">
              Glastor Admin
            </h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
              Acceso Restringido
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Clave de acceso"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 focus:border-brand text-white px-4 py-3 font-mono text-sm uppercase tracking-widest outline-none transition-all"
              />
            </div>
            {loginError && <p className="text-red-500 font-mono text-xs">{loginError}</p>}
            <button
              type="submit"
              disabled={isLoggingIn || !loginPassword}
              className="w-full bg-brand text-black font-black uppercase tracking-widest py-3 hover:bg-brand/80 transition-colors disabled:opacity-50"
            >
              {isLoggingIn ? 'Verificando...' : 'Desbloquear'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6 md:px-12 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-center gap-4">
              <ActivityIcon className="text-brand w-10 h-10" />
              Glastor SysAdmin
            </h1>
            <p className="text-zinc-400 font-mono text-sm mt-2 uppercase tracking-widest">
              Core Management System v2.0
            </p>
          </div>

          <div className="flex bg-white/5 border border-white/10 p-1 rounded-md">
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-sm transition-all ${
                activeTab === 'telemetry'
                  ? 'bg-white/10 text-brand'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              <ActivityIcon size={14} /> Telemetría
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-sm transition-all ${
                activeTab === 'catalog'
                  ? 'bg-white/10 text-brand'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              <PackageIcon size={14} /> Catálogo
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-sm font-mono text-xs uppercase tracking-widest transition-all ml-4"
            >
              <LogOutIcon size={14} /> Salir
            </button>
          </div>
        </header>

        {/* TELEMETRY TAB */}
        {activeTab === 'telemetry' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="flex justify-end border-b border-white/10 pb-4">
              <button
                onClick={() => refetchMetrics()}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm font-mono text-xs uppercase tracking-widest transition-all disabled:opacity-50"
              >
                <RefreshCwIcon
                  size={14}
                  className={isRefreshing ? 'animate-spin text-brand' : ''}
                />
                {isRefreshing ? 'Sincronizando...' : 'Sincronizar'}
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <ActivityIcon className="animate-pulse text-brand w-8 h-8" />
              </div>
            ) : error ? (
              <div className="p-6 border border-red-500/30 bg-red-500/10 text-red-500 font-mono text-sm">
                ERROR DEL SISTEMA: {error instanceof Error ? error.message : String(error)}
              </div>
            ) : data ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-12"
              >
                {/* KPIs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    variants={itemVariants}
                    className="p-8 border border-white/10 bg-white/5 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-[50px] -mr-10 -mt-10 group-hover:bg-brand/20 transition-colors" />
                    <div className="flex items-center gap-3 mb-4 text-zinc-400">
                      <UsersIcon size={20} />
                      <h3 className="font-mono text-xs uppercase tracking-widest">
                        Visitantes Únicos
                      </h3>
                    </div>
                    <div className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                      {data.unique_visitors.toLocaleString()}
                    </div>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="p-8 border border-white/10 bg-white/5 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors" />
                    <div className="flex items-center gap-3 mb-4 text-zinc-400">
                      <GlobeIcon size={20} />
                      <h3 className="font-mono text-xs uppercase tracking-widest">
                        Páginas Vistas
                      </h3>
                    </div>
                    <div className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                      {data.total_pageviews.toLocaleString()}
                    </div>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="p-8 border border-white/10 bg-white/5 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-colors" />
                    <div className="flex items-center gap-3 mb-4 text-zinc-400">
                      <ActivityIcon size={20} />
                      <h3 className="font-mono text-xs uppercase tracking-widest">
                        Duración Promedio
                      </h3>
                    </div>
                    <div className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                      {data.average_duration}s
                    </div>
                  </motion.div>
                </div>

                {/* Top Pages Table */}
                <motion.div
                  variants={itemVariants}
                  className="border border-white/10 bg-white/5 p-6 md:p-8"
                >
                  <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-6">
                    Top 5 Rutas Más Visitadas
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-zinc-500 font-mono text-xs uppercase tracking-widest">
                          <th className="pb-4 font-normal">Ruta (Path)</th>
                          <th className="pb-4 font-normal text-right">Vistas</th>
                          <th className="pb-4 font-normal text-right hidden sm:table-cell">
                            Porcentaje
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.top_pages.map((page, idx) => {
                          const percentage =
                            data.total_pageviews > 0
                              ? ((page.views / data.total_pageviews) * 100).toFixed(1)
                              : '0';
                          return (
                            <tr
                              key={idx}
                              className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                            >
                              <td className="py-4 font-mono text-sm text-white flex items-center gap-3">
                                <span className="text-brand opacity-50">/{idx + 1}</span>
                                {page.path}
                              </td>
                              <td className="py-4 font-mono text-sm text-right text-zinc-300">
                                {page.views.toLocaleString()}
                              </td>
                              <td className="py-4 font-mono text-sm text-right text-zinc-500 hidden sm:table-cell">
                                <div className="flex items-center justify-end gap-3">
                                  <span>{percentage}%</span>
                                  <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-brand"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* Top Events Table */}
                <motion.div
                  variants={itemVariants}
                  className="border border-white/10 bg-white/5 p-6 md:p-8"
                >
                  <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-6">
                    Top Eventos Interactivos
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-zinc-500 font-mono text-xs uppercase tracking-widest">
                          <th className="pb-4 font-normal">Evento</th>
                          <th className="pb-4 font-normal text-right">Veces Disparado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.top_events?.map((event, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                          >
                            <td className="py-4 font-mono text-sm text-white flex items-center gap-3">
                              <span className="text-brand opacity-50">/{idx + 1}</span>
                              {event.event_name}
                            </td>
                            <td className="py-4 font-mono text-sm text-right text-zinc-300">
                              {event.count.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </motion.div>
        )}

        {/* CATALOG TAB */}
        {activeTab === 'catalog' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 border-t border-white/10 pt-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Catálogo de Productos</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => refetchProducts()}
                  disabled={isProductsLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm font-mono text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                >
                  <RefreshCwIcon
                    size={14}
                    className={isProductsLoading ? 'animate-spin text-brand' : ''}
                  />
                  Refrescar
                </button>
                <button
                  onClick={handleCreateNewProduct}
                  className="flex items-center gap-2 px-4 py-2 bg-brand/10 hover:bg-brand/20 text-brand border border-brand/20 rounded-sm font-mono text-xs uppercase tracking-widest transition-all"
                >
                  <PlusIcon size={14} />
                  Crear Producto
                </button>
              </div>
            </div>

            {isProductsLoading && products.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <PackageIcon className="animate-pulse text-brand w-8 h-8" />
              </div>
            ) : (
              <div className="border border-white/10 bg-white/5 rounded-md overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/40 text-zinc-500 font-mono text-xs uppercase tracking-widest">
                      <th className="p-4 font-normal w-16 text-center">Img</th>
                      <th className="p-4 font-normal">SKU</th>
                      <th className="p-4 font-normal">Título</th>
                      <th className="p-4 font-normal text-right">Precio</th>
                      <th className="p-4 font-normal text-center">Stock</th>
                      <th className="p-4 font-normal text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group"
                      >
                        <td className="p-4">
                          <div className="w-12 h-12 bg-black rounded border border-white/10 flex items-center justify-center overflow-hidden">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name || 'Product'}
                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                              />
                            ) : (
                              <ImageIcon size={16} className="text-zinc-600" />
                            )}
                          </div>
                        </td>
                        <td className="p-4 font-mono text-sm text-brand">{product.id}</td>
                        <td className="p-4 font-medium text-white">
                          {product.name || 'Sin Título'}
                        </td>
                        <td className="p-4 text-right font-mono text-zinc-300">
                          {product.price ? `$${product.price.toLocaleString()}` : '-'}
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-mono font-bold ${
                              (product.stock || 0) > 0
                                ? 'bg-green-500/10 text-green-400'
                                : 'bg-red-500/10 text-red-400'
                            }`}
                          >
                            {product.stock || 0} UND
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingProduct(product);
                                setIsCreatingProduct(false);
                              }}
                              className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-md transition-colors"
                              title="Editar"
                            >
                              <Edit2Icon size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-md transition-colors"
                              title="Eliminar"
                            >
                              <Trash2Icon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-zinc-500 font-mono text-sm">
                          No hay productos en el catálogo.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {editingProduct && (
        <ProductEditorModal
          product={editingProduct}
          isOpen={true}
          isNew={isCreatingProduct}
          onClose={() => {
            setEditingProduct(null);
            setIsCreatingProduct(false);
          }}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}
