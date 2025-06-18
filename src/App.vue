<template>
  <ProbandoVue probando = "estoy probando herencia" numero = "5"/>


</template>

<script>

import ProbandoVue from './components/ProbandoVue.vue'

export default {
  name: 'App',
  components: {

    ProbandoVue
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
