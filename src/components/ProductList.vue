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
            <img :src="product.image" alt="">    
            <h3>{{product.title}}</h3>
            <p>{{product.description }}</p>
            <h4>{{product.price }}</h4>
           </div>
        </div>
    </div>
  
</template>

<script>


export default {
  name: 'ProductList',
  components: {

  },
  data(){
    return{
    productos:[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  },
  {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "rating": {
      "rate": 4.1,
      "count": 259
    }
  },
  {
    "id": 3,
    "title": "Mens Cotton Jacket",
    "price": 55.99,
    "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    "rating": {
      "rate": 4.7,
      "count": 500
    }
  },
  {
    "id": 4,
    "title": "Mens Casual Slim Fit",
    "price": 15.99,
    "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    "rating": {
      "rate": 2.1,
      "count": 430
    }
  }
]
    }
  }
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

.ProductList__products__card img{
    width: 100%;
    max-height: 284px;
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
