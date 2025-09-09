<template>
  <div class="ordenes">
    <div class="layout">
      <SidebarVue @changePage="page = $event" />
      <div class="contenido">
        <PersonalInfo v-if="page === 1" />
        <CheckoutVue v-else-if="page === 2" />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarVue from "../components/SidebarVue.vue"
import PersonalInfo from "../components/PersonalInfo.vue"
import CheckoutVue from "../components/CheckoutVue.vue"


export default {
  components: { SidebarVue, PersonalInfo, CheckoutVue },
  data() {
    return {
      page: 1
    }
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: row; /* uno al lado del otro */
}

.contenido {
  flex: 1;
  padding: 20px;
}
</style>
