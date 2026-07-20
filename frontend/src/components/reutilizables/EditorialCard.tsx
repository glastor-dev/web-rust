'use client';

import { useEffect, useRef, useState } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

interface EditorialCardProps {
  title: string;
  text: string;
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
}

export function EditorialCard({
  title,
  text,
  fontFamily = 'Inter, sans-serif',
  fontSize = 16,
  lineHeight = 26,
}: EditorialCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ text: string; width: number }[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      if (entries[0]) {
        // Obtenemos el ancho exacto libre dentro de la tarjeta
        setContainerWidth(entries[0].contentRect.width);
      }
    });
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    return () => ro.disconnect();
  }, []);

  const actualFontSize = containerWidth < 640 ? Math.round(fontSize * 0.55) : fontSize;
  const actualLineHeight = containerWidth < 640 ? Math.round(lineHeight * 0.6) : lineHeight;

  useEffect(() => {
    if (containerWidth === 0) return;

    // Usamos pretext para calcular matemáticamente los saltos de línea sin tocar el DOM
    const font = `${actualFontSize}px ${fontFamily}`;
    const prepared = prepareWithSegments(text, font);

    // Generamos las líneas exactas
    const result = layoutWithLines(prepared, containerWidth, actualLineHeight);
    setLines(result.lines);
  }, [text, containerWidth, fontFamily, actualFontSize, actualLineHeight]);

  return (
    <div className="bg-[#050505] border border-white/10 p-6 md:p-8 w-full group hover:border-brand hover:shadow-[0_0_40px_rgba(0,255,102,0.05)] transition-all duration-500 rounded-sm">
      <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-6">
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-none">
          {title}
        </h3>
        <span className="text-brand font-mono text-[10px] uppercase tracking-widest shrink-0 ml-4">
          {lines.length} Líneas
        </span>
      </div>

      {/* Contenedor Editorial Exacto */}
      <div
        ref={containerRef}
        className="relative text-zinc-400"
        style={{
          height: lines.length * actualLineHeight + 'px',
          fontFamily: fontFamily,
          fontSize: actualFontSize + 'px',
        }}
      >
        {lines.map((line, i) => {
          // Si no es la última línea, podemos calcular el espacio sobrante para justificar (Tracking/Word-spacing dinámico)
          // Para esta demo, simplemente renderizamos la línea en su posición absoluta con posicionamiento sub-pixel.
          const isLast = i === lines.length - 1;
          const words = line.text.trim().split(' ');

          // Desactivamos la justificación en móviles para evitar los enormes huecos,
          // y en escritorio la aplicamos solo si hay más de 2 palabras.
          const shouldJustify = !isLast && containerWidth >= 640 && words.length > 2;

          return (
            <div
              key={i}
              className="absolute left-0 w-full flex"
              style={{
                top: i * actualLineHeight + 'px',
                justifyContent: shouldJustify ? 'space-between' : 'flex-start',
                gap: shouldJustify ? '0' : '0.5em',
              }}
            >
              {isLast || !shouldJustify ? (
                <span>{line.text}</span>
              ) : (
                words.map((word, wIdx) => <span key={wIdx}>{word}</span>)
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
