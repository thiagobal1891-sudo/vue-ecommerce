import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import HomePage from './pages/HomePage.vue'
import ErrorPage from './pages/ErrorPage.vue'
import CategoryPage from './pages/CategoryPage.vue'
import MyCartPage from './pages/MyCartPage.vue'
import MyordersPage from './pages/MyordersPage.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProductView from './pages/ProductView.vue'

import PersonalInfo from './components/PersonalInfo.vue'
import OrdenesID from './components/OrdenesID.vue'
import CheckoutVue from './components/CheckoutVue.vue'

library.add(faEye)

const routes = [
    { path: '/', component: HomePage },
    { path: '/category', component: CategoryPage },
    { path: '/category/:slug', component: CategoryPage },
    { path: '/cart', component: MyCartPage },
    {
  path: '/orders',
  component: MyordersPage,
  children: [
    { path: '', redirect: '/orders/personal' }, // 👈 ESTA LÍNEA

    { path: 'personal', component: PersonalInfo },
    { path: 'history', component: OrdenesID },
    { path: 'checkout', component: CheckoutVue }
  ]
},
    {
        path: '/product/:id',
        name: 'ProductView',
        component: ProductView
    },

    { path: '/:pathMatch(.*)*', component: ErrorPage }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }
  return { top: 0 }
}
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(router)
app.use(pinia)
app.mount("#app")
