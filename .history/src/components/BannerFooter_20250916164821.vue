<template>
<div class="banner-grid">

    <div class="lifestyle-card">
      <h2>LIFESTYLE</h2>
      <h1>Makeup Accessories<br>from Top Brands</h1>
    </div>



      <div class="card skincare">
        <h3>Skincare<br>Essentials</h3>
        <div class="arrow">→</div>
      </div>

      <div class="card facepacks">
        <h4>Facepacks<br>& Peels</h4>
        <div class="arrow">→</div>
      </div>

  </div>

</template>

<script>

export default {
  name: 'BannerFooter',
  components: {

  },
  data() {
    return {
    }
  }
}

</script>

<style>
    * {
      box-sizing: border-box;
    }

    body {
      margin-bottom: 40px;
      font-family: 'Arial', sans-serif;
      padding: 20px;
    }

    .banner-grid {
      display: grid;
          grid-template:
                  "lifeStyle lifeStyle" 400px

                  "skincare   facepacks"  228px

                  /1fr    1fr    ;
      gap: 20px;
      max-width: 1200px;
      margin: 10px 30px;
    }

    .card:hover,
    .lifestyle-card:hover {
  filter: brightness(0.8);
  transform: scale(1.05);
  transition: filter 0.3s ease;
  cursor: pointer;
}

    .lifestyle-card {
      background-image: url('https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1200&q=80');
      background-size: cover;
      background-position: center;
      border-radius: 20px;
      padding: 60px 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      grid-area: lifeStyle;
    }

    .lifestyle-card h2 {
  width: 154px;
  height: 20px; 
  left: 59px;
  top: 1999px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #97451F;


    }

    .lifestyle-card h1 {
  width: 618px;
  height: 136px;
  left: 59px;
  top: 2038px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 52px;
  line-height: 68px;
  display: flex;
  align-items: center;
  color: #97451F;


    }


    .card {
      border-radius: 20px;
      padding: 30px;
      color: #fff;
      background-size: cover;
      background-position: center;
      position: relative;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    

    .card h3 {
  width: 309px;
  height: 104px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 40px;
  text-align: right;
  color: #A53F64;
        position: absolute;
      right: 30px;
    }

.card h4 {
  width: 232px;
  height: 104px;
  font-family: 'Inter',sans-serif;
  font-weight: 700;
  font-size: 40px;
  text-align: right;
  color: #1B4B66;
        position: absolute;
      right: 30px;
}

    .card .arrow {
      position: absolute;
      bottom: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      padding: 10px;
      font-size: 20px;
      color: #000;
      z-index: 2;
    }

    .card .arrow:hover {
    transform: scale(1.2);
    transition: 0.5s;
}

    .skincare {
      background-image: url('https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1000w,f_avif,q_auto:eco,dpr_2/rockcms/2024-01/240117-staff-skin-care-routines-social-2c85d8.jpg');
      grid-area: skincare;
    }

    .facepacks {
      background-image: url('https://shipcartecommerce.com/cdn/shop/collections/877f03da31ad8bb130dde99698f7d3ec.jpg?v=1748635689');
      grid-area: facepacks;
    }

    @media (max-width: 768px) {
      .lifestyle-card h1 {
        font-size: 28px;
      }

      .card h3 {
        font-size: 20px;
      }

      .card h4 {
        font-size: 20px;
      }
    }
</style>
