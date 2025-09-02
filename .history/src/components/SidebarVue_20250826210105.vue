<template>
  <div class="sidebar">
  <div class="buttons">
  <button @click=" ver=0">Personal Information</button>
  <button @click=" ver=1">Refer and Earn</button>
  <button @click=" ver=2">My Orders</button>
  <button @click=" ver=3">My Whilist</button>
  <button @click=" ver=4">My Reviews</button>
  <button @click=" ver=5">My Address Book</button>
  <button @click=" ver=6">My Saved Cards</button>
  </div>
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
   display: flex;
  flex-direction: column;
    width: 283px;
    background-color: #626262;
    padding: 20px;
  }
  
.Buttons{

    width: 283px;
    background-color: #626262;
    padding: 20px;
  }
</style>


