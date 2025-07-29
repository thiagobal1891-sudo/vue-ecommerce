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
               
               <button class="card__image__content__button">
                 <p class="arrow_icon">➜</p>  <p>See more </p>
               </button>
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
            image:"https://img.hogar.mapfre.es/wp-content/uploads/2018/08/barnizar_una_pared_de_ladrillo.jpg"
        },
        {
            id:1,
            title:"Carry your Funk",
            text:"Trendy handbags collection for your party animal",
            image: "https://img.hogar.mapfre.es/wp-content/uploads/2018/08/barnizar_una_pared_de_ladrillo.jpg"
        }
      ]
    }
  }
}
</script>

<style>
.card__image {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: relative;
  font-size: 1vw;
}
.card__image__image{
  width: 100%;
}
.card__image__content{
  width: 100%;
  height: 70%;
  padding-left: 40px;
  opacity: 1;
  top: 15%;
  left: 50%;
  border-radius: 24px;
  background: rgba(222, 222, 222, 0.7);
  backdrop-filter: blur(5px);
  position:absolute;
} 
.card__image__content__title{
  display: flex;
  height: 50px;
  opacity: 1;
  color: rgba(27, 75, 102, 1);
  font-family: Inter;
  font-weight: 800;
  font-size: 2em;
  letter-spacing: 0%;
}

.card__image__content__text{
  display: flex;
  text-align: left;
  width: 530px;
  height: 50px;
  opacity: 1;
  font-family: Inter;
  font-weight: 500;
  font-size: 1em;
  line-height: 38px;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #1B4B66;
}
.card__image__content__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 12%;
  flex-direction: row;
  padding: 10px 20px;
  background-color: #1B4B66;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  gap: 10px;
  font-size: 1vw;
}

.card__image__content__button p {
  margin: 0;
  font-size: 1em;
}

.arrow_icon {
  width: 20px;
  font-size: 1.5rem;
  padding-bottom: 3px;
}
</style>