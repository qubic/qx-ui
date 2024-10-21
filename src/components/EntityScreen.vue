<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {EntityOrder, Trade} from '@/types'
import {useRoute} from 'vue-router'
import EntityOrdersTable from "@/components/EntityOrdersTable.vue";
import TradesTable from "@/components/TradesTable.vue";

const asks = ref<EntityOrder[]>([])
const bids = ref<EntityOrder[]>([])
const trades = ref<Trade[]>([])

let errorMessage = ref<string | null>(null)
const currentTrader = ref<string | string[]>([])

async function fetchAnalytics() {
  try {
    const route = useRoute()
    currentTrader.value = route.params.entity
    let trader = route.params.entity
    if (trader) {
      await fetchTradesForTrader(trader)
    }
  } catch (error) {
    errorMessage.value = (error as Error).message
  }
}

async function fetchTradesForTrader(address:any) {
  try {
    if (address) {
      const [askOrders, bidOrders, entityTrades] = await Promise.all([
        axios.get(ROOT_URL_QX_SERVICE + '/entity/' + address.toUpperCase() + '/orders/ask'),
        axios.get(ROOT_URL_QX_SERVICE + '/entity/' + address.toUpperCase() + '/orders/bid'),
        axios.get(ROOT_URL_QX_SERVICE + '/entity/' + address.toUpperCase() + '/trades')
      ])
      asks.value = [...askOrders.data]
      bids.value = [...bidOrders.data]
      trades.value = [...entityTrades.data]
    }
  } catch (error) {
    errorMessage.value = (error as Error).message
  }
}
fetchAnalytics()
</script>

<template>

  <h1>Entity Information</h1>
  <div class="grey monoFont">{{ currentTrader }}</div>
  <div v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</div>
  <div>
    <div>
      Lookup entity in <a :href="'https://explorer.qubic.org/network/address/' + currentTrader">Qubic Explorer</a>.
    </div>
  </div>

  <h3>Open bid orders (<span class="color-green">BUY</span>)</h3>
  <div v-if="bids.length > 0" >
    <EntityOrdersTable :orders="bids" />
  </div>
  <div v-else>
    No open bid orders.
  </div>

  <h3>Open ask orders (<span class="color-red">SELL</span>)</h3>
  <div v-if="asks.length > 0" >
    <EntityOrdersTable :orders="asks" />
  </div>
  <div v-else>
    No open ask orders.
  </div>

  <h3>Recent trades</h3>
  <div v-if="trades.length > 0" >
    <TradesTable :trades="trades" />
  </div>
  <div v-else>
    No recent trades.
  </div>

</template>

<style scoped>
</style>