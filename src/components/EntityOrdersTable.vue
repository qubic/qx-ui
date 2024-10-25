<script setup lang="ts">
import {EntityOrder} from '@/types'

type Props = {
  orders: EntityOrder[]
}

const props = defineProps<Props>()
const quFormat = new Intl.NumberFormat(`en-US`, {minimumFractionDigits: 0, maximumFractionDigits: 0})

function abbreviate(identity: string) {
  return identity && identity.length > 30 ? identity.slice(0, 10) + '...' + identity.slice(-4) : identity;
}

</script>

<template>
  <table>
    <thead>
    <tr>
      <th>Asset</th>
      <th>Shares</th>
      <th>Price (qu)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in props.orders" class="entityOrders">
      <td>
        <router-link :to="{ name: 'asset', params: { assetIssuer: order.issuerId, assetName: order.assetName }}">
          {{ order.assetName }}
        </router-link>
        <div class="monoFont grey">
          {{ abbreviate(order.issuerId) }}
        </div>
      </td>
      <td>
        {{ quFormat.format(order.numberOfShares) }}
      </td>
      <td>
        {{ quFormat.format(order.price) }}
        <div v-if="order.numberOfShares > 1" class="grey">{{
            quFormat.format(order.price * order.numberOfShares)
          }}
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

.entityOrders {
  height: 67px;
}

</style>
