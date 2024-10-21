<script setup lang="ts">
import {EntityOrder} from '@/types'

type Props = {
  orders: EntityOrder[]
}

const props = defineProps<Props>()
const quFormat = new Intl.NumberFormat(`en-US`, { minimumFractionDigits: 0, maximumFractionDigits: 0 })

function abbreviate(identity:string) {
  return identity && identity.length > 30 ? identity.slice(0, 10) + '...' + identity.slice(-4) : identity;
}

</script>

<template>
  <table class="orders">
    <thead>
    <tr>
      <th>Asset</th>
      <th>Shares</th>
      <th>Price (qu)</th>
      <th>Total (qu)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in props.orders" class="order">
      <td>
        <router-link :to="{ name: 'asset', params: { assetIssuer: order.issuerId, assetName: order.assetName }}">
          {{ order.assetName }}
        </router-link>
        <div class="smaller">
          {{ abbreviate(order.issuerId) }}
        </div>
      </td>
      <td>
        {{ quFormat.format(order.numberOfShares) }}
      </td>
      <td>
        {{ quFormat.format(order.price) }}
      </td>
      <td class="amount">
        {{ quFormat.format(order.price * order.numberOfShares) }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

.order {
  white-space: nowrap;
}

.orders td {
  padding: 6px 12px;
}

.orders th {
  font-weight: normal;
}

.amount {
  text-align: right;
}

</style>
