<script setup lang="ts">
import {AssetOrder} from '@/types'

type Props = {
  orders: AssetOrder[]
}

const props = defineProps<Props>()
const quFormat = new Intl.NumberFormat(`en-US`, {minimumFractionDigits: 0, maximumFractionDigits: 0})
</script>

<template>
  <table class="orders">
    <thead>
    <tr>
      <th>Entity</th>
      <th>Price</th>
      <th># Shares</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="order in props.orders" class="order">
      <td>
        <router-link :to="{ name: 'entity', params: { entity: order.entityId }}">{{ order.entityId }}</router-link>
      </td>
      <td>
        {{ quFormat.format(order.price) }}
      </td>
      <td>
        {{ order.numberOfShares }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

.order {
  white-space: nowrap;
  text-align: right;
}

.orders td {
  padding: 6px 12px;
}

.orders th {
  font-weight: normal;
}

</style>
