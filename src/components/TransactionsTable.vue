<script setup lang="ts">
import {Transaction} from '@/types'
type Props = {
  transactions: Transaction[]
}
const props = defineProps<Props>()
function abbreviate(identity:string) {
  return identity && identity.length > 30 ? identity.slice(0, 10) + '...' + identity.slice(-4) : identity;
}
</script>

<template>
  <table>
    <thead>
    <tr>
      <th class="leftAlign">Tick / Type</th>
      <th class="leftAlign">Type</th>
      <th class="rightAlign">Hash</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="transaction in props.transactions">
      <td>
        <div>
          {{ transaction.tick }}
        </div>
        <div>
          <div v-if="transaction.extraData['@class'] === '.QxAssetOrderData'">
            Order asset
          </div>
          <div v-else-if="transaction.extraData['@class'] === '.QxTransferAssetData'">
            Transfer asset
          </div>
          <div v-else-if="transaction.extraData['@class'] === '.QxIssueAssetData'">
            Issue asset
          </div>
          <div v-else>
            Unknown transaction type
          </div>
        </div>
      </td>
      <td>
        <div>
          <div v-if="transaction.extraData['@class'] === '.QxAssetOrderData'">
            Order
          </div>
          <div v-else-if="transaction.extraData['@class'] === '.QxTransferAssetData'">
            Transfer
          </div>
          <div v-else-if="transaction.extraData['@class'] === '.QxIssueAssetData'">
            Issue Asset
          </div>
          <div v-else>
            Unknown transaction type
          </div>
        </div>
      </td>
      <td class="rightAlign smaller">
        <div>
          Hash <a class="monoFont" :href="'https://explorer.qubic.org/network/tx/' + transaction.hash"> {{ abbreviate(transaction.hash) }}</a>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>
