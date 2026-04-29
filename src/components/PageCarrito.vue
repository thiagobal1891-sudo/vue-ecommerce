<template>
  <div class="cart-page">

    <nav class="cart-breadcrumb">
      <a href="#" class="crumb-link">Home</a>
      <span class="crumb-sep">›</span>
      <span class="crumb-current">My Cart</span>
    </nav>

    <header class="cart-header">
      <p class="section-mini">SHOPPING BAG</p>
      <h2 class="cart-title">
        My Cart<span class="cart-count" v-if="productos.cart.length"> · {{ productos.cart.length }}</span>
      </h2>
    </header>

    <div class="cart-layout">

      <div class="cart-items-panel">

        <div v-if="productos.cart.length === 0" class="cart-empty">
          <div class="empty-icon">🛒</div>
          <p class="empty-title">Your cart is empty</p>
          <p class="empty-sub">Looks like you haven't added anything yet.</p>
          <button class="btn-primary" @click="$router.push('/')">
            <span class="btn-text">Start Shopping</span>
            <div class="btn-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </div>
          </button>
        </div>

        <div v-else class="items-list">
          <div class="items-header">
            <span>Product</span>
            <span>Quantity</span>
            <span style="text-align:right">Price</span>
          </div>

          <div class="cart-item" v-for="producto in productos.cart" :key="producto.id">
            <div class="item-left">
              <div class="item-image-wrap">
                <img :src="producto.images?.[0] || producto.image" :alt="producto.title" />
              </div>
              <div class="item-info">
                <span class="item-category">{{ producto.category }}</span>
                <p class="item-title">{{ producto.title }}</p>
                <div class="item-actions">
                  <a href="#" class="action-link">Move to Wishlist</a>
                  <button class="action-remove" @click="productos.removeFromCart(producto.id)">Remove</button>
                </div>
              </div>
            </div>

            <div class="quantity-control">
              <button @click="decreaseQty(producto)" :disabled="producto.quantity <= 1">−</button>
              <span class="qty">{{ producto.quantity }}</span>
              <button @click="increaseQty(producto)">+</button>
            </div>

            <div class="item-pricing">
              <div class="item-price">${{ getFinalPrice(producto).toFixed(2) }}
                <span v-if="producto.discountPercentage" class="price-old">${{ producto.price.toFixed(2) }}</span>
              </div>
              <div class="item-subtotal">${{ (getFinalPrice(producto) * producto.quantity).toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </div>

      <aside class="cart-summary-panel">
        <h3 class="summary-heading">Order Summary</h3>

        <div class="summary-lines">
          <div class="summary-line">
            <span>Subtotal</span>
            <span>${{ subTotal.toFixed(2) }}</span>
          </div>
          <div class="summary-line summary-discount">
            <span>Discount (10%)</span>
            <span>−${{ discount.toFixed(2) }}</span>
          </div>
          <div class="summary-line">
            <span>Delivery</span>
            <span v-if="delivery === 0" class="tag-free">Free</span>
            <span v-else>${{ delivery.toFixed(2) }}</span>
          </div>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-total">
          <span>Grand Total</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>

        <div class="coupon-wrap">
          <label class="coupon-label">Coupon Code</label>
          <div class="coupon-box">
            <input type="text" placeholder="Enter code…" />
            <button>Apply</button>
          </div>
        </div>

        <div class="summary-actions">
          <button class="btn-primary" @click="handleCheckout">
            <span class="btn-text">Place Order</span>
            <div class="btn-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </div>
          </button>
          <button class="btn-secondary" @click="$router.push('/')">Continue Shopping</button>
        </div>

        <p class="summary-note">✦ Free delivery on orders over $100</p>
      </aside>

    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'PageCarrito',

  data() {
    return {
      productos: useCartStore()
    }
  },

  computed: {
    subTotal() {
      return this.productos.cart.reduce((acc, p) => {
        return acc + this.getFinalPrice(p) * p.quantity
      }, 0)
    },
    discount() {
      return this.subTotal * 0.1
    },
    delivery() {
      return this.subTotal > 100 ? 0 : 10
    },
    total() {
      return this.subTotal - this.discount + this.delivery
    }
  },

  methods: {
    getFinalPrice(producto) {
      if (!producto.discountPercentage) return producto.price
      return producto.price * (1 - producto.discountPercentage / 100)
    },
    increaseQty(producto) {
      this.productos.updateQuantity(producto.id, producto.quantity + 1)
    },
    decreaseQty(producto) {
      if (producto.quantity > 1) {
        this.productos.updateQuantity(producto.id, producto.quantity - 1)
      } else {
        this.productos.removeFromCart(producto.id)
      }
    },
    validateQty(producto) {
      if (!producto.quantity || producto.quantity < 1) {
        producto.quantity = 1
      }
    },
    handleCheckout() {
      if (!this.productos.cart.length) return
      this.productos.checkout()
      this.$router.push('/orders/history')
    }
  }
}
</script>

<style>

.cart-page {
  max-width: 1300px;
  margin: 0 auto;
  padding: clamp(24px, 4vw, 60px) clamp(16px, 4vw, 48px);
  background: #fcfcfd;
  min-height: 100vh;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

.cart-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
}
.crumb-link {
  font-size: 13px;
  font-weight: 500;
  color: #050505;
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: opacity 0.2s ease;
}
.crumb-link:hover { opacity: 0.5; }
.crumb-sep {
  color: #bbb;
  font-size: 14px;
}
.crumb-current {
  font-size: 13px;
  color: #888;
  font-weight: 400;
}

.cart-header {
  margin-bottom: 56px;
}
.section-mini {
  font-size: 11px;
  letter-spacing: 3px;
  color: #888;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 12px;
}
.cart-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #050505;
  margin: 0;
  line-height: 1;
}
.cart-count {
  color: #aaa;
  font-weight: 400;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 60px;
  align-items: start;
}

.cart-items-panel {
  min-width: 0;
}

.items-header {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 24px;
  padding: 0 0 16px 0;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #aaa;
  font-weight: 600;
  margin-bottom: 8px;
}

.items-list { display: flex; flex-direction: column; }

.cart-item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 24px;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  transition: background 0.3s ease;
}
.cart-item:last-child { border-bottom: none; }

.item-left {
  display: flex;
  gap: 20px;
  align-items: center;
  min-width: 0;
}

.item-image-wrap {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  background: #F9F9FB;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: 1px solid rgba(0,0,0,0.04);
  overflow: hidden;
  transition: background 0.4s ease;
}
.cart-item:hover .item-image-wrap { background: #f0f0f5; }
.item-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.cart-item:hover .item-image-wrap img { transform: scale(1.06); }

.item-info {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.item-category {
  font-size: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #888;
  font-weight: 600;
}
.item-title {
  font-size: 15px;
  font-weight: 500;
  color: #050505;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.item-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 4px;
}
.action-link {
  font-size: 12px;
  color: #050505;
  text-decoration: none;
  font-weight: 500;
  position: relative;
}
.action-link::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: #050505;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}
.action-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
.action-remove {
  font-size: 12px;
  color: #bbb;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 400;
  padding: 0;
  transition: color 0.2s ease;
}
.action-remove:hover { color: #050505; }

.quantity-control {
  display: inline-flex;
  align-items: center;
  background: #F9F9FB;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 999px;
  padding: 4px;
  gap: 4px;
  flex-shrink: 0;
}
.quantity-control button {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background: #fff;
  color: #050505;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  flex-shrink: 0;
}
.quantity-control button:hover:not(:disabled) {
  background: #050505;
  color: #fff;
  transform: scale(1.08);
}
.quantity-control button:disabled { opacity: 0.3; cursor: not-allowed; }
.qty {
  min-width: 28px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: #050505;
}

.item-pricing {
  text-align: right;
  flex-shrink: 0;
  min-width: 80px;
}
.item-price {
  font-size: 16px;
  font-weight: 600;
  color: #050505;
  letter-spacing: -0.02em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}
.price-old {
  font-size: 12px;
  font-weight: 400;
  color: #bbb;
  text-decoration: line-through;
}
.item-subtotal {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
  font-weight: 400;
}

.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 40px;
  border: 1px dashed rgba(0,0,0,0.1);
  border-radius: 24px;
  background: #F9F9FB;
  text-align: center;
  gap: 12px;
}
.empty-icon { font-size: 48px; }
.empty-title {
  font-size: 22px;
  font-weight: 600;
  color: #050505;
  letter-spacing: -0.03em;
  margin: 0;
}
.empty-sub { font-size: 15px; color: #888; margin: 0; }

.cart-summary-panel {
  background: #050505;
  border-radius: 28px;
  padding: 40px 36px;
  color: #fff;
  position: sticky;
  top: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.summary-heading {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0;
}
.summary-lines {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.summary-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  font-weight: 400;
}
.summary-discount { color: rgba(255,255,255,0.5); }
.tag-free {
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
  color: #fff;
  background: rgba(255,255,255,0.12);
  padding: 3px 10px;
  border-radius: 999px;
}
.summary-divider {
  height: 1px;
  background: rgba(255,255,255,0.1);
}
.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.02em;
}

.coupon-wrap { display: flex; flex-direction: column; gap: 10px; }
.coupon-label {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  font-weight: 600;
}
.coupon-box {
  display: flex;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  overflow: hidden;
}
.coupon-box input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 12px 16px;
  color: #fff;
  font-size: 14px;
  outline: none;
}
.coupon-box input::placeholder { color: rgba(255,255,255,0.3); }
.coupon-box button {
  background: transparent;
  border: none;
  border-left: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.7);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 12px 18px;
  cursor: pointer;
  transition: color 0.2s ease;
}
.coupon-box button:hover { color: #fff; }

.summary-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: #fff;
  color: #050505;
  border: none;
  padding: 12px 12px 12px 28px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-primary:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(255,255,255,0.1);
}
.btn-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: #050505;
  color: #fff;
  border-radius: 50%;
  flex-shrink: 0;
  transition: transform 0.4s ease;
}
.btn-primary:hover .btn-circle { transform: translateX(4px); }

.cart-empty .btn-primary {
  background: #050505;
  color: #fff;
  margin-top: 16px;
  justify-content: center;
}
.cart-empty .btn-primary .btn-circle {
  background: #fff;
  color: #050505;
}
.cart-empty .btn-primary:hover {
  background: #333;
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
}

.btn-secondary {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.6);
  padding: 14px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
}
.btn-secondary:hover {
  border-color: rgba(255,255,255,0.4);
  color: #fff;
}

.summary-note {
  font-size: 11px;
  color: rgba(255,255,255,0.3);
  text-align: center;
  letter-spacing: 0.5px;
  margin: 0;
}

@media (max-width: 1024px) {
  .cart-layout {
    grid-template-columns: 1fr 340px;
    gap: 40px;
  }
}

@media (max-width: 880px) {
  .cart-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .cart-summary-panel {
    position: static;
  }
  .items-header { display: none; }
  .cart-item {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .item-pricing { text-align: left; }
  .item-price { flex-direction: row; align-items: center; gap: 8px; }
}

@media (max-width: 600px) {
  .cart-page {
    padding: 20px 16px;
  }
  .cart-header { margin-bottom: 36px; }
  .item-image-wrap {
    width: 76px;
    height: 76px;
  }
  .cart-summary-panel {
    padding: 28px 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cart-item,
  .item-image-wrap img,
  .quantity-control button,
  .btn-primary,
  .btn-secondary,
  .action-link::after {
    transition: none !important;
    transform: none !important;
    animation: none !important;
  }
}
</style>
