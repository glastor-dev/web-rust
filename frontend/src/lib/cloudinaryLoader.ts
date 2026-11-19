'use client';

export interface CloudinaryLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudinaryLoader({ src, width, quality }: CloudinaryLoaderParams): string {
  if (!src) return '';

  // Si no es de Cloudinary (e.g. assets locales o remotos sin CDN),
  // incluimos width en query para satisfacer la validación de ancho de Next.js
  if (!src.includes('res.cloudinary.com')) {
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}w=${width}&q=${quality ?? 75}`;
  }

  // Las URLs de Cloudinary tienen la estructura:
  // https://res.cloudinary.com/<cloud_name>/image/upload/<transformations>/<version>/<public_id>
  // Si la URL no tiene '/upload/', devolvemos con width query.
  const parts = src.split('/upload/');
  if (parts.length !== 2) {
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}w=${width}&q=${quality ?? 75}`;
  }

  // Inyectamos f_auto (formato automático AVIF/WebP), q_auto (calidad óptima) y w_{width} (ancho adaptativo)
  const params = `f_auto,q_${quality ?? 'auto'},c_limit,w_${width}`;

  return `${parts[0]}/upload/${params}/${parts[1]}`;
}
