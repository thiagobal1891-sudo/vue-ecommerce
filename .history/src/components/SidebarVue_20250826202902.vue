<template>
  <div class="sidebar">
  <button>Personal Information</button>
  <button>Refer and Earn</button>
  <button>My Orders</button>
  <button>My Whilist</button>
  <button>My Reviews</button>
  <button>My Address Book</button>
  <button>My Saved Cards</button>
  </div> 
</template>

<script>

export default {
  name: 'SidebarVue',
  components: {

  },
  data() {
    return {
      productos: []
    }
  }
}
</script>

<style>
  .sidebar {
    height: 100%;
    width: 250px;
    background-color: #111;
    padding: 20px;
  }
</style>