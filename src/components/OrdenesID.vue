<template>
  <div class="orders-page">
    <header class="orders-header">
      <p class="section-mini">ACCOUNT</p>
      <h2 class="orders-title">My Orders</h2>
    </header>
    <div class="orders-controls">
      <div class="orders-search-wrap">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          class="orders-search"
          placeholder="Search by ID, date, amount…"
          v-model="searchQuery"
        />
      </div>

      <div class="orders-tabs" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="['orders-tab', { active: selectedTab === tab }]"
          @click="selectedTab = tab"
          role="tab"
          :aria-selected="selectedTab === tab"
        >
          {{ tab }}
        </button>
      </div>
    </div>
    <div v-if="!filteredOrders.length" class="orders-empty">
      <div class="empty-icon">📦</div>
      <p class="empty-title">No orders yet</p>
      <p class="empty-sub">Orders placed will appear here.</p>
      <button class="btn-primary" @click="$router.push('/')">
        <span class="btn-text">Start Shopping</span>
        <div class="btn-circle">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </div>
      </button>
    </div>

    <div v-else class="orders-table-wrap">
      <table class="orders-table" aria-label="Orders list">
        <thead>
          <tr>
            <th></th>
            <th>Items</th>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in filteredOrders"
            :key="order.id"
            class="order-row"
          >
            <td data-label="Select">
              <label class="checkbox-wrap">
                <input
                  type="checkbox"
                  :value="order.id"
                  v-model="selectedOrders"
                />
              </label>
            </td>

            <td data-label="Items">
              <div v-if="order.items && order.items.length" class="order-items-list">
                <div v-for="item in order.items" :key="item.id" class="order-item-row">
                  <div class="order-item-img">
                    <img :src="item.thumbnail" :alt="item.title" />
                  </div>
                  <div class="order-item-info">
                    <span class="order-item-title">{{ item.title }}</span>
                    <span class="order-item-qty">× {{ item.quantity }}</span>
                  </div>
                </div>
              </div>
              <span v-else class="no-items">—</span>
            </td>

            <td data-label="Order ID">
              <span class="order-id">#{{ String(order.id).slice(0, 8) }}…</span>
            </td>
            <td data-label="Date">
              <span class="order-date">{{ order.date }}</span>
            </td>
            <td data-label="Total">
              <span class="order-price">${{ Number(order.total).toFixed(2) }}</span>
            </td>
            <td data-label="Status">
              <span class="status-badge" :class="order.status.toLowerCase()">
                {{ order.status }}
              </span>
            </td>

            <td data-label="Action">
              <button
                class="cancel-btn"
                :disabled="!selectedOrders.includes(order.id)"
                @click="cancelOrder(order.id)"
              >
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'OrdenesID',

  setup() {
    const store = useCartStore()
    return { store }
  },

  data() {
    return {
      searchQuery: "",
      selectedTab: "Completed",
      tabs: ["Completed", "Processing", "Cancelled"],
      selectedOrders: []
    }
  },

  computed: {
    orders() {
      return Array.isArray(this.store.orders) ? this.store.orders : []
    },
    filteredOrders() {
      return this.orders.filter(order => {
        if (!order || !order.id) return false
        if (this.selectedTab === "Completed" && order.status !== "Completed") return false
        if (this.selectedTab === "Processing" && order.status !== "Processing") return false
        if (this.selectedTab === "Cancelled" && order.status !== "Cancelled") return false
        if (this.searchQuery) {
          const q = this.searchQuery.toLowerCase()
          return (
            String(order.id).includes(q) ||
            (order.date && order.date.toLowerCase().includes(q)) ||
            String(order.total).includes(q)
          )
        }
        return true
      })
    }
  },

  methods: {
    cancelOrder(id) {
      if (!id) return
      const order = this.store.orders.find(o => o.id === id)
      if (!order) return
      order.status = "Cancelled"
      this.store.orders = [...this.store.orders]
      localStorage.setItem("orders", JSON.stringify(this.store.orders))
      this.selectedOrders = this.selectedOrders.filter(o => o !== id)
      this.selectedTab = "Cancelled"
    },
    goToCheckout() {
      if (!this.selectedOrders.length) return
      const selected = this.store.orders.filter(o => this.selectedOrders.includes(o.id))
      this.store.setCheckoutOrders(selected)
      this.$router.push('/orders/checkout')
    }
  }
}
</script>

<style>

.orders-page {
  max-width: 1100px;
  width: 100%;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

.orders-header {
  margin-bottom: 48px;
}
.section-mini {
  font-size: 11px;
  letter-spacing: 3px;
  color: #888;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 10px;
}
.orders-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #050505;
  margin: 0;
  line-height: 1;
}

.orders-controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.orders-search-wrap {
  position: relative;
  max-width: 440px;
}
.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  pointer-events: none;
}
.orders-search {
  width: 100%;
  background: #F9F9FB;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 999px;
  padding: 12px 20px 12px 44px;
  font-size: 14px;
  color: #050505;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}
.orders-search::placeholder { color: #bbb; }
.orders-search:focus {
  border-color: rgba(0,0,0,0.15);
  box-shadow: 0 0 0 3px rgba(5,5,5,0.04);
}

.orders-tabs {
  display: flex;
  gap: 4px;
  background: #F9F9FB;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 999px;
  padding: 4px;
  width: fit-content;
}
.orders-tab {
  background: transparent;
  border: none;
  font-size: 13px;
  font-weight: 500;
  color: #888;
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 999px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}
.orders-tab:hover { color: #050505; }
.orders-tab.active {
  background: #050505;
  color: #fff;
  font-weight: 600;
}

.orders-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 40px;
  border: 1px dashed rgba(0,0,0,0.1);
  border-radius: 24px;
  background: #F9F9FB;
  text-align: center;
  gap: 10px;
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

.btn-primary {
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  background: #050505;
  color: #fff;
  border: none;
  padding: 12px 12px 12px 28px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-primary:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}
.btn-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #fff;
  color: #050505;
  border-radius: 50%;
  flex-shrink: 0;
  transition: transform 0.4s ease;
}
.btn-primary:hover .btn-circle { transform: translateX(4px); }

.orders-table-wrap {
  overflow-x: auto;
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.05);
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
}

.orders-table thead tr {
  border-bottom: 1px solid rgba(0,0,0,0.05);
}
.orders-table th {
  padding: 16px 20px;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #aaa;
  font-weight: 600;
  text-align: left;
  background: #fff;
}

.order-row {
  border-bottom: 1px solid rgba(0,0,0,0.04);
  transition: background 0.2s ease;
}
.order-row:last-child { border-bottom: none; }
.order-row:hover { background: #fafafa; }

.orders-table td {
  padding: 20px;
  text-align: left;
  vertical-align: middle;
  font-size: 14px;
  color: #050505;
}

.checkbox-wrap {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}
.checkbox-wrap input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 1.5px solid rgba(0,0,0,0.15);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #fff;
}
.checkbox-wrap input[type="checkbox"]:checked {
  background: #050505;
  border-color: #050505;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.5 4.5l-7 7-3-3'  stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
  background-size: 12px;
  background-repeat: no-repeat;
  background-position: center;
}

.order-items-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.order-item-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.order-item-img {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #F9F9FB;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  flex-shrink: 0;
  border: 1px solid rgba(0,0,0,0.04);
  overflow: hidden;
}
.order-item-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.order-item-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.order-item-title {
  font-size: 13px;
  font-weight: 500;
  color: #050505;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}
.order-item-qty {
  font-size: 12px;
  color: #aaa;
  font-weight: 400;
}
.no-items { color: #ccc; }

.order-id {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 12px;
  color: #666;
  background: #F9F9FB;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.02em;
}

.order-date {
  font-size: 13px;
  color: #555;
}
.order-price {
  font-size: 15px;
  font-weight: 600;
  color: #050505;
  letter-spacing: -0.02em;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 999px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
}
.status-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.status-badge.completed {
  background: rgba(5, 5, 5, 0.06);
  color: #050505;
  transform: translateX(-14px);
}
.status-badge.completed::before { background: #050505; }
.status-badge.processing {
  background: rgba(245, 158, 11, 0.1);
  color: #b45309;
}
.status-badge.processing::before { background: #f59e0b; }
.status-badge.cancelled {
  background: rgba(239, 68, 68, 0.08);
  color: #b91c1c;
}
.status-badge.cancelled::before { background: #ef4444; }

.cancel-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1.5px solid rgba(0,0,0,0.12);
  color: #555;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}
.cancel-btn:hover:not(:disabled) {
  background: #050505;
  border-color: #050505;
  color: #fff;
  transform: translateY(-1px);
}
.cancel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .orders-controls {
    gap: 16px;
  }
  .orders-tabs {
    width: 100%;
    justify-content: stretch;
  }
  .orders-tab {
    flex: 1;
    text-align: center;
    padding: 8px 12px;
    font-size: 12px;
  }
  .orders-table-wrap {
    border: none;
    border-radius: 0;
    overflow: visible;
  }
  .orders-table { background: transparent; border-radius: 0; }
  .orders-table thead { display: none; }
  .orders-table tbody { display: flex; flex-direction: column; gap: 12px; }
  .order-row {
    display: flex;
    flex-direction: column;
    gap: 0;
    background: #fff;
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 20px;
    overflow: hidden;
    padding: 0;
  }
  .order-row:hover { background: #fff; }
  .orders-table td {
    display: flex;
    align-items: flex-start;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(0,0,0,0.04);
    font-size: 13px;
    gap: 12px;
  }
  .orders-table td:last-child { border-bottom: none; }
  .orders-table td::before {
    content: attr(data-label);
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #aaa;
    font-weight: 600;
    min-width: 64px;
    flex-shrink: 0;
    padding-top: 2px;
  }
  .order-item-title { max-width: 160px; }
  .cancel-btn { width: 100%; }
  .orders-search-wrap { max-width: 100%; }
}

@media (max-width: 480px) {
  .orders-title { font-size: 2rem; }
}

@media (prefers-reduced-motion: reduce) {
  .orders-tab,
  .orders-search,
  .cancel-btn,
  .btn-primary,
  .order-row,
  .btn-circle {
    transition: none !important;
    transform: none !important;
    animation: none !important;
  }
}
</style>
