<template>
  <nav class="menu">
    <button
      v-for="item in menu"
      :key="item.id"
      :class="['menu-item', { active: $route.path === item.path }]"
      @click="goTo(item)">
      <span class="label">{{ item.label }}</span>
    </button>
  </nav>
</template>
<script>
import { useRouter } from 'vue-router'

export default {
  name: 'SidebarVue',

  data() {
    return {
      isDesktop: window.innerWidth >= 900
    }
  },

  mounted() {
    window.addEventListener("resize", this.handleResize)
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize)
  },

  setup() {
    const router = useRouter()

    const menu = [
      { id: 1, label: 'Personal Information', path: '/orders/personal' },
      { id: 2, label: 'My Orders', path: '/orders/history' },
      { id: 3, label: 'Checkout', path: '/orders/checkout' },
      { id: 4, label: 'My Wishlist' },
      { id: 5, label: 'My Reviews' },
      { id: 6, label: 'My Address Book' },
      { id: 7, label: 'My Saved Cards' }
    ]

    const goTo = (item) => {
      if (item.path) {
        router.push(item.path)
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('close-sidebar'))
        }, 100)
      }
    }

    return { menu, goTo }
  },

  methods: {
    handleResize() {
      this.isDesktop = window.innerWidth >= 900
    },

    closeSidebar() {
      console.log('Cerrando sidebar - intentando múltiples métodos')
      
      this.$emit('close-sidebar')
      
      if (this.$root && this.$root.$children) {
        const parent = this.$root.$children.find(child => child.$options.name === 'MyordersPage')
        if (parent && parent.toggleSidebar) {
          console.log('Encontrado padre por nombre, llamando toggleSidebar')
          parent.toggleSidebar()
        }
      }
      
      const sidebarElement = document.querySelector('.orders-sidebar.open')
      if (sidebarElement) {
        sidebarElement.classList.remove('open')
      }
      
      window.dispatchEvent(new CustomEvent('close-sidebar'))
    }
  }
}
</script>
<style>
.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.5);
  background: transparent;
  border: none;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  position: relative;
}

.menu-item:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(4px);
}

.menu-item.active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  font-weight: 600;
}

.menu-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  width: 3px;
  height: 16px;
  background: #ffffff;
  border-radius: 0 4px 4px 0;
}

.label {
  font-size: 14px;
  color: inherit;
  transition: color 0.3s ease;
}

@media (max-width: 900px) {
  .menu {
    gap: 6px;
  }
  .menu-item {
    padding: 14px 16px;
    font-size: 15px;
  }
  .label {
    font-size: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-item {
    transition: none !important;
    transform: none !important;
  }
}
</style>