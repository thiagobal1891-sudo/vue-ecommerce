<template>
  <div class="ordenes">
    <h1>Mis Órdenes</h1>

    <Sidebar @changePage="page = $event" />


    <div class="contenido">
      <PersonalInfo v-if="page === 1" />
      <CheckoutVue v-else-if="page === 2" />
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue"
import PersonalInfo from "./PersonalInfo.vue"
import CheckoutVue from "./CheckoutVue.vue"

export default {
  components: { Sidebar, PersonalInfo, CheckoutVue },
  data() {
    return {
      page: 1 // valor inicial
    }
  }
}
</script>
