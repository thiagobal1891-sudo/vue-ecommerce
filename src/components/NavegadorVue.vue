<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">

  <!-- BARRA DESKTOP -->
  <header class="NavegadorVue desktop-only">
    <div>
      <img id="logo" src="./../assets/logo.png" alt="Icon">
      <nav class="NavegadorVue__categories"> 
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
                        <div>{{ count.quantity }}</div>
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

import { useCartStore } from '@/stores/cart';

export default {
  name: 'NavegadorVue',
  data() {
    return {
      busqueda: '',
      count: useCartStore()
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
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;

  z-index: 1000;
  background: white;
}


.desktop-only {
  display: flex;
}
.nav-mobile p {
  width: 57px;
  height: 26px;
  opacity: 1;
  font-family: Inter;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0%;
  vertical-align: middle;
  color: rgba(27, 75, 102, 1);
;

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

.nav-right {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.NavegadorVue-mobile-only {
  display: none !important;
}

@media screen and (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }
}
@media screen and (max-width: 768px) {
  .text-header {
    display: none !important;
  }
}
  .mobile-only {
    display: flex !important;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    background-color: white;
    z-index: 1000;
  }
@media screen and (max-width: 768px) {
  .NavegadorVue-mobile-only {
    display: flex !important;
  }
}
.NavegadorVue div {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 30px;
}
.NavegadorVue {
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center; 
  margin-inline: 10px;
  justify-content: space-between;

}
.NavegadorVue header{

  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; 

}
.search-container  {
  display: inline-flex;
  align-items: center;
  position: relative;
  margin-right: inherit;
  
}
.search-container input {
  width: 500px;
  height: 44px;


}

#logo {
width: 108px;
height: 22px;
top: 29px;
left: 20px;


}
.NavegadorVue__categories {
  display: flex;
  width: 391;
  height: 18;
  top: 31px;
  left: 160px;
  gap: 20px;
  font-weight: bold;

}

.search-container {
  position: relative;
  width: 500px;
  height: 44px;
}

.search {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: #F1F1F1;
  border: none;
  padding-left: 40px; /* espacio para el ícono */
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
#icons {
  width: 114px;
height: 24px;
top: 28px;
left: 1148px;
}
.text-header {
  
  position: relative; 
  
  width: 100%;
  height: 50px;

  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  color: #171520;
  background-color: #F1F1F1;
}


.text-header a {
  color: darkblue;


} 

</style>
