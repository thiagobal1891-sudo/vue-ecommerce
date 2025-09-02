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
      ver: 0
    };
  }
}
</script>

<style scoped>  
.sidebar {
  width: 286px;
  background: #F1F1F1;
  border-radius: 8px;
}

.buttons {
  display: flex;
  flex-direction: column; 
  width: 283px;
  height: 100%;
}

button {
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  color: #13101E;
}

</style>




