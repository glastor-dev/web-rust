## Context

El `ProductCard` actual muestra "Ver precio" y un botón textual de "COTIZAR". Para hacer la interfaz más orientada a la conversión B2B directa, mostraremos el precio formateado (con la utilidad adecuada, si existe, para `ARS` o `USD`) y reemplazaremos el botón de cotizar por un icono visual de "Añadir al carrito" que interactúe con el store (ej. Zustand).

## Goals / Non-Goals

**Goals:**
- Mostrar precio formateado en la tarjeta usando el campo `product.price`.
- Cambiar botón "COTIZAR" por un icono funcional (e.g. `lucide-react` `ShoppingCart` o `Plus`).

**Non-Goals:**
- Rediseñar completamente la tarjeta.
- Cambiar la lógica del carrito de compras (solo la integración del botón).

## Decisions

- **Formateo del precio**: Usar `Intl.NumberFormat` para mostrar los precios con separadores de miles y el símbolo de moneda en el componente `ProductCard`.
- **Iconografía**: Utilizar un icono de `lucide-react` (ej. `ShoppingCart` o `ShoppingBag`) y hacerlo clickeable y con un `aria-label` para accesibilidad.

## Risks / Trade-offs

- **Precios dinámicos o nulos**: Algunos productos B2B podrían requerir cotización obligatoria sin precio público.
  - *Mitigación*: Mantener una validación `if (product.price > 0)` para mostrar el precio, y si no existe precio, hacer fallback a "Ver precio" o "Consultar".
