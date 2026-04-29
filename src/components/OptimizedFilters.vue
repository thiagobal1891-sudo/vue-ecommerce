<template>
  <aside class="sidebar" :class="{ show: showSidebar }">
    <div class="sidebarHeader">
      <div class="titleWrap">
        <h3>Filters</h3>
        <button class="resetBtn" @click="resetFilters" :aria-label="'Reset all filters'">
          Reset All
        </button>
      </div>
      <button class="closeSidebarBtn" @click="$emit('close-sidebar')" aria-label="Close filters">×</button>
    </div>
    
    <div class="filterGroup">
      <h4>Categories</h4>
      <div class="filterOptions" role="group" :aria-label="'Filter by categories'">
        <label
          v-for="category in categories"
          :key="category.slug"
          class="filterOption"
          :class="{ checked: selectedCategories.includes(category.slug) }">
          <input
            type="checkbox"
            :value="category.slug"
            v-model="selectedCategories"
            @change="applyFilters"
            :id="`category-${category.slug}`"/>
          <span class="checkmark" aria-hidden="true"></span>
          <span class="labelText">{{ formatCategory(category.slug) }}</span>
          <span class="count">({{ getCategoryCount(category.slug) }})</span>
        </label>
      </div>
    </div>

    <div class="filterGroup">
      <h4>Price Range</h4>
      <div class="priceRange">
        <input
          type="range"
          min="0"
          max="2000"
          v-model="priceRange"
          @input="applyFilters"
          class="priceSlider"
          :aria-label="`Price range: $0 to $${priceRange}`"/>
        <div class="priceLabels">
          <span>$0</span>
          <span class="currentPrice">${{ priceRange }}</span>
        </div>
        <div class="pricePresets">
          <button 
            v-for="preset in pricePresets" 
            :key="preset.value"
            @click="setPriceRange(preset.value)"
            class="presetBtn"
            :class="{ active: priceRange === preset.value }">
            {{ preset.label }}
          </button>
        </div>
      </div>
    </div>

    <div class="filterGroup">
      <h4>Rating</h4>
      <div class="ratingOptions" role="group" :aria-label="'Filter by rating'">
        <label
          v-for="rating in [4, 3, 2, 1]"
          :key="rating"
          class="ratingOption"
          :class="{ checked: minRating === rating }">
          <input
            type="radio"
            :value="rating"
            v-model="minRating"
            @change="applyFilters"
            :id="`rating-${rating}`"/>
          <span class="stars" aria-hidden="true">{{ '⭐'.repeat(rating) }} & up</span>
        </label>
      </div>
    </div>

    <div class="filterGroup">
      <h4>More Filters</h4>
      <div class="advancedFilters">
        <label class="filterOption">
          <input
            type="checkbox"
            v-model="onlyInStock"
            @change="applyFilters"
            id="in-stock"/>
          <span class="checkmark" aria-hidden="true"></span>
          <span class="labelText">In Stock Only</span>
        </label>
        
        <label class="filterOption">
          <input
            type="checkbox"
            v-model="onSale"
            @change="applyFilters"
            id="on-sale"/>
          <span class="checkmark" aria-hidden="true"></span>
          <span class="labelText">On Sale</span>
        </label>
        
        <label class="filterOption">
          <input
            type="checkbox"
            v-model="freeShipping"
            @change="applyFilters"
            id="free-shipping"/>
          <span class="checkmark" aria-hidden="true"></span>
          <span class="labelText">Free Shipping</span>
        </label>
      </div>
    </div>

    <div v-if="hasActiveFilters" class="activeFilters">
      <h4>Active Filters</h4>
      <div class="activeFilterTags">
        <span 
          v-for="filter in activeFilterTags" 
          :key="filter.key"
          class="filterTag"
          @click="removeFilter(filter)"
          :aria-label="`Remove ${filter.label} filter`"
          role="button"
          tabindex="0"
          @keydown.enter="removeFilter(filter)">
          {{ filter.label }}
          <span class="remove">×</span>
        </span>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  name: 'OptimizedFilters',
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    products: {
      type: Array,
      default: () => []
    },
    showSidebar: {
      type: Boolean,
      default: false
    }
  },
  emits: ['filters-changed', 'reset-filters', 'close-sidebar'],
  data() {
    return {
      selectedCategories: [],
      priceRange: 2000,
      minRating: 0,
      onlyInStock: false,
      onSale: false,
      freeShipping: false,
      pricePresets: [
        { label: 'Under $50', value: 50 },
        { label: 'Under $100', value: 100 },
        { label: 'Under $500', value: 500 },
        { label: 'Under $1000', value: 1000 }
      ],
      categoryCounts: new Map(),
      filterDebounce: null
    };
  },
  computed: {
    hasActiveFilters() {
      return (
        this.selectedCategories.length > 0 ||
        this.priceRange < 2000 ||
        this.minRating > 0 ||
        this.onlyInStock ||
        this.onSale ||
        this.freeShipping
      );
    },
    activeFilterTags() {
      const tags = [];
      
      this.selectedCategories.forEach(cat => {
        tags.push({
          key: `category-${cat}`,
          label: this.formatCategory(cat),
          type: 'category',
          value: cat
        });
      });
      
      if (this.priceRange < 2000) {
        tags.push({
          key: 'price',
          label: `Under $${this.priceRange}`,
          type: 'price',
          value: this.priceRange
        });
      }
      
      if (this.minRating > 0) {
        tags.push({
          key: 'rating',
          label: `${this.minRating}+ Stars`,
          type: 'rating',
          value: this.minRating
        });
      }
      
      if (this.onlyInStock) {
        tags.push({
          key: 'stock',
          label: 'In Stock',
          type: 'stock',
          value: true
        });
      }
      
      if (this.onSale) {
        tags.push({
          key: 'sale',
          label: 'On Sale',
          type: 'sale',
          value: true
        });
      }
      
      if (this.freeShipping) {
        tags.push({
          key: 'shipping',
          label: 'Free Shipping',
          type: 'shipping',
          value: true
        });
      }
      
      return tags;
    }
  },
  watch: {
    products: {
      immediate: true,
      handler(newProducts) {
        this.calculateCategoryCounts(newProducts);
      }
    }
  },
  methods: {
    applyFilters() {
      clearTimeout(this.filterDebounce);
      this.filterDebounce = setTimeout(() => {
        const filters = {
          categories: this.selectedCategories,
          priceRange: this.priceRange,
          minRating: this.minRating,
          onlyInStock: this.onlyInStock,
          onSale: this.onSale,
          freeShipping: this.freeShipping
        };
        
        this.$emit('filters-changed', filters);
      }, 300);
    },

    resetFilters() {
      this.selectedCategories = [];
      this.priceRange = 2000;
      this.minRating = 0;
      this.onlyInStock = false;
      this.onSale = false;
      this.freeShipping = false;
      
      this.$emit('reset-filters');
      this.applyFilters();
    },

    setPriceRange(value) {
      this.priceRange = value;
      this.applyFilters();
    },

    removeFilter(filter) {
      switch (filter.type) {
        case 'category':
          this.selectedCategories = this.selectedCategories.filter(cat => cat !== filter.value);
          break;
        case 'price':
          this.priceRange = 2000;
          break;
        case 'rating':
          this.minRating = 0;
          break;
        case 'stock':
          this.onlyInStock = false;
          break;
        case 'sale':
          this.onSale = false;
          break;
        case 'shipping':
          this.freeShipping = false;
          break;
      }
      
      this.applyFilters();
    },

    calculateCategoryCounts(products) {
      const counts = new Map();
      
      this.categories.forEach(category => {
        const count = products.filter(product => 
          product.category === category.slug
        ).length;
        counts.set(category.slug, count);
      });
      
      this.categoryCounts = counts;
    },

    getCategoryCount(categorySlug) {
      return this.categoryCounts.get(categorySlug) || 0;
    },

    formatCategory(name) {
      return name
        .replace("-", " ")
        .replace(/\b\w/g, l => l.toUpperCase());
    }
  }
};
</script>
<style>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  background: white;
  z-index: 2000;
  padding: 32px 24px;
  box-shadow: 20px 0 50px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;
}
.sidebar.show {
  transform: translateX(0);
  visibility: visible;
  opacity: 1;
  pointer-events: all;
}
.sidebarHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
}

.titleWrap h3 {
  font-size: 20px;
  font-weight: 700;
  color: #050505;
  margin: 0 0 4px 0;
}

.closeSidebarBtn {
  background: #f3f4f6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.closeSidebarBtn:hover {
  background: #050505;
  color: white;
}

.resetBtn {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}
.resetBtn:hover {
  background: #f3f4f6;
  color: #111;
  text-decoration: none;
}

.filterGroup {
  margin-bottom: 32px;
}
.filterGroup h4 {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}
.filterOption {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #4b5563;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
}
.filterOption:hover {
  background: #f8fafc;
}
.filterOption.checked {
  background: #eff6ff;
  color: #1e40af;
}
.filterOption input[type="checkbox"],
.filterOption input[type="radio"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.checkmark {
  width: 16px;
  height: 16px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
  transition: all 0.2s;
  flex-shrink: 0;
}
.filterOption.checked .checkmark {
  background: #3b82f6;
  border-color: #3b82f6;
}
.filterOption.checked .checkmark::after {
  content: "✓";
  position: absolute;
  top: -2px;
  left: 2px;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.labelText {
  flex: 1;
}

.count {
  font-size: 12px;
  color: #9ca3af;
  margin-left: 8px;
}

.priceRange {
  margin-top: 12px;
}

.priceSlider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
}
.priceSlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.priceSlider::-webkit-slider-thumb:hover {
  opacity: 0.8;
}
.priceSlider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.priceLabels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
}
.currentPrice {
  font-weight: 600;
  color: #3b82f6;
}
.pricePresets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
.presetBtn {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  cursor: pointer;
}
.presetBtn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.ratingOption {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 14px;
  padding: 8px;
  border-radius: 8px;
}
.ratingOption:hover {
  background: #f8fafc;
}
.ratingOption.checked {
  background: #fef3c7;
  color: #92400e;
}
.stars {
  color: #fbbf24;
  margin-left: 8px;
}

.advancedFilters {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.activeFilters {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}
.activeFilters h4 {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}
.activeFilterTags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filterTag {
  background: #eff6ff;
  color: #1e40af;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
.filterTag:hover {
  background: #dbeafe;
}
.remove {
  font-weight: bold;
  opacity: 0.7;
}
.filterTag:hover .remove {
  opacity: 1;
}
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    max-width: 320px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .filterOption,
  .ratingOption,
  .presetBtn,
  .filterTag {
    transition: none !important;
    transform: none !important;
  }
}
</style>
