<template>
    <CheckoutVue />
    <SidebarVue />
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
    }
  }
}
</script>

<style>

</style>