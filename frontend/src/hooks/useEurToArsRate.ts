'use client';

import { useQuery } from '@tanstack/react-query';

export interface EurArsRateData {
  sellRate: number;
  updatedAt: string;
  source: string;
}

const CACHE_KEY = 'glastor-eur-ars-oficial';

function readCachedRate(): EurArsRateData | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as EurArsRateData;
    if (typeof parsed.sellRate === 'number' && parsed.sellRate > 0) {
      return parsed;
    }
  } catch {
    // Ignore storage read errors
  }
  return undefined;
}

function writeCachedRate(data: EurArsRateData) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage write errors
  }
}

async function fetchEurOficialRate(): Promise<EurArsRateData | null> {
  // Primary source: DolarAPI (Euro Oficial Venta)
  try {
    const res = await fetch('https://dolarapi.com/v1/cotizaciones/eur', {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = (await res.json()) as {
        venta?: number;
        fechaActualizacion?: string;
      };
      if (typeof json.venta === 'number' && json.venta > 0) {
        const result: EurArsRateData = {
          sellRate: json.venta,
          updatedAt: json.fechaActualizacion || new Date().toISOString(),
          source: 'Euro Oficial (Venta)',
        };
        writeCachedRate(result);
        return result;
      }
    }
  } catch {
    // Fall through to secondary source
  }

  // Secondary fallback: Bluelytics (Oficial Euro Sell)
  try {
    const res = await fetch('https://api.bluelytics.com.ar/v2/latest', {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = (await res.json()) as {
        oficial_euro?: { value_sell?: number };
        last_update?: string;
      };
      const sell = json.oficial_euro?.value_sell;
      if (typeof sell === 'number' && sell > 0) {
        const result: EurArsRateData = {
          sellRate: sell,
          updatedAt: json.last_update || new Date().toISOString(),
          source: 'Euro Oficial (Venta)',
        };
        writeCachedRate(result);
        return result;
      }
    }
  } catch {
    // Fall through to cached value
  }

  return readCachedRate() ?? null;
}

export function formatArsFromEur(eurAmount: number, sellRate: number): string {
  const arsValue = Math.round(eurAmount * sellRate);
  return `$${arsValue.toLocaleString('es-AR')} ARS`;
}

export function formatRateTimestamp(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return 'hoy';
    return d.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return 'hoy';
  }
}

export function useEurToArsRate() {
  const query = useQuery<EurArsRateData | null>({
    queryKey: ['eur-ars-oficial-rate'],
    queryFn: fetchEurOficialRate,
    staleTime: 1000 * 60 * 30, // 30 minutos
    gcTime: 1000 * 60 * 60 * 4, // 4 horas
    retry: 1,
    refetchOnWindowFocus: false,
    initialData: () => readCachedRate(),
  });

  return {
    rate: query.data?.sellRate ?? null,
    updatedAt: query.data?.updatedAt ?? null,
    source: query.data?.source ?? 'Euro Oficial (Venta)',
    isLoading: query.isLoading,
  };
}
