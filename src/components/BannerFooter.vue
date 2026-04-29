<template>
  <section class="banner-section">
    <div class="banner-grid">

      <div class="lifestyle-card">
        <span class="tag">Lifestyle</span>
        <h1>Makeup Accessories from Top Brands</h1>
      </div>

      <router-link class="card skincare" to="/category/skin-care">
        <div class="card-content">
          <span class="card-action">Shop</span>
          <h3>Skincare Essentials</h3>
        </div>
        <div class="arrow"></div>
      </router-link>

      <router-link class="card facepacks" to="/category/beauty">
        <div class="card-content">
          <span class="card-action">Shop</span>
          <h3>Facepacks & Peels</h3>
        </div>
        <div class="arrow"></div>
      </router-link>

    </div>
  </section>
</template>

<script>
export default {
  name: 'BannerFooter'
}
</script>

<style>
.banner-section {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto 80px;
  padding: 0 40px 80px;
}

.banner-section-header {
  margin-bottom: 60px;
  text-align: left;
}

.banner-section-mini {
  font-size: 11px;
  letter-spacing: 3px;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 12px;
  font-weight: 600;
  display: block;
}

.banner-section-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: #050505;
  margin: 0;
  line-height: 1;
}

.banner-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 380px 220px;
  gap: 20px;
}

.lifestyle-card {
  grid-column: span 2;
  position: relative;
  background: #0a0a0a;
  background-image:
    linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
    url('https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1400&q=80');
  background-size: cover;
  background-position: center;
  border-radius: 24px;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  transition: box-shadow 0.5s ease;
}

.lifestyle-card:hover {
  box-shadow: 0 30px 60px rgba(0,0,0,0.15);
}

.tag {
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-bottom: 16px;
  display: block;
  font-weight: 600;
}

.lifestyle-card h1 {
  font-size: clamp(2rem, 3.5vw, 3rem);
  line-height: 1.05;
  font-weight: 600;
  color: white;
  margin: 0;
  letter-spacing: -0.03em;
  max-width: 700px;
}

.card {
  position: relative;
  border-radius: 24px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px;
  transition: box-shadow 0.5s ease;
}

.card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.7) 0%,
    rgba(0,0,0,0.2) 50%,
    transparent 100%
  );
  transition: opacity 0.5s ease;
}

.card:hover {
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
}

.card:hover::after {
  opacity: 0.85;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  z-index: 2;
}

.card-action {
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.65);
  font-weight: 600;
}

.card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: white;
  margin: 0;
  line-height: 1.2;
}

.arrow {
  position: absolute;
  bottom: 28px;
  right: 28px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.2);
  opacity: 0;
  transform: translate(4px, 4px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;
}

.card:hover .arrow {
  opacity: 1;
  transform: translate(0, 0);
}

.arrow::before {
  content: "";
  width: 10px;
  height: 10px;
  border-right: 1.5px solid #fff;
  border-top: 1.5px solid #fff;
  transform: rotate(45deg) translate(-1px, 1px);
}

.skincare {
  background-image:
    url('https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1000w,f_avif,q_auto:eco,dpr_2/rockcms/2024-01/240117-staff-skin-care-routines-social-2c85d8.jpg');
}

.facepacks {
  background-image:
    url('https://shipcartecommerce.com/cdn/shop/collections/877f03da31ad8bb130dde99698f7d3ec.jpg?v=1748635689');
}

@media (max-width: 992px) {
  .banner-section {
    padding: 0 20px 60px;
  }
}

@media (max-width: 768px) {
  .banner-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  .lifestyle-card {
    grid-column: span 1;
    min-height: 300px;
    padding: 40px;
  }
  .lifestyle-card h1 {
    font-size: 1.8rem;
  }
  .card {
    min-height: 200px;
    padding: 24px;
  }
  .card h3 {
    font-size: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .lifestyle-card,
  .arrow {
    transition: none !important;
  }
}
</style>
