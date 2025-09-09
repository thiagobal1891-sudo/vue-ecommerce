<template>
  <div class="contenedor">
    <div class="orden-title">Order#874522648</div>
    <div class="sidebar">
      <div class="buttons">
        <button :class="{ active: ver === 1 }" @click="cambiarPagina(1)">Personal Information</button>
        <button :class="{ active: ver === 2 }" @click="cambiarPagina(2)">Refer and Earn</button>
        <button :class="{ active: ver === 3 }" @click="cambiarPagina(3)">My Orders</button>
        <button :class="{ active: ver === 4 }" @click="cambiarPagina(4)">My Wishlist</button>
        <button :class="{ active: ver === 5 }" @click="cambiarPagina(5)">My Reviews</button>
        <button :class="{ active: ver === 6 }" @click="cambiarPagina(6)">My Address Book</button>
        <button :class="{ active: ver === 7 }" @click="cambiarPagina(7)">My Saved Cards</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarVue',
  data() {
    return { ver: 0 }
  },
  methods: {
    cambiarPagina(num) {
      this.ver = num - 1
      this.$emit("changePage", num)
    }
  }
}
</script>

<style scoped>
.contenedor {
  display: flex;
  flex-direction: column;
}

.orden-title {
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 24px;
  padding: 10px 20px;
}

.sidebar {
  width: 100%;
}

.buttons {
  display: flex;
  flex-direction: column; 
  width: 100%;
}

.buttons button {
  display: block;
  width: 100%;
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  color: #13101E;
  background: transparent;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
}

.buttons button:hover {
  background-color: #eaeaea;
  color: #1B4B66;
}

.buttons button::after {
  content: "›";
  font-size: 16px;
  color: inherit;
}

.buttons button.active {
  color: #1B4B66;
  background-color: #e0f7fa;
  border-left: 3px solid #1B4B66;
}
</style>
