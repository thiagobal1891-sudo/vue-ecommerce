<template>
  <section class="hero-premium">
    <div class="hero-content">
      <p class="hero-tag">NEW COLLECTION</p>
      <h1 class="hero-title">
        Discover<br/>
        <span class="text-accent">Latest</span><br/>
        Products.
      </h1>
      <p class="hero-text">
        Premium marketplace experience with trending items and exclusive deals.
      </p>
      <button class="hero-button-premium" @click="$router.push('/category')">
        <span class="btn-text">Shop Now</span>
        <div class="btn-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </div>
      </button>
    </div>
    
    <div class="hero-visuals" v-if="heroProducts.length">
      <div class="visual-wrapper">
        <img
          v-for="(product, index) in heroProducts"
          :key="product.id"
          :src="product.thumbnail"
          :alt="'Imagen de ' + product.title"
          fetchpriority="high"
          class="editorial-product"
          :class="'item-' + index"
        />
      </div>
    </div>
  </section>
  <section class="products-premium">
    <div class="products-header">
      <div class="header-text">
        <p class="section-mini">MARKETPLACE</p>
        <h2 class="section-title">Trending Products.</h2>
      </div>
      <button class="view-all-link" @click="goToCategory">
        View All <span class="arrow">⟶</span>
      </button>
    </div>

    <div class="products-grid-premium">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card-premium"
        @click="openProduct(product.id)"
        role="button"
        tabindex="0"
        @keydown.enter="openProduct(product.id)">
        <div class="quick-view-premium">
          <FontAwesomeIcon icon="eye" />
        </div>
        <div class="image-container-premium">
          <img 
            :src="product.images?.[0] || product.thumbnail" 
            :alt="product.title"
            loading="lazy" 
          />
        </div>
        <div class="product-info-premium">
          <div class="info-top">
            <h3>{{ product.title }}</h3>
            <p class="price">${{ formatPrice(product.price) }}</p>
          </div>
          <div class="rating-premium">
            <span class="star">★</span> {{ product.rating }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="carousel-container-premium">
      <button class="carousel-arrow-premium prev" @click="scrollCarousel('prev')">
        ‹
      </button>
      <button class="carousel-arrow-premium next" @click="scrollCarousel('next')">
        ›
      </button>
      <div class="carousel-track-premium" ref="carouselTrack">
        <div
          v-for="product in products"
          :key="product.id"
          class="product-card-premium"
          @click="openProduct(product.id)">
          <div class="quick-view-premium">
            <FontAwesomeIcon icon="eye" />
          </div>
          <div class="image-container-premium">
            <img :src="product.images?.[0] || product.thumbnail" />
          </div>
          <div class="product-info-premium">
            <div class="info-top">
              <h3>{{ product.title }}</h3>
              <p class="price">${{ formatPrice(product.price) }}</p>
            </div>
            <div class="rating-premium">
              <span class="star">★</span> {{ product.rating }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { useProductStore } from "../stores/products";

export default {
  name: "ProductList",
  setup() {
    const productStore = useProductStore();
    return { productStore };
  },
  computed: {
    products() {
      return this.productStore.products;
    },
    heroProducts() {
      return this.productStore.products.slice(0, 3);
    }
  },
  methods: {
    async getProducts() {
      await this.productStore.fetchProducts();
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    goToCategory() {
      this.$router.push("/category");
    },
    formatPrice(price) {
      return new Intl.NumberFormat("en-US").format(price);
    },
    openProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    getCardColor(id) {
      const colors = [
        "#f8fafc",
        "#fefce8",
        "#ecfdf5",
        "#fdf2f8",
        "#f0f9ff",
        "#f1f5f9"
      ];
      return colors[id % colors.length];
    },
    scrollCarousel(direction) {
      const track = this.$refs.carouselTrack;
      if (!track) return;
      
      const scrollAmount = 280; // Width of product card + gap
      if (direction === 'prev') {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
<style>
.hero-premium {
  max-width: 1300px;
  margin: 40px auto;
  min-height: 80vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 40px;
  background-color: #F5F5F7;
  border-radius: 32px;
  overflow: hidden;
  position: relative;
}

.hero-content {
  padding-left: 80px;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-tag {
  font-size: 11px;
  letter-spacing: 3px;
  color: #111;
  text-transform: uppercase;
  margin-bottom: 24px;
  font-weight: 700;
  border-bottom: 1px solid #111;
  padding-bottom: 6px;
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.9;
  color: #050505;
  margin-bottom: 24px;
}

.text-accent {
  color: #666;
  font-style: italic;
  font-family: "Georgia", serif; 
  font-weight: 400;
}

.hero-text {
  color: #555;
  font-size: 17px;
  line-height: 1.6;
  max-width: 400px;
  margin-bottom: 40px;
}

.hero-button-premium {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  background: #050505;
  color: #fff;
  border: none;
  padding: 14px 20px 14px 32px;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: #fff;
  color: #050505;
  border-radius: 50%;
  transition: transform 0.4s ease;
}

.hero-button-premium:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.hero-button-premium:hover .btn-icon {
  transform: translateX(4px);
}

.hero-visuals {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-wrapper {
  position: relative;
  width: 100%;
  height: 600px;
}

.editorial-product {
  position: absolute;
  object-fit: contain;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.06);
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s ease;
}

.editorial-product.item-0 {
  width: 340px;
  height: 420px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  padding: 30px;
}

.editorial-product.item-1 {
  width: 200px;
  height: 240px;
  top: 8%;
  right: 10%;
  transform: rotate(5deg);
  z-index: 1;
  padding: 20px;
}

.editorial-product.item-2 {
  width: 220px;
  height: 220px;
  bottom: 8%;
  left: 5%;
  transform: rotate(-6deg);
  z-index: 3;
  padding: 20px;
}

.visual-wrapper:hover .item-0 {
  transform: translate(-50%, -52%) scale(1.03);
  box-shadow: 0 30px 60px rgba(0,0,0,0.1);
}
.visual-wrapper:hover .item-1 {
  transform: translate(15px, -15px) rotate(8deg);
}
.visual-wrapper:hover .item-2 {
  transform: translate(-15px, 15px) rotate(-10deg);
}

@media (max-width: 992px) {
  .hero-premium {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 40px 20px;
    gap: 20px;
  }
  .hero-content {
    padding-left: 0;
    align-items: center;
  }
  .hero-text {
    margin: 0 auto 32px;
  }
  .visual-wrapper {
    height: 400px;
  }
  .editorial-product.item-0 { width: 260px; height: 320px; }
  .editorial-product.item-1 { width: 140px; height: 160px; right: 0; top: 0; }
  .editorial-product.item-2 { width: 160px; height: 160px; left: 0; bottom: 0; }
}


.products-premium {
  max-width: 1300px;
  margin: 0 auto;
  padding: 80px 40px 120px;
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
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

.view-all-link {
  background: none;
  border: none;
  color: #050505;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.view-all-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #050505;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s ease;
}

.view-all-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.view-all-link .arrow {
  transition: transform 0.3s ease;
}

.view-all-link:hover .arrow {
  transform: translateX(6px);
}

.products-grid-premium {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.product-card-premium {
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  transition: box-shadow 0.5s ease, transform 0.5s ease, border-color 0.5s ease;
  position: relative;
}

.product-card-premium:hover {
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
  border-color: rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

.quick-view-premium {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 14px;
  color: #111;
  cursor: pointer;
  z-index: 10;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.product-card-premium:hover .quick-view-premium {
  opacity: 1;
  transform: scale(1);
}

.quick-view-premium:hover {
  background: #fff;
  transform: scale(1.1) !important;
}

.image-container-premium {
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: #F9F9FB;
}

.image-container-premium img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card-premium:hover .image-container-premium img {
  transform: scale(1.08);
}

.product-info-premium {
  padding: 24px;
}

.info-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
}

.product-info-premium h3 {
  font-size: 16px;
  font-weight: 500;
  color: #111;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  flex: 1;
}

.price {
  font-size: 18px;
  font-weight: 600;
  color: #050505;
  margin: 0;
}

.rating-premium {
  font-size: 13px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
}

.star {
  color: #050505;
  font-size: 12px;
}

.carousel-container-premium {
  display: none;
  position: relative;
  overflow: hidden;
  margin: 0 -20px;
  padding: 0 20px 20px;
}

.carousel-track-premium {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 20px;
}

.carousel-track-premium::-webkit-scrollbar {
  display: none;
}

.carousel-track-premium .product-card-premium {
  flex: 0 0 300px;
  scroll-snap-align: center;
}

.carousel-arrow-premium {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  background: #fff;
  border: 1px solid rgba(0,0,0,0.05);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.carousel-arrow-premium:hover {
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.carousel-arrow-premium.prev { left: 8px; }
.carousel-arrow-premium.next { right: 8px; }
@media (max-width: 992px) {
  .products-premium {
    padding: 60px 20px;
  }
  .products-grid-premium {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .carousel-container-premium {
    display: none;
  }
}
@media (max-width: 768px) {
  .products-grid-premium {
    display: none;
  }
  .carousel-container-premium {
    display: block;
  }
  .image-container-premium {
    height: 240px;
    padding: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .floatProduct {
    animation: none !important;
    transition: none !important;
  }
}
</style>
