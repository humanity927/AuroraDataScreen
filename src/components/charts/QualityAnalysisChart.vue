<template>
  <BaseChart :option="chartOption" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/components/charts/BaseChart.vue';
import type { QualityAnalysisItem } from '@/types/dashboard';

const props = defineProps<{
  data: QualityAnalysisItem[];
}>();

const chartOption = computed<EChartsOption>(() => ({
  color: ['#5eead4', '#f59e0b', '#c084fc'],
  grid: { top: 34, right: 18, bottom: 28, left: 42 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(7, 16, 34, 0.92)', borderColor: '#22d3ee' },
  legend: {
    top: 0,
    right: 0,
    textStyle: { color: '#b8d8f8' },
  },
  xAxis: {
    type: 'category',
    data: props.data.map((item) => item.label),
    axisLabel: { color: '#8fb6d8' },
    axisLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.25)' } },
  },
  yAxis: [
    {
      type: 'value',
      min: 90,
      max: 100,
      axisLabel: { color: '#8fb6d8', formatter: '{value}%' },
      splitLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.12)' } },
    },
    {
      type: 'value',
      axisLabel: { color: '#8fb6d8' },
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: '合格率',
      type: 'bar',
      barWidth: 16,
      data: props.data.map((item) => item.passRate),
      itemStyle: { borderRadius: [5, 5, 0, 0] },
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
