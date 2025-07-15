<template>
  <BannerVue />
  <ProductList />
  <ProductCollections />
  <BrandsVue />
  <Bannerfooter />


</template>

<script>

import ProductList from './components/ProductList.vue';
import ProductCollections from './components/CollectionsVue.vue'
import BrandsVue from './components/BrandsVue.vue';
import BannerVue from './components/BannerVue.vue';
import Bannerfooter from './components/BannerFooter.vue';


export default {
  name: 'App',
  components: {
    ProductList,
    ProductCollections,
    BrandsVue,
    BannerVue,
    Bannerfooter
  }
}
</script>

<style>


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
  margin-top: 60px;
}
h1{
  background-color: var(--color-primario);
  font-family: "Janna LT";
  font-weight: 700;
}
</style>
