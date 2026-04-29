<template>
  <main class="home" :aria-label="'Home page with products and collections'">
    <section class="heroSection" ref="heroSection" aria-label="Productos Destacados">
      <ProductList v-if="heroVisible" />
    </section>

    <section class="collectionsSection" ref="collectionsSection" aria-label="Colecciones Disponibles">
      <CollectionsVue v-if="collectionsVisible" />
    </section>

    <section class="brandsSection" ref="brandsSection" aria-label="Marcas Asociadas">
      <BrandsVue v-if="brandsVisible" />
    </section>

    <section class="bannerSection" ref="bannerSection" aria-label="Información y Pie de página">
      <BannerFooter v-if="bannerVisible" />
    </section>
  </main>
</template>
<script>
import { defineAsyncComponent } from 'vue';
import ProductList from '@/components/ProductList.vue';

const CollectionsVue = defineAsyncComponent(() => 
  import('@/components/CollectionsVue.vue')
);
const BrandsVue = defineAsyncComponent(() => 
  import('@/components/BrandsVue.vue')
);
const BannerFooter = defineAsyncComponent(() => 
  import('@/components/BannerFooter.vue')
);

export default {
  name: 'HomePage',
  components: {
    ProductList,
    CollectionsVue,
    BrandsVue,
    BannerFooter
  },
  data() {
    return {
      heroVisible: true,
      collectionsVisible: false,
      brandsVisible: false,
      bannerVisible: false
    };
  },
  mounted() {
    this.initializeIntersectionObserver();
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    initializeIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.dataset.section;
            if (sectionName) {
              this[sectionName + 'Visible'] = true;
              this.observer.unobserve(entry.target);
            }
          }
        });
      }, options);

      const sections = [
        { ref: 'collectionsSection', name: 'collections' },
        { ref: 'brandsSection', name: 'brands' },
        { ref: 'bannerSection', name: 'banner' }
      ];

      sections.forEach(({ ref, name }) => {
        const element = this.$refs[ref];
        if (element) {
          element.dataset.section = name;
          this.observer.observe(element);
        }
      });
    }
  }
};
</script>
<style>
.home {
  display: flex;
  flex-direction: column;
  gap: clamp(60px, 8vw, 120px);
  min-height: 100vh;
  background-color: #fcfcfd;
  padding: 0 clamp(16px, 4vw, 48px);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.heroSection,
.collectionsSection,
.brandsSection,
.bannerSection {
  min-height: 200px;
  position: relative;
}

@keyframes smoothFadeUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.heroSection > *,
.collectionsSection > *,
.brandsSection > * {
  animation: smoothFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes scrollScaleReveal {
  from {
    opacity: 0.6;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@supports (animation-timeline: view()) {
  .bannerSection {
    animation: scrollScaleReveal linear both;
    animation-timeline: view();
    animation-range: cover 0% cover 30%;
    will-change: opacity, transform;
  }
}



@media (prefers-reduced-motion: reduce) {
  .heroSection > *,
  .collectionsSection > *,
  .brandsSection > *,
  .bannerSection,
  .collectionsSection,
  .brandsSection {
    animation: none !important;
    transition: none !important;
  }
}
</style>