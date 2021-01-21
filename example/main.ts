import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './app.vue';
import PageOne from './page-one.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/page-one' },
    { path: '/page-one', component: PageOne },
    { path: '/page-two', component: () => import('./page-two.vue') },
  ],
});
const app = createApp(App);

app.use(router);
app.mount('#app');
