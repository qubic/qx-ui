import { createRouter, createWebHashHistory } from 'vue-router'

import HomeScreen from '@/components/HomeScreen.vue'
import RecentTradesScreen from '@/components/RecentTradesScreen.vue'
import OrderBookScreen from "@/components/OrderBookScreen.vue";
import ErrorScreed from '@/components/NotFoundScreen.vue'

const routes = [
  {
    path: '/',
    component: HomeScreen,
  },
  {
    path: '/analytics/recentTrades',
    component: RecentTradesScreen
  },
  {
    name: 'orderBook',
    path: '/oderBook/:assetIssuer/:assetName',
    component: OrderBookScreen
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
