<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {IssuedAsset, Transfer} from '@/types'
import TransfersTable from "@/components/TransfersTable.vue";
import IssuedAssetsTable from "@/components/IssuedAssetsTable.vue";

const transfers = ref<Transfer[]>([])
const issuedAssets = ref<IssuedAsset[]>([])

const errorMessage = ref<string | null>(null)

async function fetchData() {
  try {
    const [t, a] = await Promise.all([
      axios.get(ROOT_URL_QX_SERVICE + '/transfers'),
      axios.get(ROOT_URL_QX_SERVICE + '/issued-assets')
    ])
    transfers.value = [...t.data]
    issuedAssets.value = [...a.data]
  } catch (error) {
    errorMessage.value = (error as Error).message
  }
}
fetchData()
</script>

<template>

  <h2>Latest issued assets</h2>
  <span v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</span>
  <!-- only show money flew 'true' or null -->
  <IssuedAssetsTable :issuedAssets="issuedAssets.filter(t => t.moneyFlew !== false).slice(0, 10)" />

  <h2>Latest asset transfers</h2>
  <span v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</span>
  <!-- only show money flew 'true' or null -->
  <TransfersTable :transfers="transfers.filter(t => t.moneyFlew !== false).slice(0, 25)" />

</template>

<style scoped>

</style>