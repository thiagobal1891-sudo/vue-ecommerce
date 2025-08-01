<template>
  <swiper
    :slidesPerView="1"
    :spaceBetween="50"
    :loop="true"
    :pagination="{ clickable: true }"
    :autoplay="autoplayConfig"
    :navigation = "false"
  >
    <swiper-slide v-for="card in cards" :key="card.id">
        <div class="card__image">
            <img :src="card.image" alt=""  class="card__image__image">
            <div class="card__image__content">
                <div class="card__image__content__title">
                    {{card.title}} 
                </div>
                <div class="card__image__content__text">
                    {{card.text }}
                </div>
               
               
            </div>
        </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'

export default {
  name: 'BannerVue',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      autoplayConfig: {
        delay: 3000,  
        disableOnInteraction: false
      },
      cards:[
        {
            id:0,
            title:"Carry your Funk",
            text:"Trendy handbags collection for your party animal",
            image:"https://static.vecteezy.com/system/resources/previews/028/122/762/large_2x/backpack-with-bright-school-stationery-on-isolate-background-banner-design-back-to-school-concept-photo.jpg"
        },
        {
            id:1,
            title:"Carry your Funk",
            text:"Trendy handbags collection for your party animal",
            image:"https://static.vecteezy.com/system/resources/previews/028/122/762/large_2x/backpack-with-bright-school-stationery-on-isolate-background-banner-design-back-to-school-concept-photo.jpg"
        }
      ]
    }
  }
}
</script>

<style>
/* Agrega estilos si es necesario */
.swiper {
  width: 100%;
}
.card__image__content{
/* Rectangle 35 */

position: absolute;
left: 41.77%;
right: -6.1%;
top: 8.33%;
bottom: 8.33%;

background: rgba(222, 222, 222, 0.7);
backdrop-filter: blur(2.5px);
/* Note: backdrop-filter has minimal browser support */
border-radius: 8px;

}
.card__image__content__title{
/* Carry your Funk */



font-family: 'Inter';
font-style: normal;
font-weight: 800;
font-size: 24px;
line-height: 26px;
/* or 108% */
display: flex;
align-items: center;

/* Primary */
color: #1B4B66;
}

.card__image__content__text{

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
/* or 133% */
display: flex;
align-items: center;

/* Primary */
color: #1B4B66;


}




</style>