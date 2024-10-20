<script setup lang="ts">
</script>

<template>

  <div class="header">
    <a href="/#/">Home</a>&nbsp;|&nbsp;<router-link to="/assets">Assets</router-link> |&nbsp;<router-link to="/latestTrades">Latest Trades</router-link>
  </div><img class="logo" alt="qubic logo" src="/qubic-logo-white.svg" height="32"><br/>

  <p>
    <router-view></router-view>
  </p>

  <div class="footer">
    <p>
      Help/Contact: <a href="https://discord.com/invite/qubic">Qubic Discord</a> - For more information visit <a href="https://qubic.org">Qubic</a>.
    </p>
  </div>

</template>

<style scoped>

img.logo {
  float: right;
  margin-top: 10px;
  margin-right: 5px;
}

.footer {
  margin-top: 4rem;
  width: max-content;
}
</style>
