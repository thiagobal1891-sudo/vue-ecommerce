<template>
  <div class="grid_contenido">
    <!-- Sidebar a la izquierda -->
    <SidebarVue @changePage="page = $event" class="layout" />

    <!-- Contenido dinámico -->
    <div class="contenido_orden">
      <PersonalInfo v-if="page === 1" />
      <OrdenesID v-else-if="page === 2" />
      <CheckoutVue v-else-if="page === 3" />
      <!-- más componentes -->
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
.grid_contenido {
  display: grid;
  gap: 60px;
  grid-template-columns: 1fr;
  grid-template-areas: 
    "layout"
    "contenido_orden";
}

.layout {
  grid-area: layout;
}

.contenido_orden {
  grid-area: contenido_orden;
}

@media (min-width: 600px) {
  .grid_contenido {
    grid-template-columns: 200px auto;
    grid-template-areas: "layout contenido_orden";
  }
}

@media (min-width: 900px) {
  .grid_contenido {
    grid-template-columns: 250px auto;
  }
}


</style>
