<template>
<MyOrders />
<SidebarVue />
</template>

<script>

import MyOrders from '@/components/MyOrders.vue';
import SidebarVue from '@/components/SidebarVue.vue';
export default {
  name: 'MyOrdersPage',
  components: {
  MyOrders
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