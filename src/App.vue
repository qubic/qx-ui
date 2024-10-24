<script setup lang="ts">
import {useRoute} from 'vue-router'
const route = useRoute();
route.name
</script>

<template>

  <div id="header" class="noDecoration">
    <router-link :to="{ name: 'home'}">
      <img src="/qx-info-logo.svg" alt="qx info logo"/>
    </router-link>
  </div>

  <div v-if="route.name !== 'home'" id="navigation">
    <a href="/#/">Home</a>&nbsp; |
    &nbsp;<router-link to="/assets">Assets</router-link>&nbsp; |
    &nbsp;<router-link to="/latestTrades">Trades</router-link> |
    &nbsp;<span class="grey">Transactions</span> |
    &nbsp;<span class="grey">Charts</span>
  </div>

  <div id="content">
    <router-view :key="$route.fullPath"></router-view>
  </div>

  <div id="footer" class="smaller grey">
    <p>
      Help/Contact: <a href="https://discord.com/invite/qubic">Qubic Discord</a> - For more information visit <a href="https://qubic.org">qubic.org</a>.
    </p>
  </div>

</template>

<style scoped>

  #header {
    padding: 24px 0;
    text-align: center;
    background-color: transparent;
    border-bottom: solid #202E3C 1px;
  }

  #header a:hover {
    background-color: transparent;
  }

  #navigation {
    text-align: center;
    padding: 24px 0;
  }

  #content {
    flex: 1;
    min-height: 100%;
    text-align: center;
  }

  #footer {
    padding: 24px;
  }

</style>
