<template>
  <div ref="chartEl" class="chart-canvas" data-testid="echarts-chart" />
</template>

<script setup lang="ts">
import type { ECharts, EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  option: EChartsOption;
}>();

const chartEl = ref<HTMLDivElement>();
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const renderChart = async () => {
  await nextTick();
  if (!chartEl.value) {
    return;
  }

  if (!chart) {
    chart = echarts.init(chartEl.value, undefined, { renderer: 'canvas' });
  }

  chart.setOption(props.option, true);
  chart.resize();
};

onMounted(() => {
  void renderChart();
  if (chartEl.value) {
    resizeObserver = new ResizeObserver(() => chart?.resize());
    resizeObserver.observe(chartEl.value);
  }
});

watch(
  () => props.option,
  () => {
    void renderChart();
  },
  { deep: true },
);

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  chart?.dispose();
});
</script>

<style scoped>
.chart-canvas {
  width: 100%;
  height: 100%;
  min-height: 180px;
}
</style>
