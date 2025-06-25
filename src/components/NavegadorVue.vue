<template>
<header class="NavegadorVue">
<img src="./../assets/logo.png" alt="Icon">
<nav class="NavegadorVue__categories"> 
  <p>Handbags</p>
  <p>Watches</p> 
  <p>Skincare</p> 
  <p>Jewellery</p> 
  <p>Apparels</p> 
</nav>
</header>
</template>

<script>


export default {
  name: 'NavegadorVue',
  components: {

  },
  data(){
    return{
        
    }
  }
}
</script>
<style>
.NavegadorVue {
  display: flex;
  width: 100%;
  background-color: aqua;
}
.NavegadorVue img {
  /* logo */


width: 108px;

background-color: red;
}
.NavegadorVue__categories {
  display: flex;
  justify-content: space-around;
}
</style>