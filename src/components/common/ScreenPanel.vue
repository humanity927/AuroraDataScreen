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
  border: 1px solid var(--panel-border);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(5, 18, 38, 0.78), rgba(15, 20, 52, 0.68) 48%, rgba(4, 35, 45, 0.66)),
    linear-gradient(106deg, rgba(103, 232, 249, 0.16), transparent 36%, rgba(165, 180, 252, 0.14) 66%, rgba(253, 230, 138, 0.06)),
    var(--panel-bg);
  box-shadow:
    var(--shadow-cyan),
    var(--shadow-violet),
    var(--shadow-rose),
    inset 0 0 30px rgba(91, 119, 255, 0.12);
  backdrop-filter: blur(10px);
}

.screen-panel::before {
  position: absolute;
  top: 0;
  left: 18px;
  width: 72px;
  height: 2px;
  content: '';
  background: linear-gradient(
    90deg,
    var(--aurora-cyan),
    var(--aurora-teal),
    var(--aurora-violet),
    var(--aurora-magenta)
  );
  box-shadow: 0 0 14px rgba(103, 232, 249, 0.75);
}

.screen-panel::after {
  position: absolute;
  inset: 8px;
  pointer-events: none;
  content: '';
  border-radius: 6px;
  background:
    linear-gradient(var(--aurora-cyan), var(--aurora-cyan)) top left / 18px 1px no-repeat,
    linear-gradient(var(--aurora-cyan), var(--aurora-cyan)) top left / 1px 18px no-repeat,
    linear-gradient(var(--aurora-violet), var(--aurora-violet)) top right / 18px 1px no-repeat,
    linear-gradient(var(--aurora-violet), var(--aurora-violet)) top right / 1px 18px no-repeat,
    linear-gradient(var(--aurora-teal), var(--aurora-teal)) bottom left / 18px 1px no-repeat,
    linear-gradient(var(--aurora-teal), var(--aurora-teal)) bottom left / 1px 18px no-repeat,
    linear-gradient(var(--aurora-ice), var(--aurora-ice)) bottom right / 18px 1px no-repeat,
    linear-gradient(var(--aurora-ice), var(--aurora-ice)) bottom right / 1px 18px no-repeat;
  opacity: 0.44;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 40px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(125, 211, 252, 0.14);
  background:
    linear-gradient(90deg, rgba(34, 211, 238, 0.1), transparent 54%),
    linear-gradient(270deg, rgba(165, 180, 252, 0.07), transparent 42%);
}

.panel-title {
  color: #f7feff;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0;
  text-shadow: 0 0 12px rgba(34, 211, 238, 0.42);
}

.panel-subtitle {
  color: var(--aurora-ice);
  font-size: 12px;
}

.panel-body {
  position: relative;
  z-index: 1;
  height: calc(100% - 40px);
  min-height: 0;
  padding: 14px;
}
</style>
