<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {Asset, AssetOrder} from '@/types'
import AssetOrdersTable from "@/components/AssetOrdersTable.vue";
import {useRoute} from 'vue-router'

const asks = ref<AssetOrder[]>([])
const bids = ref<AssetOrder[]>([])
const assetsList = ref<Asset[]>([])

const errorMessage = ref<string | null>(null)

const route = useRoute()
const assetName = route.params.assetName
const assetIssuer = route.params.assetIssuer

async function fetchOrders() {
  try {
    const [a, o1, o2] = await Promise.all([
      axios.get(ROOT_URL_QX_SERVICE + '/assets'),
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/orders/ask'),
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/orders/bid'),
    ])
    assetsList.value = [...a.data]
    asks.value = [...o1.data]
    bids.value = [...o2.data]
  } catch (error) {
    errorMessage.value = (error as Error).message
  }
}
fetchOrders()
setInterval(fetchOrders, 10000)
</script>

<template>
  <h1 class="heading">Order Book {{ assetName }}</h1>
  <span v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</span>

  <p>
    Asset name: {{ assetName }}<br />
    Asset issuer: {{ assetIssuer }}
  </p>

  <h3>Bid orders (<span class="color-green">BUY</span>)</h3>
  <AssetOrdersTable :orders="bids" />

  <h3>Ask orders (<span class="color-red">SELL</span>)</h3>
  <AssetOrdersTable :orders="asks" />

</template>

<style scoped>

h2 {
  color: white;
}

</style>