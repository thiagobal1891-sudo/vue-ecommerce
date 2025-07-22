<template>
<div class="banner">
  <div class="banner-contenido">
    <h2>Carry your Funk</h2>
    <p>Trendy handbags collection for your <br> party animal</p>
    <button>➝ See more</button>
  </div>
</div>

</template>

<script>


export default {
  name: 'BannerVue',
  components: {
  },
  data() {
    return {
    }
  }
}
</script>

<style>
.banner {
  background-image: url("./../assets/components/BannerVue/imgbanner.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  overflow: hidden;
  width: 1436px;
  margin: 20px auto;
  height: 514px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
}

.banner-contenido {
  position: absolute;
  top: 30%;
  width: 759px;
  height: 316px;
  background: rgba(222, 222, 222, 0.7);
  backdrop-filter: blur(2.5px);
  border-radius: 24px;
  padding: 30px;
}


.banner-contenido h2 {
  font-size: 60px;
  color: #1B4B66;
  text-align: left;
  font-family: 'Inter', sans-serif;
  position: absolute;
  top: 0;

}

.banner-contenido p {
  font-size: 28px;
  color: #1B4B66;
  position: absolute;
  top: 40%;
  text-align: left;
  font-family: 'Inter', sans-serif;

}

.banner-contenido button {
  background-color: #1B4B66;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  top: 80%;
}

.banner-contenido button:hover {
  background-color: #1B4B66;
}
</style>




