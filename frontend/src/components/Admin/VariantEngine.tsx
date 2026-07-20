import React, { useState, useEffect } from 'react';
import { PlusIcon, Trash2Icon, Loader2Icon, LayersIcon } from 'lucide-react';

export interface ProductOption {
  id: string;
  title: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stock: number;
  options: Record<string, string>;
}

interface VariantEngineProps {
  options: ProductOption[];
  setOptions: React.Dispatch<React.SetStateAction<ProductOption[]>>;
  variants: ProductVariant[];
  setVariants: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
  basePrice: number;
  baseStock: number;
}

export function VariantEngine({
  options,
  setOptions,
  variants,
  setVariants,
  basePrice,
  baseStock,
}: VariantEngineProps) {
  const [newOptionTitle, setNewOptionTitle] = useState('');

  const addOption = () => {
    if (!newOptionTitle.trim()) return;
    setOptions([...options, { id: crypto.randomUUID(), title: newOptionTitle.trim(), values: [] }]);
    setNewOptionTitle('');
  };

  const removeOption = (id: string) => {
    setOptions(options.filter((o) => o.id !== id));
  };

  const addOptionValue = (optionId: string, value: string) => {
    if (!value.trim()) return;
    setOptions(
      options.map((o) => {
        if (o.id === optionId && !o.values.includes(value.trim())) {
          return { ...o, values: [...o.values, value.trim()] };
        }
        return o;
      }),
    );
  };

  const removeOptionValue = (optionId: string, valueToRemove: string) => {
    setOptions(
      options.map((o) => {
        if (o.id === optionId) {
          return { ...o, values: o.values.filter((v) => v !== valueToRemove) };
        }
        return o;
      }),
    );
  };

  const generateVariants = () => {
    if (options.length === 0) {
      setVariants([]);
      return;
    }

    // Filter out options without values
    const validOptions = options.filter((o) => o.values.length > 0);
    if (validOptions.length === 0) {
      setVariants([]);
      return;
    }

    // Cartesian product
    const cartesian = (arrays: any[][]) => {
      return arrays.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
    };

    const valuesArrays = validOptions.map((o) =>
      o.values.map((val) => ({ optionTitle: o.title, value: val })),
    );
    const combinations = cartesian(valuesArrays);

    const newVariants: ProductVariant[] = combinations.map((combo: any) => {
      const comboArray = Array.isArray(combo) ? combo : [combo];
      const optionsDict: Record<string, string> = {};
      const skuParts: string[] = ['SKU'];

      comboArray.forEach((c) => {
        optionsDict[c.optionTitle] = c.value;
        skuParts.push(c.value.substring(0, 3).toUpperCase());
      });

      const existingVariant = variants.find((v) => {
        // Check if existing variant has exact same options
        const keys = Object.keys(v.options);
        if (keys.length !== comboArray.length) return false;
        return keys.every((k) => v.options[k] === optionsDict[k]);
      });

      if (existingVariant) {
        return existingVariant;
      }

      return {
        id: crypto.randomUUID(),
        sku: skuParts.join('-'),
        price: basePrice,
        stock: baseStock,
        options: optionsDict,
      };
    });

    setVariants(newVariants);
  };

  const updateVariant = (id: string, field: keyof ProductVariant, value: any) => {
    setVariants(variants.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
  };

  return (
    <div className="space-y-8">
      {/* Options Builder */}
      <div className="space-y-4 bg-white/5 border border-white/10 p-6 rounded-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <LayersIcon size={16} className="text-brand" /> Opciones del Producto
        </h3>
        <p className="text-xs text-zinc-400">
          Define propiedades como Color, Talla, Material, etc.
        </p>

        <div className="space-y-4 mt-4">
          {options.map((opt) => (
            <div key={opt.id} className="p-4 bg-[#111] border border-white/10 rounded-md">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                  {opt.title}
                </span>
                <button
                  type="button"
                  onClick={() => removeOption(opt.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash2Icon size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {opt.values.map((val) => (
                  <span
                    key={val}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono text-zinc-200 flex items-center gap-2"
                  >
                    {val}
                    <button
                      type="button"
                      onClick={() => removeOptionValue(opt.id, val)}
                      className="text-zinc-500 hover:text-white"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nuevo valor (ej. Rojo, L, Algodón) y presiona Enter"
                  className="flex-1 bg-black border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addOptionValue(opt.id, e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>
          ))}

          <div className="flex gap-2">
            <input
              type="text"
              value={newOptionTitle}
              onChange={(e) => setNewOptionTitle(e.target.value)}
              placeholder="Nueva opción (ej. Talla)"
              className="flex-1 bg-[#111] border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-brand"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addOption();
                }
              }}
            />
            <button
              type="button"
              onClick={addOption}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-sm font-mono tracking-wider transition-colors"
            >
              Añadir Opción
            </button>
          </div>
        </div>
      </div>

      {/* Variants Generator */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Variantes Generadas ({variants.length})
          </h3>
          <button
            type="button"
            onClick={generateVariants}
            className="px-4 py-2 bg-brand/10 text-brand hover:bg-brand/20 border border-brand/30 rounded text-xs font-mono uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            Generar Variantes
          </button>
        </div>

        {variants.length > 0 ? (
          <div className="border border-white/10 rounded-md overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/40 text-zinc-500 font-mono text-xs uppercase tracking-widest">
                  <th className="p-3 border-b border-white/10">Variante</th>
                  <th className="p-3 border-b border-white/10">SKU</th>
                  <th className="p-3 border-b border-white/10">Precio (ARS)</th>
                  <th className="p-3 border-b border-white/10">Stock</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((variant) => (
                  <tr
                    key={variant.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-3 text-sm text-white font-medium">
                      {Object.values(variant.options).join(' / ')}
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded px-2 py-1 text-sm font-mono focus:border-brand outline-none"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={variant.price}
                        onChange={(e) =>
                          updateVariant(variant.id, 'price', parseFloat(e.target.value))
                        }
                        className="w-full bg-[#111] border border-white/10 rounded px-2 py-1 text-sm font-mono focus:border-brand outline-none"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={variant.stock}
                        onChange={(e) =>
                          updateVariant(variant.id, 'stock', parseInt(e.target.value))
                        }
                        className="w-full bg-[#111] border border-white/10 rounded px-2 py-1 text-sm font-mono focus:border-brand outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 border border-white/5 bg-white/5 text-center text-sm font-mono text-zinc-500 rounded-lg">
            No hay variantes generadas. Añade opciones y haz clic en "Generar Variantes".
          </div>
        )}
      </div>
    </div>
  );
}
