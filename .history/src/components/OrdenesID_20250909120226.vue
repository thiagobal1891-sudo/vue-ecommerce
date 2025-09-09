<template>
  <div class="orders-container">
    <div class="top-bar">
      <button class="back-btn">←</button>
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

    <!-- Tabla de órdenes -->
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
          <td><input type="checkbox" /></td>
          <td>#{{ order.id }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.price }}</td>
          <td>
            <span 
              class="status" 
              :class="{ paid: order.status === 'Paid', processing: order.status === 'Processing', cancelled: order.status === 'Cancelled' }"
            >
              {{ order.status }}
            </span>
          </td>
          <td>›</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'OrderID',
  data() {
    return {
      searchQuery: "",
      selectedTab: "Completed",
      tabs: ["Completed", "Processing", "Cancelled"],
      orders: [
        { id: 874522648, date: "September 5, 2020", price: "$218.50", status: "Paid" },
        { id: 874522649, date: "September 7, 2020", price: "$99.99", status: "Paid" },
        { id: 874522650, date: "September 9, 2020", price: "$59.00", status: "Processing" },
        { id: 874522651, date: "September 12, 2020", price: "$120.00", status: "Cancelled" },
      ],
    }
  },
  computed: {
    filteredOrders() {
      return this.orders.filter(order => {
        // Filtra por tab
        if (this.selectedTab === "Completed" && order.status !== "Paid") return false
        if (this.selectedTab === "Processing" && order.status !== "Processing") return false
        if (this.selectedTab === "Cancelled" && order.status !== "Cancelled") return false

        // Filtra por búsqueda
        if (this.searchQuery) {
          return (
            order.id.toString().includes(this.searchQuery) ||
            order.date.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            order.price.includes(this.searchQuery)
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
  width: 360px;
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
  text-align: left;
  padding: 10px;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #eee;
}
.orders-table td {
  padding: 12px 10px;
  border-bottom: 1px solid #eee;
  color: #171520;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
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
