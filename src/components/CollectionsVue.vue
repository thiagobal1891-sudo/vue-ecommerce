<template>
  <section class="collections-premium-wrapper" :class="{ show: isVisible }">
    <div class="collections-premium-container">
      <div class="collections-premium-header">
        <p class="section-mini">CATEGORIES</p>
        <h2 class="section-title">Shop by Category.</h2>
      </div>
      <div class="mobile-slider-premium" v-if="isMobile">
        <div class="slider-container-premium" ref="mobileSlider">
          <div
            v-for="(category, i) in categories"
            :key="category.slug"
            class="collection-card-premium"
            :class="{ show: showCards }"
            :style="{ transitionDelay: i * 0.1 + 's' }"
            @click="goToCategory(category.slug)"
            role="button"
            tabindex="0"
            @keydown.enter="goToCategory(category.slug)">
            <div class="image-box-premium">
              <img 
                :src="category.thumbnail" 
                :alt="category.slug"
                loading="lazy"/>
            </div>
            <div class="category-name-premium">
              <h3>{{ formatCategory(category.slug) }}</h3>
            </div>
          </div>
        </div>
        <div class="slider-controls-premium" v-if="categories.length > 3">
          <button 
            class="nav-button-premium" 
            :disabled="isAtStart"
            @click="scrollSlider('left')"
            aria-label="Previous categories">
            ←</button>
          <button 
            class="nav-button-premium" 
            :disabled="isAtEnd"
            @click="scrollSlider('right')"
            aria-label="Next categories">
            →</button>
        </div>
      </div>
      <div class="collections-grid-premium" v-else>
        <div
          v-for="(category, i) in categories"
          :key="category.slug"
          class="collection-card-premium"
          :class="{ show: showCards }"
          :style="{ transitionDelay: i * 0.1 + 's' }"
          @click="goToCategory(category.slug)"
          :aria-label="`Category: ${formatCategory(category.slug)}`"
          role="button"
          tabindex="0"
          @keydown.enter="goToCategory(category.slug)">
          <div class="image-box-premium">
            <img 
              :src="category.thumbnail" 
              :alt="category.slug"
              loading="lazy"/>
          </div>
          <div class="category-name-premium">
            <h3>{{ formatCategory(category.slug) }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "CollectionsVue",
  data() {
    return {
      categories: [],
      isVisible: false,
      showCards: false,
      isMobile: false,
      isAtStart: true,
      isAtEnd: false,
      loading: false,
      error: null
    };
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    
    scrollSlider(direction) {
      const slider = this.$refs.mobileSlider;
      if (!slider) return;

      const scrollAmount = 280;
      if (direction === 'left') {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }

      setTimeout(() => {
        this.updateScrollButtons();
      }, 300);
    },
    
    updateScrollButtons() {
      const slider = this.$refs.mobileSlider;
      if (!slider) return;

      this.isAtStart = slider.scrollLeft <= 0;
      this.isAtEnd = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 10;
    },
    
    async getCategories() {
      if (this.loading) return;
      
      this.loading = true;
      this.error = null;
      
      try {
        const cached = localStorage.getItem('categoriesCache');
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const cacheAge = Date.now() - timestamp;

          if (cacheAge < 3600000) {
            this.processCategories(data);
            this.loading = false;
            return;
          }
        }

        const { data } = await axios.get(
          "https://dummyjson.com/products?limit=100",
          { timeout: 5000 }
        );

        localStorage.setItem('categoriesCache', JSON.stringify({
          data,
          timestamp: Date.now()
        }));

        this.processCategories(data);
        
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        this.error = 'Failed to load categories';
        
        const cached = localStorage.getItem('categoriesCache');
        if (cached) {
          const { data } = JSON.parse(cached);
          this.processCategories(data);
        }
      } finally {
        this.loading = false;
      }
    },
    
    processCategories(data) {
      const categoriesMap = {};
      
      data.products.forEach(product => {
        if (!categoriesMap[product.category]) {
          categoriesMap[product.category] = [];
        }
        categoriesMap[product.category].push(product);
      });

      const validCategories = Object.entries(categoriesMap)
        .map(([slug, products]) => ({
          slug,
          thumbnail: products.find(p => p.thumbnail)?.thumbnail || products[0]?.thumbnail,
          count: products.length,
          products: products.slice(0, 6)
        }))
        .filter(c => c.thumbnail)
        .slice(0, 6);

      this.categories = validCategories;
      this.isVisible = true;

      this.$nextTick(() => {
        setTimeout(() => {
          this.showCards = true;
          this.updateScrollButtons();
        }, 100);
      });
    },
    
    goToCategory(slug) {
      this.$router.push(`/category/${slug.toLowerCase()}`);
    },
    
    formatCategory(slug) {
      return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  },
  created() {
    this.checkMobile();
    this.getCategories();
  },
  mounted() {
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  }
};
</script>

<style>
.collections-premium-wrapper {
  max-width: 1300px;
  margin: 80px auto;
  padding: 0 40px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
  background: transparent;
}

.collections-premium-wrapper.show {
  opacity: 1;
  transform: translateY(0);
}

.collections-premium-container {
  position: relative;
}

.collections-premium-header {
  margin-bottom: 60px;
  text-align: left;
}

.section-mini {
  font-size: 11px;
  letter-spacing: 3px;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 12px;
  font-weight: 600;
}

.section-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: #050505;
  margin: 0;
  line-height: 1;
}

.collections-grid-premium {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px 30px;
}

.collection-card-premium {
  display: flex;
  flex-direction: column;
  gap: 20px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.collection-card-premium.show {
  opacity: 1;
  transform: translateY(0);
}

.image-box-premium {
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 24px;
  background: #F9F9FB;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition: background 0.4s ease;
}

.image-box-premium img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.collection-card-premium:hover .image-box-premium img {
  transform: scale(1.08);
}

.collection-card-premium:hover .image-box-premium {
  background: #f0f0f5;
}

.category-name-premium {
  padding-left: 8px;
}

.category-name-premium h3 {
  color: #050505;
  font-weight: 500;
  font-size: 1.125rem;
  margin: 0;
  position: relative;
  display: inline-block;
  transition: transform 0.4s ease;
}

.category-name-premium h3::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 1px;
  background: #050505;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s ease;
}

.collection-card-premium:hover .category-name-premium h3::after {
  transform: scaleX(1);
  transform-origin: left;
}

.collection-card-premium:hover .category-name-premium h3 {
  transform: translateX(4px);
}

.mobile-slider-premium {
  position: relative;
  margin: 0 -20px;
  padding: 0 20px;
}

.slider-container-premium {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 20px;
}

.slider-container-premium::-webkit-scrollbar {
  display: none;
}

.slider-container-premium .collection-card-premium {
  flex: 0 0 260px;
  scroll-snap-align: center;
}

.slider-controls-premium {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
  padding-right: 20px;
}

.nav-button-premium {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.1);
  background: #fff;
  color: #050505;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button-premium:hover:not(:disabled) {
  background: #050505;
  color: #fff;
}

.nav-button-premium:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

@media (max-width: 992px) {
  .collections-premium-wrapper {
    padding: 0 20px;
    margin: 60px auto;
  }
}

@media (max-width: 768px) {
  .collections-grid-premium {
    gap: 24px;
  }
  .image-box-premium {
    padding: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .collections-premium-wrapper,
  .collection-card-premium,
  .nav-button-premium,
  .image-box-premium img,
  .category-name-premium h3,
  .category-name-premium h3::after {
    transition: none !important;
  }
  .collection-card-premium {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
