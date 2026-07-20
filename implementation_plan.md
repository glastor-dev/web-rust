# Optimización de Rendimiento de Imágenes (LCP)

El reporte de Lighthouse indica que las imágenes son el principal cuello de botella de rendimiento (LCP). Vamos a reducir drásticamente el peso de las imágenes (ahorro estimado de ~3.6 MB) aplicando compresión dinámica y redimensionamiento.

## Proposed Changes

### 1. Imágenes alojadas en Cloudinary

Actualmente se cargan en su tamaño original (ej. 1500x1500px). Modificaremos las URLs para aprovechar la API de transformación de Cloudinary al vuelo.
Aplicaremos los parámetros `f_auto,q_auto` y limitaremos el ancho (`w_`) según donde se muestren:

- **Tarjetas de Sistemas (sis1, sis2, sis3, sis4, maktrak)**: Ancho de `w_300` (suficiente para 122x122 en pantallas retina).
- **Iconos Secundarios (sec1, sec2, sec3, sec4, iso-27001)**: Ancho de `w_200`.
- **Imágenes One-Key (openkey2, onekey_logo)**: Ancho de `w_600` y `w_300`.
- **Separador (separador_b0cg6z)**: Ancho de `w_1200`.

### 2. Imágenes Locales (`/images/`)

Las imágenes `hero21.webp`, `hero23.webp` (usadas como fondos) y `glastor_pipeline_bg.png`, `DATAWEB.jpg`, `isologo-copm.webp` están siendo cargadas estáticamente sin optimización responsiva.

- Para los fondos (`background-image`), las migraremos al componente nativo de Next.js `<Image src="..." fill />` que genera automáticamente las versiones comprimidas y responsivas (`srcset`).
- Para las imágenes en etiquetas `<img>`, las cambiaremos a `<Image />` con dimensiones explícitas para evitar el CLS (Cumulative Layout Shift) y maximizar el LCP.

## Verification Plan

1. Revisaremos que las imágenes carguen visualmente idénticas pero en fracción de segundos.
2. Al inspeccionar el tráfico de red en el navegador, los tamaños de las imágenes Cloudinary deben haber bajado de ~400KB a ~15-30KB.
