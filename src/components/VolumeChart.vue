<script setup lang="ts">

import {onMounted, onUnmounted, ref, watch} from "vue";
import { createChart, HistogramData } from "lightweight-charts";

const chartContainer = ref();
let chart;
let volumeSeries;

type Props = {
  volumeDataSeries: HistogramData[]
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

  volumeSeries = chart.addHistogramSeries({
    priceFormat: {
      type: 'volume',
    },
    color: '#707A8A',
  })
  volumeSeries.setData(props.volumeDataSeries)
  chart.timeScale().fitContent();
});

onUnmounted(() => {
  if (chart) {
    chart.remove();
    chart = null;
  }
});

watch(
    () => props.volumeDataSeries,
    newData => {
      if (!chart) {
        return;
      }
      console.log('data series changed')
      volumeSeries.setData(newData)
      chart.timeScale().fitContent();
    },
    {deep: true}
);

</script>

<template>

  <div class="lw-chart" ref="chartContainer"></div>

</template>

<style scoped>

.lw-chart {
  min-height: 100px;
}
</style>