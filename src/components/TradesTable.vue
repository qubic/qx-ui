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
      <th>Details</th>
      <th>Total (qu)</th>
      <th>Information</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="trade in props.trades" class="trade">
      <td class="trade">
        <router-link :to="{ name: 'asset', params: { assetIssuer: trade.issuer, assetName: trade.assetName }}">{{ trade.assetName }}</router-link>
        <p class="smaller">
          {{ trade.issuer.slice(0,8) + '...' + trade.issuer.slice(-4) }}
        </p>
      </td>
      <td>
        <div class="info">
          <span v-if="!trade.bid" class="color-red">
            SELL
          </span>
          <span v-else class="color-green">
            BUY
          </span>
        </div>

        <div class="info">
          Time:
        {{ dateFormat.format(new Date(trade.tickTime)).replaceAll(',', '').replaceAll('/', '-') }}
        </div>
        <div class="info">Shares: {{ trade.numberOfShares }}</div>
        <div class="info">Price: {{ quFormat.format(trade.price) }} qu</div>

      </td>
      <td class="amount">
        {{ quFormat.format(trade.price * trade.numberOfShares) }}
      </td>
      <td>
        <p class="smaller">
          Issuer <a :href="'https://explorer.qubic.org/network/address/' + trade.issuer">{{trade.issuer}}</a>
        </p>
        <p class="smaller">
          Hash&nbsp;&nbsp; <a :href="'https://explorer.qubic.org/network/tx/' + trade.transactionHash">{{trade.transactionHash}}</a>
        </p>
        <p class="smaller">
          Taker&nbsp; <router-link :to="{ name: 'entity', params: { entity: trade.taker }}">{{ trade.taker }}</router-link>
        </p>
        <p class="smaller">
          Maker&nbsp; <router-link :to="{ name: 'entity', params: { entity: trade.maker }}">{{ trade.maker }}</router-link>
        </p>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

.trade {
  white-space: nowrap;
}

.trades td {
  padding: 4px 12px;
}

.amount {
  text-align: right;
}

</style>
