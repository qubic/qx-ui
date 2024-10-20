<script setup lang="ts">
import {EntityOrder} from '@/types'

type Props = {
  orders: EntityOrder[]
}

const props = defineProps<Props>()
const quFormat = new Intl.NumberFormat(`en-US`, {minimumFractionDigits: 0, maximumFractionDigits: 0})
</script>

<template>
  <table class="orders">
    <thead>
    <tr>
      <th>Asset</th>
      <th># Shares</th>
      <th>Price</th>
      <th>Total amount (qu)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in props.orders" class="order">
      <td>
        <router-link :to="{ name: 'asset', params: { assetIssuer: order.issuerId, assetName: order.assetName }}">
          {{ order.assetName }}
        </router-link>
        <div class="smaller">
          {{ order.issuerId.slice(0, 8) + '...' + order.issuerId.slice(-4) }}
        </div>
      </td>
      <td>
        {{ order.numberOfShares }}
      </td>
      <td>
        {{ order.price }}
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
