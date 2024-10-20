<script setup lang="ts">
import {ref} from 'vue'

const searchTrader = ref<string | null>(null)

</script>

<template>
  <h2>Search open orders and trades of an entity</h2>
  <input id="traderSearch" size="65" type="text" v-model="searchTrader" />&nbsp;
  <button id="searchButton" @click="$router.push({ name: 'entity', params: { entity: searchTrader }})">Lookup Trader</button>
</template>

<style scoped>

#traderSearch {
  padding:5px;
  border:1px solid #76AFB4;
  font-size: medium;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

#traderSearch:focus {
  border-color: #B0F9FF;
}

#searchButton {
  padding:5px 15px;
  background: #B0F9FF;
  border:1px solid #76AFB4;
  cursor:pointer;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

</style>