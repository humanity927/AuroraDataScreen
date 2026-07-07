<template>
  <BaseChart :option="chartOption" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/components/charts/BaseChart.vue';
import type { ProductionTrendPoint } from '@/types/dashboard';

const props = defineProps<{
  data: ProductionTrendPoint[];
}>();

const chartOption = computed<EChartsOption>(() => ({
  color: ['#22d3ee', '#a78bfa'],
  grid: { top: 28, right: 18, bottom: 28, left: 44 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(7, 16, 34, 0.92)', borderColor: '#22d3ee' },
  legend: {
    top: 0,
    right: 4,
    textStyle: { color: '#b8d8f8' },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.data.map((item) => item.date),
    axisLabel: { color: '#8fb6d8' },
    axisLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.25)' } },
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#8fb6d8' },
    splitLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.12)' } },
  },
  series: [
    {
      name: '实际产量',
      type: 'line',
      smooth: true,
      symbolSize: 7,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(34, 211, 238, 0.34)' },
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
      lineStyle: { type: 'dashed' },
      data: props.data.map((item) => item.target),
    },
  ],
}));
</script>
