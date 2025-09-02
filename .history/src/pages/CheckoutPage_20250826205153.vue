<template>
      <div>
    <CheckoutVue v-if="ver === 1" />
    <PersonalInfo v-if="ver === 2" />   
    <SidebarVue />
  </div>
</template>
<script>


import CheckoutVue from '@/components/CheckoutVue.vue';
import PersonalInfo from '@/components/PersonalInfo.vue';
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