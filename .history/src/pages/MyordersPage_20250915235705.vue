<template>
  <div class="grid_contenido">
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

<style>

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.grid_contenido{
  display: grid;
  gap: 5px;
  grid-template-areas: 
  "sidebar"
  "contenido_orden";
}


.sidebar {
  grid-area: sidebar;
}

/* Contenido a la derecha */
.contenido_orden {
  grid-area: contenido_orden;
}

@media (min-width: 600px){
  grid-template-columns: 200px;
grid-template: 
"sidebar contenido_orden" auto
;
  }
</style>
