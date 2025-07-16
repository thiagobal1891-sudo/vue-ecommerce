<template>
  
  <header class="NavegadorVue desktop-only">
    <div>
      <nav class="NavegadorVue__categories"> 
      <img id="logo" src="./../assets/logo.png" alt="Icon">
        <p>Handbags</p>
        <p>Watches</p> 
        <p>Skincare</p> 
        <p>Jewellery</p> 
        <p>Apparels</p> 
      </nav>
    </div>
    <div class="search-container">
      <input class="search" type="text" v-model="busqueda" placeholder="Buscar producto..." />
      <img class="search-icon" src="./../assets/search.png" alt="buscar">
      <div class="icons">
        <img src="./../assets/icons.png" alt="icons">
      </div>
    </div>
  </header>

  <header class="NavegadorVue-mobile-only">
    <nav class="nav-mobile">
  <div class="nav-left">
    <img src="./../assets/leading-icon.png" alt="menu">
    <p>Home</p>
  </div>
  <div class="nav-right">
    <img src="./../assets/trailing-icon.png" alt="icons-mobile">

  </div>
</nav>
  </header>

  <div class="text-header">
    <p>
      We are currently experiencing local customs clearance delays.
      For the latest updates, please check your order status
      <a href="./">here</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'NavegadorVue',
  data() {
    return {
      busqueda: ''
    };
  }
};
</script>

<style>

@media screen and (max-width: 768px) {
  body {
    padding-top: 80px !important;
  }
}

.NavegadorVue {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 20px;
  background: white;
  z-index: 1000;
  box-sizing: border-box;
}

.desktop-only {
  display: flex;
}

.nav-left-container {
  display: flex;
  align-items: center;
  gap: 30px;
}

.NavegadorVue__categories {
  display: flex;
  gap: 20px;
  font-weight: bold;
}

#logo {
  width: 108px;
  height: auto;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative;
  max-width: 500px;
  width: 100%;
}

.search {
  width: 100%;
  height: 44px;
  border-radius: 4px;
  background: #F1F1F1;
  border: none;
  padding-left: 40px;
  font-size: 14px;
}

.search-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 24px;
  height: 24px;
  pointer-events: none;
}

.icons img {
  width: 114px;
  height: auto;
  margin-left: 20px;
}

.NavegadorVue-mobile-only {
  display: none;
}

@media screen and (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }

  .NavegadorVue-mobile-only {
    display: flex !important;
  }

  .text-header {
    display: none !important;
  }
}

.nav-mobile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  z-index: 1000;
  margin-top: 20px;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-left p {
  font-weight: 600;
  font-size: 20px;
  color: rgba(27, 75, 102, 1);
  margin: 0;
}

.nav-right {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.text-header {
  width: 100%;
  height: 50px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #171520;
  background-color: #F1F1F1;
  text-align: center;
  position: relative;
  margin-top: 80px;
}

.text-header a {
  color: darkblue;
  text-decoration: underline;
}


</style>
