<template>
  <div class="product-card">
    <div class="product-image">
      <img
        src="https://i.pinimg.com/736x/90/93/c9/9093c916433c8daee64115b52c642bc8.jpg"
        alt="Leather Coach Bag"
      />
    </div>

    <div class="product-details">
      <h2>Coach</h2>
      <p class="description">sadfgasdgasdgsdg.</p>
asdfasdfdsa
      <RantingVue rate = "4.5" count = "260" id="1"/>
      asdfsadfsadf
       <div class="rating-container">
      <div style="padding: 30px">
    <h2>Valoración</h2>
  </div>
</div>


      <div class="price">
        <span class="current-price">${{ totalPrice.toFixed(2) }}</span>
        <span class="old-price">${{ basePrice.toFixed(2) }}</span>
        <span class="discount">50% OFF</span>
      </div>

   
      <div class="delivery">
      <div class="delivery-texts">
        <h2 class="delivery-text">Delivery Details</h2>
        <p>Check estimated delivery date/pickup option.</p>
      </div>
        <div class="input-wrapper">
        <span type="text" class="placeholder">Apply Valid Pincode</span>  
        <button type="button">CHECK</button>
      </div>
                
      </div>

      <div class="quantity">
        <p>Quantity:</p>
      <div class="quantity-buttons">
        <button @click="decrease">-</button>
        <span>{{ quantity }}</span>
        <button @click="increase">+</button>
      </div>
      </div>

      <div class="coupon">
      <div class="coupon-text" >
        <p>Get upto 30% Off on order value above $100</p>
        <a href="./">Terms & Conditions</a>
      </div>
        <button>Use Code <strong>ORDER100</strong></button>
      </div>


      <div class="actions">
        <button class="add-to-bag"> <img src="./../assets/bag.png" alt="bag"> Add to bag</button>
        <button class="add-to-wishlist"> <img src="./../assets/wishlist.png" alt="heart">  Add To Wishlist</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import RantingVue from "./RantingVue.vue";
import RantingVue from "./RantingVue.vue";

const quantity = ref(1);
const unitPrice = 39.33;
const basePrice = 78.66;

const increase = () => quantity.value++;
const decrease = () => {
  if (quantity.value > 1) quantity.value--;
};


const totalPrice = computed(() => quantity.value * unitPrice);

</script>

<style>

.product-card {
  display: flex;
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 12px;
  font-family: sans-serif;
  gap: 30px;
}

.product-image img {
  width: 605px;
  height: 605px;
  opacity: 1;
  border-radius: 16px;
  object-fit: cover;

}

.product-details {
  flex: 1;
}
h2{
  width: 106px;
  height: 44px;
  text-align: left;
 color: rgba(19, 16, 30, 1);
  font-family: Inter;
  font-weight: 600;
  font-style: Semi Bold;
  font-size: 34px;
  line-height: 44px;
  letter-spacing: 0%;
  vertical-align: middle;



}

.description {
  color: #666;
  text-align: left;
  width: 410px;
  height: 26px;
  opacity: 1;

  font-family: Inter;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0%;
  vertical-align: middle;

}.rating-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}
.rating-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rating-value {
  font-size: 14px;
  color: #555;
}
.rating-text {
  font-size: 0.9em;
  color: #888;
}

.price {
  display: flex;
  width: 373px;
  height: 52px;
  top: 150px;
  opacity: 1;
  justify-content: space-between;
  align-items: center;
}

.current-price {
  width: 143px;
  height: 52px;
  opacity: 1;

  font-family: Inter;
  font-weight: 700;
  font-size: 40px;

  line-height: 52px;
  letter-spacing: 0%;
  vertical-align: middle;

}

.old-price {
  width: 116px;
  opacity: 1;
  font-family: Inter;
  font-weight: 600;
  font-size: 34px;
  letter-spacing: 0%;
  vertical-align: middle;
  text-decoration: line-through;
  color: rgba(182, 182, 182, 1);

}

.discount {
  color: red;
  opacity: 1;
  font-family: Inter;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0%;
  text-align: right;
  vertical-align: middle;

}

.delivery  {
    display: flex;
    align-items: center;
    width: 611px;
    height: 74px;
    gap: 16px;
    opacity: 1;
    

}
.delivery-texts {
  display: flex;
  flex-direction: column;
  width: 205px;
  height: 74px;
  opacity: 1;
  gap: 8px;
}
.delivery-texts p {
  width: 205px;
  height: 40px;
  opacity: 1;

  font-family: Inter;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0%;
  vertical-align: middle;
  text-align: left;
}
.delivery-text {
  width: 152px;
  height: 26px;
  opacity: 1;
  
  font-family: Inter;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0%;
  vertical-align: middle;
}
.star svg {
  transition: fill 0.3s ease;
}

.star svg:hover {
  fill: gold !important;
}

.quantity {
  margin: 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.quantity p {

  font-family: Inter;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0%;
  vertical-align: middle;
}

.quantity-buttons button{


box-sizing: border-box;


display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

width: 73px;
height: 30px;


border: 1px solid #1B4B66;
border-radius: 4px;

flex: none;
order: 1;
flex-grow: 0;

background: none
}
.quantity-buttons {


box-sizing: border-box;


display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

width: 73px;
height: 30px;

border: 1px solid #1B4B66;
border-radius: 4px;


flex: none;
order: 1;
flex-grow: 0;


}

.coupon {
  width: 391px;
height: 96px;
display: flex;
flex-direction: row;
opacity: 1;
gap: 8px;
margin-bottom: 10px;
border-radius: 8px;
border-width: 1px;
padding-top: 15px;
padding-right: 16px;
padding-bottom: 15px;
padding-left: 16px;
border: 1px solid rgba(27, 75, 102, 1)
}

.coupon-text {
  display: flex;
  flex-direction: column;
  text-align: left;
} 
.coupon-text p {

width: 229px;
height: 38px;

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
display: flex;
align-items: center;


color: #171520;


}
.coupon-text a {

width: 184px;
height: 13px;

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 13px;
display: flex;
align-items: center;
text-decoration: none;
color: #1B4B66;



}

.coupon button {
  width: 109px;
  height: 66px;
  opacity: 1;
  gap: 8px;
  border-radius: 4px;
  padding-top: 14px;
  padding-right: 13px;
  padding-bottom: 14px;
  padding-left: 13px;
  background: rgba(241, 241, 241, 1);
  border: none;
}

.actions {
  display: flex;
  gap: 10px;
}


.add-to-wishlist {
width: 240px;
height: 44px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
opacity: 1;
gap: 8px;
border-radius: 8px;
border-width: 2px;
padding-top: 10px;
padding-right: 30px;
padding-bottom: 10px;
padding-left: 30px;
background-color: #FFFFFF;
color: #1B4B66;

font-family: Inter;
font-weight: 600;
font-size: 14px;
line-height: 24px;
letter-spacing: 0%;
text-align: center;
vertical-align: middle;

}

.add-to-bag {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
 width: 328px;
height: 44px;
opacity: 1;
gap: 8px;
border-radius: 8px;
padding-top: 10px;
padding-right: 100px;
padding-bottom: 10px;
padding-left: 100px;
background-color: #1B4B66;
color: #FFFFFF;

font-family: Inter;
font-weight: 600;
font-size: 14px;
line-height: 24px;
letter-spacing: 0%;
text-align: center;
vertical-align: middle;

}

.add-to-wishlist {
  background-color: white;
  border: 1px solid #004080;
  color: #004080;
}
</style>