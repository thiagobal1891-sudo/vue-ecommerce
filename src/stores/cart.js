// stores/counter.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cart: [
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 50.95,
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "quantity": 1
  },
  {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "quantity": 5
  
  }
],
      precio: 50
    }
  },

  getters: {
    masIva() {
      return this.precio * 1.22
    },
    iva() {
      return this.precio * 0.22
    },
    quantity() {
      return this.cart.length
    },
/*     total() {

      let suma = 0;
        for (let i = 0; i < this.cart.length; i++) {
          suma += this.cart[i].price;
        }
        return suma
    }, */

    
    cantidadPorId() {
      return (id) => {
        const item = this.cart.find(p => p.id === id)
        return item ? item.cantidad : 0
      }
    }
  },

  actions: {
    agregar(producto) {
      const existente = this.cart.find(p => p.id === producto.id)
      if (!existente) {
        this.cart.push({
          ...producto,
          cantidad: producto.cantidad || 1
        })
      } else {
        // Opcional: podrías sumar si ya existe
        existente.cantidad += producto.cantidad || 1
      }
    },

    quitar(id) {
      this.cart = this.cart.filter(p => p.id !== id)
    },

    modificarCantidad(id, nuevaCantidad) {
      const producto = this.cart.find(p => p.id === id)
      if (producto) {
        producto.cantidad = nuevaCantidad
      }
    }
  }
})
/*

para usar llamamos en el componente o page el store

      import { useCartStore } from '@/stores/cart'

Y lo guardamos en una variable

        data() {
    return {
          cart: useCartStore()
        };
      },
*/