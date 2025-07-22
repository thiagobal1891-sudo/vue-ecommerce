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
        <div class="card__image" :style="{ backgroundImage: 'url(' + card.image + ')' }">
            <div class="card__image__content">
                <div class="card__image__content__title">
                    {{card.title}} 
                </div>
                <div class="card__image__content__text">
                    {{card.text }}
                </div>
               
               <div class="card__image__content__button">
                <button> <p class="arrow_icon">➜</p>  <p>See more </p></button>
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
            image:"https://i.pinimg.com/736x/01/c4/00/01c40028627c7ce90fb1f7d94ba1856c.jpg"
        },
        {
            id:1,
            title:"Carry your Funk",
            text:"Trendy handbags collection for your party animal",
            image: "https://i.pinimg.com/736x/01/c4/00/01c40028627c7ce90fb1f7d94ba1856c.jpg"
        }
      ]
    }
  }
}
</script>

<style>

.swiper {
  width: 100%;
  height: 200px;
}

.card__image__content{
width: 759px;
height: 316px;
padding-left: 40px;
opacity: 1;
top: 196px;
left: 563px;
border-radius: 24px;

background: rgba(222, 222, 222, 0.7);
backdrop-filter: blur(5px)
} 
.card__image__content__title{
display: flex;
width: 853px;
height: 84px;
opacity: 1;
color: rgba(27, 75, 102, 1);

font-family: Inter;
font-weight: 800;
font-size: 50px;

line-height: 84px;
letter-spacing: 0%;
vertical-align: middle;

}

.card__image__content__text{
display: flex;
text-align: left;
width: 530px;
height: 50px;
opacity: 1;

font-family: Inter;
font-weight: 500;
font-size: 20px;
line-height: 38px;
letter-spacing: 0%;
vertical-align: middle;


color: #1B4B66;


}
.card__image__content__button button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 44px;
  flex-direction: row;
  padding: 10px 20px;
  background-color: #1B4B66;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  gap: 10px;
}

.card__image__content__button p {
  margin: 0;
}
.card__image__content img {
  width: 1436px;
  height: 514px;
  background-repeat: no-repeat;      
  background-position: center;       
  background-size: contain;  
  
}
.card__image {
  display: flex;
  justify-content: flex-end;

}
.arrow_icon {
  width: 20px;
  font-size: 1.5rem;
  padding-bottom: 3px;
}
</style>