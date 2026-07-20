## Context

Las tarjetas en "Los más vendidos" muestran el precio sin la tipografía, color (verde `#00ff66`) ni los sub-textos de "PRECIO B2B" presentes en la tienda principal, rompiendo la consistencia visual y de marca establecida en el proyecto.

## Goals / Non-Goals

**Goals:**
- Actualizar el contenedor del precio en `AccessoriesGrid.tsx` para coincidir con el diseño de `ProductCard.tsx`.
- Incluir un `flex-col` que renderice "PRECIO B2B" y el precio debajo.

**Non-Goals:**
- Modificar componentes distintos a `AccessoriesGrid.tsx`.
- Cambiar la lógica o fuentes de datos del precio.

## Decisions

- **Estructura DOM**: Se agrupará el precio en un `div` con flex-col para permitir alinear el texto de la etiqueta superior y el valor numérico.
- **Tailwind Classes**: 
  - Etiqueta: `text-[9px] sm:text-[10px] font-mono text-zinc-500`
  - Precio: `text-base sm:text-xl font-bold text-brand font-mono`

## Risks / Trade-offs

- **Espacio en la UI**: El contenedor de "más vendidos" puede tener menor anchura. 
  - *Mitigación*: Se ajustarán las clases responsivas (`sm:text-xl`) para garantizar legibilidad y evitar desbordamientos, de la misma forma que en `ProductCard`.
