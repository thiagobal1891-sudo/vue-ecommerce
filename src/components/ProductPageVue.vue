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
      <p class="description">Leather Coach Bag with adjustable starps.</p>

     <RantingVue rate="2.5" count="45" id="0"/>
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
        <span class="placeholder">Apply Valid Pincode</span>
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
        <p>Get upto 30% Off on order value above $100</p>
        <button>Use Code <strong>ORDER100</strong></button>
      </div>


     <div class="actions">
        <button class="add-to-bag">
          <img src="@/assets/bag.png" alt="logo" class="logo" />
          <span class="text">Add To Bag</span>
        </button>
        <div class="actions">
        <button class="add-to-wishlist">
          <img src="@/assets/wishlist.png" alt="logo" class="logo">
          <span class="text_1">Add To Wishlist</span>
        </button>
        </div>
      </div>
    </div>
 </div>
</template>

<script setup>
import RantingVue from "./RantingVue.vue";
import { ref, computed } from "vue";

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
  width: 100%;
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
  width: 814px;
height: 624px;
top: 144px;
left: 649px;
opacity: 1;

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
  width: 410;
  height: 26;
  opacity: 1;

  font-family: Inter;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0%;
  vertical-align: middle;

}

.stars {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 10px 0;
}

.star {
  width: 20px;
  height: 20px;
  fill: #ccc;
}

polygon::hover {
    color: rgba(255, 140, 75, 1);
}

.star.half {
  fill: url(#halfGrad);
}

.ratings {
  margin-left: 10px;
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
  .input-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 390px;
    height: 52px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f2f2f2;
    padding: 0 15px;
    font-family: sans-serif;
    font-size: 14px;
  }

  .input-wrapper span.placeholder {
    color: #666;
  }

  .input-wrapper button {
    background: none;
    border: none;
    color: #0a3d62;
    font-weight: bold;
    cursor: pointer;
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


width: 24px;
height: 24px;


border: none;
font-weight: 900;
background-color: transparent;
flex: none;
order: 0;
flex-grow: 0;

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
  background-color: #eef6ff;
  padding: 10px;
  margin: 15px 0;
  border: 1px solid #b3d4fc;
}

.coupon button {
  margin-top: 5px;
  background-color: #dbeeff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.actions {
  display: flex;
  width: 592px;
  height: 44px;
  gap: 24px;

  gap: 10px;
}

.add-to-bag,
.add-to-wishlist {
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 44px;
  opacity: 1;
  border-radius: 8px;
  gap: 8px;
  border-width: 2px;

}

.add-to-bag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; 
  width: 328px;
  padding: 10px 20px;
  background-color: #004080;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

.add-to-bag .logo {
  width: 20px;
  height: 20px;
}

.add-to-wishlist {
  display: flex;
  background-color: white;
  border: 1px solid #004080;
  color: #004080;

  font-family: Inter;
font-weight: 600;
font-size: 14px;
line-height: 24px;
letter-spacing: 0%;
text-align: center;
vertical-align: middle;


}
</style>


