## Why

Actualmente, las tarjetas de "Los más vendidos" (AccessoriesGrid) muestran el precio de forma simple, lo que desentona con el diseño premium establecido en las tarjetas de la tienda (`ProductCard`), donde el precio tiene una etiqueta "PRECIO B2B" y un estilo visual destacado en color verde de la marca (brand). Unificar estos estilos mejorará la consistencia de diseño y la percepción de valor de la plataforma B2B.

## What Changes

- Modificar la renderización del precio en el componente de "Los más vendidos" (`AccessoriesGrid.tsx`) para que adopte la misma estructura que en la tienda principal.
- Añadir el label "PRECIO B2B" sobre el monto numérico.
- Aplicar las clases CSS de Tailwind (`text-[10px] font-mono text-zinc-500` para el label, y `text-xl font-bold text-brand font-mono` para el precio).

## Capabilities

### New Capabilities
- `bestsellers-price-style`: Unificación visual del estilo de precio de los productos destacados en la sección de "Los más vendidos" para mantener coherencia con `ProductCard`.

### Modified Capabilities
- 

## Impact

- **Componentes**: `frontend/src/components/sections/milwaukee/AccessoriesGrid.tsx`.
- **Diseño Visual**: Las tarjetas en el carrusel de más vendidos tendrán un bloque de precio apilado verticalmente, más grande y con el color principal de la marca, coincidiendo con la tienda.
