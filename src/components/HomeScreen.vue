<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {ROOT_URL_QX_SERVICE} from "@/contants.ts";
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
  <h1 class="heading">QX Dashboard</h1>
  <span v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</span>

  <h3 class="heading">Assets</h3>
  <table class="assets">
    <thead>
    <tr>
      <th>Name</th>
      <th>Issuer</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="asset in assets" class="asset">
      <td>
        <router-link :to="{ name: 'orderBook', params: { assetIssuer: asset.issuer, assetName: asset.name }}">{{asset.name}}</router-link>
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
  /*width: 100%;*/
  text-align: center;
}

.assets td {
  padding: 6px 12px;
}

.assets th {
  color: #00161D;
  background-color: #76AFB4;
  font-weight: normal;
}

</style>