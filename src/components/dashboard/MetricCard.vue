<template>
  <article class="metric-card" :class="metric.key" data-testid="metric-card">
    <div class="metric-icon">
      <component :is="iconComponent" :size="22" />
    </div>
    <div class="metric-content">
      <span class="metric-title">{{ metric.title }}</span>
      <strong class="metric-value"
        >{{ displayValue }}<small>{{ metric.unit }}</small></strong
      >
      <span class="metric-change" :class="metric.direction">
        <component :is="trendIcon" :size="14" />
        {{ displayChange }}
      </span>
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  Activity,
  ClipboardCheck,
  Factory,
  MoveDownRight,
  MoveRight,
  MoveUpRight,
  TriangleAlert,
} from '@lucide/vue';
import { computed } from 'vue';

import type { MetricItem } from '@/types/dashboard';
import { formatChange, formatNumber } from '@/utils/formatters';

const props = defineProps<{
  metric: MetricItem;
}>();

const iconMap = {
  factory: Factory,
  activity: Activity,
  clipboard: ClipboardCheck,
  alert: TriangleAlert,
};

const trendMap = {
  up: MoveUpRight,
  down: MoveDownRight,
  stable: MoveRight,
};

const iconComponent = computed(() => iconMap[props.metric.icon]);
const trendIcon = computed(() => trendMap[props.metric.direction]);
const displayValue = computed(() =>
  props.metric.unit === '%' ? props.metric.value.toFixed(1) : formatNumber(props.metric.value),
);
const displayChange = computed(() => formatChange(props.metric.change));
</script>

<style scoped>
.metric-card {
  position: relative;
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 14px;
  min-width: 0;
  min-height: 108px;
  padding: 16px;
  overflow: hidden;
  border: 1px solid rgba(125, 211, 252, 0.2);
  border-radius: 8px;
  background:
    radial-gradient(circle at top right, rgba(52, 211, 153, 0.16), transparent 42%),
    linear-gradient(135deg, rgba(34, 211, 238, 0.08), transparent 52%), rgba(13, 26, 52, 0.72);
  box-shadow: inset 0 0 24px rgba(34, 211, 238, 0.06);
}

.metric-card::after {
  position: absolute;
  right: -24px;
  bottom: -42px;
  width: 130px;
  height: 130px;
  pointer-events: none;
  content: '';
  border: 1px solid rgba(125, 211, 252, 0.12);
  border-radius: 50%;
}

.metric-card.alerts {
  border-color: rgba(251, 113, 133, 0.28);
  background:
    radial-gradient(circle at top right, rgba(251, 113, 133, 0.14), transparent 42%),
    linear-gradient(135deg, rgba(251, 191, 36, 0.06), transparent 52%), rgba(13, 26, 52, 0.72);
}

.metric-card.taskRate {
  background:
    radial-gradient(circle at top right, rgba(167, 139, 250, 0.16), transparent 42%),
    linear-gradient(135deg, rgba(34, 211, 238, 0.08), transparent 52%), rgba(13, 26, 52, 0.72);
}

.metric-icon {
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  color: #9ffcff;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.18), rgba(167, 139, 250, 0.18));
  box-shadow:
    0 0 18px rgba(34, 211, 238, 0.14),
    inset 0 0 16px rgba(34, 211, 238, 0.12);
}

.metric-content {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.metric-title {
  color: #97bad8;
  font-size: 13px;
  font-weight: 600;
}

.metric-value {
  color: #f4fdff;
  font-family: 'DIN Alternate', 'Roboto Mono', monospace;
  font-size: clamp(24px, 2.3vw, 34px);
  line-height: 1;
  text-shadow: 0 0 18px rgba(34, 211, 238, 0.28);
}

.metric-value small {
  margin-left: 4px;
  color: #8fb6d8;
  font-size: 13px;
  font-weight: 600;
}

.metric-change {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  font-size: 12px;
}

.metric-change.up {
  color: #34d399;
}

.metric-change.down {
  color: #fb7185;
}

.metric-change.stable {
  color: #fbbf24;
}
</style>
