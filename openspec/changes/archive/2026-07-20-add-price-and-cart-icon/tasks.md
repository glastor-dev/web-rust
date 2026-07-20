## 1. Localizar y Preparar Componentes

- [x] 1.1 Identificar el componente `ProductCard.tsx` (o equivalente) en `frontend/src/components/ui/` o `frontend/src/components/`.
- [x] 1.2 Verificar si existe una función de formateo de moneda (e.g. `formatCurrency` en `utils` o crearla si no existe).

## 2. Modificar ProductCard

- [x] 2.1 Reemplazar el texto "Ver precio" por la renderización dinámica de `product.price` (formateado). Implementar un fallback visual si el precio es 0.
- [x] 2.2 Importar el icono de carrito (`ShoppingCart` o `ShoppingBag` de `lucide-react`).
- [x] 2.3 Reemplazar el botón con texto "COTIZAR" por un botón compacto con el icono de carrito, asegurando de que mantenga la consistencia estética y tenga el aria-label correspondiente.

## 3. Integrar Funcionalidad

- [x] 3.1 Conectar el evento `onClick` del nuevo botón de carrito a la lógica existente o al store de Zustand (si existe la funcionalidad de carrito en la app).
- [x] 3.2 Añadir o disparar un Toast de notificación al añadir al carrito para brindar respuesta visual al usuario.
