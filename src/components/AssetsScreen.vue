<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/constants";
import {Asset} from '@/types'

const assets = ref<Asset[]>([])

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
  <h1 class="heading">Assets</h1>
  <span v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</span>
  <table class="assets">
    <thead>
    </thead>
    <tbody>
    <tr v-for="asset in assets" class="asset">
      <td>
        <router-link :to="{ name: 'asset', params: { assetIssuer: asset.issuer, assetName: asset.name }}">{{asset.name}}</router-link>
      </td>
      <td>
        {{ asset.issuer }}
      </td>
    </tr>
    </tbody>
  </table>

</template>

<style scoped>

.asset {
  white-space: nowrap;
  text-align: left;
}

.assets td {
  padding: 6px 12px;
}

</style>