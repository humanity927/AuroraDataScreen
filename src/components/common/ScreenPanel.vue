<template>
  <section class="screen-panel">
    <div class="panel-header">
      <span class="panel-title">{{ title }}</span>
      <span v-if="subtitle" class="panel-subtitle">{{ subtitle }}</span>
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<style scoped>
.screen-panel {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(86, 232, 255, 0.18);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(11, 30, 54, 0.82), rgba(18, 21, 54, 0.78)), rgba(6, 15, 30, 0.82);
  box-shadow:
    0 0 24px rgba(35, 221, 255, 0.08),
    inset 0 0 28px rgba(91, 119, 255, 0.08);
}

.screen-panel::before {
  position: absolute;
  top: 0;
  left: 16px;
  width: 54px;
  height: 2px;
  content: '';
  background: linear-gradient(90deg, #67e8f9, #a78bfa);
  box-shadow: 0 0 14px rgba(103, 232, 249, 0.75);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 40px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.panel-title {
  color: #e0faff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0;
}

.panel-subtitle {
  color: #8bd8ff;
  font-size: 12px;
}

.panel-body {
  height: calc(100% - 40px);
  min-height: 0;
  padding: 14px;
}
</style>
