<template>
  <div class="page">
      <div class="head_cart">
    <a href="#">Home</a>
    <span>›</span>
    <span>my cart</span>  
    
  </div>
  <h2 class="titulo_cart">My cart</h2>
    <div class="carrito">
      <div class="items">
        <div class="item" v-for="producto in productos.cart" :key="producto.id">
          <img :src="producto.image" alt="" />
          <div class="info">
            <b>{{ producto.category }}</b>
            {{ producto.title }}<br />
            <input
              type="number"
              min="1"
              v-model.number="producto.quantity"
              @change="productos.modificarCantidad(producto.id, producto.quantity)"
            />
            {{ producto.quantity }}<br />
            <a href="#" class="move">Move to Wishlist</a>
            <button class="remove" @click="productos.quitar(producto.id)">Remove</button>
          </div>

          <div class="rightCols">
            <div class="pricecarrito">${{ producto.price.toFixed(2) }}</div>
            <div class="cantidad">{{ producto.quantity }}</div>
            <div class="subtotal">${{ (producto.price * producto.quantity).toFixed(2) }}</div>
          </div>
        </div>
      </div>

      <div class="total">
        <h3>Order Summary</h3>
        <div class="line"><span>Sub Total</span><span>$119.69</span></div>
        <div class="line"><span>Discount</span><span>-$13.40</span></div>
        <div class="line"><span>Delivery Fee</span><span>$0.00</span></div>
        <div class="line grand"><span>Grand Total</span><span>$106.29</span></div>

        <div class="buttons">
          <button class="place">Place Order</button>
          <button class="continue">Continue Shopping</button>
        </div>
      </div>

      <div class="cupones">
        <label class="cupon-texto">Apply Coupon Code</label>
        <div class="cupon-box">
          <input type="text" placeholder="Apply Coupon Code" />
          <button>CHECK</button>
        </div>
      </div>
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
  }
}
</script>

<style>
* { box-sizing: border-box;
  margin: 0;
  padding: 20; }

.page {
  padding: 20px;
}
.carrito {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
  grid-template-areas:
    "items"
    "total"
    "cupones";
  max-width: 1120px;
  margin: 24px auto;
  width: 100%;
  align-items: start;
}


.items { grid-area: items; }
.total { grid-area: total; align-self: start; }
.cupones { grid-area: cupones; align-self: start; }

.head_cart a {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #1B4B66;
  border-color: white;
}

.head_cart span {
  margin: 0 5px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #626262;
}

.head_cart {
  text-align: left;
  bottom: 80px;
}


@media (min-width: 900px) {
  .carrito {
    grid-template-columns: 1fr 360px;
    grid-template-areas:
      "items total"
      "cupones cupones";
  }
}


.item {
  display: flex;
  gap: 16px;
  border-bottom: 1px solid #e0e0e0;
  padding: 12px 0;
  align-items: center;
}

.item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}


.info {
  flex: 1;
  color: #626262;
}
.info b { display: block; margin-bottom: 6px; color: #171520; }
.info .move { margin-right: 10px; font-size: 14px; color: #1B4B66; text-decoration: none; }
.info .remove { background: none; border: none; color: #B00020; cursor: pointer; }


.rightCols {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
  min-width: 220px;
  flex-shrink: 0;
}

.pricecarrito, .cantidad, .subtotal {
  width: 80px;
  text-align: right;
  color: #171520;
}


.titulo_cart {
  text-align: left;
  width: 132px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  color: #1B4B66;
  margin: 30px 10px;
}

.total h3 {
  margin: 0 0 10px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #ccc;
  color: #171520;
}
.total .line {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  color: #171520;
}
.total .grand { font-weight: 700; }

.buttons {
  margin-top: 18px;
  display: flex;
  gap: 14px;
}
.buttons button { padding: 10px 14px; border-radius: 6px; cursor: pointer; }
.place { background: #1B4B66; color: white; border: none; }
.continue { background: white; color: #1B4B66; border: 2px solid #1B4B66; }


.cupones { padding: 12px;
  width: 580px;;
}
.cupon-texto {
  margin-bottom: 8px;
  font-weight: 500;
  color: #171520;
  border-bottom: 1px solid #ccc;
  }
.cupon-box {
  display: flex;
  align-items: center;
  background: #f2f2f2;
  border-radius: 5px;
  max-width: 400px;
  overflow: hidden;
}
.cupon-box input { border: none; background: transparent; padding: 12px; flex: 1; outline: none; }
.cupon-box button { background: transparent; border: none; font-weight: 700; padding: 12px 16px; cursor: pointer; }
</style>
