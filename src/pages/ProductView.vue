<template>
    <ProductPageVue />
    <ProductDescriptionVue />
</template>
<script>

import ProductPageVue from '@/components/ProductPageVue.vue';
import ProductDescriptionVue from '@/components/ProductDescriptionVue.vue'
export default {
  name: 'ProductView',
  components: {
    ProductPageVue,
    ProductDescriptionVue
  },
  data(){
    return{

    }
  }
}
</script>

<style>
.text-header {
  display: none;
}
</style>
