import { Search, Filter, ChevronDown } from 'lucide-react';

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
}: StoreFilterPanelProps) {
  return (
    <div className="w-full bg-[#050505] border border-white/10 rounded-xl overflow-hidden mb-12 flex flex-col">
      {/* Top Row: Search and Core Actions */}
      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6 border-b border-white/5 bg-[#0a0a0a]">
        {/* Search Input */}
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-brand transition-colors" />
          </div>
          <input
            type="text"
            className="w-full bg-[#050505] border border-white/5 rounded-lg py-3.5 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all font-mono"
            placeholder="Buscar en el catálogo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#050505] border border-white/5 rounded-lg py-3.5 pl-5 pr-12 text-white text-sm font-bold focus:outline-none focus:border-white/20 transition-colors h-full"
            >
              <option value="relevance">Orden por Relevancia</option>
              <option value="price_asc">Precio: Menor a Mayor</option>
              <option value="price_desc">Precio: Mayor a Menor</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>
          <button className="flex items-center gap-2 bg-[#050505] border border-white/5 hover:bg-white/5 hover:border-white/20 transition-colors text-white px-5 py-3.5 rounded-lg font-bold text-sm">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>
      </div>

      {/* Categories Row */}
      <div className="px-4 md:px-6 py-5 border-b border-white/5 bg-[#080808]">
        <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide snap-x">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`whitespace-nowrap px-5 py-2 rounded-lg font-bold text-sm transition-colors snap-start ${
              selectedCategory === 'all'
                ? 'bg-brand text-black'
                : 'bg-transparent border border-white/10 text-zinc-300 hover:border-brand/50 hover:text-white'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-lg font-bold text-sm transition-colors snap-start ${
                selectedCategory === cat
                  ? 'bg-brand text-black'
                  : 'bg-transparent border border-white/10 text-zinc-300 hover:border-brand/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brands Row */}
      <div className="px-4 md:px-6 py-5 border-b border-white/5 bg-[#0a0a0a] flex items-center gap-4">
        <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 shrink-0">
          MARCA:
        </span>
        <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide flex-1">
          <button
            onClick={() => setSelectedBrand('all')}
            className={`whitespace-nowrap px-4 py-1.5 rounded font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
              selectedBrand === 'all'
                ? 'border border-brand text-brand'
                : 'border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
            }`}
          >
            TODAS
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`whitespace-nowrap px-4 py-1.5 rounded font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
                selectedBrand === brand
                  ? 'border border-brand text-brand'
                  : 'border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Info Row */}
      <div className="px-4 md:px-6 py-4 bg-[#080808]">
        <p className="font-bold text-sm text-zinc-400">
          Mostrando <span className="text-brand font-mono">{totalResults}</span> productos
        </p>
      </div>
    </div>
  );
}
