import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import HomePage from './pages/HomePage.vue'
import ErrorPage from './pages/ErrorPage.vue'
import CategoryPage from './pages/CategoryPage.vue'
import MyCartPage from './pages/MyCartPage.vue'
import ProductView from './pages/ProductView.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/category', component: CategoryPage },
  { path: '/MyCart', component: MyCartPage },
  { path: '/home', component: HomePage },
  { path: '/ProductView', component: ProductView },
  { path: '/:pathMatch(.*)*', component: ErrorPage }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app') 