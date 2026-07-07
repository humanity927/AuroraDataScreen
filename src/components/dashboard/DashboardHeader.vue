<template>
  <header class="dashboard-header">
    <div class="header-side header-status">
      <span class="status-dot" />
      <span>{{ statusText }}</span>
    </div>
    <div class="title-block">
      <p class="english-name">AuroraDataScreen</p>
      <h1>极光数据大屏</h1>
      <span class="title-line" />
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

.dashboard-header::before {
  position: absolute;
  inset: 8px 22%;
  pointer-events: none;
  content: '';
  border-top: 1px solid rgba(125, 211, 252, 0.18);
  border-bottom: 1px solid rgba(52, 211, 153, 0.12);
  transform: skewX(-16deg);
}

.dashboard-header::after {
  position: absolute;
  bottom: 6px;
  left: 16%;
  width: 68%;
  height: 1px;
  content: '';
  background: linear-gradient(
    90deg,
    transparent,
    rgba(34, 211, 238, 0.26),
    rgba(52, 211, 153, 0.84),
    rgba(167, 139, 250, 0.3),
    transparent
  );
  box-shadow: 0 0 18px rgba(34, 211, 238, 0.38);
}

.title-block {
  text-align: center;
}

.english-name {
  margin: 0;
  color: #80f7ff;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
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

.title-line {
  display: block;
  width: min(420px, 68vw);
  height: 7px;
  margin: 3px auto 0;
  background:
    radial-gradient(circle, rgba(52, 211, 153, 0.72), transparent 58%) center / 8px 8px no-repeat,
    linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.78), transparent);
  filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.55));
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
  border: 1px solid rgba(103, 232, 249, 0.28);
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(12, 32, 56, 0.74), rgba(20, 18, 52, 0.52));
  box-shadow: inset 0 0 18px rgba(34, 211, 238, 0.1);
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
