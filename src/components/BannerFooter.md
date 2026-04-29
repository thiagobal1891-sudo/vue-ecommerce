# BannerFooter Component

## Overview

El componente `BannerFooter` es un banner moderno y altamente optimizado para mostrar productos y contenido de estilo de vida. Utiliza Vue 3 Composition API, CSS moderno con variables, y técnicas avanzadas de rendimiento.

## Features

- **Vue 3 Composition API** con `<script setup>`
- **Lazy Loading** de imágenes con Intersection Observer
- **CSS Variables** para diseño system consistente
- **Container Queries** para responsive design moderno
- **Micro-interacciones** avanzadas con efectos hover
- **Accesibilidad** completa con ARIA labels y soporte para reduced motion
- **Performance** optimizado con will-change y animaciones eficientes
- **Theme variants** para diferentes estilos de cards

## Props

### `config` (Object, opcional)
Configuración principal del componente.

```javascript
{
  ariaLabel: String,           // 'Featured products and lifestyle banner'
  mainCard: {
    tag: String,              // 'Lifestyle'
    title: String,            // 'Makeup Accessories from Top Brands'
    subtitle: String,         // 'Discover premium beauty products curated for you'
    tagColor: String,         // 'rgba(255,255,255,0.2)'
    backgroundImage: String  // URL de la imagen
  },
  productCards: Array[{
    id: String,               // Identificador único
    title: String,            // Título del producto
    actionText: String,       // Texto del botón (ej: 'Shop')
    url: String,              // URL de destino
    ariaLabel: String,        // Label para accesibilidad
    theme: String,            // Theme CSS (ej: 'skincare', 'facepacks')
    backgroundImage: String   // URL de la imagen de fondo
  }]
}
```

### `lazyLoad` (Boolean, default: true)
Habilita/deshabilita el lazy loading de imágenes.

### `animationDelay` (Number, default: 100)
Retraso en milisegundos para las animaciones de entrada.

## Uso Básico

```vue
<template>
  <BannerFooter />
</template>

<script setup>
import BannerFooter from '@/components/BannerFooter.vue'
</script>
```

## Uso Avanzado

```vue
<template>
  <BannerFooter 
    :config="customConfig"
    :lazy-load="true"
    :animation-delay="200"
  />
</template>

<script setup>
import { ref } from 'vue'
import BannerFooter from '@/components/BannerFooter.vue'

const customConfig = ref({
  ariaLabel: 'Nuestros productos destacados',
  mainCard: {
    tag: 'Nuevo',
    title: 'Colección Primavera 2024',
    subtitle: 'Descubre las últimas tendencias en belleza',
    tagColor: 'rgba(34, 197, 94, 0.2)',
    backgroundImage: 'https://example.com/image.jpg'
  },
  productCards: [
    {
      id: 'maquillaje',
      title: 'Maquillaje Profesional',
      actionText: 'Ver más',
      url: '/maquillaje',
      ariaLabel: 'Explorar productos de maquillaje',
      theme: 'maquillaje',
      backgroundImage: 'https://example.com/maquillaje.jpg'
    },
    {
      id: 'cuidado',
      title: 'Cuidado Facial',
      actionText: 'Comprar',
      url: '/cuidado-facial',
      ariaLabel: 'Productos para cuidado facial',
      theme: 'cuidado',
      backgroundImage: 'https://example.com/cuidado.jpg'
    }
  ]
})
</script>
```

## Customización de Themes

Puedes añadir nuevos themes modificando las variables CSS:

```css
.card--nuevo-theme {
  background: var(--gradient-overlay),
              url('tu-imagen.jpg');
}
```

## Performance Considerations

- **Lazy Loading**: Las imágenes solo se cargan cuando el componente es visible
- **Will-change**: Optimizado para transformaciones GPU
- **Container Queries**: Responsive design más eficiente
- **CSS Variables**: Mantenimiento y consistencia mejorados

## Accesibilidad

- **ARIA Labels**: Descriptivos para screen readers
- **Reduced Motion**: Respetan preferencias del usuario
- **High Contrast**: Soporte para modo de alto contraste
- **Focus Management**: Estilos de foco visibles
- **Keyboard Navigation**: Navegación completa por teclado

## Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+
- **Container Queries**: Chrome 105+, Firefox 110+
- **CSS Variables**: Todos los browsers modernos
- **Intersection Observer**: Todos los browsers modernos

## Dependencies

- Vue 3 con Composition API
- Composable `useIntersectionObserver` (incluido)

## Archivos Relacionados

- `src/components/BannerFooter.vue` - Componente principal
- `src/composables/useIntersectionObserver.js` - Composable para lazy loading
- `src/components/BannerFooter.md` - Esta documentación

## Tips de Uso

1. **Imágenes optimizadas**: Usa formatos modernos (WebP, AVIF)
2. **Tamaños consistentes**: Mantén proporciones similares en las imágenes
3. **Performance**: Habilita lazy loading para páginas largas
4. **Accesibilidad**: Proporciona siempre ariaLabels descriptivos
5. **Testing**: Prueba en diferentes dispositivos y navegadores

## Troubleshooting

### Imágenes no cargan
- Verifica las URLs en la configuración
- Revisa CORS si usas imágenes externas
- Habilita lazy load: false para debugging

### Animaciones no funcionan
- Revisa `prefers-reduced-motion` en browser settings
- Verifica soporte de CSS Variables
- Comprueba que `will-change` no esté bloqueado

### Responsive issues
- Verifica soporte de Container Queries
- Usa fallback @media queries
- Testea en diferentes viewports
