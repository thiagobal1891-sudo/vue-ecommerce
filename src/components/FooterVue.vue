<template>
  <footer class="footer">
    <div class="footer-container">

      <div class="footer-columns">

        <div class="column">
          <h3 @click="toggle('shop')" class="accordion-title">
            Shop by Category
            <span class="arrow" :class="{ open: openSection === 'shop' }">+</span>
          </h3>

<ul :class="{ open: openSection === 'shop' }">
  <li>
    <router-link to="/category/skin-care">Skincare</router-link>
  </li>
  <li>
    <router-link to="/category/bauty">Personal Care</router-link>
  </li>
  <li>
    <router-link to="/category/womens-bags">Handbags</router-link>
  </li>
  <li>
    <router-link to="/category/mens-shirts">Apparels</router-link>
  </li>
  <li>
    <router-link to="/category/mens-watches">Watches</router-link>
  </li>
</ul>
        </div>

        <div class="column">
          <h3 @click="toggle('about')" class="accordion-title">
            About
            <span class="arrow" :class="{ open: openSection === 'about' }">+</span>
          </h3>

          <ul :class="{ open: openSection === 'about' }">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div class="column">
          <h3 @click="toggle('policy')" class="accordion-title">
            Policy
            <span class="arrow" :class="{ open: openSection === 'policy' }">+</span>
          </h3>

          <ul :class="{ open: openSection === 'policy' }">
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Sitemap</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>

        <div class="column social">
          <h3>Follow Us</h3>

          <div class="social-icons">
            <i class="fab fa-facebook"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-youtube"></i>
          </div>

          <div class="location">
            <img src="../assets/location.png" alt="location">
            United States
          </div>
        </div>

      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <div class="copyright">
          © 2026 Thiago Baltrons — All Rights Reserved
        </div>
      </div>

    </div>

  </footer>
</template>
<script>
export default {
  name: "FooterVue",

  data() {
    return {
      openSection: null
    };
  },

  methods: {
    toggle(section) {
      if (window.innerWidth > 640) return;
      this.openSection =
        this.openSection === section ? null : section;
    },
    goToCategory(slug) {
      this.$router.push(`/category/${slug.toLowerCase()}`);
    },
  }
};
</script>
<style>
.footer {
  background: #0a0a0a;
  color: #888;
  margin-top: 0;
}
.footer-container {
  max-width: 1300px;
  margin: auto;
  padding: 80px 40px 40px;
}
.footer-columns {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 45px;
}
.column h3 {
  color: #ffffff;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 24px;
  font-weight: 600;
}
.column ul {
  list-style: none;
}
.column li {
  margin-bottom: 12px;
}
.column a {
  text-decoration: none;
  color: #666;
  font-size: 14px;
  transition: color 0.2s ease;
  line-height: 1.4;
}
.column a:hover {
  color: #ffffff;
}

.social-icons {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}
.social-icons i {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 15px;
  color: #666;
  transition: all 0.3s ease;
}
.social-icons i:hover {
  border-color: rgba(255,255,255,0.4);
  color: white;
}

.location {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #555;
}
.location img {
  width: 14px;
  opacity: 0.5;
}

.footer-divider {
  height: 1px;
  background: rgba(255,255,255,0.06);
  margin: 60px 0 32px;
}
.footer-bottom {
  display: flex;
  justify-content: center;
}
.copyright {
  font-size: 13px;
  color: #444;
  letter-spacing: 0.02em;
}

.accordion-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.arrow {
  display: none;
  transition: 0.25s;
}
.arrow.open {
  transform: rotate(45deg);
}
@media (max-width: 1024px) {
  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
}
@media (max-width: 640px) {
  .footer-container {
    padding: 50px 20px 30px;
  }
  .footer-columns {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .arrow {
    display: block;
  }
  .column ul {
    max-height: 0;
    overflow: hidden;
    transition: all 0.35s ease;
  }
  .column ul.open {
    max-height: 300px;
    margin-top: 10px;
  }
  .footer-bottom {
    justify-content: flex-start;
  }
}

</style>