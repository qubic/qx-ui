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
      <th>Asset</th>
      <th>Issuer</th>
      <th>Shares</th>
      <th>Decimals</th>
      <th class="rightAlign">Details</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="transfer in props.issuedAssets" :key="transfer.hash.slice(0,20)">
      <td>
        <div>
          <router-link :to="{ name: 'asset', params: { assetIssuer: transfer.source, assetName: transfer.extraData.name }}">{{ transfer.extraData.name }}</router-link>
        </div>
      </td>
      <td>
        <div>
          <router-link class="monoFont" :to="{ name: 'entity', params: { entity: transfer.source }}">{{ abbreviate(transfer.source) }}</router-link>
        </div>
      </td>
      <td>
        <div>
          {{ quFormat.format(transfer.extraData.numberOfShares) }}
        </div>
      </td>
      <td>
        <div>
          {{ quFormat.format(transfer.extraData.numberOfDecimalPlaces) }}
        </div>
      </td>
      <td class="smaller">
        <div>
          Tick <a class="monoFont" :href="'https://explorer.qubic.org/network/tick/' + transfer.tick">{{ transfer.tick }}</a>
        </div>
        <div>
          Hash <a class="monoFont" :href="'https://explorer.qubic.org/network/tx/' + transfer.hash"> {{ abbreviate(transfer.hash) }}</a>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>
