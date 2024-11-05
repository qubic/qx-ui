<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {AssetOrder, AveragePrice, Trade, Transfer} from '@/types'
import AssetOrdersTable from "@/components/AssetOrdersTable.vue";
import {useRoute} from 'vue-router'
import TradesTable from "@/components/TradesTable.vue";
import TransfersTable from "@/components/TransfersTable.vue";
import {SingleValueData} from "lightweight-charts";
import PriceLineVolumeChart from "@/components/PriceLineVolumeChart.vue";

const asks = ref<AssetOrder[]>([])
const bids = ref<AssetOrder[]>([])
const trades = ref<Trade[]>([])
const transfers = ref<Transfer[]>([])
const averagePrices = ref<AveragePrice[]>([])
const avgPriceData = ref<SingleValueData[]>([])
const histogramVolumeData = ref<SingleValueData[]>([])

const errorMessage = ref<string | null>(null)

const route = useRoute()
const assetName = route.params.assetName
const assetIssuer = route.params.assetIssuer



async function fetchOrders() {
  try {
    const [askOrders, bidOrders, assetTrades, assetTransfers, avgPrices] = await Promise.all([
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/asks'),
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/bids'),
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/trades'),
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/transfers'),
      axios.get(ROOT_URL_QX_SERVICE + '/issuer/' + assetIssuer + '/asset/' + assetName + '/chart/average-price')
    ])
    asks.value = [...askOrders.data]
    bids.value = [...bidOrders.data]
    trades.value = [...assetTrades.data]
    transfers.value = [...assetTransfers.data]
    averagePrices.value = [...avgPrices.data]
    for (const v of averagePrices.value) {
      avgPriceData.value.push( { value: v.averagePrice, time: v.time } as SingleValueData );
      histogramVolumeData.value.push( { value: v.totalAmount, time: v.time } as SingleValueData );
    }
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
  <div class="smaller grey">
      Issuer: <router-link class="monoFont" :to="{ name: 'entity', params: { entity: assetIssuer }}">{{ assetIssuer }}</router-link>
  </div>

  <div class="chart-container">
    <div class="chart" v-if="avgPriceData.length > 1">
      <h3>Chart (Avg Price)</h3>
      <PriceLineVolumeChart :price-data-series="avgPriceData" :volume-data-series="histogramVolumeData" />
    </div>
  </div>

  <div class="orderContainer">
    <div class="orders" v-if="bids.length > 0">
      <h3>Bid orders (<span class="color-green">BUY</span>)</h3>
      <AssetOrdersTable :orders="bids.slice(0, 25)"/>
    </div>
    <div class="orders" v-if="asks.length > 0">
      <h3>Ask orders (<span class="color-red">SELL</span>)</h3>
      <AssetOrdersTable :orders="asks.slice(0, 25)"/>
    </div>
  </div>

  <div class="transactionsContainer">
    <div v-if="trades.length > 0">
      <h3>Latest Trades</h3>
      <TradesTable :trades="trades.slice(0, 10)"/>
    </div>
    <div v-if="transfers.length > 0">
      <h3>Latest Transfers</h3>
      <TransfersTable :transfers="transfers.slice(0, 10)" />
    </div>
  </div>

</template>

<style scoped>

/*
.chart-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.chart {
  max-width: 1000px;
  width: 100%;
}
 */

.orderContainer {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: space-evenly;
}

.transactionsContainer {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: space-evenly;
}

</style>