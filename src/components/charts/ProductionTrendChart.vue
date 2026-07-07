<template>
  <BaseChart :option="chartOption" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/components/charts/BaseChart.vue';
import type { ProductionTrendPoint } from '@/types/dashboard';
import { auroraChartColors, auroraTooltip } from '@/utils/chartTheme';

const props = defineProps<{
  data: ProductionTrendPoint[];
}>();

const chartOption = computed<EChartsOption>(() => ({
  color: [auroraChartColors.cyan, auroraChartColors.violet],
  grid: { top: 32, right: 18, bottom: 28, left: 44 },
  tooltip: { ...auroraTooltip, trigger: 'axis' },
  legend: {
    top: 0,
    right: 4,
    icon: 'roundRect',
    itemWidth: 14,
    itemHeight: 7,
    textStyle: { color: auroraChartColors.text, fontSize: 12 },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.data.map((item) => item.date),
    axisLabel: { color: auroraChartColors.muted },
    axisTick: { show: false },
    axisLine: { lineStyle: { color: 'rgba(125, 211, 252, 0.26)' } },
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: auroraChartColors.muted },
    splitLine: { lineStyle: { color: auroraChartColors.grid } },
  },
  series: [
    {
      name: '实际产量',
      type: 'line',
      smooth: true,
      symbolSize: 7,
      lineStyle: {
        width: 3,
        shadowColor: 'rgba(34, 211, 238, 0.46)',
        shadowBlur: 12,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(34, 211, 238, 0.38)' },
            { offset: 1, color: 'rgba(34, 211, 238, 0)' },
          ],
        },
      },
      data: props.data.map((item) => item.output),
    },
    {
      name: '目标产量',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { type: 'dashed', width: 2 },
      data: props.data.map((item) => item.target),
    },
  ],
}));
</script>
