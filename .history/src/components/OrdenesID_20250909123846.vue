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
        <tr v-for="producto in filteredOrders" :key="producto.id">
          <td><input type="checkbox" /></td>
          <td>#{{ producto.id }}</td>
          <td>{{ producto.date }}</td>
          <td>{{ producto.price }}</td>
          <td>
            <span 
              class="status" 
              :class="{ paid: producto.status === 'Paid', processing: producto.status === 'Processing', cancelled: producto.status === 'Cancelled' }"
            >
              {{ producto.status }}
            </span>
          </td>
          <button class="orden-button">›</button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'OrderID',
  data() {
    return {
      productos:useCartStore(),
      searchQuery: "",
      selectedTab: "Completed",
      tabs: ["Completed", "Processing", "Cancelled"],
      productos: [
        { id: 874522648, date: "September 5, 2020", price: "$218.50", status: "Paid" },
        { id: 874522649, date: "September 7, 2020", price: "$99.99", status: "Paid" },
        { id: 874522650, date: "September 9, 2020", price: "$59.00", status: "Processing" },
        { id: 874522651, date: "September 12, 2020", price: "$120.00", status: "Cancelled" },
      ],
    }
  },
  computed: {
    filteredProductos() {
      return this.productos.filter(producto => {
        // Filtra por tab
        if (this.selectedTab === "Completed" && producto.status !== "Paid") return false
        if (this.selectedTab === "Processing" && producto.status !== "Processing") return false
        if (this.selectedTab === "Cancelled" && producto.status !== "Cancelled") return false

        // Filtra por búsqueda
        if (this.searchQuery) {
          return (
            producto.id.toString().includes(this.searchQuery) ||
            producto.date.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            producto.price.includes(this.searchQuery)
          )
        }

        return true
      })
    }
  }
}
</script>

<style scoped>
.orders-container {
  font-family: sans-serif;
  padding: 16px;
  background: white;
  border-radius: 8px;
}

/* Barra superior */
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

/* Tabs */
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

/* Tabla */
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

/* Estado */
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
