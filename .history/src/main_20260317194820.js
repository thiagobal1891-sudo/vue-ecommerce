import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'


import HomePage from './pages/HomePage.vue'
import ErrorPage from './pages/ErrorPage.vue'
import CategoryPage from './pages/CategoryPage.vue'
import MyCartPage from './pages/MyCartPage.vue'
import MyordersPage from './pages/MyordersPage.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProductView from './pages/ProductView.vue'


library.add(faEye)


const routes = [
    { path:'/', component: HomePage },
    { path:'/category', component: CategoryPage },
    { path:'/MyCart', component: MyCartPage },
    { path:'/home', component: HomePage },
    { path:'/ProductView/:id', component: ProductView },
    { path:'/Myorders', component: MyordersPage },
    { path: '/:pathMatch(.*)*', component: ErrorPage }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const pinia = createPinia()

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(router)
app.use(pinia)
app.mount("#app")
