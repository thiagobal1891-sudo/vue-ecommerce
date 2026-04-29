const fs = require('fs');
const path = 'src/components/ProductPageVue.vue';
let content = fs.readFileSync(path, 'utf8');
const styleStart = content.indexOf('<style>');
const styleEnd = content.lastIndexOf('</style>') + '</style>'.length;
const before = content.substring(0, styleStart);
const after = content.substring(styleEnd);
const newStyle = `<style>
/* ===================================================
   PRODUCT PAGE — Paleta identica a HomePage
   Tokens: #050505 | #F5F5F7 | #F9F9FB | #fcfcfd | #666
   =================================================== */
.product-card {
  display: flex;
  max-width: 1300px;
  width: 100%;
  margin: 40px auto;
  padding: 0 40px;
  font-family: sans-serif;
  gap: 80px;
  align-items: flex-start;
  background: #fcfcfd;
}
.product-image {
  flex: 0 0 52%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 100px;
}
.product-image img {
  width: 100%;
  height: auto;
  border-radius: 24px;
  object-fit: contain;
}
.product-details {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 8px;
}
h2 {
  width: 100%;
  text-align: left;
  color: #050505;
  font-weight: 600;
  font-size: clamp(1.6rem, 2.5vw, 2.25rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin: 0;
}
.description {
  color: #666;
  text-align: left;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.7;
  width: 100%;
  margin: 0;
}
.price {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}
.current-price {
  font-weight: 600;
  font-size: 2rem;
  color: #050505;
  letter-spacing: -0.03em;
  line-height: 1;
}
.old-price {
  font-weight: 400;
  font-size: 15px;
  color: #bbb;
  text-decoration: line-through;
}
.price-animated { transition: all 0.25s ease; }
@keyframes pricePop {
  0%   { transform: scale(1);    color: #050505; }
  50%  { transform: scale(1.06); color: #333;    }
  100% { transform: scale(1);    color: #050505; }
}
.price-animated { animation: pricePop 0.3s ease; }
.discount {
  font-weight: 600;
  font-size: 12px;
  color: #050505;
  background: rgba(0,0,0,0.06);
  padding: 4px 10px;
  border-radius: 100px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.total-info { font-size: 13px; color: #888; font-weight: 400; margin: -8px 0; }
.delivery {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
  padding: 16px 20px;
  background: #F9F9FB;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.04);
}
.delivery-texts { display: flex; flex-direction: column; width: 100%; gap: 4px; }
.delivery-texts p { font-weight: 400; font-size: 14px; line-height: 1.5; color: #888; margin: 0; text-align: left; width: 100%; }
.delivery-text { font-weight: 600; font-size: 15px; color: #050505; margin: 0; letter-spacing: -0.01em; width: 100%; }
.quantity { display: flex; align-items: center; gap: 16px; margin: 0; }
.quantity p { font-weight: 500; font-size: 15px; color: #050505; margin: 0; font-family: inherit; }
.quantity-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 100px;
  overflow: hidden;
  height: 38px;
  box-sizing: border-box;
  padding: 0;
  flex: none;
  order: 1;
  flex-grow: 0;
}
.quantity-buttons button {
  width: 38px;
  height: 38px;
  border: none;
  font-size: 18px;
  font-weight: 400;
  background: transparent;
  color: #050505;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  flex-shrink: 0;
  flex-grow: 0;
  order: 0;
}
.quantity-buttons button:hover { background: #F5F5F7; }
.quantity-buttons span {
  min-width: 36px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #050505;
  border-left: 1px solid rgba(0,0,0,0.08);
  border-right: 1px solid rgba(0,0,0,0.08);
  line-height: 38px;
}
.coupon-container { display: flex; flex-direction: column; gap: 12px; }
.coupon { width: 100%; background: #F9F9FB; padding: 16px 20px; border: 1px solid rgba(0,0,0,0.04); border-radius: 16px; margin: 0; }
.coupon p { font-size: 14px; color: #555; margin-bottom: 12px; line-height: 1.5; }
.coupon button { background: #050505; color: #fff; border: none; padding: 8px 18px; border-radius: 100px; font-size: 13px; font-weight: 500; cursor: pointer; transition: background 0.25s ease; margin-top: 0; }
.coupon button:hover { background: #333; }
.coupon-apply { display: flex; gap: 10px; margin-top: 0; }
.coupon-apply input { flex: 1; padding: 11px 18px; border: 1px solid rgba(0,0,0,0.1); border-radius: 100px; outline: none; font-size: 14px; color: #050505; background: #F9F9FB; transition: border-color 0.2s ease, background 0.2s ease; }
.coupon-apply input:focus { border-color: rgba(0,0,0,0.25); background: #fff; box-shadow: none; }
.coupon-apply input::placeholder { color: #aaa; }
.coupon-apply button { padding: 11px 22px; border: none; background: #050505; color: white; border-radius: 100px; cursor: pointer; font-size: 14px; font-weight: 500; transition: background 0.25s ease; white-space: nowrap; }
.coupon-apply button:hover { background: #333; }
.coupon-message { font-size: 13px; font-weight: 400; color: #666; padding-left: 4px; margin-top: 0; }
.actions { display: flex; width: 100%; align-items: center; gap: 12px; height: auto; }
.add-to-bag,
.add-to-wishlist {
  height: 52px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 1;
  border-width: 1px;
}
.add-to-bag { flex: 1; background: #050505; color: white; border: none; letter-spacing: 0.01em; padding: 0 28px; width: auto; }
.add-to-bag:hover { background: #222; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,0.15); }
.add-to-bag:disabled { background: #ccc; cursor: not-allowed; transform: none; box-shadow: none; }
.add-to-bag .logo { width: 18px; height: 18px; filter: brightness(0) invert(1); }
.add-to-wishlist { width: 52px; flex: 0 0 52px; background: transparent; border: 1px solid rgba(0,0,0,0.12); color: #050505; font-size: 13px; line-height: normal; padding: 0; }
.add-to-wishlist:hover { border-color: rgba(0,0,0,0.3); background: #F5F5F7; }
.add-to-wishlist .logo { width: 18px; height: 18px; }
.add-to-wishlist span { display: none; }
.input-wrapper { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 390px; border: 1px solid rgba(0,0,0,0.1); border-radius: 100px; background-color: #F9F9FB; padding: 0 16px; font-family: sans-serif; font-size: 14px; }
.input-wrapper span.placeholder { color: #888; }
.input-wrapper button { background: none; border: none; color: #050505; font-weight: bold; cursor: pointer; }
.zoom-wrapper { position: relative; width: 100%; border-radius: 24px; overflow: hidden; cursor: crosshair; background: #F5F5F7; }
.main-image { width: 100%; border-radius: 24px; display: block; }
.zoom-lens { position: absolute; border: 1.5px solid rgba(0,0,0,0.15); background: rgba(255,255,255,0.2); pointer-events: none; border-radius: 8px; backdrop-filter: blur(2px); }
.zoom-result { width: 340px; height: 340px; margin-left: 20px; border-radius: 20px; background-repeat: no-repeat; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 20px 50px rgba(0,0,0,0.06); flex-shrink: 0; }
.zoom-container { width: 100%; overflow: hidden; border-radius: 24px; cursor: zoom-in; position: relative; }
.zoom-image { width: 100%; transition: transform 0.15s ease; }
.thumbnails { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
.thumbnails img { width: 72px; height: 72px; object-fit: contain; border-radius: 14px; cursor: pointer; border: 2px solid transparent; background: #F9F9FB; transition: border-color 0.25s ease; padding: 4px; }
.thumbnails img:hover { border-color: rgba(0,0,0,0.15); }
.thumbnails img.active { border-color: #050505; }
@media screen and (max-width: 992px) {
  .product-card { flex-direction: column; padding: 20px; gap: 32px; margin: 20px auto; }
  .product-image { position: static; flex: none; width: 100%; }
  .zoom-result { display: none; }
  .zoom-lens { display: none; }
}
@media screen and (max-width: 640px) {
  .product-card { padding: 16px; gap: 24px; }
  h2 { font-size: 1.5rem; line-height: 1.2; }
  .description { font-size: 14px; }
  .price { gap: 8px; }
  .current-price { font-size: 1.75rem; }
  .old-price { font-size: 13px; }
  .discount { font-size: 11px; }
  .quantity { justify-content: space-between; }
  .coupon-container { gap: 8px; position: relative; isolation: isolate; z-index: 1; }
  .coupon { padding: 14px 16px; margin: 0; }
  .coupon-apply { flex-direction: column; z-index: 2; position: relative; }
  .coupon-apply button { width: 100%; }
  .actions { flex-direction: row; gap: 10px; height: auto; }
  .add-to-bag { width: 100%; flex: 1; }
  .add-to-wishlist { width: 52px; flex: 0 0 52px; display: flex; }
  .thumbnails img { width: 58px; height: 58px; }
}
@media screen and (min-width: 641px) and (max-width: 992px) {
  h2 { font-size: 1.75rem; }
  .description { font-size: 15px; }
  .current-price { font-size: 1.75rem; }
  .actions { justify-content: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .price-animated, .thumbnails img, .zoom-image,
  .add-to-bag, .add-to-wishlist, .quantity-buttons button {
    animation: none !important;
    transition: none !important;
  }
}
</style>`;
fs.writeFileSync(path, before + newStyle + after, 'utf8');
console.log('Done! File size:', (before + newStyle + after).length, 'bytes');
