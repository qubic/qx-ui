<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {Order, Transfer} from '@/types'
import TransfersTable from "@/components/TransfersTable.vue";

const transfers = ref<Transfer[]>([])
const orders = ref<Order[]>([])

const errorMessage = ref<string | null>(null)

async function fetchData() {
  try {
    const [t, o] = await Promise.all([
      axios.get(ROOT_URL_QX_SERVICE + '/transfers'),
      axios.get(ROOT_URL_QX_SERVICE + '/orders')
    ])
    transfers.value = [...t.data]
    orders.value = [...o.data]
  } catch (error) {
    errorMessage.value = (error as Error).message
  }
}
fetchData()
</script>

<template>

  <h1>Latest asset transfers</h1>
  <span v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</span>
  <!-- only show money flew 'true' or null -->
  <TransfersTable :transfers="transfers.filter(t => t.moneyFlew !== false)" />

</template>

<style scoped>

</style>