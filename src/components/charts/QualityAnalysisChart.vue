<template>
  <BaseChart :option="chartOption" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/components/charts/BaseChart.vue';
import type { QualityAnalysisItem } from '@/types/dashboard';
import { auroraChartColors, auroraTooltip } from '@/utils/chartTheme';

const props = defineProps<{
  data: QualityAnalysisItem[];
}>();

const chartOption = computed<EChartsOption>(() => ({
  color: [auroraChartColors.teal, auroraChartColors.amber, auroraChartColors.violet],
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
      barWidth: 16,
      data: props.data.map((item) => item.passRate),
      itemStyle: {
        borderRadius: [6, 6, 0, 0],
        shadowBlur: 14,
        shadowColor: 'rgba(94, 234, 212, 0.24)',
      },
    },
    {
      name: '不良品',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      data: props.data.map((item) => item.defects),
    },
    {
      name: '返工数',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      data: props.data.map((item) => item.rework),
    },
  ],
}));
</script>
