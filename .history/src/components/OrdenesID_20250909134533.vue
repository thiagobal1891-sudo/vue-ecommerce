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
        <td>{{ order.id }}</td>
        <td>{{ order.date }}</td>
        <td>{{ order.price }}</td>
        <td>{{ order.status }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

// Declaramos selectedTab porque lo usas en el filtro (puedes cambiar el valor inicial)
const selectedTab = ref('Completed')

// Mapeamos productos del carrito a "orders"
const orders = computed(() => {
  return cartStore.cart.map(producto => ({
    id: producto.id,
    date: 'September 5, 2020',
    price: producto.price,
    status: 'Paid'
  }))
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
