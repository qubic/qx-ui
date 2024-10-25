<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {Asset} from '@/types'
import {useRouter} from 'vue-router'

const router = useRouter()
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

  <div class="description">
    QX is a decentralized exchange running as a smart contract on the Qubic network. This demo site provides
    information about assets, trades and traders, but it is not the official QX platform.
  </div>

  <div style="clear: both" />

  <div class="flex-container">
    <router-link to="assets">
    <div class="flex-item">
        <img src="/assets-icon.svg" alt="Assets"/>
        <div>Assets</div>
    </div>
    </router-link>
    <router-link to="trades">
      <div class="flex-item">
        <img src="/trades-icon.svg" alt="Trades"/>
        <div>Trades</div>
      </div>
    </router-link>
    <router-link to="transactions">
      <div class="flex-item">
        <img src="/transactions.png" alt="Transactions"/>
        <div>Transactions</div>
      </div>
    </router-link>
  </div>

  <h2>Entity Search</h2>
  <div class="description">
    Show trades and open orders of an entity.
  </div>

  <div>
  <input id="traderSearch" placeholder="Enter public ID" size="64" type="text" v-model="searchTrader" />
  <button id="searchButton" @click="router.push({ name: 'entity', params: { entity: searchTrader }})">Lookup Trader</button>
  </div>

</template>

<style scoped>

h1 {
  margin-top: 24px;
  margin-bottom: 12px;
}

h2 {
  margin-top: 24px;
  margin-bottom: 12px;
}

.description {
  margin: 12px 0;
  color: #707a8a;
  max-width: 500px;
  display: inline-block;
}

.flex-container {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
}

.flex-item {
  border-radius: 12px;
  margin: 12px 12px;
  min-width: 100px;
  padding: 24px 24px;
  border: solid #202E3C 1px;
  background-color: #151E27;
  font-size: medium;
  font-weight: normal;
}

.flex-container a:active, a:link, a:visited, a:hover {
  background-color: transparent;
  text-decoration: none;
  color: white;
}

#traderSearch {
  margin: 6px;
  padding: 6px 12px;
  background-color: #151E27;
  border:1px solid #202E3C;
  border-radius: 6px;
  color: #707a8a;
  max-width: 340px;
}

#traderSearch:focus {
  color: white;
}

#searchButton {
  margin: 6px;
  padding: 6px 12px;
  background: #202E3C;
  border:1px solid #202E3C;
  cursor:pointer;
  border-radius: 6px;
  color: #61F0FE;
}

</style>