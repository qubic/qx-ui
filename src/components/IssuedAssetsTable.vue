<script setup lang="ts">
import {IssuedAsset} from '@/types'
type Props = {
  issuedAssets: IssuedAsset[]
}
const props = defineProps<Props>()
const quFormat = new Intl.NumberFormat(`en-US`, { maximumFractionDigits: 0 })
function abbreviate(identity:string) {
  return identity && identity.length > 30 ? identity.slice(0, 10) + '...' + identity.slice(-4) : identity;
}
</script>

<template>
  <table>
    <thead>
    <tr>
      <th>Asset / Issuer</th>
      <th>Shares</th>
      <th class="rightAlign">Details</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="tx in props.issuedAssets" :key="tx.hash.slice(0,20)">
      <td>
        <div>
          <router-link clas="foo" :to="{ name: 'asset', params: { assetIssuer: tx.source, assetName: tx.extraData.name }}">{{ tx.extraData.name }}</router-link>
        </div>
        <div class="grey smaller">
          <router-link class="monoFont" :to="{ name: 'entity', params: { entity: tx.source }}">{{ abbreviate(tx.source) }}</router-link>
        </div>
      </td>
      <td>
        <div>
          {{ quFormat.format(tx.extraData.numberOfShares) }}
        </div>
      </td>
      <td class="smaller">
        <div>
          Decimals: {{ quFormat.format(tx.extraData.numberOfDecimalPlaces) }}
        </div>
        <div>
          Tick <a class="monoFont" :href="'https://explorer.qubic.org/network/tick/' + tx.tick">{{ tx.tick }}</a>
        </div>
        <div>
          Hash <a class="monoFont" :href="'https://explorer.qubic.org/network/tx/' + tx.hash"> {{ abbreviate(tx.hash) }}</a>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>
