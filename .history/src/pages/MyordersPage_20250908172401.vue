<template>
    <div class="contenido">
    <SidebarVue @changePage="page = $event" />



      <PersonalInfo v-if="page === 1" />
      <CheckoutVue v-else-if="page === 2" />
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
