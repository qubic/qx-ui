import { createRouter, createWebHashHistory } from 'vue-router'

import HomeScreen from '@/components/HomeScreen.vue'
import LatestTradesScreen from '@/components/LatestTradesScreen.vue'

import AssetScreen from "@/components/AssetScreen.vue";
import ErrorScreed from '@/components/NotFoundScreen.vue'
import AssetsScreen from "@/components/AssetsScreen.vue";

const routes = [
  {
    path: '/',
    component: HomeScreen,
  },
  {
    path: '/latestTrades',
    component: LatestTradesScreen
  },
  {
    path: '/assets',
    component: AssetsScreen
  },
  {
    name: 'asset',
    path: '/issuer/:assetIssuer/asset/:assetName/orders',
    component: AssetScreen,
    fallback: false
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
