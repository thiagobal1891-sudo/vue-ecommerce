<template>
      <div>
    <CheckoutVue v-if="ver === 1" />
    <SidebarVue v-if="ver === 2" />
  </div>
</template>
<script>


import CheckoutVue from '@/components/CheckoutVue.vue';
import SidebarVue from '@/components/SidebarVue.vue';

export default {
  name: 'CheckoutPage',
  components: {
    CheckoutVue,
    SidebarVue
  },
  data(){
    return{
      ver: 1
    }
  }
}
</script>

<style>

</style>