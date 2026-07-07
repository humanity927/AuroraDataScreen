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

const statusSlices = [
  {
    color: '#67e8f9',
    borderColor: 'rgba(186, 230, 253, 0.62)',
    shadowColor: 'rgba(103, 232, 249, 0.42)',
  },
  {
    color: '#5eead4',
    borderColor: 'rgba(167, 243, 208, 0.56)',
    shadowColor: 'rgba(94, 234, 212, 0.34)',
  },
  {
    color: '#a5b4fc',
    borderColor: 'rgba(196, 181, 253, 0.54)',
    shadowColor: 'rgba(165, 180, 252, 0.34)',
  },
  {
    color: '#fde68a',
    borderColor: 'rgba(253, 230, 138, 0.62)',
    shadowColor: 'rgba(253, 230, 138, 0.34)',
  },
];

const getSliceStyle = (index: number) => statusSlices[index % statusSlices.length];

const chartOption = computed<EChartsOption>(() => ({
  color: statusSlices.map((item) => item.color),
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
      minAngle: 8,
      padAngle: 2,
      avoidLabelOverlap: true,
      label: {
        color: auroraChartColors.text,
        formatter: '{b}\n{c}台',
      },
      itemStyle: {
        borderColor: 'rgba(5, 18, 38, 0.92)',
        borderWidth: 3,
        shadowBlur: 16,
        shadowColor: 'rgba(103, 232, 249, 0.16)',
      },
      emphasis: {
        scale: true,
        scaleSize: 5,
      },
      labelLine: {
        lineStyle: { color: 'rgba(226, 246, 255, 0.42)' },
      },
      data: props.data.map((item, index) => {
        const sliceStyle = getSliceStyle(index);

        return {
          ...item,
          itemStyle: {
            color: sliceStyle.color,
            borderColor: sliceStyle.borderColor,
            borderWidth: 2,
            shadowBlur: 18,
            shadowColor: sliceStyle.shadowColor,
          },
        };
      }),
    },
  ],
}));
</script>
