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
  <h1 class="heading">QX Assets</h1>
  <span v-if="errorMessage" class="color-red">{{ errorMessage }} Please inform admin!</span>

  <h2 class="heading">Smart Contract Shares</h2>
  <div class="flex-container">
    <router-link v-for="asset in assets.filter(a => a.issuer.startsWith('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'))" :to="{ name: 'asset', params: { assetIssuer: asset.issuer, assetName: asset.name }}">
      <div class="flex-item">
        <div class="asset-name">
          {{asset.name}}
        </div>
        <div class="small grey monoFont">
          {{ asset.issuer }}
        </div>
      </div>
    </router-link>
  </div>

  <h2 class="heading">Tokens</h2>
  <div class="flex-container">
    <router-link v-for="asset in assets.filter(a => !a.issuer.startsWith('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'))" :to="{ name: 'asset', params: { assetIssuer: asset.issuer, assetName: asset.name }}">
      <div class="flex-item">
        <div class="asset-name">
          {{asset.name}}
        </div>
        <div class="small grey monoFont">
          {{ asset.issuer }}
        </div>
      </div>
    </router-link>
  </div>

</template>

<style scoped>

.flex-container {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 600px;
}

.flex-item {
  border-radius: 12px;
  margin: 12px;
  width: 124px;
  height: 68px;
  padding: 24px 24px;
  border: solid #202E3C 1px;
  background-color: #151E27;
  font-size: large;
  font-weight: bold;
  word-wrap: break-word;
  align-content: center;
}

.flex-container a:active, a:link, a:visited, a:hover {
  background-color: transparent;
  text-decoration: none;
  color: white;
}

.asset-name {
  margin-bottom: 6px;
}

</style>