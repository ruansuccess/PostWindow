import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页',
    },
    component: Home,
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录',
    },
    component: Login,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
