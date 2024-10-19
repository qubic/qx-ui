import { createRouter, createWebHashHistory } from 'vue-router'

import HomeScreen from '@/components/HomeScreen.vue'
import ErrorScreed from '@/components/NotFoundScreen.vue'

const routes = [
  {
    path: '/',
    component: HomeScreen,
  },
  {
    path: "/:catchAll(.*)",
    component: ErrorScreed,
    // meta: { layout: 'none' }
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
