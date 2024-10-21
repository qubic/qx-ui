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
  <h1>QX Dashboard</h1>
  <div v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</div>

  <p class="text">
    QX is a decentralized exchange running as a smart contract on the Qubic network. This site provides
    information about assets, trades and traders.
  </p>

  <div>
    <ul class="navList">
      <li>
        <router-link to="assets">Assets</router-link>
      </li>
      <li>
        <router-link to="latestTrades">Trades</router-link>
      </li>
    </ul>
  </div>

  <h2>Entity Search</h2>
  <p>
    Show trades and open orders of an entity.
  </p>
  <p>
  <input id="traderSearch" placeholder="Insert 60 characters uppercase identity here..." size="65" type="text" v-model="searchTrader" />
  <button id="searchButton" @click="$router.push({ name: 'entity', params: { entity: searchTrader }})">Lookup Trader</button>
  </p>

</template>

<style scoped>

.text {
  max-width: 600px;
  display:inline-block;
}

.navList li {
  min-width: 200px;
  padding: 20px 100px;
  border-bottom: solid #202E3C 1px ;
}

.navList li:last-child {
  border-bottom: none;
}

#traderSearch {
  padding:3px;
  background-color: #151E27;
  border:1px solid #202E3C;
  font-size: smaller;
  border-radius: 3px;
  color: white;
}

#traderSearch:focus {
  border-color: #202E3C;
  color: white;
}

#searchButton {
  padding:3px 9px;
  background: #61F0FE;
  border:1px solid #202E3C;
  cursor:pointer;
  border-radius: 3px;
}

</style>