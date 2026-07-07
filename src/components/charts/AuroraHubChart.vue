<template>
  <div class="aurora-hub-chart" data-testid="aurora-hub-chart">
    <BaseChart :option="chartOption" />
  </div>
</template>

<script setup lang="ts">
import type { CallbackDataParams, EChartsOption } from 'echarts';
import { computed } from 'vue';

import BaseChart from '@/components/charts/BaseChart.vue';
import type { HubNode } from '@/types/dashboard';
import {
  auroraChartColors,
  auroraTooltip,
  getAuroraColor,
  getAuroraRadialGradient,
} from '@/utils/chartTheme';

const props = withDefaults(
  defineProps<{
    nodes?: HubNode[];
  }>(),
  {
    nodes: () => [],
  },
);

const statusColor: Record<HubNode['status'], string> = {
  normal: auroraChartColors.teal,
  warning: auroraChartColors.amber,
  danger: auroraChartColors.rose,
  maintenance: auroraChartColors.violet,
};

const statusText: Record<HubNode['status'], string> = {
  normal: '运行正常',
  warning: '需要关注',
  danger: '异常告警',
  maintenance: '维护中',
};

type NodeSeriesData = {
  name: string;
  value: [number, number, number];
  description: string;
  status: HubNode['status'];
  itemStyle: {
    color: Record<string, unknown>;
    borderColor: string;
    borderWidth: number;
    shadowColor: string;
    shadowBlur: number;
  };
};

const centerCoord: [number, number] = [50, 50];

const buildRingLines = (radius: number, segments = 96) =>
  Array.from({ length: segments }, (_, index) => {
    const start = (Math.PI * 2 * index) / segments;
    const end = (Math.PI * 2 * (index + 1)) / segments;

    return {
      coords: [
        [50 + Math.cos(start) * radius, 50 + Math.sin(start) * radius],
        [50 + Math.cos(end) * radius, 50 + Math.sin(end) * radius],
      ],
    };
  });

const getNodeData = computed<NodeSeriesData[]>(() =>
  props.nodes.map((node, index) => {
    const nodeColor = getAuroraColor(index);

    return {
      name: node.name,
      value: [node.coord[0], node.coord[1], node.value],
      description: node.description,
      status: node.status,
      itemStyle: {
        color: getAuroraRadialGradient(index),
        borderColor: statusColor[node.status],
        borderWidth: node.status === 'normal' ? 1 : 2,
        shadowColor: nodeColor,
        shadowBlur: 22,
      },
    };
  }),
);

const lineData = computed(() =>
  props.nodes.map((node, index) => ({
    coords: [centerCoord, node.coord],
    lineStyle: {
      color: getAuroraColor(index),
      shadowColor: getAuroraColor(index),
      shadowBlur: 10,
    },
  })),
);

const tooltipFormatter = (params: CallbackDataParams) => {
  const data = params.data as Partial<NodeSeriesData> | undefined;

  if (!data?.name || data.name === '极光数据中枢') {
    return [
      '<strong>极光数据中枢</strong>',
      '生产实习数据正在汇聚并驱动各业务节点',
      '状态：全域协同运行',
    ].join('<br/>');
  }

  const value = Array.isArray(data.value) ? data.value[2] : '-';
  const status = data.status ? statusText[data.status] : '-';

  return [
    `<strong>${data.name}</strong>`,
    `活跃度：${value}`,
    `状态：${status}`,
    data.description ?? '',
  ].join('<br/>');
};

const chartOption = computed<EChartsOption>(() => ({
  animationDuration: 900,
  tooltip: {
    ...auroraTooltip,
    trigger: 'item',
    formatter: tooltipFormatter,
  },
  grid: { left: 0, right: 0, top: 0, bottom: 0 },
  xAxis: {
    min: 0,
    max: 100,
    show: false,
    type: 'value',
  },
  yAxis: {
    min: 0,
    max: 100,
    show: false,
    type: 'value',
  },
  series: [
    {
      name: '中枢光环',
      type: 'lines',
      coordinateSystem: 'cartesian2d',
      silent: true,
      polyline: false,
      symbol: 'none',
      lineStyle: {
        color: 'rgba(165, 180, 252, 0.22)',
        width: 1,
        type: 'dashed',
      },
      data: [...buildRingLines(21), ...buildRingLines(35)],
    },
    {
      name: '极光数据链路',
      type: 'lines',
      coordinateSystem: 'cartesian2d',
      zlevel: 2,
      effect: {
        show: true,
        period: 4,
        trailLength: 0.46,
        symbol: 'circle',
        symbolSize: 5,
      },
      lineStyle: {
        width: 1.8,
        opacity: 0.56,
        curveness: 0.18,
      },
      data: lineData.value,
    },
    {
      name: '极光业务节点',
      type: 'effectScatter',
      coordinateSystem: 'cartesian2d',
      zlevel: 3,
      rippleEffect: {
        brushType: 'stroke',
        scale: 3.2,
        period: 4,
      },
      symbolSize: (value: unknown) => {
        const [, , nodeValue] = value as [number, number, number];
        return Math.max(22, Math.round(nodeValue / 2.6));
      },
      label: {
        show: true,
        formatter: '{b}',
        color: '#f4fdff',
        fontSize: 12,
        fontWeight: 800,
        position: 'bottom',
        distance: 8,
        textShadowBlur: 12,
        textShadowColor: 'rgba(34, 211, 238, 0.8)',
      },
      data: getNodeData.value,
    },
    {
      name: '极光数据中枢',
      type: 'effectScatter',
      coordinateSystem: 'cartesian2d',
      zlevel: 4,
      rippleEffect: {
        brushType: 'stroke',
        scale: 4.4,
        period: 3,
      },
      symbolSize: 86,
      label: {
        show: true,
        formatter: '极光数据中枢',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 900,
        textShadowBlur: 14,
        textShadowColor: auroraChartColors.cyan,
      },
      itemStyle: {
        color: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.72,
          colorStops: [
            { offset: 0, color: '#ffffff' },
            { offset: 0.28, color: auroraChartColors.cyan },
            { offset: 0.54, color: auroraChartColors.violet },
            { offset: 0.78, color: auroraChartColors.magenta },
            { offset: 1, color: auroraChartColors.amber },
          ],
        },
        shadowColor: 'rgba(165, 180, 252, 0.72)',
        shadowBlur: 44,
      },
      data: [{ name: '极光数据中枢', value: [50, 50, 100] }],
    },
  ],
}));
</script>

<style scoped>
.aurora-hub-chart {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 260px;
  overflow: hidden;
  border-radius: 8px;
  background:
    linear-gradient(128deg, rgba(34, 211, 238, 0.22), transparent 30%),
    linear-gradient(236deg, rgba(165, 180, 252, 0.2), transparent 34%),
    linear-gradient(18deg, rgba(253, 230, 138, 0.12), transparent 40%),
    linear-gradient(135deg, rgba(8, 25, 48, 0.46), rgba(19, 14, 48, 0.36));
}

.aurora-hub-chart::before,
.aurora-hub-chart::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
}

.aurora-hub-chart::before {
  background:
    linear-gradient(90deg, transparent 0 48%, rgba(103, 232, 249, 0.12) 49% 51%, transparent 52%),
    linear-gradient(0deg, transparent 0 48%, rgba(165, 180, 252, 0.1) 49% 51%, transparent 52%),
    repeating-linear-gradient(
      90deg,
      rgba(148, 210, 255, 0.06) 0,
      rgba(148, 210, 255, 0.06) 1px,
      transparent 1px,
      transparent 40px
    );
  mask-image: radial-gradient(circle at 50% 50%, #000 0 58%, transparent 78%);
}

.aurora-hub-chart::after {
  background: linear-gradient(
    115deg,
    transparent 12%,
    rgba(34, 211, 238, 0.2) 28%,
    rgba(52, 211, 153, 0.12) 40%,
    rgba(167, 139, 250, 0.18) 56%,
    rgba(253, 230, 138, 0.1) 68%,
    transparent 82%
  );
  filter: blur(18px);
  opacity: 0.78;
}
</style>
