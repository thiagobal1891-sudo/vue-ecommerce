<template>
  <div class="ordenes">
    <h1>Mis Órdenes</h1>

    <SidebarVue @changePage="page = $event" />


    <div class="contenido">
      <PersonalInfo v-if="page === 1" />
      <CheckoutVue v-else-if="page === 2" />
    </div>
  </div>
</template>

<script>
import SidebarVue from "@/components/SidebarVue.vue"
import PersonalInfo from "@/components/PersonalInfo.vue"
import CheckoutVue from "@/components/CheckoutVue.vue"

export default {
  components: { SidebarVue, PersonalInfo, CheckoutVue },
  data() {
    return {
      page: 1 // valor inicial
    }
  }
}
</script>
