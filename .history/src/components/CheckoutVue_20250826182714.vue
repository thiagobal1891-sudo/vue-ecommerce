<template>
<div class="order-title">Order#874522648</div>
<div class="tabs">
  <button class="tab active">Items Ordered</button>
  <button class="tab">Invoices</button>
  <button class="tab">Order Shipment</button>
</div>

  <div class="container">
  <div class="main">
    <div id="items" class="tab-content">
      <table> 
        <thead> 
          <tr> 
            <th>Product Name</th> 
            <th>Price</th> 
            <th>Qty</th> 
            <th>Subtotal</th> 
          </tr> 
        </thead>
        </table>
        </div>
  <div class="item" v-if="productos.cart.length" :key="productos.cart[productos.cart.length - 1].id">
  <img :src="productos.cart[productos.cart.length - 1].image" alt="">
  <div class="info">
    <b>{{ productos.cart[productos.cart.length - 1].category }}</b>
    {{ productos.cart[productos.cart.length - 1].title }}<br>
  </div>
  <div class="price">
    ${{ productos.cart[productos.cart.length - 1].price }}
  </div>
  <div class="qty">
    {{ productos.cart[productos.cart.length - 1].quantity }}
  </div>
  <div class="subtotal">
    ${{ productos.cart[productos.cart.length - 1].price * productos.cart[productos.cart.length - 1].quantity }}
  </div>
  </div>
      <h3>Order Information</h3>
  <div class="order-info">
  <div class="order-section">
    <h4>Order Details</h4>
    <p>Sub Total: $119.69</p>
    <p>Discount: -$13.40</p>
    <p>Delivery Fee: -$0.00</p>
    <p><b>Grand Total: $106.29</b></p>
  </div>
  <div class="order-section">
    <h4>Payment Details</h4>
    <p>Cash on Delivery</p>
  </div>
  <div class="order-section">
    <h4>Address Details</h4>
    <p>Vincent Lobo</p>
    <p>3068 Woodlawn Drive</p>
    <p>Milwaukee</p>
    <p>414-672-5388</p>
  </div>
  </div>
  <div class="buttons">
  <button class="btn-reorder">Reorder</button>
  <button class="btn-rating">Add Rating</button>
  </div>
  </div>
  </div>
</template>


<script>
import { useCartStore } from '@/stores/cart'


export default {
    name: 'CheckoutVue',
    components: {
          
    },
    data() {
    return {
      productos:useCartStore()
    }
    }
    }


</script>

<style>

    .container {
      display: flex;
      height: 568px;
      
    }

    .main {
      width: 930px;
      margin-top: 20px;

    }
    .order-title {
      margin-bottom: 20px;
      text-align: left;
      width: 309px;
      height: 44px;
      font-family: 'Inter';
      font-weight: 600;
      font-size: 34px;
    }

    .tabs {
  display: flex;
  background: #f5f5f5;
  padding: 8px;
  border-radius: 6px;
  gap: 16px;
}

.tab {
  background: transparent;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #626262;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
}

.tab.active {
  background: #1B4B66;
  color: white;
}

.tab:hover {
  background: rgba(27, 75, 102, 0.1); 
}


    table {
  border-collapse: collapse;
  width: 921px;
  table-layout: fixed; /*  fuerza que todas las columnas respeten el ancho */
}

th, td {
  padding: 10px;
  text-align: left;
  font-family: 'Inter';
  font-size: 16px;
  color: #626262;
  border-bottom: 1px solid #ccc;
}

/* Ancho de cada columna */
th:nth-child(1), td:nth-child(1) {
  width: 50%;  /* Product Name */
}

th:nth-child(2), td:nth-child(2) {
  width: 15%;  /* Price */
  text-align: center;
}

th:nth-child(3), td:nth-child(3) {
  width: 15%;  /* Qty */
  text-align: center;
}

th:nth-child(4), td:nth-child(4) {
  width: 20%;  /* Subtotal */
  text-align: right;
}


    .price {
    
    color: #171520;
    }
    
    .qty{
    color: #171520;
    } 
    
    .subtotal {
    color: #171520;
    }

    .item{
    border: none;
          display: flex;
      background: #fff;
      border-radius: 8px;
      justify-content: space-between;
      gap: 20px;
      padding: 20px;
      margin-top: 5px;
      width: 900px
    }

    .info {
      display: flex;
      align-items: center;
      width: 921px;
    }
    .product-info img {
      width: 75px;
      height: 80px;
      margin-left: 4px;
      border-radius: 8px;
    }
    
    .h3{
      text-align: left;
      padding: 10px;
      width: 874px;
      border-bottom: 1px solid #ccc;
      font-family: 'Inter';
      font-weight: 600;
      font-size: 20px;
      color: #13101E;
    }

    .order-info {
      display: flex;
      background: #fff;
      border-radius: 8px;
      justify-content: space-between;
      gap: 20px;
      padding: 20px;
      margin-top: 5px;
      width: 900px;
    }
    .order-section {
      flex: 1;
    }
    .order-section h4 {
      margin-bottom: 10px;
      font-family: 'Inter';
      font-size: 16px;
      display: flex;
      align-items: center;
      color: #626262;
      font-weight: 500;
    }
    .order-section p {
      margin: 5px 0;
      font-family: 'Inter';
      font-size: 16px;
      display: flex;
      align-items: center;
      text-align: right;
      color: #171520;
    }
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  width: 921px; 
  margin-top: 35px; 
  }

    button {
      padding: 10px 20px;
      border-radius: 8px;
      border: 1px solid #1B4B66;
      cursor: pointer;
      font-size: 14px;
      font-family: 'Inter';
      font-weight: 600;
    }
    .btn-reorder {
      background: #1B4B66;
      color: #fff;
    }
    .btn-rating {
      background: #fff;
      color: #1B4B66;
    }
</style>