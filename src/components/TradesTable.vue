<script setup lang="ts">
import {Trade} from '@/types'

type Props = {
  trades: Trade[]
}

const props = defineProps<Props>()

const quFormat = new Intl.NumberFormat(`en-US`, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
const dateFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC', day: '2-digit', month: '2-digit', year: '2-digit',
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
})

function abbreviate(identity:string) {
  return identity && identity.length > 30 ? identity.slice(0, 10) + '...' + identity.slice(-4) : identity;
}
</script>

<template>
  <table class="trades">
    <thead>
    <tr>
      <th class="leftAlign">Time & Asset</th>
      <th class="leftAlign">Trade Details</th>
      <th class="rightAlign">IDs</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="trade in props.trades" class="trade">
      <td class="trade">
        <div>
          {{ dateFormat.format(new Date(trade.tickTime)).replaceAll(',', '').replaceAll('/', '-') }}
        </div>
        <div>
          <span v-if="!trade.bid" class="color-red">
            SELL
          </span>
          <span v-else class="color-green">
            BUY
          </span>
        </div>
        <router-link :to="{ name: 'asset', params: { assetIssuer: trade.issuer, assetName: trade.assetName }}">{{ trade.assetName }}</router-link>
      </td>
      <td class="leftAlign">
        <div>Shares: {{ quFormat.format(trade.numberOfShares) }}</div>
        <div>Price: {{ quFormat.format(trade.price) }} qu</div>
        <div>Total: {{ quFormat.format(trade.price * trade.numberOfShares) }} qu</div>
      </td>
      <td class="rightAlign smaller">
        <div>
          Taker <router-link class="monoFont" :to="{ name: 'entity', params: { entity: trade.taker }}">{{ abbreviate(trade.taker) }}</router-link>
        </div>
        <div>
          Maker <router-link class="monoFont" :to="{ name: 'entity', params: { entity: trade.maker }}">{{ abbreviate(trade.maker) }}</router-link>
        </div>
        <div>
          Hash <a class="monoFont" :href="'https://explorer.qubic.org/network/tx/' + trade.transactionHash"> {{ abbreviate(trade.transactionHash) }}</a>
        </div>
        <div>
          Issuer <span class="monoFont">{{ abbreviate(trade.issuer) }}</span>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>
