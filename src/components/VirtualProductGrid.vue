<template>
  <div class="virtualGrid" ref="container">
    <div 
      class="virtualScroll" 
      :style="{ height: totalHeight + 'px', position: 'relative' }">
      <div
        v-for="product in visibleProducts"
        :key="product.id"
        class="productCard"
        :class="{ 'list-view': viewMode === 'list' }"
        :style="{
          position: 'absolute',
          top: getItemPosition(product.index).top + 'px',
          left: getItemPosition(product.index).left + 'px',
          width: itemWidth + 'px',
          height: itemHeight + 'px',
          background: getCardColor(product.id),
          transform: 'translateZ(0)' // Hardware acceleration
        }"
        @click="goToProduct(product.id, $event)"
        :aria-label="`${product.title} - $${product.price}`"
        role="button"
        tabindex="0"
        @keydown.enter="goToProduct(product.id, $event)">
        <span 
          v-if="product.discountPercentage > 0" 
          class="badge"
          :aria-label="`${Math.round(product.discountPercentage)}% discount`">
          -{{ Math.round(product.discountPercentage) }}%
        </span>

        <div 
          class="comparisonCheckbox" 
          @click.stop="toggleComparison(product)"
          :aria-label="`Compare ${product.title}`">
          <input 
            type="checkbox" 
            :checked="isInComparison(product.id)"
            @change="toggleComparison(product)"/>
          <span class="checkmark">⚖️</span>
        </div>

        <button 
          class="quickView" 
          @click.stop="openQuickView(product)"
          :aria-label="`Quick view ${product.title}`">
          👁️ Quick View
        </button>

        <div class="imageContainer">
          <img 
            :src="product.images?.[0] || product.thumbnail" 
            :alt="product.title"
            loading="lazy"
            @load="handleImageLoad"
            @error="handleImageError"/>
        </div>

        <div class="productInfo">
          <h3>{{ product.title }}</h3>
          <div class="rating" :aria-label="`Rating: ${product.rating} stars`">
            ⭐ {{ product.rating }}
          </div>
          <p class="price" :aria-label="`Price: $${formatPrice(product.price)}`">
            ${{ formatPrice(product.price) }}
          </p>
          <button 
            class="addToCart" 
            @click.stop="addToCart(product)"
            :aria-label="`Add ${product.title} to cart`">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loadingIndicator" aria-live="polite">
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VirtualProductGrid',
  props: {
    products: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    viewMode: {
      type: String,
      default: 'grid'
    },
    itemHeight: {
      type: Number,
      default: 380
    },
    itemWidth: {
      type: Number,
      default: 280
    },
    gap: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      scrollTop: 0,
      containerHeight: 0,
      visibleRange: { start: 0, end: 0 },
      imageCache: new Map(),
      errorImages: new Set()
    };
  },
  computed: {
    columns() {
      if (this.viewMode === 'list') return 1;
      return Math.floor((this.containerWidth + this.gap) / (this.itemWidth + this.gap));
    },
    rows() {
      return Math.ceil(this.products.length / this.columns);
    },
    totalHeight() {
      return this.rows * (this.itemHeight + this.gap);
    },
    visibleProducts() {
      const start = Math.max(0, this.visibleRange.start - this.columns * 2);
      const end = Math.min(this.products.length, this.visibleRange.end + this.columns * 2);
      
      return this.products.slice(start, end).map((product, index) => ({
        ...product,
        index: start + index
      }));
    },
    containerWidth() {
      return this.containerHeight > 0 ? this.$refs.container?.clientWidth || 0 : 0;
    }
  },
  mounted() {
    this.setupScrollListener();
    this.setupResizeListener();
    this.updateVisibleRange();
  },
  beforeUnmount() {
    this.cleanupListeners();
  },
  methods: {
    setupScrollListener() {
      const container = this.$refs.container;
      if (!container) return;

      container.addEventListener('scroll', this.handleScroll, { passive: true });
    },
    setupResizeListener() {
      window.addEventListener('resize', this.handleResize, { passive: true });
    },
    cleanupListeners() {
      const container = this.$refs.container;
      if (container) {
        container.removeEventListener('scroll', this.handleScroll);
      }
      window.removeEventListener('resize', this.handleResize);
    },
    handleScroll() {
      const container = this.$refs.container;
      if (!container) return;

      this.scrollTop = container.scrollTop;
      this.updateVisibleRange();
    },
    handleResize() {
      this.containerHeight = this.$refs.container?.clientHeight || 0;
      this.updateVisibleRange();
    },
    updateVisibleRange() {
      const container = this.$refs.container;
      if (!container) return;

      this.containerHeight = container.clientHeight;
      const startRow = Math.floor(this.scrollTop / (this.itemHeight + this.gap));
      const visibleRows = Math.ceil(this.containerHeight / (this.itemHeight + this.gap));
      const endRow = startRow + visibleRows;

      this.visibleRange = {
        start: startRow * this.columns,
        end: Math.min(this.products.length, endRow * this.columns)
      };
    },
    getItemPosition(index) {
      const row = Math.floor(index / this.columns);
      const col = index % this.columns;
      
      const totalColumnsWidth = this.columns * (this.itemWidth + this.gap) - this.gap;
      const containerWidth = this.containerWidth || 0;
      const centerOffset = Math.max(0, (containerWidth - totalColumnsWidth) / 2);
      
      return {
        top: row * (this.itemHeight + this.gap),
        left: centerOffset + col * (this.itemWidth + this.gap)
      };
    },
    getCardColor(id) {
      const colors = [
        "#f8fafc", "#fefce8", "#ecfdf5", "#fdf2f8", 
        "#f0f9ff", "#f1f5f9"
      ];
      return colors[id % colors.length];
    },
    formatPrice(price) {
      return new Intl.NumberFormat("en-US").format(price);
    },
    goToProduct(id, event) {
      const card = event.currentTarget;
      card.style.transform = "scale(0.96)";
      setTimeout(() => {
        card.style.transform = "scale(1)";
      }, 150);
      setTimeout(() => {
        this.$router.push(`/product/${id}`);
      }, 200);
    },
    toggleComparison(product) {
      this.$emit('toggle-comparison', product);
    },
    isInComparison(productId) {
      return this.$emit('is-in-comparison', productId);
    },
    openQuickView(product) {
      this.$emit('open-quick-view', product);
    },
    addToCart(product) {
      this.$emit('add-to-cart', product);
    },
    handleImageLoad(event) {
      const img = event.target;
      this.imageCache.set(img.src, true);
    },
    handleImageError(event) {
      const img = event.target;
      this.errorImages.add(img.src);
      img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA1MEM4Ny43MDI2IDUwIDEwMCA2Mi4yOTc0IDEwMCA3NUMxMDAgODcuNzAyNiA4Ny43MDI2IDEwMCA3NSAxMDBDNjIuMjk3NCAxMDAgNTAgODcuNzAyNiA1MCA3NUM1MCA2Mi4yOTc0IDYyLjI5NzQgNTAgNzUgNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
    }
  },
  watch: {
    products() {
      this.updateVisibleRange();
    },
    viewMode() {
      this.$nextTick(() => {
        this.handleResize();
      });
    }
  }
};
</script>
<style>
.virtualGrid {
  height: 600px;
  overflow-y: auto;
  position: relative;
  border-radius: 12px;
  background: #fafafa;
}
.virtualScroll {
  width: 100%;
}
.productCard {
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.productCard:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  z-index: 10;
}
.productCard.list-view {
  display: flex;
  align-items: center;
  padding: 16px;
  height: auto;
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 999px;
  z-index: 2;
}
.comparisonCheckbox {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.2s;
}
.comparisonCheckbox:hover {
  background: white;
}

.quickView {
  position: absolute;
  top: 35px;
  right: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 9px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 3;
  white-space: nowrap;
}
.productCard:hover .quickView {
  opacity: 1;
}

.imageContainer {
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background: linear-gradient(180deg, #ffffff, #f8fafc);
}
.imageContainer img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.productCard:hover .imageContainer img {
  filter: brightness(1.1);
}

.productInfo {
  padding: 16px;
}
.productInfo h3 {
  font-size: 14px;
  font-weight: 500;
  color: #111;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.rating {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
}
.price {
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin-bottom: 12px;
}
.addToCart {
  width: 100%;
  background: #000;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}
.addToCart:hover {
  background: #333;
}

.loadingIndicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #6b7280;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 12px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 1024px) {
  .virtualGrid {
    height: 500px;
  }
  .productCard {
    width: 240px;
    height: 280px;
  }
  .imageContainer {
    height: 140px;
    padding: 8px;
  }
  .productInfo {
    padding: 12px;
  }
  .productInfo h3 {
    font-size: 13px;
    -webkit-line-clamp: 1;
    line-clamp: 1;
  }
  .price {
    font-size: 14px;
    margin-bottom: 8px;
  }
  .addToCart {
    padding: 8px;
    font-size: 12px;
  }
  .badge {
    top: 8px;
    left: 8px;
    font-size: 10px;
    padding: 3px 6px;
  }
  .comparisonCheckbox {
    top: 8px;
    right: 8px;
    padding: 4px;
  }
  .quickView {
    bottom: 8px;
    left: 8px;
    padding: 4px 8px;
    font-size: 10px;
  }
}
@media (max-width: 768px) {
  .virtualGrid {
    height: 400px;
  }
  .productCard {
    width: 200px;
    height: 240p;
  }
  .imageContainer {
    height: 120px;
    padding: 6px;
  }
  .productInfo {
    padding: 10px;
  }
  .productInfo h3 {
    font-size: 12px;
  }
  .price {
    font-size: 13px;
  }
  .addToCart {
    padding: 6px;
    font-size: 11px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .productCard {
    animation: none !important;
    opacity: 1 !important;
  }
  .spinner {
    animation: none !important;
  }
  .quickView {
    transition: none !important;
  }
}
</style>
