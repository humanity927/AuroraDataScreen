<template>
  <main class="dashboard-screen">
    <DashboardHeader :status-text="overview?.statusText ?? '数据初始化中'" />

    <section v-if="overview" class="dashboard-content">
      <OverviewMetrics class="metrics-zone" :metrics="overview.metrics" />

      <ScreenPanel class="trend-panel" title="生产趋势" subtitle="近 7 天">
        <ProductionTrendChart :data="productionTrend" />
      </ScreenPanel>

      <ScreenPanel class="center-panel" title="车间综合态势" subtitle="产线运行">
        <WorkshopOverview :lines="workshopLines" />
      </ScreenPanel>

      <ScreenPanel class="equipment-panel" title="设备状态" subtitle="实时分布">
        <EquipmentStatusChart :data="equipmentStatus" />
      </ScreenPanel>

      <ScreenPanel class="quality-panel" title="质量分析" subtitle="合格率与异常">
        <QualityAnalysisChart :data="qualityAnalysis" />
      </ScreenPanel>

      <ScreenPanel
        v-if="internshipProgress"
        class="internship-panel"
        title="实习进度"
        subtitle="任务推进"
      >
        <InternshipProgress :progress="internshipProgress" />
      </ScreenPanel>

      <ScreenPanel class="events-panel" title="实时动态" subtitle="生产与实习记录">
        <RealtimeEvents :events="realtimeEvents" />
      </ScreenPanel>
    </section>

    <section v-else class="loading-state">
      <span>{{ error || '正在加载极光数据大屏' }}</span>
    </section>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import EquipmentStatusChart from '@/components/charts/EquipmentStatusChart.vue';
import ProductionTrendChart from '@/components/charts/ProductionTrendChart.vue';
import QualityAnalysisChart from '@/components/charts/QualityAnalysisChart.vue';
import ScreenPanel from '@/components/common/ScreenPanel.vue';
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import InternshipProgress from '@/components/dashboard/InternshipProgress.vue';
import OverviewMetrics from '@/components/dashboard/OverviewMetrics.vue';
import RealtimeEvents from '@/components/dashboard/RealtimeEvents.vue';
import WorkshopOverview from '@/components/dashboard/WorkshopOverview.vue';
import { useDashboardStore } from '@/stores/dashboard';

const dashboardStore = useDashboardStore();
const {
  overview,
  productionTrend,
  equipmentStatus,
  qualityAnalysis,
  internshipProgress,
  realtimeEvents,
  workshopLines,
  error,
} = storeToRefs(dashboardStore);

onMounted(() => {
  void dashboardStore.loadDashboard();
});
</script>

<style scoped>
.dashboard-screen {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: #dff7ff;
  background:
    radial-gradient(circle at 22% 18%, rgba(20, 184, 166, 0.18), transparent 28%),
    radial-gradient(circle at 78% 10%, rgba(99, 102, 241, 0.2), transparent 26%),
    linear-gradient(135deg, #06111f 0%, #081528 42%, #11102a 100%);
}

.dashboard-screen::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.18));
}

.dashboard-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-areas:
    'metrics metrics metrics'
    'trend center equipment'
    'quality center internship'
    'quality events events';
  grid-template-columns: minmax(300px, 0.92fr) minmax(420px, 1.42fr) minmax(300px, 0.92fr);
  grid-template-rows: auto minmax(235px, 1fr) minmax(220px, 0.92fr) minmax(190px, 0.76fr);
  gap: 16px;
  width: min(100%, 1920px);
  height: calc(100vh - 82px);
  min-height: 800px;
  padding: 14px 24px 24px;
  margin: 0 auto;
}

.metrics-zone {
  grid-area: metrics;
}

.trend-panel {
  grid-area: trend;
}

.center-panel {
  grid-area: center;
}

.equipment-panel {
  grid-area: equipment;
}

.quality-panel {
  grid-area: quality;
}

.internship-panel {
  grid-area: internship;
}

.events-panel {
  grid-area: events;
}

.loading-state {
  position: relative;
  z-index: 1;
  display: grid;
  min-height: calc(100vh - 82px);
  place-items: center;
  color: #9ffcff;
  font-size: 18px;
}

@media (max-width: 1300px) {
  .dashboard-screen {
    overflow: auto;
  }

  .dashboard-content {
    grid-template-areas:
      'metrics metrics'
      'center center'
      'trend equipment'
      'quality internship'
      'events events';
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: auto 560px 320px 320px 300px;
    height: auto;
  }
}

@media (max-width: 760px) {
  .dashboard-content {
    grid-template-areas:
      'metrics'
      'center'
      'trend'
      'equipment'
      'quality'
      'internship'
      'events';
    grid-template-columns: 1fr;
    grid-template-rows: auto 620px repeat(5, 320px);
    min-height: 0;
    padding: 12px;
  }
}
</style>
