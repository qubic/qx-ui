<script setup lang="ts">
import {useRoute} from 'vue-router'
const route = useRoute();
</script>

<template>

  <div id="header">
    <router-link :to="{ name: 'home'}">
      <img src="/qx-info-logo.svg" alt="qx info logo"/>
    </router-link>
  </div>

  <div v-if="route.name !== 'home'" id="navigation">
    <router-link :to="{ name: 'home'}">Home</router-link> |
    <router-link to="/assets">Assets</router-link> |
    <router-link to="/trades">Trades</router-link> |
    <router-link to="/transactions">Transactions</router-link>
  </div>

  <div id="content">
    <router-view :key="route.fullPath"></router-view>
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
    height: 100%;
    max-width: 1100px; /* 1024 is to tight for asset screen */
    margin: auto;
  }

  #footer {
    padding: 24px;
  }

</style>
