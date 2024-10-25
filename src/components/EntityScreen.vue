<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {EntityOrder, Trade, Transfer} from '@/types'
import {useRoute} from 'vue-router'
import EntityOrdersTable from "@/components/EntityOrdersTable.vue";
import TradesTable from "@/components/TradesTable.vue";
import TransfersTable from "@/components/TransfersTable.vue";

const asks = ref<EntityOrder[]>([])
const bids = ref<EntityOrder[]>([])
const trades = ref<Trade[]>([])
const transfers = ref<Transfer[]>([])

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
      const [askOrders, bidOrders, entityTrades, entityTransfers] = await Promise.all([
        axios.get(ROOT_URL_QX_SERVICE + '/entity/' + address.toUpperCase() + '/asks'),
        axios.get(ROOT_URL_QX_SERVICE + '/entity/' + address.toUpperCase() + '/bids'),
        axios.get(ROOT_URL_QX_SERVICE + '/entity/' + address.toUpperCase() + '/trades'),
        axios.get(ROOT_URL_QX_SERVICE + '/entity/' + address.toUpperCase() + '/transfers')
      ])
      asks.value = [...askOrders.data]
      bids.value = [...bidOrders.data]
      trades.value = [...entityTrades.data]
      transfers.value = [...entityTransfers.data]
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

  <div v-if="bids.length > 0" >
    <h3>Open bid orders</h3>
    <EntityOrdersTable :orders="bids" />
  </div>

  <div v-if="asks.length > 0" >
    <h3>Open ask orders</h3>
    <EntityOrdersTable :orders="asks" />
  </div>

  <div v-if="trades.length > 0" >
    <h3>Trades</h3>
    <TradesTable :trades="trades" />
  </div>

  <div v-if="transfers.length > 0" >
    <h3>Assets transfers</h3>
    <TransfersTable :transfers="transfers" />
  </div>

</template>

<style scoped>
</style>