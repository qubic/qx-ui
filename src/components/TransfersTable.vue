<script setup lang="ts">

import {Transfer} from '@/types'
type Props = {
  transfers: Transfer[]
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
      <th>Shares</th>
      <th class="rightAlign">Details</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="transfer in props.transfers" :key="transfer.hash.slice(0,20)">
      <td>
        <div>
          <router-link class="link" :to="{ name: 'asset', params: { assetIssuer: transfer.extraData.issuer, assetName: transfer.extraData.name }}">{{ transfer.extraData.name }}</router-link>
        </div>
        <div class="smaller grey">
          <router-link class="monoFont" :to="{ name: 'entity', params: { entity: transfer.extraData.issuer }}">{{ abbreviate(transfer.extraData.issuer) }}</router-link>
        </div>
      </td>
      <td>
        <div>
          {{ quFormat.format(transfer.extraData.numberOfShares) }}
        </div>
      </td>
      <td class="smaller">
        <div>
          Tick <a class="monoFont" :href="'https://explorer.qubic.org/network/tick/' + transfer.tick">{{ transfer.tick }}</a>
        </div>
        <div>
          From <router-link class="monoFont" :to="{ name: 'entity', params: { entity: transfer.source }}">{{ abbreviate(transfer.source) }}</router-link>
        </div>
        <div>
          To <router-link class="monoFont" :to="{ name: 'entity', params: { entity: transfer.extraData.newOwner }}">{{ abbreviate(transfer.extraData.newOwner) }}</router-link>
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
