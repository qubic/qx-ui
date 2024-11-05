<script setup lang="ts">

import {onMounted, onUnmounted, ref, watch} from "vue";
import {createChart, SingleValueData} from "lightweight-charts";

const chartContainer = ref();
let chart;
let priceSeries;
let volumeSeries;

type Props = {
  priceDataSeries: SingleValueData[]
  volumeDataSeries: SingleValueData[]
}
const props = defineProps<Props>()

onMounted(() => {
  // Create the Lightweight Charts Instance using the container ref.
  const chartOptions = {
    layout: {textColor: '#707A8A', attributionLogo: false, background: {type: 'solid', color: '#151E27'}},
    rightPriceScale: {
      visible: true,
      borderVisible: false,
    },
    leftPriceScale: {
      visible: true,
      borderVisible: false,
    },
    // crosshair: {
    //   mode: 0, // don't snap to data points because of two scales
    // },
  };
  chart = createChart(chartContainer.value, chartOptions);

  priceSeries = chart.addLineSeries({lineWidth: 2, color: '#61F0FE', priceFormat: { type: 'price', precision: 2, minMove: 0.1 }});
  priceSeries.priceScale().applyOptions({
    scaleMargins: {
      // positioning the price scale for the area series
      top: 0.1,
      bottom: 0.4,
    },
  })
  priceSeries.setData(props.priceDataSeries);


  volumeSeries = chart.addHistogramSeries({ // general
    priceFormat: {
      type: 'volume',
    },
    priceScaleId: 'left',
    color: '#707A8A',
    scaleMargins: {
      top: 0.75, // highest point distance to top
      bottom: 0,
    }
  })
  volumeSeries.priceScale().applyOptions({ // price scale
    // set the positioning of the volume series
    scaleMargins: {
      top: 0.75, // highest point distance to top
      bottom: 0,
    }
  });

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
    { deep: true }
);

</script>

<template>

    <div class="lw-chart" ref="chartContainer"></div>

</template>

<style scoped>

.lw-chart {
  height: 100%;
  width: 100%;
  min-height: 200px;
}

</style>