<template>
  <div class="ordenes">
    <div class="layout">
      <!-- Sidebar a la izquierda -->
      <SidebarVue @changePage="page = $event" />

      <!-- Contenido a la derecha -->
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

/* Sidebar fijo a la izquierda */
.sidebar {
  width: 250px;
  border-right: 1px solid #ccc;
}

/* Contenido ocupa el resto */
.contenido {
  flex: 1;
  padding: 20px;
}
</style>
