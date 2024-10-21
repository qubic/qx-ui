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

  <ul class="assets">
    <li v-for="asset in assets" class="asset">
      <router-link :to="{ name: 'asset', params: { assetIssuer: asset.issuer, assetName: asset.name }}">
        {{asset.name}}
        <div class="small grey monoFont">
          {{ asset.issuer }}
        </div>
      </router-link>
    </li>
  </ul>

</template>

<style scoped>

/* Only add border to bottom of <li> */
.asset {
  min-width: 200px;
  padding: 20px 10px;
  border-bottom: solid #202E3C 1px ;
}

/* Get rid of the last <li>'s bottom border */
.assets li:last-child {
  border-bottom: none;
}

a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

</style>