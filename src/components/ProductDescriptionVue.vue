<template>
<div class="container">
<div class="tabs-container">
<div class="tabs">
    <button> 
        <span type="text">Product Description</span>
    </button>
</div>
<div class="tabs">
    <button> 
        <span type="text">Related Products</span> 
    </button>
</div >
<div class="tabs">
    <button>
        <span type="text">Ratings and Reviews</span> 
    </button>
</div>
</div>
<div class="descriptions">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus scelerisque laoreet tortor cras molestie tincidunt malesuada malesuada. Neque, mauris duis dui id morbi magna. Cras lacus, viverra auctor in turpis est quisque eget tristique. </p>

    <p>Dolor augue mattis duis semper gravida enim eu imperdiet sit. Et pharetra platea pretium nec feugiat tincidunt quam leo tristique. Nulla enim consectetur sit et tempus, faucibus leo ac cras. Purus ut non eu mus volutpat. </p> 

    <p>Eget est vel sagittis amet sit eu eu ullamcorper tellus. Leo mauris, faucibus vulputate adipiscing elementum tristique dictumst augue pellentesque. Justo, sed nunc, pretium turpis scelerisque. Enim urna etiam morbi vestibulum ac dictumst. Ac ut elementum molestie sit felis imperdiet.</p>
</div>
</div>
</template>
<script>
export default {
  name: 'ProductDescriptionVue',
  data() {
    return {

    };
  }
}
</script>

/* product-description */

position: absolute;
width: 1240px;
height: 258px;
left: 20px;
top: 903px;




<style>
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 258px;
    opacity: 1;
    margin-bottom: 30px;
    align-items: start;
    margin-left: 17px;
}
.tabs-container {
    display: flex;
   
    width: calc(100% - 3%);
    height: 48px;
    opacity: 1;
    border-radius: 12px;
    padding-top: 8px;
    padding-right: 16px;
    padding-bottom: 8px;
    padding-left: 16px;
    gap: 24px;
    background-color: rgba(241, 241, 241, 1);
}
.tabs span {
    display: flex;
    justify-content: center;
    width: 200px;
    height: 20px;
    opacity: 1;
    font-family: Inter;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0%;
    vertical-align: middle;
    color: rgba(98, 98, 98, 1);
    border: none;


}
.tabs {
    display: flex;
    align-items: center;
}
.tabs button:hover {
   transition: 50ms;
   background-color: rgba(27, 75, 102, 1); 
}
.tabs button {
    width: 189;
    height: 32;
    angle: 0 deg;
    opacity: 1;
    border-radius: 8px;
    padding-top: 6px;
    padding-right: 18px;
    padding-bottom: 6px;
    padding-left: 18px;
    gap: 10px;
    border: none;
}
.tabs span:hover {
    color: whitesmoke;
    transition: 0.3s;
}
.descriptions{
    display: flex;
    text-align: left;
    flex-direction: column;
    gap: 20px;
    width: 1134px;
    opacity: 1;
    top: 25px;
    position: relative;
    font-family: Inter;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0%;

}


</style>

