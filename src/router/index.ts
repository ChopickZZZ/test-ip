import MainPage from '@/views/MainPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/ip/:ip',
      name: 'showIp',
      component: () => import('@/views/ShowIpPage.vue'),
    },
  ],
})

export default router
