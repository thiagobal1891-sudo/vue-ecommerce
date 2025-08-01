<template>
    <BannerVue /> 
    <ProductList />
    <CollectionsVue />
    <BrandsVue />
    <BannerFooter />
</template>
<script>

import BannerVue from '@/components/BannerVue.vue';
import ProductList from '@/components/ProductList.vue';
import CollectionsVue from '@/components/CollectionsVue.vue';
import BannerFooter from '@/components/BannerFooter.vue';
import BrandsVue from '@/components/BrandsVue.vue';

export default {
  name: 'HomePage',
  components: {
    BannerVue,
    ProductList,
    CollectionsVue,
    BrandsVue,
    BannerFooter
  },
  data(){
    return{

    }
  }
}
</script>

<style>

</style>
