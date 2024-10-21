<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {Asset, AssetOrder, Trade} from '@/types'
import AssetOrdersTable from "@/components/AssetOrdersTable.vue";
import {useRoute} from 'vue-router'
import TradesTable from "@/components/TradesTable.vue";

const asks = ref<AssetOrder[]>([])
const bids = ref<AssetOrder[]>([])
const assetsList = ref<Asset[]>([])
const latestTrades = ref<Trade[]>([])

const errorMessage = ref<string | null>(null)

const route = useRoute()
const assetName = route.params.assetName
const assetIssuer = route.params.assetIssuer

async function fetchOrders() {
  try {
    const [a, o1, o2, tr] = await Promise.all([
      axios.get(ROOT_URL_QX_SERVICE + '/assets'),
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/orders/ask'),
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/orders/bid'),
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/trades')
    ])
    assetsList.value = [...a.data]
    asks.value = [...o1.data]
    bids.value = [...o2.data]
    latestTrades.value = [...tr.data]
  } catch (error) {
    errorMessage.value = (error as Error).message
  }
}
fetchOrders()
</script>

<template>
  <h1 class="heading">Order Book {{ assetName }}</h1>
  <span v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</span>

  <p>
    Asset name: {{ assetName }}
  </p>
  <div class="smaller">
    Asset issuer: {{ assetIssuer }}
  </div>

  <h3>Bid orders (<span class="color-green">BUY</span>)</h3>
  <AssetOrdersTable :orders="bids" />

  <h3>Ask orders (<span class="color-red">SELL</span>)</h3>
  <AssetOrdersTable :orders="asks" />

  <h3>Latest trades</h3>
  <TradesTable :trades="latestTrades.slice(0, 10)" />

</template>

<style scoped>

</style>