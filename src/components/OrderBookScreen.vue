<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {AssetOrder} from '@/types'
import AssetOrdersTable from "@/components/AssetOrdersTable.vue";
import {useRoute} from 'vue-router'

const asks = ref<AssetOrder[]>([])
const bids = ref<AssetOrder[]>([])

const errorMessage = ref<string | null>(null)

const route = useRoute()
let assetName = route.params.assetName
let assetIssuer = route.params.assetIssuer

async function fetchOrders() {
  try {
    const [o1, o2] = await Promise.all([
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/orders/ask'),
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/orders/bid'),
    ])
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