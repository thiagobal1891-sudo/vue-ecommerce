import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    orders: JSON.parse(localStorage.getItem('orders')) || [],
    currentPage: 1,

    selectedOrdersCheckout: []
  }),

  getters: {
    totalPrice: (state) =>
      state.cart.reduce((acc, p) => acc + p.price * p.quantity, 0),

    totalItems: (state) =>
      state.cart.reduce((acc, p) => acc + p.quantity, 0),

    cantidadPorId: (state) => (id) => {
      const item = state.cart.find(p => p.id === Number(id))
      return item ? item.quantity : 0
    }
  },

  actions: {
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },

    saveOrders() {
      localStorage.setItem('orders', JSON.stringify(this.orders))
    },

    setPage(page) {
      this.currentPage = page
    },

    setCheckoutOrders(orders) {
      this.selectedOrdersCheckout = orders
    },

    addToCart(product) {
      const existing = this.cart.find(p => p.id === product.id)

      if (!existing) {
        this.cart.push({
          ...product,
          quantity: product.quantity || 1
        })
      } else {
        existing.quantity += product.quantity || 1
      }

      this.saveCart()
    },

    removeFromCart(id) {
      this.cart = this.cart.filter(p => p.id !== id)
      this.saveCart()
    },

    updateQuantity(id, quantity) {
      const product = this.cart.find(p => p.id === id)

      if (product) {
        product.quantity = quantity < 1 ? 1 : quantity
      }

      this.saveCart()
    },

    checkout() {
      if (!this.cart.length) return

      const newOrder = {
        id: crypto.randomUUID(),
        date: new Date().toLocaleDateString(),

        items: this.cart.map(p => ({
          id: p.id,
          title: p.title,
          price: p.price,
          quantity: p.quantity,
          thumbnail: p.thumbnail
        })),

        total: this.cart.reduce((acc, p) => acc + p.price * p.quantity, 0),
        status: "Completed"
      }

      this.orders.unshift(newOrder)
      this.saveOrders()

      this.cart = []
      this.saveCart()
    }
  }
})