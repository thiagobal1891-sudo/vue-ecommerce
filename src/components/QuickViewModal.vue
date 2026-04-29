<template>
  <div class="quickViewOverlay" @click="$emit('close')">
    <div class="quickViewModal" @click.stop>
      <div class="quickViewHeader">
        <h3>{{ product?.title }}</h3>
        <button class="closeBtn" @click="$emit('close')">✕</button>
      </div>
      
      <div class="quickViewContent">
        <div class="imageGallery">
          <div class="mainImage">
            <img 
              :src="product?.images?.[currentImageIndex] || product?.thumbnail" 
              :alt="product?.title"
              @click="openImageZoom" />
            <button class="zoomBtn" @click="openImageZoom">🔍</button>
          </div>
          <div class="thumbnailStrip" v-if="product?.images?.length > 1">
            <img 
              v-for="(img, index) in product.images" 
              :key="index"
              :src="img"
              :alt="`${product.title} - Image ${index + 1}`"
              :class="{ active: currentImageIndex === index }"
              @click="currentImageIndex = index"
              role="button"
              tabindex="0"
              @keydown.enter="currentImageIndex = index"/>
          </div>
        </div>
        
        <div class="productDetails">
          <div class="priceSection">
            <span class="currentPrice">${{ formatPrice(product?.price || 0) }}</span>
            <span class="originalPrice" v-if="product?.discountPercentage">
              ${{ formatPrice((product.price || 0) * 1.5) }}
            </span>
            <span class="discount" v-if="product?.discountPercentage">
              -{{ Math.round(product.discountPercentage) }}%
            </span>
          </div>
          
          <div class="ratingSection">
            <div class="stars">⭐ {{ product?.rating || 0 }}</div>
            <span class="reviewCount">(234 reviews)</span>
          </div>
          
          <div class="description">
            <p>{{ product?.description || 'No description available' }}</p>
          </div>
          
          <div class="quantitySelector">
            <label>Quantity:</label>
            <div class="quantityControls">
              <button @click="quantity > 1 && quantity--">-</button>
              <input type="number" v-model="quantity" min="1" />
              <button @click="quantity++">+</button>
            </div>
          </div>
          
          <div class="actionButtons">
            <button class="addToCartBtn" @click="$emit('add-to-cart', product)">
              🛒 Add to Cart
            </button>
            <button class="buyNowBtn" @click="$emit('buy-now', product)">
              ⚡ Buy Now
            </button>
            <button class="wishlistBtn" @click="$emit('toggle-wishlist', product)">
              ❤️
            </button>
          </div>
          
          <div class="features">
            <div class="feature">
              <span class="icon">✓</span>
              <span>In Stock</span>
            </div>
            <div class="feature">
              <span class="icon">🚚</span>
              <span>Free Shipping</span>
            </div>
            <div class="feature">
              <span class="icon">↩️</span>
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="relatedProducts" v-if="relatedProducts.length > 0">
        <h4>You might also like</h4>
        <div class="relatedGrid">
          <div 
            v-for="product in relatedProducts" 
            :key="product.id"
            class="relatedCard"
            @click="$emit('select-related', product)"
            role="button"
            tabindex="0"
            @keydown.enter="$emit('select-related', product)">
            <img :src="product.thumbnail" :alt="product.title" />
            <h5>{{ product.title }}</h5>
            <span>${{ formatPrice(product.price) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'QuickViewModal',
  props: {
    product: {
      type: Object,
      default: null
    },
    relatedProducts: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close', 'add-to-cart', 'buy-now', 'toggle-wishlist', 'select-related'],
  data() {
    return {
      currentImageIndex: 0,
      quantity: 1
    };
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("en-US").format(price);
    },
    openImageZoom() {
      console.log('Image zoom clicked');
    }
  }
};
</script>
<style>
.quickViewOverlay {
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
.quickViewModal {
  background: white;
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}
.quickViewHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}
.quickViewHeader h3 {
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
.quickViewContent {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 24px;
}

.imageGallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mainImage {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: #f8fafc;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mainImage img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: zoom-in;
}

.zoomBtn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}
.zoomBtn:hover {
  background: white;
  transform: scale(1.1);
}

.thumbnailStrip {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px;
}
.thumbnailStrip img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
}
.thumbnailStrip img.active {
  border-color: #3b82f6;
}

.productDetails {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.priceSection {
  display: flex;
  align-items: center;
  gap: 12px;
}
.currentPrice {
  font-size: 28px;
  font-weight: 700;
  color: #111;
}
.originalPrice {
  font-size: 18px;
  color: #9ca3af;
  text-decoration: line-through;
}
.discount {
  background: #ef4444;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}
.ratingSection {
  display: flex;
  align-items: center;
  gap: 8px;
}
.stars {
  color: #fbbf24;
  font-size: 16px;
}
.reviewCount {
  color: #6b7280;
  font-size: 14px;
}
.description {
  color: #4b5563;
  line-height: 1.6;
}
.quantitySelector {
  display: flex;
  align-items: center;
  gap: 12px;
}
.quantitySelector label {
  font-weight: 500;
  color: #374151;
}
.quantityControls {
  display: flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}
.quantityControls button {
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 16px;
  color: #6b7280;
  transition: all 0.2s;
}
.quantityControls button:hover {
  background: #f3f4f6;
  color: #111;
}
.quantityControls input {
  border: none;
  width: 60px;
  text-align: center;
  font-size: 16px;
  outline: none;
}
.actionButtons {
  display: flex;
  gap: 12px;
}
.addToCartBtn,
.buyNowBtn,
.wishlistBtn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.addToCartBtn {
  background: #111;
  color: white;
  flex: 1;
}
.addToCartBtn:hover {
  background: #333;
}
.buyNowBtn {
  background: #f59e0b;
  color: white;
}
.buyNowBtn:hover {
  background: #d97706;
}
.wishlistBtn {
  background: #fef2f2;
  color: #ef4444;
  padding: 12px;
}
.wishlistBtn:hover {
  background: #fee2e2;
}
.features {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4b5563;
  font-size: 14px;
}
.feature .icon {
  color: #22c55e;
}
.relatedProducts {
  grid-column: 1 / -1;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}
.relatedProducts h4 {
  font-size: 18px;
  font-weight: 600;
  color: #111;
  margin-bottom: 16px;
}
.relatedGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}
.relatedCard {
  text-align: center;
  cursor: pointer;
  padding: 12px;
  border-radius: 12px;
  transition: all 0.2s;
}
.relatedCard:hover {
  background: #f8fafc;
  transform: translateY(-2px);
}
.relatedCard img {
  width: 100%;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 8px;
}
.relatedCard h5 {
  font-size: 14px;
  font-weight: 500;
  color: #111;
  margin: 8px 0 4px 0;
  line-height: 1.3;
}
.relatedCard span {
  font-size: 16px;
  font-weight: 600;
  color: #111;
}
@media (max-width: 768px) {
  .quickViewContent {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .quickViewModal {
    margin: 10px;
    max-height: calc(100vh - 20px);
  }
  .actionButtons {
    flex-direction: column;
  }
  .addToCartBtn,
  .buyNowBtn {
    width: 100%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .quickViewModal,
  .thumbnailStrip img,
  .zoomBtn,
  .closeBtn,
  .addToCartBtn,
  .buyNowBtn,
  .wishlistBtn,
  .relatedCard {
    transition: none !important;
    transform: none !important;
  }
}
</style>
