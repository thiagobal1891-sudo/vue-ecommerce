
<template>
  <div class="contenedor">
    <div class="orden-title">Order#874522648</div>
    <div class="sidebar">
      <div class="buttons">
        <button :class="{ active: ver === 0 }" @click="ver = 0">Personal Information</button>
        <button :class="{ active: ver === 1 }" @click="ver = 1">Refer and Earn</button>
        <button :class="{ active: ver === 2 }" @click="ver = 2">My Orders</button>
        <button :class="{ active: ver === 3 }" @click="ver = 3">My Wishlist</button>
        <button :class="{ active: ver === 4 }" @click="ver = 4">My Reviews</button>
        <button :class="{ active: ver === 5 }" @click="ver = 5">My Address Book</button>
        <button :class="{ active: ver === 6 }" @click="ver = 6">My Saved Cards</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarVue',
  data() {
    return {
      ver: 0
    };
  }
}
</script>

<style>
.contenedor {
  display: flex;
}

.orden-title {
  text-align: left;
  width: 309px;
  height: 44px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 34px;
}

.sidebar {
  width: 286px;
  background: #F1F1F1;
  border-radius: 8px;
}

.buttons {
  display: flex;
  flex-direction: row;
}

button {
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  color: #13101E;
  background: transparent;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button:hover {
  background-color: #eaeaea;
  color: #1B4B66;
}

button::after {
  content: "›";
  font-size: 16px;
  color: inherit;
}

button.active {
  color: #1B4B66;
  background-color: #e0f7fa;
  border-left: 3px solid #1B4B66;
}
</style>
