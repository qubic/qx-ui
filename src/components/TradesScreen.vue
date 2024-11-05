<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {Trade} from '@/types'
import TradesTable from "./TradesTable.vue"

const trades = ref<Trade[]>([])

const errorMessage = ref<string | null>(null)

async function fetchTrades() {
  try {
    const [t1] = await Promise.all([
      axios.get(ROOT_URL_QX_SERVICE + '/trades'),
    ])
    trades.value = [...t1.data]
  } catch (error) {
    errorMessage.value = (error as Error).message
  }
}
fetchTrades()
</script>

<template>

  <h1>Latest QX trades</h1>
  <span v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</span>
  <TradesTable :trades="trades.slice(0, 25)" />

</template>

<style scoped>

</style>