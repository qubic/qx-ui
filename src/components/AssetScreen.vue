<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {AssetOrder, Trade, Transfer} from '@/types'
import AssetOrdersTable from "@/components/AssetOrdersTable.vue";
import {useRoute} from 'vue-router'
import TradesTable from "@/components/TradesTable.vue";
import TransfersTable from "@/components/TransfersTable.vue";

const asks = ref<AssetOrder[]>([])
const bids = ref<AssetOrder[]>([])
const trades = ref<Trade[]>([])
const transfers = ref<Transfer[]>([])

const errorMessage = ref<string | null>(null)

const route = useRoute()
const assetName = route.params.assetName
const assetIssuer = route.params.assetIssuer

async function fetchOrders() {
  try {
    const [askOrders, bidOrders, assetTrades, assetTransfers] = await Promise.all([
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/asks'),
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/bids'),
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/trades'),
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/transfers')
    ])
    asks.value = [...askOrders.data]
    bids.value = [...bidOrders.data]
    trades.value = [...assetTrades.data]
    transfers.value = [...assetTransfers.data]
  } catch (error) {
    errorMessage.value = (error as Error).message
  }
}

fetchOrders()
</script>

<template>
  <h1 class="heading">Order Book {{ assetName }}</h1>
  <div v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</div>

  <div>
    Name: <span class="monoFont">{{ assetName }}</span>
  </div>
  <div class="grey">
    Issuer: <span class="smaller monoFont">{{ assetIssuer }}</span>
  </div>

  <h3>Bid orders (<span class="color-green">BUY</span>)</h3>
  <div v-if="bids.length > 0">
    <AssetOrdersTable :orders="bids"/>
  </div>
  <div v-else>
    No bid orders.
  </div>

  <h3>Ask orders (<span class="color-red">SELL</span>)</h3>
  <div v-if="asks.length > 0">
  <AssetOrdersTable :orders="asks"/>
  </div>
  <div v-else>
    No ask orders.
  </div>

  <h3>Trades</h3>
  <div v-if="trades.length > 0">
    <TradesTable :trades="trades.slice(0, 10)"/>
  </div>
  <div v-else>
    No recent trades.
  </div>

  <h3>Transfers</h3>
  <div v-if="transfers.length > 0" >
    <TransfersTable :transfers="transfers" />
  </div>
  <div v-else>
    No recent transfers.
  </div>

</template>

<style scoped>

</style>