<template>
  <BaseChart :option="chartOption" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/components/charts/BaseChart.vue';
import type { ProductionTrendPoint } from '@/types/dashboard';
import {
  auroraChartColors,
  auroraPalette,
  auroraTooltip,
  getAuroraLinearGradient,
} from '@/utils/chartTheme';

const props = defineProps<{
  data: ProductionTrendPoint[];
}>();

const chartOption = computed<EChartsOption>(() => ({
  color: [auroraChartColors.cyan, auroraChartColors.amber, auroraChartColors.magenta],
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
      itemStyle: {
        color: auroraChartColors.cyan,
        borderColor: '#f8feff',
        borderWidth: 2,
      },
      lineStyle: {
        width: 3,
        color: getAuroraLinearGradient(0),
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
            { offset: 0.42, color: 'rgba(52, 211, 153, 0.18)' },
            { offset: 0.74, color: 'rgba(165, 180, 252, 0.12)' },
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
      itemStyle: {
        color: auroraChartColors.amber,
        borderColor: auroraChartColors.violet,
        borderWidth: 1,
      },
      lineStyle: {
        type: 'dashed',
        width: 2,
        color: getAuroraLinearGradient(3),
        shadowColor: 'rgba(253, 230, 138, 0.3)',
        shadowBlur: 10,
      },
      markPoint: {
        symbol: 'circle',
        symbolSize: 8,
        silent: true,
        itemStyle: { color: auroraPalette[6] },
        data: [{ type: 'max', name: 'max' }],
        label: { show: false },
      },
      data: props.data.map((item) => item.target),
    },
  ],
}));
</script>
