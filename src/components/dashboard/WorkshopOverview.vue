<template>
  <div class="workshop-overview">
    <div class="aurora-core">
      <div class="core-ring">
        <span class="core-value">12,860</span>
        <span class="core-label">今日综合产出</span>
      </div>
    </div>
    <div class="line-grid">
      <article v-for="line in lines" :key="line.id" class="line-node" :class="line.status">
        <div class="line-title">
          <strong>{{ line.name }}</strong>
          <span>{{ line.status }}</span>
        </div>
        <div class="line-stats">
          <span>{{ line.output }} 件</span>
          <span>{{ line.onlineRate }}%</span>
        </div>
      </article>
    </div>
    <div class="flow-track">
      <span>原料入库</span>
      <i />
      <span>智能装配</span>
      <i />
      <span>质量检测</span>
      <i />
      <span>成品入库</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WorkshopLine } from '@/types/dashboard';

defineProps<{
  lines: WorkshopLine[];
}>();
</script>

<style scoped>
.workshop-overview {
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto auto;
  gap: 18px;
  height: 100%;
  min-height: 0;
}

.aurora-core {
  position: relative;
  display: grid;
  min-height: 210px;
  place-items: center;
  overflow: hidden;
  border-radius: 8px;
  background:
    radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.28), transparent 28%),
    linear-gradient(120deg, rgba(14, 165, 233, 0.08), rgba(168, 85, 247, 0.12)),
    repeating-linear-gradient(
      90deg,
      rgba(148, 163, 184, 0.08) 0,
      rgba(148, 163, 184, 0.08) 1px,
      transparent 1px,
      transparent 42px
    );
}

.aurora-core::before,
.aurora-core::after {
  position: absolute;
  width: 62%;
  height: 120px;
  content: '';
  filter: blur(16px);
  border-radius: 50%;
  transform: rotate(-8deg);
}

.aurora-core::before {
  background: linear-gradient(
    90deg,
    rgba(34, 211, 238, 0),
    rgba(34, 211, 238, 0.38),
    rgba(52, 211, 153, 0)
  );
}

.aurora-core::after {
  width: 46%;
  transform: rotate(11deg);
  background: linear-gradient(
    90deg,
    rgba(167, 139, 250, 0),
    rgba(167, 139, 250, 0.38),
    rgba(34, 211, 238, 0)
  );
}

.core-ring {
  position: relative;
  z-index: 1;
  display: grid;
  width: min(220px, 48vw);
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid rgba(125, 211, 252, 0.35);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(15, 23, 42, 0.78) 0 58%, rgba(34, 211, 238, 0.14));
  box-shadow:
    0 0 32px rgba(34, 211, 238, 0.18),
    inset 0 0 28px rgba(167, 139, 250, 0.14);
}

.core-ring::before {
  position: absolute;
  inset: 18px;
  content: '';
  border: 1px dashed rgba(94, 234, 212, 0.38);
  border-radius: 50%;
}

.core-value {
  align-self: end;
  color: #f8feff;
  font-family: 'DIN Alternate', 'Roboto Mono', monospace;
  font-size: clamp(34px, 4vw, 52px);
  font-weight: 800;
}

.core-label {
  align-self: start;
  color: #93e8ff;
  font-size: 14px;
}

.line-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.line-node {
  min-width: 0;
  padding: 12px;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.6);
}

.line-title,
.line-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.line-title strong {
  min-width: 0;
  overflow: hidden;
  color: #f0fdff;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.line-title span {
  flex: 0 0 auto;
  color: #5eead4;
  font-size: 12px;
}

.line-node.预警 .line-title span {
  color: #fbbf24;
}

.line-node.维护 .line-title span {
  color: #c084fc;
}

.line-stats {
  margin-top: 10px;
  color: #8fb6d8;
  font-size: 12px;
}

.flow-track {
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto 1fr auto;
  gap: 10px;
  align-items: center;
  color: #c8f4ff;
  font-size: 13px;
}

.flow-track i {
  height: 2px;
  background: linear-gradient(90deg, #22d3ee, #34d399, #a78bfa);
  box-shadow: 0 0 10px rgba(34, 211, 238, 0.48);
}

@media (max-width: 900px) {
  .line-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .flow-track {
    grid-template-columns: 1fr;
  }

  .flow-track i {
    display: none;
  }
}
</style>
