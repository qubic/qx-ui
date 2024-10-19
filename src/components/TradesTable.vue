<script setup lang="ts">
import {Trade} from '@/types'

type Props = {
  trades: Trade[]
}

const props = defineProps<Props>()

const quFormat = new Intl.NumberFormat(`en-US`, {minimumFractionDigits: 0, maximumFractionDigits: 0})
const dateFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC', day: '2-digit', month: '2-digit', year: '2-digit',
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
})
</script>

<template>
  <table class="trades">
    <thead>
    <tr>
      <th>Asset</th>
      <th>Time (UTC)</th>
      <th>Type</th>
      <th>Price</th>
      <th># Shares</th>
      <th>Total</th>
      <th>Transaction</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="trade in props.trades" class="trade">
      <td>
        <router-link :to="{ name: 'orderBook', params: { assetIssuer: trade.issuer, assetName: trade.assetName }}">{{ trade.assetName }}</router-link>
        <p class="small">
          {{ trade.issuer }}
        </p>
      </td>
      <td>
        {{ dateFormat.format(new Date(trade.tickTime)).replaceAll(',', '').replaceAll('/', '-') }}
      </td>
      <td>
        <span v-if="!trade.bid" class="color-red">
          SELL
        </span>
        <span v-else class="color-green">
          BUY
        </span>
      </td>
      <td>
        {{ quFormat.format(trade.price) }}
      </td>
      <td>
        {{ trade.numberOfShares }}
      </td>
      <td>
        {{ quFormat.format(trade.price * trade.numberOfShares) }}
      </td>
      <td>
        <p class="smaller">
          Hash : <a :href="'https://explorer.qubic.org/network/tx/' + trade.transactionHash">{{
            trade.transactionHash
          }}</a>
        </p>
        <p class="smaller">
          Taker: <a :href="'https://explorer.qubic.org/network/address/' + trade.taker">{{ trade.taker }}</a>
        </p>
        <p class="smaller">
          Maker: <a :href="'https://explorer.qubic.org/network/address/' + trade.maker">{{ trade.maker }}</a>
        </p>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

.trade {
  white-space: nowrap;
  /*width: 100%;*/
  text-align: center;
}

.trades td {
  padding: 6px 12px;
}

.trades th {
  color: #101820;
  background-color: #76AFB4;
  font-weight: normal;
}

</style>
