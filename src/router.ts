import { createRouter, createWebHashHistory } from 'vue-router'

import HomeScreen from '@/components/HomeScreen.vue'
import LatestTradesScreen from '@/components/LatestTradesScreen.vue'

import AssetScreen from "@/components/AssetScreen.vue";
import ErrorScreed from '@/components/NotFoundScreen.vue'
import AssetsScreen from "@/components/AssetsScreen.vue";
import EntityScreen from "@/components/EntityScreen.vue";

const routes = [
  {
    name: 'home',
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
    name: 'entity',
    path: '/entity/:entity',
    component: EntityScreen
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
