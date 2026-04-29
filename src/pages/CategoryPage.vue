<template>
  <div class="categoryPage">
    <section class="categoryHero sectionReveal">
      <div class="heroContent">
        <p class="heroTag">CATEGORIES</p>
        <h1 class="heroTitle">{{ formatCategory(categoryName) }}</h1>
        <p class="heroDescription">
          {{ getCategoryDescription(categoryName) }}
        </p>
        <div class="heroStats">
          <span class="stat">{{ filteredProducts.length }} Products</span>
          <span class="separator">•</span>
          <span class="stat">{{ categories.length }} Categories</span>
        </div>
      </div>
      <div class="heroVisual">
        <div class="floatingProducts" v-if="heroProducts.length">
          <img
            v-for="(product, index) in heroProducts"
            :key="product.id"
            :src="product.thumbnail"
            class="floatProduct"
            :class="'p' + (index + 1)"
            fetchpriority="high"/>
        </div>
      </div>
    </section>

    <section class="categoryContent sectionReveal">
      <div v-if="showSidebar" class="sidebarOverlay" @click="showSidebar = false"></div>
      <div class="contentContainer">
        
        <OptimizedFilters
          :categories="categories"
          :products="allProducts"
          :show-sidebar="showSidebar"
          @filters-changed="handleFiltersChanged"
          @reset-filters="resetFilters"
          @close-sidebar="showSidebar = false"/>

        <main class="mainContent">
          <AdvancedSearchBar
            :products="allProducts"
            :popular-searches="popularSearches"
            @search="handleSearch"
            @product-selected="handleProductSelected"/>

          <div class="contentHeader">
            <div class="resultsInfo">
              <p>Showing {{ filteredProducts.length }} of {{ allProducts.length }} products</p>
            </div>
            <div class="viewOptions">
              <div class="viewToggle">
                <button 
                  class="viewBtn" 
                  :class="{ active: viewMode === 'grid' }"
                  @click="setViewMode('grid')"
                  :aria-label="'Grid view'">
                  <span class="icon">⊞</span>
                  <span>Grid</span>
                </button>
                <button 
                  class="viewBtn" 
                  :class="{ active: viewMode === 'list' }"
                  @click="setViewMode('list')"
                  :aria-label="'List view'">
                  <span class="icon">☰</span>
                  <span>List</span>
                </button>
              </div>
              <select v-model="sortBy" @change="applySorting" class="sortSelect">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A-Z</option>
              </select>

              <button 
                v-if="hasActiveFilters" 
                class="resetAllLink" 
                @click="resetFilters"
                aria-label="Reset all filters">
                Reset All
              </button>

              <button class="mobileFilterBtn" @click="toggleSidebar">
                <span>Filters</span>
                <span class="filterCount" v-if="hasActiveFilters">{{ activeFilterCount }}</span>
              </button>
            </div>
          </div>

          <VirtualProductGrid
            :products="filteredProducts"
            :loading="loading"
            :view-mode="viewMode"
            @toggle-comparison="toggleComparison"
            @is-in-comparison="isInComparison"
            @open-quick-view="openQuickView"
            @add-to-cart="addToCart"/>

          <div v-if="!loading && filteredProducts.length === 0" class="noResults">
            <h3>No products found</h3>
            <p>Try adjusting your filters or browse all categories</p>
            <button @click="resetFilters" class="resetFiltersBtn">Reset Filters</button>
          </div>
        </main>
      </div>
    </section>

    <QuickViewModal
      v-if="showQuickView"
      :product="selectedProduct"
      :related-products="relatedProducts"
      @close="closeQuickView"
      @add-to-cart="addToCart"
      @buy-now="buyNow"
      @toggle-wishlist="toggleWishlist"
      @select-related="selectRelatedProduct"/>
    <ComparisonModal
      v-if="showComparisonModal"
      :products="comparisonProducts"
      @close="closeComparisonModal"
      @remove-product="removeFromComparison"
      @add-all-to-cart="addAllToCart"
      @clear-comparison="clearComparison"/>

    <div 
      v-if="comparisonProducts.length > 0" 
      class="compareFloatingBtn"
      @click="openComparisonModal">
      <span>⚖️ Compare ({{ comparisonProducts.length }})</span>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "../stores/products";
import axios from "axios";
import VirtualProductGrid from "@/components/VirtualProductGrid.vue";
import AdvancedSearchBar from "@/components/AdvancedSearchBar.vue";
import OptimizedFilters from "@/components/OptimizedFilters.vue";
import QuickViewModal from "@/components/QuickViewModal.vue";
import ComparisonModal from "@/components/ComparisonModal.vue";

export default {
  name: "CategoryPage",
  components: {
    VirtualProductGrid,
    AdvancedSearchBar,
    OptimizedFilters,
    QuickViewModal,
    ComparisonModal
  },
  data() {
    return {
      loading: false,
      allProducts: [],
      filteredProducts: [],
      categories: [],
      currentFilters: {
        categories: [],
        priceRange: 2000,
        minRating: 0,
        onlyInStock: false,
        onSale: false,
        freeShipping: false
      },
      sortBy: "featured",
      showSidebar: false,
      categoryName: "",
      viewMode: 'grid',
      searchQuery: '',
      popularSearches: ['iPhone', 'Laptop', 'Headphones', 'Watch', 'Tablet'],
      // Quick View Modal
      showQuickView: false,
      selectedProduct: null,
      relatedProducts: [],
      // Product Comparison
      comparisonProducts: [],
      showComparisonModal: false,
      maxComparisonItems: 4
    };
  },
  setup() {
    const productStore = useProductStore();
    return { productStore };
  },
  computed: {
    heroProducts() {
      return this.filteredProducts.slice(0, 3);
    },
    hasActiveFilters() {
      return (
        this.currentFilters.categories.length > 0 ||
        this.currentFilters.priceRange < 2000 ||
        this.currentFilters.minRating > 0 ||
        this.currentFilters.onlyInStock ||
        this.currentFilters.onSale ||
        this.currentFilters.freeShipping
      );
    },
    activeFilterCount() {
      let count = 0;
      if (this.currentFilters.categories.length > 0) count += this.currentFilters.categories.length;
      if (this.currentFilters.priceRange < 2000) count += 1;
      if (this.currentFilters.minRating > 0) count += 1;
      if (this.currentFilters.onlyInStock) count += 1;
      if (this.currentFilters.onSale) count += 1;
      if (this.currentFilters.freeShipping) count += 1;
      return count;
    }
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        this.categoryName = this.$route.params.slug || 'all-categories';

        const cacheKey = 'products_cache';
        const cachedData = localStorage.getItem(cacheKey);
        const cacheTime = localStorage.getItem(cacheKey + '_time');
        const now = Date.now();
        
        if (cachedData && cacheTime && (now - parseInt(cacheTime)) < 3600000) { // 1 hour cache
          this.allProducts = JSON.parse(cachedData);
        } else {
          try {
            const { data } = await axios.get("https://dummyjson.com/products?limit=0");
            this.allProducts = data.products;
            localStorage.setItem(cacheKey, JSON.stringify(data.products));
            localStorage.setItem(cacheKey + '_time', now.toString());
          } catch (apiError) {
            console.error('API Error, using fallback data:', apiError);
            this.allProducts = this.getFallbackData();
          }
        }
        await this.getCategories();

        this.applyFilters();
      } catch (error) {
        console.error("Error fetching data:", error);
        this.allProducts = this.getFallbackData();
        this.applyFilters();
      } finally {
        this.loading = false;
      }
    },

    getFallbackData() {
      return [
        {
          id: 1,
          title: "iPhone 14 Pro",
          price: 999,
          rating: 4.5,
          category: "smartphones",
          thumbnail: "https://dummyjson.com/image/150/150",
          images: ["https://dummyjson.com/image/150/150"],
          discountPercentage: 10,
          description: "Latest iPhone with advanced features"
        },
        {
          id: 2,
          title: "MacBook Pro",
          price: 1999,
          rating: 4.8,
          category: "laptops",
          thumbnail: "https://dummyjson.com/image/150/150",
          images: ["https://dummyjson.com/image/150/150"],
          discountPercentage: 5,
          description: "Powerful laptop for professionals"
        },
        {
          id: 3,
          title: "Samsung Galaxy S23",
          price: 899,
          rating: 4.3,
          category: "smartphones",
          thumbnail: "https://dummyjson.com/image/150/150",
          images: ["https://dummyjson.com/image/150/150"],
          discountPercentage: 15,
          description: "Premium Android smartphone"
        }
      ];
    },

    async getCategories() {
      try {
        const categoriesMap = {};
        this.allProducts.forEach(product => {
          if (!categoriesMap[product.category]) {
            categoriesMap[product.category] = [];
          }
          categoriesMap[product.category].push(product);
        });

        this.categories = Object.entries(categoriesMap)
          .map(([slug, products]) => ({
            slug,
            thumbnail: products.find(p => p.thumbnail)?.thumbnail
          }))
          .filter(c => c.thumbnail);

        if (this.categoryName && this.categoryName !== 'all-categories') {
          this.currentFilters.categories = [this.categoryName];
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    handleFiltersChanged(filters) {
      this.currentFilters = { ...filters };
      this.applyFilters();
    },

    handleSearch(query) {
      this.searchQuery = query;
      this.applyFilters();
    },

    handleProductSelected(product) {
      this.goToProduct(product.id);
    },

    applyFilters() {
      let filtered = [...this.allProducts];
      
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }

      if (this.currentFilters.categories.length > 0) {
        filtered = filtered.filter(product => 
          this.currentFilters.categories.includes(product.category)
        );
      }

      filtered = filtered.filter(product => product.price <= this.currentFilters.priceRange);

      if (this.currentFilters.minRating > 0) {
        filtered = filtered.filter(product => product.rating >= this.currentFilters.minRating);
      }

      if (this.currentFilters.onlyInStock) {
        filtered = filtered.filter(product => product.stock > 0);
      }

      if (this.currentFilters.onSale) {
        filtered = filtered.filter(product => product.discountPercentage > 0);
      }

      if (this.currentFilters.freeShipping) {
        filtered = filtered.filter(product => product.price >= 50); // Free shipping for orders over $50
      }

      this.filteredProducts = filtered;
      this.applySorting();
    },

    applySorting() {
      let sorted = [...this.filteredProducts];
      
      switch (this.sortBy) {
        case "price-low":
          sorted.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          sorted.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          sorted.sort((a, b) => b.rating - a.rating);
          break;
        case "name":
          sorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }
      
      this.filteredProducts = sorted;
    },

    resetFilters() {
      this.currentFilters = {
        categories: [],
        priceRange: 2000,
        minRating: 0,
        onlyInStock: false,
        onSale: false,
        freeShipping: false
      };
      this.searchQuery = '';
      this.sortBy = "featured";
      this.applyFilters();
      this.showSidebar = false;
    },

    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },

    setViewMode(mode) {
      this.viewMode = mode;
      localStorage.setItem('categoryViewMode', mode);
    },

    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },

    addToCart(product) {
      console.log("Added to cart:", product);
    },

    toggleComparison(product) {
      const index = this.comparisonProducts.findIndex(p => p.id === product.id);
      
      if (index > -1) {
        this.comparisonProducts.splice(index, 1);
      } else if (this.comparisonProducts.length < this.maxComparisonItems) {
        this.comparisonProducts.push(product);
      } else {
        alert(`You can compare maximum ${this.maxComparisonItems} products`);
      }
    },

    isInComparison(productId) {
      return this.comparisonProducts.some(p => p.id === productId);
    },

    removeFromComparison(productId) {
      const index = this.comparisonProducts.findIndex(p => p.id === productId);
      if (index > -1) {
        this.comparisonProducts.splice(index, 1);
      }
    },

    clearComparison() {
      this.comparisonProducts = [];
      this.closeComparisonModal();
    },

    openComparisonModal() {
      this.showComparisonModal = true;
      document.body.style.overflow = 'hidden';
    },

    closeComparisonModal() {
      this.showComparisonModal = false;
      document.body.style.overflow = 'auto';
    },

    addAllToCart() {
      this.comparisonProducts.forEach(product => {
        this.addToCart(product);
      });
      this.clearComparison();
    },

    openQuickView(product) {
      this.selectedProduct = product;
      this.loadRelatedProducts(product);
      this.showQuickView = true;
      document.body.style.overflow = 'hidden';
    },

    closeQuickView() {
      this.showQuickView = false;
      this.selectedProduct = null;
      this.relatedProducts = [];
      document.body.style.overflow = 'auto';
    },

    selectRelatedProduct(product) {
      this.selectedProduct = product;
      this.loadRelatedProducts(product);
    },

    loadRelatedProducts(product) {
      this.relatedProducts = this.allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
    },

    buyNow(product) {
      this.addToCart(product);
      this.$router.push('/checkout');
    },

    toggleWishlist(product) {
      console.log('Toggle wishlist for:', product);
    },

    formatPrice(price) {
      return new Intl.NumberFormat("en-US").format(price);
    },

    formatCategory(name) {
      if (name === 'all-categories') {
        return 'All Categories';
      }
      return name
        .replace("-", " ")
        .replace(/\b\w/g, l => l.toUpperCase());
    },

    getCategoryDescription(category) {
      const descriptions = {
        'all-categories': 'Browse our complete collection of products across all categories',
        'smartphones': 'Latest smartphones with cutting-edge technology and premium features',
        'laptops': 'High-performance laptops for work, gaming, and creative professionals',
        'fragrances': 'Luxury fragrances and perfumes from renowned brands',
        'skin-care': 'Premium skincare products for healthy and glowing skin',
        'groceries': 'Fresh groceries and essential food items for your daily needs',
        'home-decoration': 'Beautiful home decoration items to enhance your living space'
      };
      return descriptions[category] || 'Discover amazing products in this category';
    },

    handleKeydown(e) {
      if (e.key === 'Escape') {
        if (this.showQuickView) this.closeQuickView();
        if (this.showComparisonModal) this.closeComparisonModal();
      }
    },

    initReveal() {
      const elements = document.querySelectorAll(".sectionReveal");
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.15 }
      );
      elements.forEach((el) => this.observer.observe(el));
    }
  },
  watch: {
    '$route.params.slug': {
      handler() {
        this.fetchData();
      },
      immediate: true
    }
  },
  created() {
    const savedViewMode = localStorage.getItem('categoryViewMode');
    if (savedViewMode) {
      this.viewMode = savedViewMode;
    }
    // fetchData is now called by the watcher with immediate: true
  },
  mounted() {
    window.scrollTo(0, 0);
    this.initReveal();
    document.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
    if (this.observer) {
      this.observer.disconnect();
    }
  }
};
</script>

<style>
.categoryPage {
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
.categoryHero {
  max-width: 1200px;
  margin: 28px auto 18px;
  padding: 60px;
  min-height: 420px;
  border-radius: 26px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: white;
  perspective: 1000px;
  background:
    radial-gradient(circle at 10% 20%, rgba(99,102,241,0.25), transparent 40%),
    radial-gradient(circle at 90% 70%, rgba(168,85,247,0.18), transparent 40%),
    linear-gradient(135deg,#1e1b4b,#312e81,#4c1d95);
}
.categoryHero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent, rgba(255,255,255,0.05), transparent);
  pointer-events: none;
}
.heroContent {
  max-width: 560px;
  position: relative;
  z-index: 2;
  animation: heroFade 0.8s ease;
}
.heroTag {
  font-size: 12px;
  letter-spacing: 3px;
  color: #a78bfa;
  margin-bottom: 14px;
  font-weight: 700;
}
.heroTitle {
  font-weight: 900;
  margin-bottom: 16px;
  line-height: 1.1;
  font-size: 40px;
  color: white;
  text-shadow: 0 4px 20px rgba(0,0,0,0.6);
}
.heroDescription {
  color: #d1d5db;
  margin-bottom: 20px;
  font-size: 16px;
  max-width: 480px;
}
.heroStats {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #a78bfa;
}
.separator {
  color: #6b7280;
}
.heroVisual {
  position: absolute;
  right: 40px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}
.floatingProducts {
  display: flex;
  gap: 30px;
}
.floatProduct {
  width: 140px;
  height: 140px;
  object-fit: contain;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.35);
  transition: transform .6s;
  animation: float 6s ease-in-out infinite;
}

.p1 { transform: translateY(-20px); }
.p2 { transform: translateY(30px); animation-delay: 1s; }
.p3 { transform: translateY(-10px); animation-delay: 2s; }

.categoryHero:hover .p1 { transform: translateY(-30px) rotate(-4deg); }
.categoryHero:hover .p2 { transform: translateY(40px) rotate(4deg); }
.categoryHero:hover .p3 { transform: translateY(-10px) rotate(-2deg); }

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-22px) rotate(2deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes heroFade {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.categoryContent {
  max-width: 1200px;
  margin: auto;
  padding: 40px 20px 90px;
  background: #fafafa;
  position: relative;
  overflow: hidden;
}
.contentContainer {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

.sidebarOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1500;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.mainContent {
  min-height: 600px;
}
.contentHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.resultsInfo p {
  color: #6b7280;
  font-size: 14px;
}

.viewOptions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.viewToggle {
  display: flex;
  background: white;
  border-radius: 10px;
  padding: 4px;
  border: 1px solid #e5e7eb;
}

.viewBtn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #6b7280;
  transition: all 0.2s;
}
.viewBtn.active {
  background: #050505;
  color: white;
}
.viewBtn:hover:not(.active) {
  background: #f3f4f6;
}

.viewBtn .icon {
  font-size: 16px;
}

.sortSelect {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
}

.resetAllLink {
  background: none;
  border: none;
  color: #050505;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  padding: 8px;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.resetAllLink:hover {
  opacity: 0.7;
}

.mobileFilterBtn {
  display: flex;
  background: #050505;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  position: relative;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s, background 0.2s;
}

.mobileFilterBtn:hover {
  background: #333;
  transform: translateY(-2px);
}
.filterCount {
  background: #ef4444;
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 4px;
}
.noResults {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}
.noResults h3 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #374151;
}
.noResults p {
  margin-bottom: 20px;
}
.resetFiltersBtn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.resetFiltersBtn:hover {
  background: #050505;
}

.compareFloatingBtn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #6366f1;
  color: white;
  padding: 12px 20px;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
  transition: all 0.3s;
  z-index: 1000;
  font-weight: 600;
}
.compareFloatingBtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(99, 102, 241, 0.4);
}

.sectionReveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.7s cubic-bezier(.22,.61,.36,1);
}
.sectionReveal.visible {
  opacity: 1;
  transform: translateY(0);
}
@media (max-width: 1024px) {
  .categoryPage {
    padding-top: 76px;
  }
  .categoryHero {
    padding: 50px 40px;
    min-height: 380px;
  }
  .heroContent {
    max-width: 50%;
  }
  .heroTitle {
    font-size: 32px;
  }
  .heroVisual {
    right: 30px;
    width: 45%;
  }
  .floatingProducts {
    gap: 20px;
  }
  .floatProduct {
    width: 100px;
    height: 100px;
    padding: 10px;
  }
  .contentContainer {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .contentHeader {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .mobileFilterBtn {
    display: flex;
  }
}
@media (max-width: 768px) {
  .categoryPage {
    padding-top: 70px;
  }
  .categoryHero {
    margin: 10px 12px 18px;
    padding: 24px 16px;
    min-height: auto;
    border-radius: 16px;
    flex-direction: column;
    text-align: center;
    overflow: hidden;
  }
  .heroContent {
    max-width: 100%;
    padding: 0 8px;
  }
  .heroTag {
    font-size: 10px;
    letter-spacing: 2px;
    margin-bottom: 8px;
  }
  .heroTitle {
    font-size: 20px;
    line-height: 1.2;
    margin-bottom: 12px;
    word-wrap: break-word;
    hyphens: auto;
  }
  .heroDescription {
    font-size: 13px;
    margin-bottom: 16px;
    max-width: 100%;
    line-height: 1.4;
  }
  .heroStats {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    font-size: 12px;
  }
  .heroVisual {
    position: relative;
    right: auto;
    top: auto;
    margin-top: 20px;
    width: 100%;
    overflow: hidden;
  }
  .floatingProducts {
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
  }
  .floatProduct {
    width: 60px;
    height: 60px;
    padding: 8px;
    border-radius: 12px;
  }
  .p1, .p2, .p3 {
    transform: none;
    animation: none;
  }
  .categoryContent {
    padding: 16px 12px;
  }
  .contentContainer {
    gap: 16px;
  }
  .contentHeader {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    margin-bottom: 16px;
  }
  .resultsInfo p {
    text-align: center;
    font-size: 13px;
  }
  .viewOptions {
    flex-direction: column;
    gap: 8px;
  }
  .viewToggle {
    order: 2;
    justify-content: center;
  }
  .sortSelect {
    order: 1;
    width: 100%;
    padding: 10px 12px;
    font-size: 14px;
  }
  .mobileFilterBtn {
    order: 3;
    width: 100%;
    justify-content: center;
    padding: 10px 16px;
  }
  .viewBtn {
    flex: 1;
    justify-content: center;
    padding: 8px 12px;
    font-size: 13px;
  }
  .viewBtn .icon {
    font-size: 14px;
  }
  .compareFloatingBtn {
    bottom: 12px;
    right: 12px;
    left: 12px;
    right: auto;
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media (max-width: 480px) {
  .categoryHero {
    margin: 8px;
    padding: 20px 12px;
    border-radius: 12px;
  }
  .heroTitle {
    font-size: 18px;
  }
  .heroTag {
    font-size: 9px;
    letter-spacing: 1.5px;
  }
  .heroDescription {
    font-size: 12px;
  }
  .floatingProducts {
    gap: 8px;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
  }
  .floatProduct {
    width: 50px;
    height: 50px;
    padding: 6px;
    border-radius: 10px;
  }
  .heroStats {
    font-size: 11px;
    gap: 6px;
  }
  .categoryContent {
    padding: 12px 8px;
  }
  .contentHeader {
    margin-bottom: 12px;
  }
  .viewBtn {
    padding: 6px 8px;
    font-size: 12px;
  }
  .viewBtn .icon {
    font-size: 12px;
  }
  .sortSelect {
    padding: 8px 10px;
    font-size: 13px;
  }
  .mobileFilterBtn {
    padding: 8px 12px;
    font-size: 13px;
  }
  .noResults {
    padding: 40px 16px;
  }
  .noResults h3 {
    font-size: 20px;
  }
  .noResults p {
    font-size: 14px;
  }
  .resetFiltersBtn {
    padding: 10px 20px;
    font-size: 14px;
  }
}
@media (max-width: 360px) {
  .heroTitle {
    font-size: 16px;
  }
  .floatingProducts {
    gap: 6px;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
  }
  .floatProduct {
    width: 45px;
    height: 45px;
    padding: 4px;
  }
  .viewBtn span:not(.icon) {
    display: none;
  }
  .viewBtn {
    padding: 8px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .sectionReveal {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  
  .floatProduct {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
  
  .compareFloatingBtn {
    transition: none !important;
    transform: none !important;
  }
}
</style>
