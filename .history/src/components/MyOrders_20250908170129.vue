<template>
  <div class="ordenes">
    <h1>Mis Órdenes</h1>

    <Sidebar @changePage="page = $event" />


    <div class="contenido">
      <ItemsOrdered v-if="page === 1" />
      <Invoices v-else-if="page === 2" />
      <OrderShipment v-else-if="page === 3" />
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue"
import ItemsOrdered from "./ItemsOrdered.vue"
import Invoices from "./Invoices.vue"
import OrderShipment from "./OrderShipment.vue"

export default {
  components: { Sidebar, ItemsOrdered, Invoices, OrderShipment },
  data() {
    return {
      page: 1 // valor inicial
    }
  }
}
</script>
