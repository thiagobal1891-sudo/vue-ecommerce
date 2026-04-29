<template>
    <div class="container">
    <div class="tabs-container">
        <button 
        class="tab"
        :class="{ active: activeTab === 'description' }"
        @click="activeTab = 'description'">
        Product Description
        </button>

        <button 
        class="tab"
        :class="{ active: activeTab === 'related' }"
        @click="activeTab = 'related'">
        Related Products
        </button>

        <button 
        class="tab"
        :class="{ active: activeTab === 'reviews' }"
        @click="activeTab = 'reviews'">
        Ratings and Reviews
        </button>
    </div>
    <transition name="fade-slide" mode="out-in">
        <div :key="activeTab" class="tab-content">
        <div v-if="activeTab === 'description'">
            <p>Lorem ipsum dolor sit amet...</p>
            <p>Dolor augue mattis duis...</p>
            <p>Eget est vel sagittis...</p>
        </div>
        <div v-else-if="activeTab === 'related'">
            <p>Acá van productos relacionados (grid después )</p>
        </div>
        <div v-else>
            <p>⭐ 4.5 / 5</p>
            <p>Muy buen producto...</p>
        </div>

        </div>
    </transition>

    </div>
</template>
<script>
export default {
    name: "ProductDescriptionVue",
    data() {
    return {
        activeTab: "description"
    };
    }
};
</script>
<style>
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 900px;
    margin: 0 auto 30px auto;
}
.tabs-container {
    display: flex;
    justify-content: center;
    gap: 60px;
    background: #f1f1f1;
    padding: 10px;
    border-radius: 12px;
}
.tab {
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    background: transparent;
    font-weight: 500;
    font-size: 16px;
    color: #626262;
    cursor: pointer;
    transition: all 0.25s ease;
}
.tab.active {
    background: #050505;
    color: white;
}
.tab:hover {
    background: #050505;
    color: white;
}
.tab-content {
    margin-top: 25px;
    font-size: 16px;
    line-height: 1.5;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.25s ease;
}
.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(10px);
}
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
@media screen and (max-width: 768px){
    .container {
        display: none;
    }
}
@media (prefers-reduced-motion: reduce) {
  .tab,
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: none !important;
  }
}
</style>

