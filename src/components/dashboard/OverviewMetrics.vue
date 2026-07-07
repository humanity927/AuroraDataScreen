<template>
  <div class="overview-metrics" data-testid="overview-metrics">
    <MetricCard v-for="metric in metrics" :key="metric.key" :metric="metric" />
  </div>
</template>

<script setup lang="ts">
import MetricCard from '@/components/dashboard/MetricCard.vue';
import type { MetricItem } from '@/types/dashboard';

defineProps<{
  metrics: MetricItem[];
}>();
</script>

<style scoped>
.overview-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

@media (max-width: 1200px) {
  .overview-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .overview-metrics {
    grid-template-columns: 1fr;
  }
}
</style>
