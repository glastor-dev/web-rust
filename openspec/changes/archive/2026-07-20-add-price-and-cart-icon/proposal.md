## Why

Actualmente, las tarjetas de productos (Product Cards) muestran "Ver precio" y un botón de "COTIZAR". Esto añade fricción al proceso de compra para usuarios que buscan añadir productos rápidamente al carrito. Mostrar el precio real y un icono directo de "Añadir al carrito" mejorará la usabilidad, aumentará la transparencia de precios y agilizará la decisión de compra, resultando en una experiencia de usuario (UX) mucho más práctica y directa.

## What Changes

- Modificar el componente `ProductCard` para que muestre el precio formateado (ej. `$389.000`) en lugar del texto "Ver precio".
- Reemplazar el botón con el texto "COTIZAR" por un botón más compacto o icono que represente "Añadir al carrito" (por ejemplo, un icono de carrito o "+").
- Asegurarse de que el botón interactúe correctamente con el estado global de la aplicación (añadiendo el producto al carrito mediante Zustand si está implementado).

## Capabilities

### New Capabilities
- `product-card-pricing-and-cart`: Se actualiza la presentación de la tarjeta de producto para mostrar el precio y permitir añadir al carrito de forma directa y visual.

### Modified Capabilities
- 

## Impact

- **Componentes**: `frontend/src/components/ui/ProductCard.tsx` (o el componente equivalente que renderice las tarjetas de producto en el catálogo y carruseles).
- **Diseño Visual**: Cambios menores en la distribución del pie de la tarjeta para acomodar el precio numérico y un botón con icono.
- **Lógica de UI**: Posible integración con el contexto/store del carrito si el botón de añadir al carrito se vuelve funcional.
