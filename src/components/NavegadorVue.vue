<template>
  <header class="header">
    <div class="nav-wrapper">

      <div class="nav-left">
        <router-link to="/" class="logo" @click="goHome">
  <svg 
    width="160" 
    height="40" 
    viewBox="0 0 160 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0" y="4" width="32" height="32" rx="8" fill="#050505"/>
    
    <path d="M8 26V14L24 26V14" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

    <text 
      x="45" 
      y="26" 
      font-family="Inter, Arial, sans-serif" 
      font-size="18" 
      fill="#050505" 
      font-weight="600"
      letter-spacing="1"
    >
      NEXORA
    </text>
  </svg>
</router-link>

        <nav class="nav-links">
          <p @click="goToCategory('')">Categories</p>
          <p @click="goToCategory('mens-watches')">Watches</p>
          <p @click="goToCategory('skin-care')">Skincare</p>
          <p @click="goToCategory('kitchen-accessories')">Accesories</p>
          <p @click="goToCategory('mens-shirts')">Apparels</p>
        </nav>
      </div>

      <div class="nav-right">

<div class="search-container">
  <input
    class="search"
    type="text"
    v-model="busqueda"
    placeholder="Buscar producto..."
  />
</div>

<div class="nav-icons">
  <button class="icon-btn mobile-search-btn" @click="toggleSearch">
    <Search class="nav-icon" />
  </button>

  <router-link class="profile icon-btn" to="/orders/personal">
    <User class="nav-icon" />
  </router-link>

  <RouterLink class="icon-btn" to="/orders/history">
    <Heart class="nav-icon" />
  </RouterLink>

<router-link class="cart icon-btn" to="/cart">
  <ShoppingCart class="nav-icon" />

  <span v-if="cartStore.totalItems > 0">
    {{ cartStore.totalItems }}
  </span>
</router-link>
</div>

      </div>

    </div>

    <div class="mobile-search" :class="{ active: searchOpen }">
      <Search class="mobile-search-icon" />
      <input
        type="text"
        placeholder="Buscar productos..."
        v-model="busqueda"
      />
    </div>
  </header>
</template>
<script>
import { useCartStore } from "@/stores/cart";
import { ShoppingCart, User, Heart, Search } from "lucide-vue-next";

export default {
  name: "NavegadorVue",

  components: {
    ShoppingCart,
    User,
    Heart,
    Search
  },

  data() {
    return {
      busqueda: "",
      handleScroll: null,
      searchOpen: false
    };
  },

  computed: {
    cartStore() {
      return useCartStore();
    }
  },

  methods: {
    toggleSearch() {
      this.searchOpen = !this.searchOpen;
    },
    goToCategory(slug) {
      this.$router.push(`/category/${slug.toLowerCase()}`);
    },
  goHome() {
    if (this.$route.path !== "/") {
      this.$router.push("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 
  },


  mounted() {
    this.handleScroll = () => {
      if (window.scrollY > 30) {
        this.$el.classList.add("scrolled");
      } else {
        this.$el.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style>
.header {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header.scrolled {
  background: rgba(255,255,255,0.97);
  box-shadow: 0 8px 32px rgba(0,0,0,0.05);
}
.nav-wrapper {
  width: min(1300px, 100%);
  padding: 0 40px;
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.nav-left {
  display: flex;
  align-items: center;
  gap: 40px;
  flex: 1;
  min-width: 0;
}
.logo {
  display: flex;
  align-items: center;
}

.logo svg {
  height: 52px;   
  width: auto;
  transition: transform 0.3s ease;
}

.logo:hover svg {
  transform: scale(1.06);
}
.nav-links {
  display: flex;
  gap: 32px;
}
.nav-links p {
  position: relative;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: color 0.2s ease;
}
.nav-links p::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 0%;
  height: 2px;
  background: #050505;
  transition: width 0.3s ease;
}

.nav-links p:hover {
  color: #050505;
}
.nav-links p:hover::after {
  width: 100%;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.nav-icons {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-icon {
  width: 20px;
  height: 20px;
  stroke-width: 1.75;
  color: #050505;
  fill: none;              
  display: block;}

.icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
}

.icon-btn:hover {
  background: #f3f4f6;
  transform: translateY(-1px);
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 16px;
  background: #f3f4f6;
  border-radius: 999px;
  border: 1px solid transparent;
  flex: 1;
  min-width: 180px;
  max-width: 380px;
  transition: all 0.25s ease;
}
.search-container:focus-within {
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
}
.search-container svg {
  color: #666;
    width: 18px;
  height: 18px;
}
.search {
  width: 100%;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #050505;
}
.search::placeholder {
  color: #aaa;
}
.mobile-search {
  width: 100%;
  max-height: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 24px;
  background: white;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  transition: all 0.3s ease;
}
.mobile-search input {
  width: 100%;
  height: 44px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #050505;
}
.mobile-search.active {
  max-height: 70px;
  padding-bottom: 10px;
}
.cart {
  position: relative;
}
.cart span {
  position: absolute;
  top: -4px;
  right: -6px;
  background: #050505;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
}

.mobile-search-btn {
  display: none;
}
@media (max-width: 1200px) {
  .nav-links {
    gap: 20px;
  }
  .nav-links p {
    font-size: 13px;
  }
  .search-container {
    max-width: 240px;
  }
}
@media (max-width: 1024px) {
  .nav-links {
    display: none;
  }
  .search-container {
    max-width: 300px;
  }
}
@media (max-width: 900px) {
  .nav-wrapper {
    padding: 0 20px;
  }
  .search-container {
    display: none;
  }
  .mobile-search-btn {
    display: flex;
  }
}
</style>