<script setup lang="ts">
import {AssetOrder} from '@/types'

type Props = {
  orders: AssetOrder[]
}

const props = defineProps<Props>()
const quFormat = new Intl.NumberFormat(`en-US`, { minimumFractionDigits: 0, maximumFractionDigits: 0 })

function abbreviate(identity:string) {
    return identity && identity.length > 30 ? identity.slice(0, 10) + '...' + identity.slice(-4) : identity;
}

</script>

<template>
  <table class="qx-table">
    <thead>
    <tr>
      <th>Entity</th>
      <th>Shares</th>
      <th>Price (qu)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in props.orders" class="assetOrders" :key="order.entityId.slice(0,10)+order.price">
      <td class="monoFont">
          <router-link :to="{ name: 'entity', params: { entity: order.entityId }}">{{ abbreviate(order.entityId) }}</router-link>
      </td>
      <td>
        {{ quFormat.format(order.numberOfShares) }}
      </td>
      <td>
        {{ quFormat.format(order.price) }}
        <div v-if="order.numberOfShares > 1" class="grey">{{ quFormat.format(order.price * order.numberOfShares) }}</div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

.assetOrders {
  height: 67px;
}

</style>
