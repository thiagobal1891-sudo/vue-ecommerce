<template>
  <section class="brands-premium-section">
    <div class="brands-premium-container">
      <div class="brands-premium-header">
        <p class="brand-mini">FEATURED BRANDS</p>
        <h2 class="brand-title">Popular Brands.</h2>
        <p class="brand-subtitle">Explore products by your favorite brands</p>
      </div>

      <div class="brands-grid">
        <div
          v-for="brand in brands"
          :key="brand.name"
          class="brand-card-premium"
          @click="selectBrand(brand.name)"
          role="button"
          tabindex="0"
          @keydown.enter="selectBrand(brand.name)"
        >
          <img :src="brand.logo" :alt="brand.name" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "BrandsVue",
  data() {
    return {
      brands: [
        { name: "Zara", logo: require('@/assets/logosmarcas/Zara-logo.png') },
        { name: "Dolce & Gabbana", logo: require('@/assets/logosmarcas/Dolce-and-Gabbana-logo.png') },
        { name: "Chrome Hearts", logo: require('@/assets/logosmarcas/Chrome-Hearts-Logo.png') },
        { name: "Louis Vuitton", logo: require('@/assets/logosmarcas/Louis-Vuitton-logo.png') },
        { name: "Chanel", logo: require('@/assets/logosmarcas/Chanel-logo.png') },
        { name: "Prada", logo: require('@/assets/logosmarcas/Prada-Logo.png') }
      ]
    };
  },
  methods: {
    selectBrand(brand) {
      this.$emit("filter-brand", brand);
    }
  }
};
</script>
<style>
.brands-premium-section {
  width: 100%;
  padding: 80px 0 100px;
  background: #FAFAFA;
  position: relative;
  overflow: hidden;
}

.brands-premium-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 40px;
}

.brands-premium-header {
  margin-bottom: 60px;
  text-align: left;
}

.brand-mini {
  font-size: 11px;
  letter-spacing: 3px;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 12px;
  font-weight: 600;
}

.brand-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: #050505;
  margin: 0 0 16px;
  line-height: 1;
}

.brand-subtitle {
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.brand-card-premium {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 20px;
  padding: 24px 16px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  filter: grayscale(100%);
  opacity: 0.45;
  min-height: 90px;
}

.brand-card-premium:hover {
  filter: grayscale(0%);
  opacity: 1;
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.08);
  border-color: rgba(0,0,0,0.08);
}

.brand-card-premium img {
  max-height: 44px;
  max-width: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.brand-card-premium:hover img {
  transform: scale(1.06);
}

@media (max-width: 992px) {
  .brands-premium-container {
    padding: 0 20px;
  }
  .brands-premium-header {
    margin-bottom: 40px;
  }
  .brands-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .brands-premium-section {
    padding: 60px 0 80px;
  }
  .brands-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .brand-card-premium {
    padding: 16px 10px;
    min-height: 72px;
    border-radius: 14px;
  }
  .brand-card-premium img {
    max-height: 32px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .brand-card-premium {
    transition: none !important;
  }
}
</style>
