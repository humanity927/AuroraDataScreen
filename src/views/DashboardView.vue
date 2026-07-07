<template>
  <main class="dashboard-screen">
    <DashboardHeader :status-text="overview?.statusText ?? '数据初始化中'" />

    <section v-if="overview" class="dashboard-content">
      <OverviewMetrics class="metrics-zone" :metrics="overview.metrics" />

      <ScreenPanel class="trend-panel" title="生产趋势" subtitle="近 7 天">
        <ProductionTrendChart :data="productionTrend" />
      </ScreenPanel>

      <ScreenPanel class="center-panel" title="极光智造中枢" subtitle="数据汇聚与产线驱动">
        <AuroraHubChart :nodes="hubNodes" />
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
import { onBeforeUnmount, onMounted } from 'vue';

import AuroraHubChart from '@/components/charts/AuroraHubChart.vue';
import EquipmentStatusChart from '@/components/charts/EquipmentStatusChart.vue';
import ProductionTrendChart from '@/components/charts/ProductionTrendChart.vue';
import QualityAnalysisChart from '@/components/charts/QualityAnalysisChart.vue';
import ScreenPanel from '@/components/common/ScreenPanel.vue';
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import InternshipProgress from '@/components/dashboard/InternshipProgress.vue';
import OverviewMetrics from '@/components/dashboard/OverviewMetrics.vue';
import RealtimeEvents from '@/components/dashboard/RealtimeEvents.vue';
import { useDashboardStore } from '@/stores/dashboard';

const dashboardStore = useDashboardStore();
const {
  overview,
  productionTrend,
  equipmentStatus,
  qualityAnalysis,
  hubNodes,
  internshipProgress,
  realtimeEvents,
  error,
} = storeToRefs(dashboardStore);

onMounted(() => {
  dashboardStore.startRealtime();
});

onBeforeUnmount(() => {
  dashboardStore.stopRealtime();
});
</script>

<style scoped>
.dashboard-screen {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: var(--text-primary);
  background:
    radial-gradient(ellipse 88% 62% at 50% -18%, rgba(103, 232, 249, 0.42), transparent 58%),
    radial-gradient(ellipse 72% 46% at 78% 10%, rgba(165, 180, 252, 0.3), transparent 62%),
    radial-gradient(ellipse 64% 46% at 14% 18%, rgba(94, 234, 212, 0.26), transparent 60%),
    linear-gradient(104deg, transparent 4%, rgba(103, 232, 249, 0.24) 22%, transparent 42%),
    linear-gradient(74deg, transparent 28%, rgba(196, 181, 253, 0.24) 52%, transparent 72%),
    linear-gradient(18deg, transparent 52%, rgba(253, 230, 138, 0.12) 70%, transparent 88%),
    conic-gradient(
      from 212deg at 50% -8%,
      rgba(103, 232, 249, 0.36),
      rgba(94, 234, 212, 0.24),
      rgba(96, 165, 250, 0.22),
      rgba(165, 180, 252, 0.28),
      rgba(196, 181, 253, 0.2),
      rgba(253, 230, 138, 0.12),
      rgba(103, 232, 249, 0.36)
    ),
    linear-gradient(135deg, #020817 0%, #052033 33%, #141a42 62%, #042f3a 100%);
  background-blend-mode: screen, screen, screen, screen, screen, screen, screen, normal;
}

.dashboard-screen::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background-image:
    linear-gradient(rgba(186, 230, 253, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(186, 230, 253, 0.06) 1px, transparent 1px),
    linear-gradient(108deg, transparent 8%, rgba(103, 232, 249, 0.22) 30%, transparent 54%),
    linear-gradient(74deg, transparent 30%, rgba(165, 180, 252, 0.2) 58%, transparent 80%),
    linear-gradient(22deg, transparent 46%, rgba(253, 230, 138, 0.12) 66%, transparent 86%);
  background-size:
    42px 42px,
    42px 42px,
    100% 100%,
    100% 100%,
    100% 100%;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.92), rgba(0, 0, 0, 0.3));
}

.dashboard-screen::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background:
    linear-gradient(
      103deg,
      transparent 7%,
      rgba(103, 232, 249, 0.24) 20%,
      transparent 34%,
      rgba(165, 180, 252, 0.26) 49%,
      transparent 62%,
      rgba(94, 234, 212, 0.16) 74%,
      transparent 88%
    ),
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.022) 0,
      rgba(255, 255, 255, 0.022) 1px,
      transparent 1px,
      transparent 7px
    );
  mix-blend-mode: screen;
  opacity: 0.86;
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
  grid-template-rows: auto minmax(180px, 1fr) minmax(170px, 0.92fr) minmax(145px, 0.76fr);
  gap: 12px;
  width: min(100%, 1920px);
  height: calc(100vh - 82px);
  min-height: 0;
  padding: 10px 18px 16px;
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
  box-shadow:
    0 0 42px rgba(103, 232, 249, 0.2),
    0 0 36px rgba(165, 180, 252, 0.12),
    inset 0 0 42px rgba(94, 234, 212, 0.08);
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
