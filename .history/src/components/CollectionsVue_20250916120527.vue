<template>
  <div class="ProductCollections">
    <div class="ProductCollections__title">
      <h2>
        Handpicked Collections
      </h2>
    </div>
    <div class="collections">
      <div class="imagen-con-texto">
        <button class="boton_img"><img
          src="https://juleriaque.vtexassets.com/arquivos/ids/232175-800-800?v=638532096116930000&width=800&height=800&aspect=true"
          alt="Imagen 1"></button>
        <p class="texto">Personal Care</p>
      </div>
      <div class="imagen-con-texto">
        <button class="boton_img"><img src="https://bagallery.com/cdn/shop/products/Shoot41-vybe_0159__DSC1337.jpg?v=1742978529" alt="Imagen 2">
        </button>
          <p class="texto">Handbags</p>
      </div>
      <div class="imagen-con-texto">
        <button class="boton_img"><img
          src="https://image.made-in-china.com/202f0j00omViNlDckHzF/Trendy-Brand-Watches-Quartz-Watches-Summer-E-Commerce-Explosion-Watches-Promotional-Gifts-for-Women-Couple-Watches-ndash-M0920.webp"
          alt="Imagen 3">
        </button>
          <p class="texto">Wrist Watches</p>
      </div>
      <div class="imagen-con-texto">
        <button class="boton_img"><img src="https://waldos.com.mx/cdn/shop/files/21958293OVER_3.jpg?v=1699894014&width=1000" alt="Imagen 4">
        </button>
          <p class="texto">Sun Glasses</p>
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
  border: none;        
  outline: none;       
  background: none;    
  padding: 0;          
  cursor: pointer;    
}

.boton_img:hover {
    transform: scale(1.2);
    transition: 0.5s;
}

.collections {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

.imagen-con-texto {
  position: relative;
  overflow: hidden;
  object-fit: cover;
  gap: 40px;
  margin-bottom: 20px;
}

/* Desktop por defecto */
.imagen-con-texto img {
  width: 270px;
  height: 270px;
  border-radius: 10px;
  display: block;
}

.imagen-con-texto .texto {
  position: absolute;
  bottom: 0;
  margin: 0;
  padding: 0 5%;
  white-space: nowrap;
  color: #171520;
  font-size: 24px;
  font-weight: 600;
  width: 119px;
  height: 32px;
  text-align: left;
  font-family: 'Inter', sans-serif;
}

/* --- Mobile --- */
@media (max-width: 768px) {
  .collections {
    display: flex;
    flex-direction: column; /* lista en vertical */
    gap: 15px;
  }


  .imagen-con-texto img {
    display: none; /* ocultamos la imagen */
  }

  .boton_img {
    width: 180px;       /* que ocupe todo el ancho */
    border: none;
    outline: none;
    background: #fff;  /* fondo para que parezca botón */
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
  }

  .imagen-con-texto .texto {
    position: static; /* ya no es absoluto */
    display: block;
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: 600;
    color: #171520;
  }
}


</style>
