<template>
  <div class="comparisonOverlay" @click="$emit('close')">
    <div class="comparisonModal" @click.stop>
      <div class="comparisonHeader">
        <h3>Product Comparison</h3>
        <button class="closeBtn" @click="$emit('close')">✕</button>
      </div>
      
      <div class="comparisonContent">
        <div class="comparisonTable">
          <div class="comparisonRow headerRow">
            <div class="comparisonCell featureCell">Feature</div>
            <div 
              v-for="product in products" 
              :key="product.id"
              class="comparisonCell productCell"
            >
              <img :src="product.thumbnail" class="compareProductImage" :alt="product.title" />
              <h4>{{ product.title }}</h4>
              <div class="comparePrice">${{ formatPrice(product.price) }}</div>
              <button class="removeCompareBtn" @click="$emit('remove-product', product.id)">
                ✕
              </button>
            </div>
          </div>
          
          <div class="comparisonRow">
            <div class="comparisonCell featureCell">Price</div>
            <div 
              v-for="product in products" 
              :key="'price-' + product.id"
              class="comparisonCell"
              :class="{ bestValue: isBestPrice(product) }"
            >
              <span class="priceValue">${{ formatPrice(product.price) }}</span>
              <span v-if="isBestPrice(product)" class="bestBadge">BEST</span>
            </div>
          </div>
        
          <div class="comparisonRow">
            <div class="comparisonCell featureCell">Rating</div>
            <div 
              v-for="product in products" 
              :key="'rating-' + product.id"
              class="comparisonCell"
              :class="{ bestValue: isBestRating(product) }">
              <div class="ratingStars">⭐ {{ product.rating }}</div>
              <span v-if="isBestRating(product)" class="bestBadge">BEST</span>
            </div>
          </div>
          
          <div class="comparisonRow">
            <div class="comparisonCell featureCell">Availability</div>
            <div 
              v-for="product in products" 
              :key="'stock-' + product.id"
              class="comparisonCell">
              <span class="stockStatus inStock">In Stock</span>
            </div>
          </div>
          
          <div class="comparisonRow">
            <div class="comparisonCell featureCell">Discount</div>
            <div 
              v-for="product in products" 
              :key="'discount-' + product.id"
              class="comparisonCell"
              :class="{ bestValue: isBestDiscount(product) }">
              <span v-if="product.discountPercentage" class="discountValue">
                -{{ Math.round(product.discountPercentage) }}%
              </span>
              <span v-else class="noDiscount">No discount</span>
              <span v-if="isBestDiscount(product)" class="bestBadge">BEST</span>
            </div>
          </div>

          <div class="comparisonRow">
            <div class="comparisonCell featureCell">Category</div>
            <div 
              v-for="product in products" 
              :key="'category-' + product.id"
              class="comparisonCell">
              {{ formatCategory(product.category) }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="comparisonActions">
        <button class="addToAllBtn" @click="$emit('add-all-to-cart')">
          🛒 Add All to Cart
        </button>
        <button class="clearCompareBtn" @click="$emit('clear-comparison')">
          🗑️ Clear Comparison
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ComparisonModal',
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close', 'remove-product', 'add-all-to-cart', 'clear-comparison'],
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("en-US").format(price);
    },
    
    formatCategory(name) {
      return name
        .replace("-", " ")
        .replace(/\b\w/g, l => l.toUpperCase());
    },
    
    isBestPrice(product) {
      if (this.products.length === 0) return false;
      const prices = this.products.map(p => p.price);
      return product.price === Math.min(...prices);
    },
    
    isBestRating(product) {
      if (this.products.length === 0) return false;
      const ratings = this.products.map(p => p.rating);
      return product.rating === Math.max(...ratings);
    },
    
    isBestDiscount(product) {
      if (this.products.length === 0) return false;
      const discounts = this.products.map(p => p.discountPercentage || 0);
      return (product.discountPercentage || 0) === Math.max(...discounts);
    }
  }
};
</script>
<style>
.comparisonOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.comparisonModal {
  background: white;
  border-radius: 20px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.comparisonHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}
.comparisonHeader h3 {
  font-size: 20px;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.closeBtn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}
.closeBtn:hover {
  background: #f3f4f6;
  color: #111;
}

.comparisonContent {
  padding: 24px;
}

.comparisonTable {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.comparisonRow {
  display: grid;
  grid-template-columns: 150px repeat(auto-fit, minmax(200px, 1fr));
  background: white;
}

.comparisonRow.headerRow {
  background: #f8fafc;
  font-weight: 600;
}

.comparisonCell {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  border-right: 1px solid #e5e7eb;
}
.comparisonCell:last-child {
  border-right: none;
}
.featureCell {
  background: #f1f5f9;
  font-weight: 600;
  color: #1e40af;
  text-align: left;
  justify-content: flex-start;
}
.productCell {
  padding: 20px 16px;
  gap: 12px;
}

.compareProductImage {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 8px;
}

.productCell h4 {
  font-size: 14px;
  font-weight: 600;
  color: #111;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.comparePrice {
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-bottom: 8px;
}

.removeCompareBtn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ef4444;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.removeCompareBtn:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.priceValue {
  font-size: 18px;
  font-weight: 600;
  color: #111;
}

.ratingStars {
  color: #fbbf24;
  font-size: 16px;
}

.stockStatus {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}
.stockStatus.inStock {
  background: #dcfce7;
  color: #166534;
}

.discountValue {
  font-size: 16px;
  font-weight: 600;
  color: #059669;
}

.noDiscount {
  color: #9ca3af;
  font-size: 14px;
}

.bestValue {
  background: #fef3c7;
  position: relative;
}

.bestBadge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #f59e0b;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.comparisonActions {
  display: flex;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #e5e7eb;
}

.addToAllBtn,
.clearCompareBtn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
}
.addToAllBtn {
  background: #111;
  color: white;
}
.addToAllBtn:hover {
  background: #333;
}

.clearCompareBtn {
  background: #f3f4f6;
  color: #374151;
}
.clearCompareBtn:hover {
  background: #e5e7eb;
}
@media (max-width: 768px) {
  .comparisonModal {
    margin: 10px;
    max-height: calc(100vh - 20px);
  }
  .comparisonRow {
    grid-template-columns: 120px repeat(auto-fit, minmax(150px, 1fr));
  }
  .comparisonCell {
    padding: 12px 8px;
  }
  .compareProductImage {
    width: 60px;
    height: 60px;
  }
  .productCell h4 {
    font-size: 12px;
  }
  .comparePrice {
    font-size: 16px;
  }
  .comparisonActions {
    flex-direction: column;
  }
}
@media (prefers-reduced-motion: reduce) {
  .closeBtn,
  .removeCompareBtn,
  .addToAllBtn,
  .clearCompareBtn {
    transition: none !important;
    transform: none !important;
  }
}
</style>
