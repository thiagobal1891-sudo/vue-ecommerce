// stores/counter.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cart: [
        

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
    console.log("entre")
      return (id) => {
        const item = this.cart.find(p => p.id === Number(id))
        console.log(item)
        return item ? item.quantity : 50
      }
    }
  },

  actions: {
    agregar(producto) {
      console.log("entre")
      const existente = this.cart.find(p => p.id === producto.id)
      if (!existente) {
        this.cart.push({
          ...producto,
          quantity: producto.quantity || 1
        })
      } else {
        // Opcional: podrías sumar si ya existe
        existente.quantity = producto.quantity || 1
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