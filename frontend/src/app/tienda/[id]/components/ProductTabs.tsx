'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, StarHalf } from 'lucide-react';
import type { Product } from '@/components/ui/ProductCard';

interface ProductTabsProps {
  product: Product;
  sku: string;
  mockReviewsData: {
    reviews: any[];
    totalCount: number;
  };
}

export function ProductTabs({ product, sku, mockReviewsData }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'RESUMEN' | 'ESPECIFICACIONES' | 'RESEÑAS'>('RESUMEN');

  return (
    <div className="border-t border-white/10 pt-8 mt-12">
      <div className="flex gap-8 border-b border-zinc-800 mb-8 overflow-x-auto pb-4 hide-scrollbar">
        {[
          'RESUMEN',
          'ESPECIFICACIONES TÉCNICAS',
          `RESEÑAS (${mockReviewsData.totalCount})`,
        ].map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(tab.split(' ')[0] as any)}
            className={`text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap pb-4 relative transition-colors ${
              activeTab === tab.split(' ')[0]
                ? 'text-brand'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab}
            {activeTab === tab.split(' ')[0] && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-brand"
              />
            )}
          </button>
        ))}
      </div>

      <div className="min-h-100">
        <AnimatePresence mode="wait">
          {activeTab === 'RESUMEN' && (
            <motion.div
              key="RESUMEN"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
            >
              {/* Left Column: Acerca del modelo */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">
                  ACERCA DEL MODELO
                </h3>
                <div
                  className="text-zinc-400 text-sm leading-relaxed [&>p]:mb-5 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-3 [&>ul]:mb-5 [&_strong]:text-white"
                  dangerouslySetInnerHTML={{
                    __html:
                      product.about_model ||
                      product.description ||
                      `
                    <p>El ${product.name} se distingue por su ingeniería de vanguardia diseñada para dominar las aplicaciones de alta demanda. Este modelo incorpora un <strong class="text-white">motor de alto rendimiento</strong> que, junto con el control de velocidad, aplica potencia adicional automáticamente bajo carga, asegurando un rendimiento óptimo y consistente.</p>
                    <p>Su diseño se centra en la resistencia y la protección, con componentes de alta durabilidad que resguardan las superficies delicadas de posibles daños. Además, características como su ergonomía avanzada y el <strong class="text-white">arranque suave</strong> no solo aumentan la comodidad y el control del operador, sino que también prolongan la vida útil del equipo, haciendo de esta herramienta una inversión inteligente y duradera.</p>
                  `,
                  }}
                />
              </div>

              {/* Right Column: Características Principales */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">
                  CARACTERÍSTICAS PRINCIPALES
                </h3>
                <ul className="list-disc pl-5 space-y-4 text-sm text-zinc-400 marker:text-brand">
                  {(() => {
                    try {
                      const features = product.features ? JSON.parse(product.features) : null;
                      if (Array.isArray(features) && features.length > 0) {
                        return features.map((f: any, i: number) => (
                          <li key={i}>
                            <strong className="text-white">
                              {f.title || f.name || 'Destacado'}:
                            </strong>{' '}
                            {f.desc || f.description || f.value || f}
                          </li>
                        ));
                      }
                    } catch (e) {
                      if (product.features && product.features.length > 5) {
                        return (
                          <li>
                            <strong className="text-white">Destacado:</strong>{' '}
                            <span
                              className="block mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-3 [&_li]:marker:text-brand"
                              dangerouslySetInnerHTML={{ __html: product.features }}
                            />
                          </li>
                        );
                      }
                    }
                    return (
                      <>
                        <li>
                          <strong className="text-white">Portabilidad Inalámbrica Superior:</strong>{' '}
                          Ofrece una solución sin cables para una variedad de aplicaciones
                          industriales, maximizando la movilidad y flexibilidad en el lugar de
                          trabajo.
                        </li>
                        <li>
                          <strong className="text-white">Control de Velocidad Preciso:</strong>{' '}
                          Equipada con un selector y gatillo de velocidad variable que permite al
                          usuario igualar la velocidad a la aplicación específica, garantizando
                          acabados impecables.
                        </li>
                      </>
                    );
                  })()}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'ESPECIFICACIONES' && (
            <motion.div
              key="ESPECIFICACIONES"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="flex flex-col max-w-4xl"
            >
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">
                ESPECIFICACIONES DEL PRODUCTO
              </h3>

              {/* Tabla de Especificaciones */}
              <div className="border border-white/20 rounded-md mb-10 overflow-hidden bg-black/20">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-white/20 p-4 sm:p-6 hover:bg-white/5 transition-colors">
                  <span className="text-xs font-bold uppercase text-zinc-400 mb-2 sm:mb-0 flex items-center">
                    MODELO / SKU
                  </span>
                  <span className="font-mono text-sm text-white">{sku}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-white/20 p-4 sm:p-6 hover:bg-white/5 transition-colors">
                  <span className="text-xs font-bold uppercase text-zinc-400 mb-2 sm:mb-0 flex items-center">
                    MATERIAL BASE
                  </span>
                  <span className="font-mono text-sm text-white">
                    {product.material || 'Aleación de Grado Industrial'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-white/20 p-4 sm:p-6 hover:bg-white/5 transition-colors">
                  <span className="text-xs font-bold uppercase text-zinc-400 mb-2 sm:mb-0 flex items-center">
                    DIMENSIONES (LXWXH)
                  </span>
                  <span className="font-mono text-sm text-white">
                    {product.dimensions || 'N/A'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] p-4 sm:p-6 hover:bg-white/5 transition-colors">
                  <span className="text-xs font-bold uppercase text-zinc-400 mb-2 sm:mb-0 flex items-center">
                    PESO OPERATIVO
                  </span>
                  <span className="font-mono text-sm text-white">{product.weight || 'N/A'}</span>
                </div>
              </div>

              {/* Lista dinámica de SEO/Atributos */}
              <ul className="list-disc pl-5 space-y-4 text-sm text-zinc-300 marker:text-brand">
                {(() => {
                  try {
                    const specs = product.specifications
                      ? JSON.parse(product.specifications)
                      : null;
                    if (specs && typeof specs === 'object' && Object.keys(specs).length > 0) {
                      return Object.entries(specs).map(([key, value]) => (
                        <li key={key}>
                          <strong className="text-white capitalize">
                            {key.replace(/_/g, ' ')}:
                          </strong>{' '}
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </li>
                      ));
                    }
                  } catch (e) {
                    return (
                      <li>
                        <strong className="text-white">Detalles:</strong>{' '}
                        <span
                          className="block mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-3 [&_li]:marker:text-brand"
                          dangerouslySetInnerHTML={{ __html: product.specifications || '' }}
                        />
                      </li>
                    );
                  }

                  return (
                    <>
                      <li>
                        <strong className="text-white">Modelo:</strong>{' '}
                        {product.name.split(' ')[0] || 'GVP01M1'}
                      </li>
                      <li>
                        <strong className="text-white">Tipo de Herramienta:</strong> Grado
                        Industrial
                      </li>
                    </>
                  );
                })()}
              </ul>
            </motion.div>
          )}

          {activeTab === 'RESEÑAS' && (
            <motion.div
              key="RESEÑAS"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="columns-1 md:columns-2 gap-6"
            >
              {mockReviewsData.reviews.map((review) => {
                const fullStars = Math.floor(review.numericRating);
                const hasHalf = review.numericRating - fullStars >= 0.4;
                return (
                  <div
                    key={review.id}
                    className="break-inside-avoid p-6 bg-[#080808] border border-white/5 flex flex-col gap-4 hover:border-brand/30 transition-colors mb-6 rounded-xl"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-bold tracking-tight text-lg">
                          {review.name}
                        </h4>
                        <p className="text-xs font-mono text-zinc-500 uppercase mt-1">
                          {review.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-brand/10 px-3 py-1.5 rounded-sm border border-brand/20">
                        <div className="flex text-brand">
                          {[...Array(fullStars)].map((_, i) => (
                            <Star key={`f-${i}`} size={14} fill="currentColor" />
                          ))}
                          {hasHalf && <StarHalf size={14} fill="currentColor" />}
                          {[...Array(5 - fullStars - (hasHalf ? 1 : 0))].map((_, i) => (
                            <Star key={`e-${i}`} size={14} className="text-zinc-700" />
                          ))}
                        </div>
                        <span className="text-brand font-bold font-mono text-xs ml-1">
                          {review.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-zinc-400 font-light leading-relaxed">{review.text}</p>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
