<template>
  <div class="app">
    <NavegadorVue />
    <BannerVue />
    <ProductList />
    <ProductCollections />
    <BrandsVue />
    <BannerFooter />
    <FooterVue />
  </div>

  

</template>

<script>

import ProductList from './components/ProductList.vue';
import NavegadorVue from './components/NavegadorVue.vue';
import ProductCollections from './components/CollectionsVue.vue'
import BrandsVue from './components/BrandsVue.vue';
import BannerVue from './components/BannerVue.vue';
import FooterVue from './FooterVue.vue';
import BannerFooter from './components/BannerFooter.vue';


export default {
  name: 'App',
  components: {
    ProductList,
    NavegadorVue,
    ProductCollections,
    BrandsVue,
    BannerVue,
    FooterVue,
    BannerFooter
  }
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
}
@font-face {
  font-family: Janna LT;
  src: url("./assets/janna-lt-regular.ttf");
  font-weight: bold;
}
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.root{
  --color-primario: #E61620
}

#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1{
  background-color: var(--color-primario);
  font-family: "Janna LT";
  font-weight: 700;
}

* {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: 'Arial', sans-serif;
      padding: 20px;
      background-color: rgb(203, 203, 203);
    }
    .app{
      max-width: 1280px;
      width: 100%;
      margin: auto;
      background-color: white;
    }
</style>
