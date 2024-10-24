<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {Transaction} from '@/types'
import TransactionsTable from "@/components/TransactionsTable.vue";

const transactions = ref<Transaction[]>([])

const errorMessage = ref<string | null>(null)

async function fetchData() {
  try {
    const [t1] = await Promise.all([
      axios.get(ROOT_URL_QX_SERVICE + '/transactions'),
    ])
    transactions.value = [...t1.data]
  } catch (error) {
    errorMessage.value = (error as Error).message
  }
}
fetchData()
</script>

<template>

  <h1>Latest transactions</h1>
  <span v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</span>
  <TransactionsTable :transactions="transactions.slice(0, 20)" />

</template>

<style scoped>

</style>