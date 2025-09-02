<template>
  <div class="sidebar">
    <div class="buttons">
      <button @click="ver = 0">Personal Information</button>
      <button @click="ver = 1">Refer and Earn</button>
      <button @click="ver = 2">My Orders</button>
      <button @click="ver = 3">My Whilist</button>
      <button @click="ver = 4">My Reviews</button>
      <button @click="ver = 5">My Address Book</button>
      <button @click="ver = 6">My Saved Cards</button>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'SidebarVue',
  data() {
    return {
      ver: 0,         // Para controlar la vista seleccionada
      productos: []   // Lo dejas si lo vas a usar
    };
  }
}
</script>

<style scoped>  
.sidebar {
  width: 286px;
  background-color: #626262;
  padding: 20px;
}

.buttons {
  display: flex;
  flex-direction: column; 
  width: 283px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #888888;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
}

button:hover {
  background-color: #555555;
}
</style>
