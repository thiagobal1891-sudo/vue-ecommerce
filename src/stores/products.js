
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false
  }),

  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(p => p.id === id)
    }
  },

  actions: {
    async fetchProducts() {
      if (this.products.length > 0) return
      
      this.loading = true
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=6')
        this.products = response.data.products
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
