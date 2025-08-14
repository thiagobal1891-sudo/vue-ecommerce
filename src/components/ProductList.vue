<template>
    <div class="ProductList">
        <div class="ProductList__title">
            <h2>
                New Arrivals
            </h2>
            <button>
                View All >
            </button>
        </div>
        <div class="ProductList__products">
           <div  class="ProductList__products__card" v-for="product of productos" :key="product.id">
            <router-link :to="'/ProductView/' + product.id">
              <img :src="product.images[0]" alt="" class="ProductList__products__card__img">    
              <h3>{{product.title}}</h3>
              <p>{{product.description }}</p>
              <h4>{{product.price }}</h4>
            </router-link>

           </div>
        </div>
    </div>
  
</template>

<script>

import axios from 'axios';

export default {
  name: 'ProductList',
  components: {

  },
  data(){
    return{
    productos:[]
    }
  },
  methods: {
    getProducts() {
      axios
        .get(`https://dummyjson.com/products?limit=6`)
        .then((response) => {
          this.productos = response.data.products;
        })
        .catch((error) => {
          console.log(error);
        });
  }
  },
  mounted() {
    this.getProducts();
  },


}
</script>

<style>
.ProductList{

}
.ProductList__title{
    display: flex;
    justify-content: space-between;
}

.ProductList__title h2{
    
}

.ProductList__title button{
    
}
.ProductList__products{
    display: flex;
    gap: 40px;
    justify-content: space-between;
    flex-wrap: wrap;
}

.ProductList__products__card {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 284px;
}

.ProductList__products__card__img{
    width: 100%;
    aspect-ratio: 1/1;
}

.ProductList__products__card h3{
    font-size: 16px;
    font-weight: 800;
    text-align: left;

}

.ProductList__products__card p{
    font-size: 14px;
    font-weight: 500;
    text-align: left;
        overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.ProductList__products__card h4{
    font-size: 16px;
    font-weight: 800;
    text-align: left;
}
</style>
