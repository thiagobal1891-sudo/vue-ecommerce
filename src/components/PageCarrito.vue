<template>
<h2 style="text-align:left;">My Cart</h2>

<div class="carrito">
    <div class="items">
    <div class="item">
      <img src="./../assets/components/PageCarrito/imgcarrito.png" alt="">
      <div class="info">
        <b>Coach</b>
        Leather Coach Bag<br>
        Qty - 1<br>
        <a href="#" class="move">Move to Wishlist</a>
        <a href="#" class="remove">Remove</a>
      </div>
      <div class="price">$54.69</div>
      <div class="qty">1</div>
      <div class="subtotal">$54.69</div>
    </div>

    <div class="item">
      <img src="./../assets/components/PageCarrito/imgcarrito.png" alt="">
      <div class="info">
        <b>Coach</b>
        Leather Coach Bag<br>
        Qty - 1<br>
        <a href="#" class="move">Move to Wishlist</a>
        <a href="#" class="remove">Remove</a>
      </div>
      <div class="price">$54.69</div>
      <div class="qty">1</div>
      <div class="subtotal">$54.69</div>
    </div>
    </div>

    <div class="total">
    <h3>Order Summary</h3>
    <div><span>Sub Total</span><span>$119.69</span></div>
    <div><span>Discount</span><span>-$13.40</span></div>
    <div><span>Delivery Fee</span><span>-$0.00</span></div>
    <div style="font-weight:bold;"><span>Grand Total</span><span>$106.29</span></div>

    <div class="buttons">
      <button class="place">Place Order</button>
      <button class="continue">Continue Shopping</button>
    </div>
        </div>
      <div class="coupon-wrapper">
        <label class="coupon-label">Apply Coupon Code</label>
        <div class="coupon-box">
          <input type="text" placeholder="Apply Coupon Code" />
          <button>CHECK</button>
        </div>
</div>
</div>

</template>

<script>

export default {
    name: 'PageCarrito',
    components: {

    },
    data() {
    return {
    }
    }
}

</script>

<style>
    .carrito {
    display: flex;
    font-family: 'Inter', sans-serif;
    flex-direction: row;
    align-items: flex-start;
    width: 1259px;

    } 

    .items, .total {
    padding: 20px;
    }

    .item {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    }

    .item img {
    width: 80px;
    margin-right: 15px;
    border-radius: 6px;
    }

    .info {
    flex: 1;
    color: #626262;
    }

    .info b {
    display: block;
    margin-bottom: 5px;
    color: #171520;
    }

    .info .move {
    margin-right: 10px;
    font-size: 14px;
    color: #1B4B66;
    border-bottom: 1px solid #FFFFFF;
    }

    .info .remove {
    color: #B00020;
    border-bottom: 1px solid #FFFFFF;
    }

    .price, .qty, .subtotal {
    width: 80px;
    text-align: right;
    color: #171520;
    }

    .total div {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
    color: #171520;
    }

    .total h3 {
    margin-top: 0;
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    color: #171520;
    }


    .buttons {
    margin-top: 20px;
    display: flex;
    gap: 32px;
    }

    .buttons button {
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    }

    .place {
    background: #1B4B66;
    color: white;
    border: none;
    }

    .continue {
    background-color: white;
    color: #1B4B66;
    border: 2px solid #1B4B66;
    padding: 10px 20px;
    border-radius: 8px;
    }

.coupon-wrapper {
  margin-top: 40px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
}

.coupon-label {
  margin-bottom: 8px;
  font-weight: 500;
}

.coupon-box {
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  overflow: hidden;
}

.coupon-box input {
  border: none;
  background: transparent;
  padding: 15px;
  flex: 1;
  font-size: 14px;
  outline: none;
}

.coupon-box button {
  background: transparent;
  border: none;
  color: #003b5c;
  font-weight: bold;
  padding: 0 20px;
  cursor: pointer;
}

.coupon-box button:hover {
  text-decoration: underline;
}

</style>
