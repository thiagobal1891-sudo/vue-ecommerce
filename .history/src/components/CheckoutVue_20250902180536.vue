<template>
<div class="container">
<div class="tabs">
  <button class="tab activo">Items Ordered</button>
  <button class="tab">Invoices</button>
  <button class="tab">Order Shipment</button>
</div>
  <div class="main">
<div id="items" class="producto">
  <table class="orden-table">
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Subtotal</th>
      </tr>
    </thead>
  <tbody v-if="productos.cart.length">
  <tr>
    <td>
      <div class="producto-info">
        <img :src="productos.cart[productos.cart.length - 1].image" alt="">
        <div>
          <b>{{ productos.cart[productos.cart.length - 1].category }}</b><br>
          {{ productos.cart[productos.cart.length - 1].title }}
        </div>
      </div>
    </td>
    <td class="price">${{ productos.cart[productos.cart.length - 1].price }}</td>
    <td class="qty">{{ productos.cart[productos.cart.length - 1].quantity }}</td>
    <td class="subtotal">${{ productos.cart[productos.cart.length - 1].price * productos.cart[productos.cart.length - 1].quantity }}</td>
  </tr>
  </tbody>
  </table>
  </div>

      <h3>Order Information</h3>
  <div class="orden-info">
  <div class="orden-detalles">
    <h4>Order Details</h4>
    <p>Sub Total: $119.69</p>
    <p>Discount: -$13.40</p>
    <p>Delivery Fee: -$0.00</p>
    <p><b>Grand Total: $106.29</b></p>
  </div>
  <div class="orden-detalles">
    <h4>Payment Details</h4>
    <p>Cash on Delivery</p>
  </div>
  <div class="orden-detalles">
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
      flex-direction: column;
    }

    .main {
      width: calc(100% - 286px);
      margin-top: 20px;

      

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

.tab.activo {
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


td.price, td.qty, td.subtotal {
  text-align: center;
}

td.subtotal {
  text-align: right;
}

  .orden-table{
  border-collapse: collapse;
  width: 900px;
  table-layout: fixed;
}
.orden-table th{
  padding: 10px;
  font-family: 'Inter';
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  color: #626262;
}
.orden-table td{
  padding: 10px;
  font-family: 'Inter';
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  color: #171520;
}
/* Anchos de columna */
.orden-table th:nth-child(1), .orden-table td:nth-child(1){ width:50%; }
.orden-table th:nth-child(2), .orden-table td:nth-child(2){ width:15%; }
.orden-table th:nth-child(3), .orden-table td:nth-child(3){ width:15%; }
.orden-table th:nth-child(4), .orden-table td:nth-child(4){ width:20%; }

.producto-info{
  display:flex;
  align-items:center;
  gap:10px;
}
.producto-info img{
  width:60px; height:60px; border-radius:8px;
}

.text-center{ text-align:center; }
.text-right{ text-align:right; }

/* Anula anchos que rompen layout */
.price, .qty, .subtotal, .info{ width:auto; }


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

    .orden-info {
      display: flex;
      background: #fff;
      border-radius: 8px;
      justify-content: space-between;
      gap: 20px;
      padding: 20px;
      margin-top: 5px;
      width: 820px;
    }
    .orden-detalles {
      flex: 1;
    }
    .orden-detalles h4 {
      margin-bottom: 10px;
      font-family: 'Inter';
      font-size: 16px;
      display: flex;
      align-items: center;
      color: #626262;
      font-weight: 500;
    }
    .orden-detalles p {
      margin: 5px 0;
      font-family: 'Inter';
      font-size: 16px;
      display: flex;
      align-items: center;
      text-align: right;
      color: #171520;
    }
.buttons {
  display: flex;             /* ⬅️ Esto los pone en fila */
  flex-direction: row;       /* ⬅️ Asegura orientación horizontal (por si acaso) */
  justify-content: flex-end; /* ⬅️ Los alinea a la derecha */
  gap: 24px;                 /* ⬅️ Espacio entre botones */
  margin-top: auto;          /* ⬅️ Empuja hacia abajo si el contenedor usa flex */
  padding-bottom: 20px;      /* ⬅️ Espacio opcional inferior */
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