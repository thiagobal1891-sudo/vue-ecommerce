<template>
  <div v-if="loading" class="product-card">
    <p>Cargando producto...</p>
  </div>

  <div v-else-if="error" class="product-card">
    <p>Error al cargar el producto</p>
  </div>

  <div v-else-if="productos" class="product-card">
    
<div class="product-image">

  <div 
    class="zoom-wrapper"
    @mousemove="handleZoom"
    @mouseleave="resetZoom">

    <img 
      v-if="activeImage"
      :src="activeImage"
      class="main-image"
      ref="mainImage"
      :style="zoomStyle"/>

  </div>

  <div class="thumbnails">
    <img 
      v-for="(img, index) in productos.images" 
      :key="index"
      :src="img"
      @click="activeImage = img"
      :class="{ active: activeImage === img }"
      role="button"
      tabindex="0"
      @keydown.enter="activeImage = img"/>
  </div>

</div>

    <div class="product-details">
      <h2>{{ productos.title }}</h2>
      <p class="description">{{ productos.description }}</p>

      <RantingVue 
        :rate="productos.rating" 
        :count="productos.stock" 
        :id="productos.id"/>

      <div class="price">
        <span class="current-price price-animated">
  {{ formatPrice(finalPrice) }}
</span>

        <span 
          class="old-price" 
          v-if="productos.price && productos.discountPercentage"
        >
          {{ formatPrice(oldPrice) }}
        </span>

        <span class="discount">
          {{ productos.discountPercentage }}% OFF
        </span>

      </div>
    <p v-if="quantity > 1" class="total-info">
  Total for {{ quantity }} items
    </p>
      <div class="delivery">
        <div class="delivery-texts">
          <h2 class="delivery-text">Delivery Details</h2>
          <p>Check estimated delivery date/pickup option.</p>
        </div>
      </div>

      <div class="quantity">
        <p>Quantity:</p>

        <div class="quantity-buttons">
          <button @click="decrease">-</button>
          <span>{{ quantity }}</span>
          <button @click="increase">+</button>
        </div>
      </div>

<div class="coupon-container">
  
  <div class="coupon">
    <p>Get up to 30% Off on orders above $100</p>
    <button @click="applyCoupon('ORDER100')">
      Use Code <strong>ORDER100</strong>
    </button>
  </div>

  <div class="coupon-apply">
    <input 
      v-model="couponCode"
      type="text" 
      placeholder="Enter coupon code"/>
    <button @click="applyCoupon(couponCode)">
      Apply
    </button>
  </div>

  <p v-if="couponMessage" class="coupon-message">
    {{ couponMessage }}
  </p>

</div>
      <div class="actions">
        <button 
  class="add-to-bag" 
  @click="cart()" 
  :disabled="!productos || quantity === 0">
          <img src="@/assets/bag.png" alt="bag" class="logo" />
          <span>Add To Bag</span>
        </button>

        <button class="add-to-wishlist">
          <img src="@/assets/wishlist.png" alt="wishlist" class="logo" />
          <span>Add To Wishlist</span>
        </button>
      </div>

    </div>
  </div>
</template>
<script>
import axios from "axios";
import RantingVue from "./RantingVue.vue";
import { useCartStore } from "@/stores/cart";

export default {
  components: {
    RantingVue,
  },

  data() {
    return {
      cartStore: useCartStore(),
      quantity: 0,
      productos: null,
      loading: true,
      error: false,

      couponCode: "",
      couponMessage: "",
      appliedDiscount: 0,

      activeImage: "",
      showZoom: false,
      lensStyle: {},
      zoomStyle: {},
    };
  },

  computed: {
    oldPrice() {
      if (!this.productos?.price || !this.productos?.discountPercentage) return 0;
      return this.productos.price / (1 - this.productos.discountPercentage / 100);
    },

    finalPrice() {
      if (!this.productos?.price) return 0;

      let price = this.productos.price;

      if (this.appliedDiscount > 0) {
        price = price * (1 - this.appliedDiscount);
      }

      return this.quantity <= 1 ? price : price * this.quantity;
    }
  },

  watch: {
    productos(newVal) {
      if (newVal?.images?.length) {
        this.activeImage = newVal.images[0];
      }
    }
  },

  methods: {
    formatPrice(value) {
      if (!value) return "$0.00";

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    },

    increase() {
      if (!this.productos) return;

      if (this.quantity < this.productos.stock) {
        this.quantity++;
      }
    },

    decrease() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    },

    applyCoupon(code) {
      if (!code) {
        this.couponMessage = "Enter a coupon code";
        return;
      }

      if (code === "ORDER100") {
        this.appliedDiscount = 0.3;
        this.couponMessage = "Coupon applied successfully 🎉";
      } else {
        this.appliedDiscount = 0;
        this.couponMessage = "Invalid coupon ❌";
      }
    },

    async getProducts() {
      try {
        const idParams = this.$route.params.id;

        const response = await axios.get(
          `https://dummyjson.com/products/${idParams}`
        );

        this.productos = response.data;

      } catch (error) {
        console.log(error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

  cart() {
  if (!this.productos || this.quantity === 0) return;

  this.cartStore.addToCart({
    ...this.productos,
    quantity: this.quantity,
  });
},

    handleZoom(e) {
      const img = this.$refs.mainImage;
      if (!img) return;

      this.showZoom = true;

      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      const zoomLevel = 2.5;

      this.zoomStyle = {
        transformOrigin: `${xPercent}% ${yPercent}%`,
        transform: `scale(${zoomLevel})`
      };
    },

    resetZoom() {
      this.showZoom = false;
      this.zoomStyle = {
        transformOrigin: 'center center',
        transform: 'scale(1)'
      };
    }
  },

  created() {
    this.getProducts();
  }
};
</script>
<style>
.product-card {
  display: flex;
  max-width: 1300px;
  width: 100%;
  margin: 100px auto 40px;
  padding: 0 40px;
  font-family: sans-serif;
  gap: 80px;
  align-items: flex-start;
}
.product-image {
  flex: 0 0 55%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 100px;
}
.product-image img {
  width: 100%;
  height: auto;
  border-radius: 24px;
  object-fit: cover;
}

.product-details {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 8px;
}

h2 {
  width: 100%;
  text-align: left;
  color: #050505;
  font-weight: 600;
  font-size: clamp(1.6rem, 2.5vw, 2.25rem);
  line-height: 1.6;
  letter-spacing: -0.01em;
  margin-bottom: 16px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  height: auto !important;
  display: block !important;
  overflow: visible !important;
}

.description {
  color: #666;
  text-align: left;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.7;
  width: 100%;
  margin: 0;
}

.price {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}
.current-price {
  font-weight: 600;
  font-size: 2rem;
  color: #050505;
  letter-spacing: -0.03em;
  line-height: 1;
}
.old-price {
  font-weight: 400;
  font-size: 15px;
  color: #bbb;
  text-decoration: line-through;
}
.price-animated {
  transition: all 0.25s ease;
}
@keyframes pricePop {
  0%   { transform: scale(1);    color: #050505; }
  50%  { transform: scale(1.06); color: #333;    }
  100% { transform: scale(1);    color: #050505; }
}
.price-animated {
  animation: pricePop 0.3s ease;
}
.discount {
  font-weight: 600;
  font-size: 12px;
  color: #050505;
  background: rgba(0,0,0,0.06);
  padding: 4px 10px;
  border-radius: 100px;
  letter-spacing: 0.02em;
}
.total-info {
  font-size: 13px;
  color: #16a34a;
  font-weight: 500;
}

.delivery  {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 16px;
}
.delivery-texts {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
}
.delivery-texts p {
  width: 100%;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0%;
  vertical-align: middle;
  text-align: left;
}
.delivery-text {
  width: 100%;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0%;
  vertical-align: middle;

}
  .input-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 390px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f2f2f2;
    padding: 0 15px;
    font-family: sans-serif;
    font-size: 14px;
  }
  .input-wrapper span.placeholder {
    color: #666;
  }
  .input-wrapper button {
    background: none;
    border: none;
    color: #16a34a;
    font-weight: bold;
    cursor: pointer;
  }
.quantity {
  margin: 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.quantity p {
  font-family: Inter;
  font-weight: 600;
  font-size: 20px;
  vertical-align: middle;
}

.quantity-buttons button{
  width: 24px;
  height: 24px;
  border: none;
  font-weight: 900;
  background-color: transparent;
  flex: none;
  order: 0;
  flex-grow: 0;
}
.quantity-buttons {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 73px;
  height: 30px;
  border: 1px solid #16a34a;
  border-radius: 4px;
  flex: none;
  order: 1;
  flex-grow: 0;
}
.coupon {
  width: 100%;
  background-color: #ffffff;
  padding: 10px;
  margin: 15px 0;
  border: 1px solid #050505;
}
.coupon button {
  margin-top: 5px;
  background-color: #dcdcdc;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
.actions {
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  gap: 10px;
}

.add-to-bag,
.add-to-wishlist {
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 44px;
  opacity: 1;
  border-radius: 8px;
  gap: 8px;
  border-width: 2px;
}
.add-to-bag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; 
  flex: 1;
  padding: 10px 20px;
  background-color: #15803d;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}
.add-to-bag .logo {
  width: 20px;
  height: 20px;
}
.add-to-wishlist {
  display: flex;
  background-color: white;
  border: 1px solid #050505;
  color: #050505;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  vertical-align: middle;
}
.coupon-apply {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.coupon-apply input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: all 0.2s ease;
}
.coupon-apply input:focus {
  border-color: #050505;
  box-shadow: 0 0 0 2px rgba(22,163,74,0.1);
}
.coupon-apply button {
  padding: 10px 16px;
  border: none;
  background: #050505;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.coupon-apply button:hover {
  background: #15803d;
}

.coupon-message {
  font-size: 14px;
  font-weight: 500;
  margin-top: 6px;
}

.product-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.add-to-bag:hover {
  background-color: #050505;
}
.add-to-wishlist:hover {
  background-color: #f0fdf4;
}

.zoom-container {
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
  cursor: zoom-in;
  position: relative;
}
.zoom-image {
  width: 100%;
  transition: transform 0.15s ease;
}
.thumbnails {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.thumbnails img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}
.thumbnails img:hover {
  transform: scale(1.05);
}
.thumbnails img.active {
  border-color: #16a34a;
}
.zoom-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  border-radius: 16px;
  cursor: zoom-in;
}

.main-image {
  width: 100%;
  border-radius: 16px;
  display: block;
  transition: transform 0.15s ease-out;
}
@media screen and (max-width: 640px) {
  .product-card {
    flex-direction: column;
    padding: 12px;
    padding-top: 140px;
    gap: 12px;
  }
  .product-image {
    position: static;
    width: 100%;
    margin-bottom: 24px;
    flex: none;
  }
  .product-image img {
    max-width: 100%;
    border-radius: 12px;
  }
  .product-details {
    width: 100%;
    gap: 10px;
    flex: none;
  }
  h2 {
    font-size: 20px;
    line-height: 26px;
  }
  .description {
    font-size: 14px;
  }
  .price {
    gap: 8px;
  }
  .current-price {
    font-size: 20px;
  }
  .old-price {
    font-size: 13px;
  }
  .discount {
    font-size: 11px;
  }
  .quantity {
    justify-content: space-between;
  }
  .quantity-buttons {
    width: 90px;
    height: 34px;
  }
  .coupon-container {
    gap: 8px;
    position: relative;
    isolation: isolate;
    z-index: 1;
  }
  .coupon {
    padding: 8px;
    margin: 0;
  }
  .coupon-apply {
    flex-direction: column;
    position: relative;
    z-index: 2;
  }
.coupon-container span {
  display: inline-block;
}
span.arrow {
  display: none;
}
  .coupon-apply button {
    width: 100%;
  }
  .actions {
    flex-direction: column;
    gap: 8px;
    height: auto;
  }
  .add-to-bag {
    width: 100%;
  }
  .add-to-wishlist {
    display: none;
  }
  .zoom-result {
    display: none;
  }
  .zoom-lens {
    display: none;
  }
}
@media screen and (min-width: 641px) and (max-width: 1024px) {
  .product-card {
    flex-direction: column;
    padding: 20px;
    padding-top: 140px;
    gap: 20px;
  }
  .product-image {
    position: static;
    width: 100%;
    margin-bottom: 24px;
    flex: none;
  }
  .product-image img {
    max-width: 500px;
  }
  .product-details {
    width: 100%;
    flex: none;
  }
  h2 {
    font-size: 26px;
  }
  .description {
    font-size: 16px;
  }
  .price {
    gap: 10px;
  }
  .current-price {
    font-size: 24px;
  }
  .actions {
    justify-content: flex-start;
  }
  .add-to-bag,
  .add-to-wishlist {
    width: auto;
    flex: 1;
  }
    .zoom-result {
    display: none;
  }
  .zoom-lens {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .price-animated,
  .product-card,
  .thumbnails img,
  .zoom-image {
    animation: none !important;
    transition: none !important;
  }
}
</style>


