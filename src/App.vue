<template>
  <ProductList />



</template>

<script>

import ProductList from './components/ProductList.vue';

export default {
  name: 'App',
  components: {
    ProductList
  }
}
</script>

<style>
@font-face {
  font-family: Janna LT;
  src: url("./assets/janna-lt-regular.ttf");
  font-weight: bold;
}

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
