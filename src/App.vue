<template>
  <div class="app">
    
    <NavegadorVue v-if="$route.path !== '/thiago'" />
    
    <router-view />

    
    <FooterVue v-if="$route.path !== '/thiago'" />
  </div>
</template>
<script>

import FooterVue from './components/FooterVue.vue';
import NavegadorVue from './components/NavegadorVue.vue';



export default {
  name: 'App',
  components: {
    FooterVue,
    NavegadorVue
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*,
*::before,
*::after{
  box-sizing:border-box;
}
:root {
  --color-primary: #22c55e;
  --max-width: 1200px;
}

.app {
  width: 100%;
  min-height: 100vh;
  background: white;
}
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: #f7f7f7;
}

#app,
.app {
  overflow-x: hidden;
  width: 100%;
}
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}
section {
  position: relative;
}
h1, h2, h3 {
  letter-spacing: -0.3px;
}
a {
  text-decoration: none;
  color: inherit;
}
img {
  max-width: 100%;
  display: block;
}
@media (max-width: 600px) {
  body {
    overflow-x: hidden;
  }
}
</style>
