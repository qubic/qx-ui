<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {Asset} from '@/types'

const assets = ref<Asset[]>([])
const searchTrader = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

async function fetchAnalytics() {
  try {
    const [t1] = await Promise.all([
      axios.get(ROOT_URL_QX_SERVICE + '/assets'),
    ])
    assets.value = [...t1.data]
  } catch (error) {
    errorMessage.value = (error as Error).message
  }
}
fetchAnalytics()
</script>

<template>
  <h1 class="heading">QX Dashboard</h1>
  <span v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</span>
  <h2>Navigation</h2>
  <ul class="navigation">
    <li>
      <router-link to="assets">Assets</router-link>
    </li>
    <li>
      <router-link to="latestTrades">Latest Trades</router-link>
    </li>
  </ul>

  <h2>Entity Search</h2>
  <p>
  Show trades and open orders.
  </p>
  <p>
  <input id="traderSearch" placeholder="Insert 60 characters uppercase identity here..." size="65" type="text" v-model="searchTrader" />
  <button id="searchButton" @click="$router.push({ name: 'entity', params: { entity: searchTrader }})">Lookup Trader</button>
  </p>

</template>

<style scoped>

.navigation li {
  list-style-type: none;
}

#traderSearch {
  padding:3px;
  border:1px solid #76AFB4;
  font-size: smaller;
  -webkit-border-radius: 3px;
  border-radius: 3px;
}

#traderSearch:focus {
  border-color: #B0F9FF;
}

#searchButton {
  padding:3px 9px;
  background: #B0F9FF;
  border:1px solid #76AFB4;
  cursor:pointer;
  -webkit-border-radius: 3px;
  border-radius: 3px;
}

</style>