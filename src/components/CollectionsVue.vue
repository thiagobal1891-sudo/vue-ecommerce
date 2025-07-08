<template>
    <div class="ProductCollections">
        <div class="ProductCollections__title">
            <h2>
                Handpicked Collections
            </h2>
        </div>
        <div class="collections">
  <div class="imagen-con-texto">
    <img src="https://juleriaque.vtexassets.com/arquivos/ids/232175-800-800?v=638532096116930000&width=800&height=800&aspect=true" alt="Imagen 1">
    <p class="texto">Personal Care</p>
  </div>
  <div class="imagen-con-texto">
    <img src="https://bagallery.com/cdn/shop/products/Shoot41-vybe_0159__DSC1337.jpg?v=1742978529" alt="Imagen 2">
    <p class="texto">Handbags</p>
  </div>
  <div class="imagen-con-texto">
    <img src="https://image.made-in-china.com/202f0j00omViNlDckHzF/Trendy-Brand-Watches-Quartz-Watches-Summer-E-Commerce-Explosion-Watches-Promotional-Gifts-for-Women-Couple-Watches-ndash-M0920.webp" alt="Imagen 3">
    <p class="texto">Wrist Watches</p>
  </div>
  <div class="imagen-con-texto">
    <img src="https://waldos.com.mx/cdn/shop/files/21958293OVER_3.jpg?v=1699894014&width=1000" alt="Imagen 4">
    <p class="texto">Sun Glasses</p>
  </div>
</div>
        <div class="ProductCollections__products">
            <div  class="ProductCollections__products__card" v-for="product of productos" :key="product.id">
            <img :src="product.image" alt="">    
            <h3>{{product.title}}</h3>
            <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
            </div>
        </div>
    </div>
    <div class="marcas">
    <div class="marcasLogo"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1024px-Zara_Logo.svg.png" alt="ZARA"></div>
    <div class="marcasLogo"><img src="https://brandlogos.net/wp-content/uploads/2022/08/dolce__gabbana_logomark-logo_brandlogos.net_6c78j.png" alt="D&G"></div>
    <div class="marcasLogo"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/2560px-H%26M-Logo.svg.png" alt="H&M"></div>
    <div class="marcasLogo"><img src="https://1000marcas.net/wp-content/uploads/2019/12/Chanel-logo-5.png" alt="CHANEL"></div>
    <div class="marcasLogo"><img src="https://carsha.co/cdn/shop/collections/20592.png?v=1685102230" alt="PRADA"></div>
    <div class="marcasLogo"><img src="https://vivianamalls.com/wp-content/uploads/2023/08/BIBA_-Viviana-Mall-Thane-Mumbai.png" alt="BIBA"></div>
    </div>
</template>


<script>


export default {
  name: 'CollectionsVue',
  components: {

  },
  data(){
    return{
    productos:[]
    }
  }
}

</script>

<style>
.ProductCollections{
    width: 100vw;  
    margin: 0;
    background-color: #1B4B66;
    justify-content: center;
    padding: 0 0 3% 0; 

}
.ProductCollections__title{
    display: flex;
    justify-content: space-between;
}

.ProductCollections__title h2{
    font-size: 34px;
    font-weight: 600;
    width: 391px;
    height: 44px;
    text-align: left;
    color: #FFFFFF;
    font-family: 'Inter', sans-serif ;
    
}

.ProductList__title button{
    
}
.ProductCollections__products{
}

.ProductCollections__products__card {
}

.ProductCollections__products__card img{
}

.ProductCollections__products__card h3{
}

.ProductCollections__products__card p{
}

.ProductCollections__products__card h4{
}
.collections {
  display: flex;
  gap: 40px;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin: auto;
  padding: 0
}

.imagen-con-texto {
  position: relative;
  overflow: hidden;
  object-fit: cover;
  gap: 40px;
}

.imagen-con-texto img {
    width: 280px;
    height: 280px;
    border-radius: 10px;
    object-fit: cover;
}

.imagen-con-texto .texto {
  position: absolute;
  bottom: 0;
  margin: 0;
  padding: 6% 5%; 
  white-space: nowrap;
  color: #171520;
  font-size: 24px;
  font-weight: 600;
  width: 119px;
  height: 32px;
  text-align: left;
  font-family: 'Inter', sans-serif  ;
}

    .marcas {
      display: flex;
      gap: 20px;
      padding: 20px;
      flex-wrap: wrap;
    }
    .marcasLogo {
      background:#F4F4F4;
      padding: 0;
      border-radius: 16px;
      width: 168px;
      height: 168px;
      justify-content: space-between;
      flex-wrap: nowrap;
      margin: auto;
    }
    .marcasLogo img {
      max-width: 168px;
      max-height: 168px;
      display: flex;
      justify-content: center; 
      align-items: center;     
      gap: 46px;
    }
</style>
