<template>
  <header class="dashboard-header">
    <div class="header-side">
      <span class="status-dot" />
      <span>{{ statusText }}</span>
    </div>
    <div class="title-block">
      <p class="english-name">AuroraDataScreen</p>
      <h1>极光数据大屏</h1>
    </div>
    <div class="header-side header-time">{{ displayTime }}</div>
  </header>
</template>

<script setup lang="ts">
import { useCurrentTime } from '@/hooks/useCurrentTime';

defineProps<{
  statusText: string;
}>();

const { displayTime } = useCurrentTime();
</script>

<style scoped>
.dashboard-header {
  position: relative;
  display: grid;
  grid-template-columns: 1fr minmax(360px, 620px) 1fr;
  align-items: center;
  height: 82px;
  padding: 0 28px;
}

.dashboard-header::after {
  position: absolute;
  bottom: 6px;
  left: 16%;
  width: 68%;
  height: 1px;
  content: '';
  background: linear-gradient(90deg, transparent, rgba(103, 232, 249, 0.78), transparent);
}

.title-block {
  text-align: center;
}

.english-name {
  margin: 0;
  color: #80f7ff;
  font-size: 13px;
  font-weight: 700;
}

h1 {
  margin: 4px 0 0;
  color: #f6feff;
  font-size: clamp(28px, 3vw, 42px);
  letter-spacing: 0;
  text-shadow:
    0 0 18px rgba(34, 211, 238, 0.54),
    0 0 34px rgba(167, 139, 250, 0.28);
}

.header-side {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  padding: 8px 12px;
  overflow: hidden;
  color: #bdefff;
  font-size: 14px;
  white-space: nowrap;
  border: 1px solid rgba(103, 232, 249, 0.2);
  border-radius: 8px;
  background: rgba(12, 24, 48, 0.6);
}

.header-time {
  justify-self: end;
  font-family: 'DIN Alternate', 'Roboto Mono', monospace;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 12px #34d399;
}

@media (max-width: 900px) {
  .dashboard-header {
    grid-template-columns: 1fr;
    gap: 8px;
    height: auto;
    min-height: 132px;
    padding: 18px;
  }

  .header-side,
  .header-time {
    justify-self: center;
  }
}
</style>
