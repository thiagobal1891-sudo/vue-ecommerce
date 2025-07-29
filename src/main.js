import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import HomePage from './pages/HomePage.vue'
import ErrorPage from './pages/ErrorPage.vue'

const routes = [
    {
        path:'/', component: HomePage
    },
    {
        path: '/:pathMatch(.*)*', component: ErrorPage
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const pinia = createPinia()

const app = createApp(App).use(router);
app.use(pinia)
app.mount("#app");
