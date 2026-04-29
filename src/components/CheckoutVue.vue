<template>
<div class="container_checkout">
<div class="tabs_checkout">
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
  <tbody>
  <tr v-if="!allItems.length">
    <td colspan="4">No items</td>
  </tr>

  <tr v-for="producto in allItems" :key="producto.id">
    <td data-label="Product Name">
      <div class="producto-info">
        <b>{{ producto.title }}</b>
      </div>
    </td>

    <td class="precio" data-label="Price">${{ producto.price }}</td>
    <td class="cantidad" data-label="Quantity">{{ producto.quantity }}</td>
    <td class="subtotal" data-label="Subtotal">
      ${{ producto.price * producto.quantity }}
    </td>
  </tr>
</tbody>
  </table>
  </div>

      <h3>Order Information</h3>
  <div class="orden-info">
  <div class="orden-detalles">
    <h4>Order Details</h4>
    <p>Sub Total:</p>
    <p>Discount: -$13.40</p>
    <p>Delivery Fee: -$0.00</p>
    <p><b>Grand Total: ${{ total }}</b></p>
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

  setup() {
    const store = useCartStore()
    return { store }
  },

  computed: {
    orders() {
      return this.store.selectedOrdersCheckout || []
    },

    allItems() {
      return this.orders.flatMap(order => order.items || [])
    },

    total() {
      return this.orders.reduce((acc, o) => acc + (o.total || 0), 0)
    }
  }
}
</script>
<style>
    .container_checkout {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .main {
      margin-top: 20px;
    }
    .tabs_checkout {
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
  background: #050505;
  color: white;
}
.tab:hover {
  background: rgba(27, 75, 102, 0.1); 
}
    table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}
  .orden-table{
  border-collapse: collapse;
  table-layout: fixed;
}
.orden-table th{
  padding: 10px;
  font-family: 'Inter';
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  color: #626262;
  text-align: left;
}
.orden-table td{
  text-align: left;
  font-family: 'Inter';
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  color: #171520;
  width: 100%;
}
.producto-info{
  display:flex;
  align-items:center;
  gap:10px;
}
.producto-info img{
  width:60px;
  height:60px;
  border-radius:8px;
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
    .orden-info {
      display: flex;
      background: #fff;
      justify-content: space-between;
      border-collapse: collapse;
      table-layout: fixed;
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
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-direction: row;
  width: 100%;         
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
      background: #050505;
      color: #fff;
      border-color: #050505;
    }
    .btn-rating {
      background: #fff;
      color: #13101E;
      border-color: #13101E;
    }
    .btn-reorder, .btn-rating {
  width: 136px;
}
@media (max-width: 768px) {
  .container_checkout {
    padding: 8px;
  }
  .tabs_checkout {
    flex-wrap: wrap;
    gap: 8px;
    padding: 6px;
  }
  .tab {
    font-size: 12px;
    padding: 6px 12px;
    flex: 1;
    min-width: 0;
  }
  .main {
    margin-top: 12px;
  }
  .orden-table {
    font-size: 12px;
  }
  .orden-table thead {
    display: none;
  }
  .orden-table tbody {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .orden-table tr {
    display: flex;
    flex-direction: column;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 12px;
    gap: 8px;
  }
  .orden-table td {
    display: flex;
    align-items: center;
    padding: 4px 0;
    border: none;
    background: transparent;
    font-size: 12px;
  }
  .orden-table td::before {
    content: attr(data-label) ":";
    font-weight: 600;
    min-width: 80px;
    margin-right: 8px;
    color: #6b7280;
  }
  .orden-info {
    flex-direction: column;
    gap: 16px;
  }
  .orden-detalles {
    padding: 12px;
    background: #f9fafb;
    border-radius: 8px;
  }
  .orden-detalles h4 {
    font-size: 14px;
    margin-bottom: 8px;
  }
  .orden-detalles p {
    font-size: 12px;
    margin: 4px 0;
  }
  .buttons {
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
  }
  .btn-reorder,
  .btn-rating {
    width: 100%;
    padding: 12px;
    font-size: 14px;
  }
  h3 {
    font-size: 16px;
    margin: 16px 0 12px 0;
  }
}
@media (max-width: 480px) {
  .container_checkout {
    padding: 4px;
  }
  .tab {
    font-size: 11px;
    padding: 4px 8px;
  }
  .orden-table td {
    font-size: 11px;
  }
  .orden-table td::before {
    font-size: 10px;
    min-width: 60px;
  }
  .orden-detalles {
    padding: 8px;
  }
  .orden-detalles h4 {
    font-size: 13px;
  }
  .orden-detalles p {
    font-size: 11px;
  }
  h3 {
    font-size: 14px;
  }
}
</style>