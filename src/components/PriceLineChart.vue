<script setup lang="ts">

import {onMounted, onUnmounted, ref, watch} from "vue";
import {createChart, SingleValueData} from "lightweight-charts";

const chartContainer = ref();
let chart;
let priceSeries;

type Props = {
  priceDataSeries: SingleValueData[]
}
const props = defineProps<Props>()

onMounted(() => {
  // Create the Lightweight Charts Instance using the container ref.
  const chartOptions = {
    layout: {textColor: '#707A8A', attributionLogo: false, background: {type: 'solid', color: '#151E27'}},
    rightPriceScale: {
      borderVisible: false,
    },
  };
  chart = createChart(chartContainer.value, chartOptions);

  priceSeries = chart.addLineSeries({lineWidth: 2, color: '#61F0FE', priceFormat: { type: 'price', precision: 0, minMove: 1 }});
  priceSeries.priceScale().applyOptions({
    scaleMargins: {
      // positioning the price scale for the area series
      top: 0.1,
      bottom: 0.4,
    },
  })
  priceSeries.setData(props.priceDataSeries);
  chart.timeScale().fitContent();

});

onUnmounted(() => {
  if (chart) {
    chart.remove();
    chart = null;
  }
});

watch(
    () => props.priceDataSeries,
    newData => {
      if (!chart) {
        return;
      }
      console.log('data series changed')
      priceSeries.setData(newData)
      chart.timeScale().fitContent();
    },
    { deep: true }
);

</script>

<template>

    <div class="lw-chart" ref="chartContainer"></div>

</template>

<style scoped>

.lw-chart {
  min-height: 200px;
}

</style>