<template>
  <BaseChart :option="chartOption" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/components/charts/BaseChart.vue';
import type { EquipmentStatusItem } from '@/types/dashboard';

const props = defineProps<{
  data: EquipmentStatusItem[];
}>();

const chartOption = computed<EChartsOption>(() => ({
  color: ['#34d399', '#38bdf8', '#fbbf24', '#fb7185'],
  tooltip: { trigger: 'item', backgroundColor: 'rgba(7, 16, 34, 0.92)', borderColor: '#22d3ee' },
  legend: {
    bottom: 0,
    textStyle: { color: '#b8d8f8' },
  },
  series: [
    {
      name: '设备状态',
      type: 'pie',
      radius: ['48%', '70%'],
      center: ['50%', '46%'],
      avoidLabelOverlap: true,
      label: {
        color: '#dff7ff',
        formatter: '{b}\n{c}台',
      },
      labelLine: {
        lineStyle: { color: 'rgba(226, 246, 255, 0.42)' },
      },
      data: props.data,
    },
  ],
}));
</script>
