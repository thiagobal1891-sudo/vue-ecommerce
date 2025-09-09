<template>
  <div class="orders-container">
    <div class="top-bar">
      <button class="back-btn">›</button>
      <input type="text" placeholder="Search" class="search" v-model="searchQuery" />
    </div>

    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab" 
        :class="['tab', { active: selectedTab === tab }]"
        @click="selectedTab = tab"
      >
        {{ tab }}
      </button>
    </div>
    <table class="orders-table">
        <div>
    <h2>Productos en el carrito</h2>
    <ul>
      <li v-for="producto in cartStore.cart" :key="producto.id">
        {{ producto.name }} - ${{ producto.price }}</li>
            <li v-for="producto in cartStore.cart" :key="producto.id">
        {{ producto.name }} - ${{ producto.price }}</li>
    </ul>
  </div>
      <thead>
        <tr>
          <th></th>
          <th>Order ID</th>
          <th>Date</th>
          <th>Price</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order.id">
          <td><input type="checkbox" /></td>
          <td>#{{ order.id }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.price }}</td>
          <td>
            <span 
              class="status" 
              :class="{
                paid: order.status === 'Paid', 
                processing: order.status === 'Processing', 
                cancelled: order.status === 'Cancelled' 
              }"
            >
              {{ order.status }}
            </span>
          </td>
          <td><button class="orden-button">›</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted  } from 'vue'
import { useCartStore } from "@/stores/cart"  // Revisa que la ruta y el nombre sean correctos

const cartStore = useCartStore()


onMounted(() => {
  if (cartStore.cart.length === 0) {
    cartStore.agregar({ id: 1, price: 100, name: 'Producto 1' })
    cartStore.agregar({ id: 2, price: 200, name: 'Producto 2' })
  }
})

const searchQuery = ref('')
const selectedTab = ref('Completed')
const tabs = ['Completed', 'Processing', 'Cancelled']

// Mapeamos el carrito a "orders" con datos ficticios para date y status
const orders = computed(() => {
  return cartStore.cart.map(producto => ({
    id: producto.id,
    price: producto.price,
    date: 'September 5, 2020', // datos por defecto
    status: 'Paid'             // datos por defecto, puedes hacer lógica aquí si quieres
  }))
})

// Filtrado por tab y búsqueda
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    if (selectedTab.value === 'Completed' && order.status !== 'Paid') return false
    if (selectedTab.value === 'Processing' && order.status !== 'Processing') return false
    if (selectedTab.value === 'Cancelled' && order.status !== 'Cancelled') return false
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      return (
        order.id.toString().includes(query) ||
        order.date.toLowerCase().includes(query) ||
        order.price.toLowerCase().includes(query)
      )
    }

    return true
  })
})
</script>

<style scoped>
.orders-container {
  font-family: sans-serif;
  padding: 16px;
  background: white;
  border-radius: 8px;
}
.top-bar {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.back-btn {
  background: none;
  border: none;
  font-size: 18px;
  margin-right: 8px;
  cursor: pointer;
}
.search {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.tabs {
  display: flex;
  background: #f5f5f5;
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
.orders-table {
  width: 100%;
  border-collapse: collapse;
}
.orders-table th {
  padding: 8px;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.orders-table td {
  padding: 12px 10px;
  border-bottom: 1px solid #eee;
  color: #171520;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  text-align: left;
}
.orden-button{
  background: none;
  border: none;
  font-size: 18px;
  margin-right: 8px;
  cursor: pointer;
  margin: 20px 0; 
}
.status.paid {
  color: #1B4B66;
}
.status.processing {
  color: orange;
}
.status.cancelled {
  color: red;
}
</style>
