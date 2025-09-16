<template>
  <div class="marcas">
    <div class="marcasLogo"><button><img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1024px-Zara_Logo.svg.png"
        alt="ZARA"></button></div>
    <div class="marcasLogo"><button><img
        src="https://brandlogos.net/wp-content/uploads/2022/08/dolce__gabbana_logomark-logo_brandlogos.net_6c78j.png"
        alt="D&G"></button></div>
    <div class="marcasLogo"><button><img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/2560px-H%26M-Logo.svg.png"
        alt="H&M"></button></div>
    <div class="marcasLogo"><button><img src="https://1000marcas.net/wp-content/uploads/2019/12/Chanel-logo-5.png" alt="CHANEL">
    </button></div>
    <div class="marcasLogo"><button><img src="https://carsha.co/cdn/shop/collections/20592.png?v=1685102230" alt="PRADA"></button></div>
    <div class="marcasLogo"><button><img
        src="https://vivianamalls.com/wp-content/uploads/2023/08/BIBA_-Viviana-Mall-Thane-Mumbai.png" alt="BIBA"></button></div>
  </div>
</template>

<script>

export default {
  name: 'BrandsVue',
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

.marcas {
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
}

.marcasLogo {
  background: #F4F4F4;
  padding: 0;
  border-radius: 16px;
  width: 168px;
  height: 168px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  margin: auto;
  transition: 0.5s;
  position: relative;
}

.marcasLogo img {
  max-width: 168px;
  max-height: 168px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 46px;
}

.marcasLogo:hover {
    transform: scale(1.2);
    transition: 0.5s;
}




</style>