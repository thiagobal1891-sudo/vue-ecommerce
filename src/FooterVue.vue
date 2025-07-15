
<template>
  <footer class="footer">
   
    <div class="footer-content desktop-footer">
      <div class="footer-columns">
        <div class="column">
          <h3>Shop by Category</h3>
          <ul>
            <li>Skincare</li>
            <li>Personal Care</li>
            <li>Handbags</li>
            <li>Apparels</li>
            <li>Watches</li>
            <li>Eye Wear</li>
            <li>Jewellery</li>
          </ul>
        </div>

        <div class="column">
          <h3>About</h3>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>

        <div class="column">
          <h3>Policy</h3>
          <ul>
            <li>Return Policy</li>
            <li>Terms of Use</li>
            <li>Sitemap</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>EPR Compliance</li>
          </ul>
        </div>
      </div>
      
          
   
      <div class="footer-right">
       
        <div class="social-icons">
          <img src="./assets/redeslogo.png" alt="redes">
          <i class="fab fa-facebook"></i>
          <i class="fab fa-instagram"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-youtube"></i>
        </div>

        <div class="location">
          <i class="fas fa-map-marker-alt"></i>
          <img src="./assets/location.png" alt="">
          United States
        </div>

        <div class="copyright">
          © 2021 | Cora Leviene All Rights Reserved
        </div>
      </div>
    </div>

   
    <div class="mobile-footer">
     
      <div class="footer-section">
        <h3>Shop by Category</h3>
        <ul>
          <li>Skincare</li>
          <li>Personal Care</li>
          <li>Handbags</li>
          <li>Apparels</li>
          <li>Watches</li>
          <li>Eye Wear</li>
          <li>Jewellery</li>
        </ul>
      </div>

      
      <div class="footer-section">
        <h3>Policy</h3>
        <div class="inline-links">
          <span>Return</span><span>|</span>
          <span>Terms of Use</span><span>|</span>
          <span>Sitemap</span><span>|</span>
          <span>Security</span><span>|</span>
          <span>Privacy</span><span>|</span>
          <span>EPR Compliance</span>
        </div>
      </div>

      
      <div class="footer-section">
        <h3>About</h3>
        <div class="inline-links">
          <span>Contact Us</span><span>|</span>
          <span>About Us</span><span>|</span>
          <span>Careers</span><span>|</span>
          <span>Press</span>
        </div>
      </div>

      <hr />

      <div class="footer-bottom">
        <div class="social-icons">
          <i class="fab fa-facebook-f"></i>
          <i class="fab fa-instagram"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-youtube"></i>
        </div>

        <div class="location">
          <i class="fas fa-map-marker-alt"></i>
          <span>United States</span>
        </div>

        <div class="copyright">
          ©2021|CoraLevieneAllRightsReserved
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'FooterVue',
  data() {
    return {

    };
  }
}
</script>




<style scoped>

.footer {
  background-color: #194b63;
  color: #c0d9dd;
  font-family: 'Inter', sans-serif;
  width: 100%;
  padding: 40px 24px;
}


.desktop-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-columns {
  display: flex;
  gap: 48px;
}

.column h3 {
  color: #ffffff;
  margin-bottom: 10px;
  font-size: 17px;
}

.column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.column li {
  margin-bottom: 8px;
  font-size: 15px;
}

.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  text-align: right;
}

.social-icons {
  display: flex;
  gap: 18px;
  font-size: 20px;
}

.location {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
}


.mobile-footer {
  display: none; 
}

.footer-section {
  margin-bottom: 24px;
}

.footer-section h3 {
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 10px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 7px;
  font-size: 14px;
}

.inline-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 14px;
}

hr {
  border: none;
  border-top: 1px solid #4d6e80;
  margin: 24px 0;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
}

@media (max-width: 768px) {

  .desktop-footer { display: none; }
  .mobile-footer  { display: block; }
}
</style>

