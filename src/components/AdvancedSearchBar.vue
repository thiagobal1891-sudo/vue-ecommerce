<template>
  <div class="searchContainer" ref="searchContainer">
    <div class="searchBar" :class="{ 'focused': isFocused }">
      <span class="searchIcon" aria-hidden="true">🔍</span>
      <input
        ref="searchInput"
        type="text"
        v-model="searchQuery"
        @input="onSearchInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeyNavigation"
        placeholder="Search products..."
        class="searchInput"
        :aria-label="'Search products'"
        :aria-expanded="showSuggestions"
        aria-autocomplete="list"
        role="combobox"
        :aria-activedescendant="selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined"
      />
      <button 
        v-if="searchQuery" 
        @click="clearSearch" 
        class="clearBtn"
        :aria-label="'Clear search'"
      >
        ✕
      </button>
    </div>
    <div 
      v-if="showSuggestions && (searchResults.length > 0 || searchQuery)"
      class="suggestionsDropdown"
      role="listbox"
      :aria-label="'Search suggestions'">
      <div 
        v-for="(product, index) in searchResults" 
        :key="product.id"
        :id="`suggestion-${index}`"
        class="suggestionItem"
        :class="{ active: selectedIndex === index }"
        @click="selectProduct(product)"
        role="option"
        :aria-selected="selectedIndex === index">
        <img 
          :src="product.thumbnail" 
          :alt="product.title"
          class="suggestionImage"
          loading="lazy"/>
        <div class="suggestionContent">
          <h4 v-html="highlightMatch(product.title)"></h4>
          <p class="suggestionCategory">{{ formatCategory(product.category) }}</p>
          <span class="suggestionPrice">${{ formatPrice(product.price) }}</span>
        </div>
      </div>
      <div v-if="searchResults.length === 0 && searchQuery" class="noResults">
        <p>No products found for "{{ searchQuery }}"</p>
        <div class="searchSuggestions">
          <p>Try searching for:</p>
          <div class="suggestionTags">
            <span 
              v-for="tag in popularSearches" 
              :key="tag"
              @click="searchForTag(tag)"
              class="suggestionTag"
              :aria-label="`Search for ${tag}`"
              role="button"
              tabindex="0"
              @keydown.enter="searchForTag(tag)">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showRecentSearches && recentSearches.length > 0 && !searchQuery" class="recentSearches">
      <h4>Recent Searches</h4>
      <div class="recentTags">
        <span 
          v-for="search in recentSearches" 
          :key="search"
          @click="searchForTag(search)"
          class="recentTag"
          :aria-label="`Search for ${search}`"
          role="button"
          tabindex="0"
          @keydown.enter="searchForTag(search)">
          {{ search }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvancedSearchBar',
  props: {
    products: {
      type: Array,
      default: () => []
    },
    popularSearches: {
      type: Array,
      default: () => ['iPhone', 'Laptop', 'Headphones', 'Watch', 'Tablet']
    }
  },
  emits: ['search', 'product-selected'],
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      showSuggestions: false,
      showRecentSearches: false,
      isFocused: false,
      selectedIndex: -1,
      recentSearches: [],
      searchDebounce: null,
      searchCache: new Map(),
      clickOutsideHandler: null
    };
  },
  mounted() {
    this.loadRecentSearches();
    this.setupClickOutsideHandler();
  },
  beforeUnmount() {
    this.cleanup();
  },
  methods: {
    onSearchInput() {
      clearTimeout(this.searchDebounce);
      
      this.searchDebounce = setTimeout(() => {
        this.performSearch();
      }, 300);
      
      this.selectedIndex = -1;
    },

    async performSearch() {
      if (!this.searchQuery.trim()) {
        this.searchResults = [];
        this.showSuggestions = false;
        this.$emit('search', '');
        return;
      }
      
      const query = this.searchQuery.toLowerCase().trim();
      
      if (this.searchCache.has(query)) {
        this.searchResults = this.searchCache.get(query);
        this.showSuggestions = true;
        this.$emit('search', query);
        return;
      }

      const results = this.products.filter(product => {
        const titleMatch = product.title.toLowerCase().includes(query);
        const descMatch = product.description?.toLowerCase().includes(query);
        const categoryMatch = product.category?.toLowerCase().includes(query);
        
        return titleMatch || descMatch || categoryMatch;
      }).slice(0, 8);
      
      results.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(query);
        const bTitleMatch = b.title.toLowerCase().includes(query);
        
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        
        return 0;
      });
      
      this.searchResults = results;
      this.searchCache.set(query, results);
      this.showSuggestions = true;
      
      if (this.searchCache.size > 50) {
        const firstKey = this.searchCache.keys().next().value;
        this.searchCache.delete(firstKey);
      }
      
      this.$emit('search', query);
    },

    highlightMatch(text) {
      if (!this.searchQuery) return text;
      
      const regex = new RegExp(`(${this.escapeRegex(this.searchQuery)})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    },

    escapeRegex(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    selectProduct(product) {
      this.searchQuery = product.title;
      this.showSuggestions = false;
      this.addToRecentSearches(product.title);
      this.$emit('product-selected', product);
      this.$refs.searchInput?.blur();
    },

    clearSearch() {
      this.searchQuery = '';
      this.searchResults = [];
      this.showSuggestions = false;
      this.selectedIndex = -1;
      this.$emit('search', '');
    },

    handleFocus() {
      this.isFocused = true;
      if (!this.searchQuery) {
        this.showRecentSearches = true;
      } else if (this.searchResults.length > 0) {
        this.showSuggestions = true;
      }
    },

    handleBlur() {
      this.isFocused = false;
      setTimeout(() => {
        this.showSuggestions = false;
        this.showRecentSearches = false;
      }, 200);
    },

    handleKeyNavigation(e) {
      if (!this.showSuggestions && !this.showRecentSearches) return;
      
      switch(e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this.navigateDown();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.navigateUp();
          break;
        case 'Enter':
          e.preventDefault();
          this.handleEnter();
          break;
        case 'Escape':
          this.hideSuggestions();
          break;
      }
    },

    navigateDown() {
      const maxIndex = this.showRecentSearches 
        ? this.recentSearches.length - 1 
        : this.searchResults.length - 1;
      
      this.selectedIndex = Math.min(this.selectedIndex + 1, maxIndex);
      this.scrollToSelected();
    },

    navigateUp() {
      this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
      this.scrollToSelected();
    },

    handleEnter() {
      if (this.selectedIndex >= 0) {
        if (this.showRecentSearches) {
          this.searchForTag(this.recentSearches[this.selectedIndex]);
        } else {
          this.selectProduct(this.searchResults[this.selectedIndex]);
        }
      }
    },

    scrollToSelected() {
      if (this.selectedIndex < 0) return;
      
      const container = this.$refs.searchContainer;
      const selectedItem = container.querySelector('.suggestionItem.active, .recentTag.active');
      
      if (selectedItem) {
        selectedItem.scrollIntoView({ 
          block: 'nearest', 
          behavior: 'smooth' 
        });
      }
    },

    hideSuggestions() {
      this.showSuggestions = false;
      this.showRecentSearches = false;
      this.selectedIndex = -1;
    },

    searchForTag(tag) {
      this.searchQuery = tag;
      this.performSearch();
      this.addToRecentSearches(tag);
    },

    addToRecentSearches(query) {
      const cleanQuery = query.trim();
      if (!cleanQuery) return;
      
      this.recentSearches = this.recentSearches.filter(s => s !== cleanQuery);
      
      this.recentSearches.unshift(cleanQuery);
      
      this.recentSearches = this.recentSearches.slice(0, 5);
      
      this.saveRecentSearches();
    },

    loadRecentSearches() {
      try {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
          this.recentSearches = JSON.parse(saved);
        }
      } catch (error) {
        console.warn('Failed to load recent searches:', error);
      }
    },

    saveRecentSearches() {
      try {
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
      } catch (error) {
        console.warn('Failed to save recent searches:', error);
      }
    },

    formatCategory(name) {
      return name
        .replace("-", " ")
        .replace(/\b\w/g, l => l.toUpperCase());
    },

    formatPrice(price) {
      return new Intl.NumberFormat("en-US").format(price);
    },

    setupClickOutsideHandler() {
      this.clickOutsideHandler = (e) => {
        if (!this.$refs.searchContainer?.contains(e.target)) {
          this.hideSuggestions();
        }
      };
      document.addEventListener('click', this.clickOutsideHandler);
    },

    cleanup() {
      clearTimeout(this.searchDebounce);
      if (this.clickOutsideHandler) {
        document.removeEventListener('click', this.clickOutsideHandler);
      }
    }
  }
};
</script>

<style>
.searchContainer {
  position: relative;
  width: 100%;
  max-width: 500px;
}
.searchBar {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.searchBar.focused {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.searchIcon {
  color: #6b7280;
  margin-right: 12px;
  font-size: 16px;
}
.searchInput {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
  color: #111;
}
.searchInput::placeholder {
  color: #9ca3af;
}

.clearBtn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}
.clearBtn:hover {
  background: #f3f4f6;
  color: #111;
}

.suggestionsDropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 8px;
}
.suggestionItem {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f3f4f6;
}
.suggestionItem:last-child {
  border-bottom: none;
}
.suggestionItem:hover,
.suggestionItem.active {
  background: #f8fafc;
}
.suggestionImage {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 12px;
  background: #f3f4f6;
}

.suggestionContent {
  flex: 1;
}
.suggestionContent h4 {
  font-size: 14px;
  font-weight: 500;
  color: #111;
  margin: 0 0 4px 0;
  line-height: 1.3;
}
.suggestionContent mark {
  background: #fef3c7;
  color: #92400e;
  padding: 0 2px;
  border-radius: 2px;
}

.suggestionCategory {
  font-size: 12px;
  color: #6b7280;
  margin: 0 0 4px 0;
}

.suggestionPrice {
  font-size: 14px;
  font-weight: 600;
  color: #111;
}

.noResults {
  padding: 20px 16px;
  text-align: center;
}
.noResults p {
  color: #6b7280;
  margin-bottom: 12px;
}

.searchSuggestions p {
  font-size: 14px;
  color: #374151;
  margin-bottom: 8px;
}

.suggestionTags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
.suggestionTag {
  background: #f3f4f6;
  color: #374151;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.suggestionTag:hover {
  background: #3b82f6;
  color: white;
}

.recentSearches {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 8px;
  padding: 16px;
}
.recentSearches h4 {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
}

.recentTags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.recentTag {
  background: #f8fafc;
  color: #6b7280;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.recentTag:hover {
  background: #e5e7eb;
  color: #374151;
}
.recentTag.active {
  background: #3b82f6;
  color: white;
}
@media (prefers-reduced-motion: reduce) {
  .searchBar,
  .suggestionItem,
  .suggestionTag,
  .recentTag {
    transition: none !important;
  }
}
@media (max-width: 640px) {
  .searchContainer {
    max-width: 100%;
  }
  .searchBar {
    padding: 10px 12px;
  }
  .searchInput {
    font-size: 16px;
  }
  .suggestionImage {
    width: 32px;
    height: 32px;
  }
}
</style>
