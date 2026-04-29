<template>
  <div class="orders-layout">
    <header
      class="orders-topbar"
      @click="toggleSidebar"
      :aria-expanded="String(sidebarOpen)"
      role="button"
      aria-label="Toggle account menu"
    >
      <div class="orders-topbar-left">
        <div class="hamburger" :class="{ open: sidebarOpen }" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span class="orders-topbar-label">My Account</span>
      </div>
      <span class="orders-topbar-arrow" :class="{ open: sidebarOpen }">▾</span>
    </header>
    <aside
      ref="sidebar"
      class="orders-sidebar"
      :class="{ open: sidebarOpen }"
    >
      <div class="sidebar-inner">
        <div class="sidebar-brand">
          <p class="sidebar-mini">ACCOUNT</p>
          <h2 class="sidebar-title">My Profile</h2>
        </div>
        <SidebarVue />
      </div>
    </aside>
    <main class="orders-content">
      <router-view />
    </main>

  </div>
</template>

<script>
import SidebarVue from "../components/SidebarVue.vue"

export default {
  name: "MyordersPage",
  components: { SidebarVue },

  data() {
    return {
      sidebarOpen: false,
      isDesktop: window.innerWidth >= 900
    }
  },

  mounted() {
    this.sidebarOpen = false
    window.addEventListener("resize", this.handleResize)
    window.addEventListener("close-sidebar", this.handleCloseSidebar)
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize)
    window.removeEventListener("close-sidebar", this.handleCloseSidebar)
  },

  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    handleResize() {
      this.isDesktop = window.innerWidth >= 900
      if (this.isDesktop) {
        this.sidebarOpen = false
      }
    },
    handleCloseSidebar() {
      this.sidebarOpen = false
    }
  }
}
</script>

<style>

.orders-layout {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 76px);
  margin-top: 76px;        
  background: #f5f5f7;
  -webkit-font-smoothing: antialiased;
}

.orders-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 52px;
  background: #050505;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  transition: background 0.2s ease;
}
.orders-topbar:hover {
  background: #111;
}

.orders-topbar-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.orders-topbar-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}
.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 2px;
  transform-origin: center;
  transition: transform 0.3s ease, opacity 0.25s ease;
}
.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.orders-topbar-arrow {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.45);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  line-height: 1;
}
.orders-topbar-arrow.open {
  transform: rotate(180deg);
}

  .orders-sidebar {
  background: #050505;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}
.orders-sidebar.open {
  max-height: 700px;
}

.sidebar-inner {
  padding: 24px 24px 20px;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}
.sidebar-mini {
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 700;
  margin-bottom: 4px;
}
.sidebar-title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0;
}

.orders-content {
  flex: 1;
  padding: clamp(20px, 4vw, 48px);
  background: #f5f5f7;
  min-height: 400px;
}

@media (min-width: 900px) {
  .orders-layout {
    flex-direction: row;
    align-items: stretch;
    min-height: calc(100vh - 76px);
  }

  .orders-topbar {
    display: none;
  }
.orders-sidebar {
    width: 260px;
    min-width: 260px;
    max-height: none !important;  
    overflow-y: auto;
    position: sticky;
    top: 76px;                      
    height: calc(100vh - 76px);
    border-right: 1px solid rgba(255, 255, 255, 0.06);
    flex-shrink: 0;
  }

  .sidebar-inner {
    padding: 36px 24px 32px;
    height: 100%;
  }

  .sidebar-brand {
    margin-bottom: 28px;
  }

  .orders-content {
    flex: 1;
    min-width: 0;
    padding: clamp(28px, 3vw, 52px);
    overflow-y: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .orders-sidebar,
  .orders-topbar-arrow,
  .hamburger span {
    transition: none !important;
  }
}
</style>