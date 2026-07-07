<template>
  <BaseChart :option="chartOption" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/components/charts/BaseChart.vue';
import type { QualityAnalysisItem } from '@/types/dashboard';
import {
  auroraChartColors,
  auroraPalette,
  auroraTooltip,
  getAuroraColor,
  getAuroraLinearGradient,
  getAuroraVerticalGradient,
} from '@/utils/chartTheme';

const props = defineProps<{
  data: QualityAnalysisItem[];
}>();

const chartOption = computed<EChartsOption>(() => ({
  color: [auroraChartColors.teal, auroraChartColors.amber, auroraChartColors.magenta],
  grid: { top: 34, right: 18, bottom: 28, left: 42 },
  tooltip: { ...auroraTooltip, trigger: 'axis' },
  legend: {
    top: 0,
    right: 0,
    icon: 'roundRect',
    itemWidth: 14,
    itemHeight: 7,
    textStyle: { color: auroraChartColors.text, fontSize: 12 },
  },
  xAxis: {
    type: 'category',
    data: props.data.map((item) => item.label),
    axisLabel: { color: auroraChartColors.muted },
    axisTick: { show: false },
    axisLine: { lineStyle: { color: 'rgba(125, 211, 252, 0.26)' } },
  },
  yAxis: [
    {
      type: 'value',
      min: 90,
      max: 100,
      axisLabel: { color: auroraChartColors.muted, formatter: '{value}%' },
      splitLine: { lineStyle: { color: auroraChartColors.grid } },
    },
    {
      type: 'value',
      axisLabel: { color: auroraChartColors.muted },
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: '合格率',
      type: 'bar',
      barWidth: 18,
      data: props.data.map((item, index) => ({
        value: item.passRate,
        itemStyle: {
          color: getAuroraVerticalGradient(index),
          shadowBlur: 16,
          shadowColor: getAuroraColor(index),
        },
      })),
      itemStyle: {
        borderRadius: [6, 6, 0, 0],
      },
    },
    {
      name: '不良品',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      symbolSize: 7,
      itemStyle: { color: auroraPalette[3], borderColor: '#fff7ed', borderWidth: 1 },
      lineStyle: {
        width: 3,
        color: getAuroraLinearGradient(3),
        shadowBlur: 10,
        shadowColor: 'rgba(251, 191, 36, 0.28)',
      },
      data: props.data.map((item) => item.defects),
    },
    {
      name: '返工数',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      symbol: 'diamond',
      symbolSize: 8,
      itemStyle: { color: auroraPalette[6], borderColor: '#fdf2ff', borderWidth: 1 },
      lineStyle: {
        width: 3,
        color: getAuroraLinearGradient(6),
        shadowBlur: 10,
        shadowColor: 'rgba(165, 180, 252, 0.28)',
      },
      data: props.data.map((item) => item.rework),
    },
  ],
}));
</script>
