'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  Loader2Icon,
  SaveIcon,
  PlusIcon,
  Trash2Icon,
  ImageIcon,
  SettingsIcon,
  TypeIcon,
  LayersIcon,
} from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { MediaLibraryModal } from './MediaLibraryModal';
import { VariantEngine, ProductOption, ProductVariant } from './VariantEngine';

interface Product {
  id: string;
  name: string | null;
  category: string | null;
  status: string | null;
  price: number | null;
  stock: number | null;
  description: string | null;
  image: string | null;
  gallery: any | null;
  slug?: string | null;
  seo?: any | null;
  variants?: any | null;
}

interface ProductEditorModalProps {
  product: Product;
  isOpen: boolean;
  isNew?: boolean;
  onClose: () => void;
  onSave: (
    updated: Partial<Product>,
    options: ProductOption[],
    variants: ProductVariant[],
  ) => Promise<void>;
}

const parseJsonField = (g: any, fallback: any = []) => {
  if (!g) return fallback;
  if (typeof g === 'object') return g;
  try {
    const parsed = JSON.parse(g);
    return parsed || fallback;
  } catch (e) {
    return fallback;
  }
};

type TabType = 'general' | 'media' | 'variants' | 'seo';

export function ProductEditorModal({
  product,
  isOpen,
  isNew = false,
  onClose,
  onSave,
}: ProductEditorModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [isSaving, setIsSaving] = useState(false);

  // Media Modal State
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<'main' | 'gallery' | null>(null);

  const [options, setOptions] = useState<ProductOption[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  const [formData, setFormData] = useState({
    id: product.id || '',
    name: product.name || '',
    category: product.category || '',
    status: product.status || 'published',
    price: product.price || 0,
    stock: product.stock || 0,
    description: product.description || '',
    image: product.image || '',
    gallery: parseJsonField(product.gallery, []),
    slug: product.slug || '',
    seo: parseJsonField(product.seo, { title: '', description: '' }),
    variants: parseJsonField(product.variants, []),
  });

  useEffect(() => {
    const fetchVariantsData = async () => {
      try {
        const [optRes, varRes] = await Promise.all([
          fetch(`/api/products/${product.id}/options`),
          fetch(`/api/products/${product.id}/variants`),
        ]);
        if (optRes.ok) setOptions(await optRes.json());
        if (varRes.ok) setVariants(await varRes.json());
      } catch (err) {
        console.error('Error fetching variants', err);
      }
    };
    if (isOpen && !isNew) {
      fetchVariantsData();
    }
  }, [product.id, isOpen, isNew]);

  const handleMediaSelect = (url: string) => {
    if (mediaTarget === 'main') {
      setFormData((prev) => ({ ...prev, image: url }));
    } else if (mediaTarget === 'gallery') {
      setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, url] }));
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => {
      const newGallery = [...prev.gallery];
      newGallery.splice(index, 1);
      return { ...prev, gallery: newGallery };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(formData, options, variants);
    setIsSaving(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div key="modal-wrapper" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 shadow-2xl rounded-xl overflow-hidden flex flex-col h-[90vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/5 bg-[#050505]">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                {isNew ? 'Crear Producto' : 'Editar Producto'}
              </h2>
              <p className="text-xs font-mono text-zinc-500 uppercase mt-1 tracking-wider">
                {isNew ? 'Nuevo Ingreso' : `ID: ${product.id}`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-md transition-colors text-zinc-400 hover:text-white"
            >
              <XIcon size={20} />
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-48 bg-[#050505] border-r border-white/5 p-4 flex flex-col gap-2">
              <button
                onClick={() => setActiveTab('general')}
                className={`flex items-center gap-2 p-3 rounded-md text-sm transition-colors ${activeTab === 'general' ? 'bg-brand/10 text-brand' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
              >
                <TypeIcon size={16} /> General
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`flex items-center gap-2 p-3 rounded-md text-sm transition-colors ${activeTab === 'media' ? 'bg-brand/10 text-brand' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
              >
                <ImageIcon size={16} /> Medios
              </button>
              <button
                onClick={() => setActiveTab('variants')}
                className={`flex items-center gap-2 p-3 rounded-md text-sm transition-colors ${activeTab === 'variants' ? 'bg-brand/10 text-brand' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
              >
                <LayersIcon size={16} /> Variantes
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`flex items-center gap-2 p-3 rounded-md text-sm transition-colors ${activeTab === 'seo' ? 'bg-brand/10 text-brand' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
              >
                <SettingsIcon size={16} /> SEO
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
                {/* TAB: GENERAL */}
                <div className={activeTab === 'general' ? 'block' : 'hidden'}>
                  <div className="space-y-6">
                    {isNew && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                          ID del Producto (SKU base)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              id: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                            })
                          }
                          placeholder="ej. taladro-makita-18v"
                          className="w-full bg-[#111] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Título
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                          Categoría
                        </label>
                        <input
                          type="text"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          placeholder="Ej. Ropa, Accesorios..."
                          className="w-full bg-[#111] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                          Estado de Publicación
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full bg-[#111] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm"
                        >
                          <option value="draft">Borrador</option>
                          <option value="published">Publicado</option>
                          <option value="archived">Archivado</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                          Precio Base (ARS)
                        </label>
                        <input
                          type="number"
                          required
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: parseFloat(e.target.value) })
                          }
                          className="w-full bg-[#111] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                          Stock Global
                        </label>
                        <input
                          type="number"
                          required
                          value={formData.stock}
                          onChange={(e) =>
                            setFormData({ ...formData, stock: parseInt(e.target.value) })
                          }
                          className="w-full bg-[#111] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Descripción (Rich Text)
                      </label>
                      <RichTextEditor
                        value={formData.description}
                        onChange={(val) => setFormData({ ...formData, description: val })}
                      />
                    </div>
                  </div>
                </div>

                {/* TAB: MEDIA */}
                <div className={activeTab === 'media' ? 'block' : 'hidden'}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Imagen Principal
                      </label>
                      <div
                        className="relative border-2 border-dashed border-white/10 hover:border-brand/50 rounded-lg p-6 flex flex-col items-center justify-center text-center gap-4 transition-colors cursor-pointer bg-white/5"
                        onClick={() => {
                          setMediaTarget('main');
                          setIsMediaModalOpen(true);
                        }}
                      >
                        {formData.image ? (
                          <div className="flex flex-col items-center gap-4 w-full">
                            <img
                              src={formData.image}
                              alt="Preview"
                              className="max-h-40 object-contain rounded-md"
                            />
                            <div className="text-xs font-mono text-zinc-400 bg-black/50 px-3 py-1 rounded-full truncate max-w-full">
                              {formData.image}
                            </div>
                            <span className="text-brand text-sm hover:underline">
                              Click para cambiar desde el DAM
                            </span>
                          </div>
                        ) : (
                          <>
                            <div className="w-16 h-16 rounded-full bg-brand/10 text-brand flex items-center justify-center">
                              <ImageIcon size={32} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">Seleccionar del DAM</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-white/5">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex justify-between items-center">
                        <span>Galería</span>
                        <button
                          type="button"
                          onClick={() => {
                            setMediaTarget('gallery');
                            setIsMediaModalOpen(true);
                          }}
                          className="flex items-center gap-1 text-brand hover:text-white transition-colors"
                        >
                          <PlusIcon size={14} /> Agregar
                        </button>
                      </label>

                      {formData.gallery.length === 0 && (
                        <div className="p-4 bg-white/5 border border-white/10 rounded-md text-sm text-zinc-500 text-center font-mono">
                          No hay imágenes secundarias.
                        </div>
                      )}

                      {formData.gallery.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                          {formData.gallery.map((url: string, idx: number) => (
                            <div
                              key={idx}
                              className="relative group aspect-square bg-[#111] rounded-md border border-white/10 overflow-hidden flex items-center justify-center"
                            >
                              <img
                                src={url}
                                alt={`Gallery ${idx}`}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                              />
                              <button
                                type="button"
                                onClick={() => removeGalleryImage(idx)}
                                className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                                title="Eliminar"
                              >
                                <Trash2Icon size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* TAB: VARIANTS */}
                <div className={activeTab === 'variants' ? 'block' : 'hidden'}>
                  <VariantEngine
                    options={options}
                    setOptions={setOptions}
                    variants={variants}
                    setVariants={setVariants}
                    basePrice={formData.price}
                    baseStock={formData.stock}
                  />
                </div>

                {/* TAB: SEO */}
                <div className={activeTab === 'seo' ? 'block' : 'hidden'}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="mi-producto-increible"
                        className="w-full bg-[#111] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={formData.seo.title || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            seo: { ...formData.seo, title: e.target.value },
                          })
                        }
                        className="w-full bg-[#111] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Meta Description
                      </label>
                      <textarea
                        rows={4}
                        value={formData.seo.description || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            seo: { ...formData.seo, description: e.target.value },
                          })
                        }
                        className="w-full bg-[#111] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors text-sm"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/5 bg-[#050505] flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-sm font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="product-form"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-brand hover:bg-brand/90 text-black font-bold uppercase tracking-widest text-xs rounded-sm transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2Icon size={14} className="animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <SaveIcon size={14} />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={handleMediaSelect}
      />
    </AnimatePresence>
  );
}
