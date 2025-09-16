<template>
  <div class="ordenes">
    <div class="layout">
      <!-- Sidebar a la izquierda -->
      <SidebarVue @changePage="page = $event" class="sidebar" />

      <!-- Contenido dinámico -->
      <div class="contenido_orden">
        <PersonalInfo v-if="page === 1" />
        <OrdenesID v-else-if="page === 2" />
        <CheckoutVue v-else-if="page === 3" />
        <!-- podés seguir agregando más -->
      </div>
    </div>
  </div>
</template>

<script>
import SidebarVue from "../components/SidebarVue.vue"
import PersonalInfo from "../components/PersonalInfo.vue"
import CheckoutVue from "../components/CheckoutVue.vue"
import OrdenesID from "@/components/OrdenesID.vue"

export default {
  components: { SidebarVue, PersonalInfo, CheckoutVue, OrdenesID },
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
  flex-direction: row; /* lado a lado */
  min-height: 100vh;  /* ocupa toda la altura */
}

/* Sidebar fijo a la izquierda */
.sidebar {
  width: 100%;
  flex-shrink: 0; /* que no se achique */
  border-right: 1px solid #ddd;
  background: #F1F1F1;
  padding: 20px 0;
}

/* Contenido a la derecha */
.contenido_orden {
  flex: 1;
  padding: 20px;
  width: 100%;
}
</style>
