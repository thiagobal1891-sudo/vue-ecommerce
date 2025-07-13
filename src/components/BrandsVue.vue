<template>
  <div class="marcas">
    <div class="marcasLogo"><img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1024px-Zara_Logo.svg.png"
        alt="ZARA"></div>
    <div class="marcasLogo"><img
        src="https://brandlogos.net/wp-content/uploads/2022/08/dolce__gabbana_logomark-logo_brandlogos.net_6c78j.png"
        alt="D&G"></div>
    <div class="marcasLogo"><img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/2560px-H%26M-Logo.svg.png"
        alt="H&M"></div>
    <div class="marcasLogo"><img src="https://1000marcas.net/wp-content/uploads/2019/12/Chanel-logo-5.png" alt="CHANEL">
    </div>
    <div class="marcasLogo"><img src="https://carsha.co/cdn/shop/collections/20592.png?v=1685102230" alt="PRADA"></div>
    <div class="marcasLogo"><img
        src="https://vivianamalls.com/wp-content/uploads/2023/08/BIBA_-Viviana-Mall-Thane-Mumbai.png" alt="BIBA"></div>
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

.marcasLogo:hover::before{
    content: "La mejor marca";
    position: absolute;
    top: 150px;
}


</style>