import { Search01Icon, FilterIcon, ArrowDown01Icon } from 'hugeicons-react';

interface StoreFilterPanelProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedBrand: string;
  setSelectedBrand: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  categories: string[];
  brands: string[];
  totalResults: number;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function StoreFilterPanel({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  sortBy,
  setSortBy,
  categories,
  brands,
  totalResults,
  isOpen,
  onToggle,
}: StoreFilterPanelProps) {
  return (
    <div className="w-full bg-[#050505] border border-white/10 flex flex-col">
      <div className="p-4 border-b border-white/5 bg-[#0a0a0a] flex items-center justify-between">
        <h3 className="text-white font-bold tracking-widest text-sm uppercase">Filtros B2B</h3>
        <FilterIcon className="w-4 h-4 text-zinc-500" />
      </div>

      <div className="p-4 border-b border-white/5">
        <div className="relative group mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search01Icon className="h-4 w-4 text-zinc-500 group-focus-within:text-brand transition-colors" />
          </div>
          <input
            type="text"
            className="w-full bg-[#030303] border border-white/10 rounded-md py-2.5 pl-10 pr-12 text-white placeholder-zinc-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 focus:bg-[#080808] text-sm font-mono transition-all duration-300"
            placeholder="Buscar SKU o nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-[10px] text-zinc-600 font-mono border border-white/10 px-1.5 py-0.5 rounded bg-white/5 hidden sm:inline-block shadow-[0_0_10px_rgba(0,0,0,0.5)]">
              ⌘K
            </span>
          </div>
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none w-full bg-[#030303] border border-white/10 rounded py-2 pl-3 pr-8 text-white text-xs font-bold focus:outline-none focus:border-white/20"
          >
            <option value="relevance">Orden por Relevancia</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
          </select>
          <ArrowDown01Icon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
        </div>
      </div>

      <div className="p-4 border-b border-white/5">
        <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-500 mb-3">
          CATEGORÍA
        </h4>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-left px-3 py-2 rounded text-xs font-bold transition-colors ${
              selectedCategory === 'all' ? 'bg-brand text-black' : 'text-zinc-300 hover:bg-white/5'
            }`}
          >
            Todos los sistemas
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left px-3 py-2 rounded text-xs font-bold transition-colors ${
                selectedCategory === cat ? 'bg-brand text-black' : 'text-zinc-300 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-white/5">
        <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-500 mb-3">MARCA</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedBrand('all')}
            className={`px-3 py-1.5 rounded font-mono text-[10px] font-bold uppercase tracking-widest transition-colors ${
              selectedBrand === 'all'
                ? 'bg-white text-black'
                : 'border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
            }`}
          >
            TODAS
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1.5 rounded font-mono text-[10px] font-bold uppercase tracking-widest transition-colors ${
                selectedBrand === brand
                  ? 'bg-white text-black'
                  : 'border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-[#080808] text-center">
        <p className="font-bold text-xs text-zinc-400">
          <span className="text-brand font-mono">{totalResults}</span> productos encontrados
        </p>
      </div>
    </div>
  );
}
