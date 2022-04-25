import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './app.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', component: () => import('./home-page.vue') },
    { path: '/about', component: () => import('./about-page.vue') },
  ],
})

const app = createApp(App)

app.use(router)
app.mount('#app')
