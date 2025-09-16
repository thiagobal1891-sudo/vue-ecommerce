<template>
  <div class="ProductCollections">
    <div class="ProductCollections__title">
      <h2>
        Handpicked Collections
      </h2>
    </div>
    <div class="collections">
      <div class="imagen-con-texto">
        <button class="boton_img">
          <img
            src="https://juleriaque.vtexassets.com/arquivos/ids/232175-800-800?v=638532096116930000&width=800&height=800&aspect=true"
            alt="Imagen 1">
          <p class="texto">Personal Care</p>
        </button>
      </div>

      <div class="imagen-con-texto">
        <button class="boton_img">
          <img src="https://bagallery.com/cdn/shop/products/Shoot41-vybe_0159__DSC1337.jpg?v=1742978529" alt="Imagen 2">
          <p class="texto">Handbags</p>
        </button>
      </div>

      <div class="imagen-con-texto">
        <button class="boton_img">
          <img
            src="https://image.made-in-china.com/202f0j00omViNlDckHzF/Trendy-Brand-Watches-Quartz-Watches-Summer-E-Commerce-Explosion-Watches-Promotional-Gifts-for-Women-Couple-Watches-ndash-M0920.webp"
            alt="Imagen 3">
          <p class="texto">Wrist Watches</p>
        </button>
      </div>

      <div class="imagen-con-texto">
        <button class="boton_img">
          <img src="https://waldos.com.mx/cdn/shop/files/21958293OVER_3.jpg?v=1699894014&width=1000" alt="Imagen 4">
          <p class="texto">Sun Glasses</p>
        </button>
      </div>
    </div>

    <div class="ProductCollections__products">
      <div class="ProductCollections__products__card" v-for="product of productos" :key="product.id">
        <img :src="product.image" alt="">
        <h3>{{ product.title }}</h3>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'CollectionsVue',
  components: {

  },
  data() {
    return {
      productos: []
    }
  }
}

</script>

<style>
.ProductCollections {
  width: 100%;
  background-color: #1B4B66;
  justify-content: center;
}

.ProductCollections__title {
  display: flex;
  margin-top: 10px;
}

.ProductCollections__title h2 {
  font-size: 34px;
  font-weight: 600;
  width: 391px;
  height: 44px;
  text-align: left;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
    text-shadow: 
    -1px -1px 0 black,  
    1px -1px 0 black;
}

.boton_img {
          
  outline: none;       
  background: none;    
  padding: 0;          
  cursor: pointer;    
  position: relative;
  display: inline-block;
}

.boton_img img {
  width: 270px;
  height: 270px;
  border-radius: 10px;
  display: block;
  margin-bottom: 30px;
}

.boton_img .texto {
  position: absolute;
 
  left: 10px;
  margin: 0;
  color: #171520;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.collections {
  display: flex;
  flex-wrap: wrap;   /* que los botones bajen si no entran */
  gap: 20px;
  justify-content: center; /* centrados en desktop */
}

/* --- Mobile --- */
@media (max-width: 768px) {
  .collections {
    flex-direction: column; /* lista vertical */
    gap: 15px;
    align-items: stretch; /* que ocupen todo el ancho */
  }


  .boton_img img {
    display: none; 
  }

  .boton_img {
    width: 100%;
    background: #fff;
    padding: 12px 16px;
    text-align: left;
    margin-bottom: 10px;
  }

  .boton_img .texto {
    position: static; /* ahora es normal */
    font-size: 18px;
    color: #171520;
  }

  .boton_img:hover {
    background: #f0f0f0;
    transform: none; /* quitamos el zoom en mobile */
  }
}



</style>
