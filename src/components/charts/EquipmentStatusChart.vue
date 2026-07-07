<template>
  <BaseChart :option="chartOption" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/components/charts/BaseChart.vue';
import type { EquipmentStatusItem } from '@/types/dashboard';
import { auroraChartColors, auroraTooltip } from '@/utils/chartTheme';

const props = defineProps<{
  data: EquipmentStatusItem[];
}>();

const chartOption = computed<EChartsOption>(() => ({
  color: [
    auroraChartColors.teal,
    auroraChartColors.ice,
    auroraChartColors.amber,
    auroraChartColors.rose,
  ],
  tooltip: { ...auroraTooltip, trigger: 'item' },
  legend: {
    bottom: 0,
    icon: 'roundRect',
    itemWidth: 13,
    itemHeight: 8,
    textStyle: { color: auroraChartColors.text, fontSize: 12 },
  },
  series: [
    {
      name: '设备状态',
      type: 'pie',
      radius: ['50%', '72%'],
      center: ['50%', '46%'],
      avoidLabelOverlap: true,
      label: {
        color: auroraChartColors.text,
        formatter: '{b}\n{c}台',
      },
      itemStyle: {
        borderColor: 'rgba(7, 18, 36, 0.88)',
        borderWidth: 2,
        shadowBlur: 18,
        shadowColor: 'rgba(34, 211, 238, 0.16)',
      },
      labelLine: {
        lineStyle: { color: 'rgba(226, 246, 255, 0.42)' },
      },
      data: props.data,
    },
  ],
}));
</script>
