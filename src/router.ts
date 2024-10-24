import { createRouter, createWebHashHistory } from 'vue-router'

import HomeScreen from '@/components/HomeScreen.vue'
import TradesScreen from '@/components/TradesScreen.vue'

import AssetScreen from "@/components/AssetScreen.vue";
import ErrorScreed from '@/components/NotFoundScreen.vue'
import AssetsScreen from "@/components/AssetsScreen.vue";
import EntityScreen from "@/components/EntityScreen.vue";
import TransactionsScreen from "@/components/TransactionsScreen.vue";

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeScreen,
  },
  {
    path: '/trades',
    component: TradesScreen
  },
  {
    path: '/assets',
    component: AssetsScreen
  },
  {
    path: '/transactions',
    component: TransactionsScreen
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
