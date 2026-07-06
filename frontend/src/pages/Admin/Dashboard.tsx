import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ActivityIcon, UsersIcon, GlobeIcon, RefreshCwIcon } from 'lucide-react';
import { SEO } from '../../components/SEO';

interface TopPage {
  path: string;
  views: number;
}

interface AnalyticsSummary {
  total_pageviews: number;
  unique_visitors: number;
  top_pages: TopPage[];
}

export default function Dashboard() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMetrics = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch('/api/analytics/summary');
      if (!res.ok) throw new Error('Failed to fetch telemetry data');
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6 md:px-12 relative overflow-hidden font-sans">
      <SEO title="Glastor - Telemetry" description="Admin internal telemetry dashboard" />

      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white flex items-center gap-4">
              <ActivityIcon className="text-brand w-10 h-10" />
              Telemetría Core
            </h1>
            <p className="text-zinc-400 font-mono text-sm mt-2 uppercase tracking-widest">
              Glastor Analytics Engine v1.0
            </p>
          </div>

          <button
            onClick={fetchMetrics}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm font-mono text-xs uppercase tracking-widest transition-all disabled:opacity-50"
          >
            <RefreshCwIcon size={14} className={isRefreshing ? 'animate-spin text-brand' : ''} />
            {isRefreshing ? 'Sincronizando...' : 'Sincronizar'}
          </button>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <ActivityIcon className="animate-pulse text-brand w-8 h-8" />
          </div>
        ) : error ? (
          <div className="p-6 border border-red-500/30 bg-red-500/10 text-red-500 font-mono text-sm">
            ERROR DEL SISTEMA: {error}
          </div>
        ) : data ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-12"
          >
            {/* KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Unique Visitors */}
              <motion.div
                variants={itemVariants}
                className="p-8 border border-white/10 bg-white/5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-[50px] -mr-10 -mt-10 group-hover:bg-brand/20 transition-colors" />
                <div className="flex items-center gap-3 mb-4 text-zinc-400">
                  <UsersIcon size={20} />
                  <h3 className="font-mono text-xs uppercase tracking-widest">Visitantes Únicos</h3>
                </div>
                <div className="text-6xl md:text-7xl font-black tracking-tighter text-white">
                  {data.unique_visitors.toLocaleString()}
                </div>
              </motion.div>

              {/* Total Pageviews */}
              <motion.div
                variants={itemVariants}
                className="p-8 border border-white/10 bg-white/5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors" />
                <div className="flex items-center gap-3 mb-4 text-zinc-400">
                  <GlobeIcon size={20} />
                  <h3 className="font-mono text-xs uppercase tracking-widest">
                    Páginas Vistas (Total)
                  </h3>
                </div>
                <div className="text-6xl md:text-7xl font-black tracking-tighter text-white">
                  {data.total_pageviews.toLocaleString()}
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

                    {data.top_pages.length === 0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-8 text-center text-zinc-500 font-mono text-sm"
                        >
                          Sin datos registrados aún.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
