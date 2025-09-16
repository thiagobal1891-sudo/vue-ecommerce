<template>
  <div class="ProductCollections">
    <div class="ProductCollections__title">
      <h2>
        Handpicked Collections
      </h2>
    </div>
    <div class="collections">
      <div class="imagen-con-texto">
        <img
          src="https://juleriaque.vtexassets.com/arquivos/ids/232175-800-800?v=638532096116930000&width=800&height=800&aspect=true"
          alt="Imagen 1">
        <p class="texto">Personal Care</p>
      </div>
      <div class="imagen-con-texto">
        <img src="https://bagallery.com/cdn/shop/products/Shoot41-vybe_0159__DSC1337.jpg?v=1742978529" alt="Imagen 2">
        <p class="texto">Handbags</p>
      </div>
      <div class="imagen-con-texto">
        <img
          src="https://image.made-in-china.com/202f0j00omViNlDckHzF/Trendy-Brand-Watches-Quartz-Watches-Summer-E-Commerce-Explosion-Watches-Promotional-Gifts-for-Women-Couple-Watches-ndash-M0920.webp"
          alt="Imagen 3">
        <p class="texto">Wrist Watches</p>
      </div>
      <div class="imagen-con-texto">
        <img src="https://waldos.com.mx/cdn/shop/files/21958293OVER_3.jpg?v=1699894014&width=1000" alt="Imagen 4">
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
  margin: 0;
  background-color: #1B4B66;
  justify-content: center;
  padding: 0 0 3% 0;

}

.ProductCollections__title {
  display: flex;
  justify-content: space-between;
}

.ProductCollections__title h2 {
  font-size: 34px;
  font-weight: 600;
  width: 391px;
  height: 44px;
  text-align: left;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;

}

.collections {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin: auto;
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

</style>
