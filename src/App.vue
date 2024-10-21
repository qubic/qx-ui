<script setup lang="ts">
</script>

<template>

  <div class="header">
    <a href="/#/">Home</a>&nbsp;|
    &nbsp;<router-link to="/assets">Assets</router-link>&nbsp;|
    &nbsp;<router-link to="/latestTrades">Trades</router-link>
  </div><br/>

  <p>
    <router-view :key="$route.fullPath"></router-view>
  </p>

  <div class="footer">
    <p>
      Help/Contact: <a href="https://discord.com/invite/qubic">Qubic Discord</a> - For more information visit <a href="https://qubic.org">Qubic</a>.
    </p>
  </div>
  <a class="imageLink" href="https://qubic.org"><img class="logo" alt="qubic logo" src="/qubic-logo-white.svg" height="32"></a>

</template>

<style scoped>

img.logo {
  margin-top: 5px;
  left: 5px;
}

.footer {
  margin-top: 4rem;
  width: max-content;
}
</style>
