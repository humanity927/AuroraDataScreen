<template>
  <div class="internship-progress">
    <div class="overall-rate">
      <span>综合完成率</span>
      <strong>{{ progress.overallRate.toFixed(1) }}%</strong>
    </div>
    <ul class="task-list">
      <li v-for="task in progress.tasks" :key="task.id" class="task-item">
        <div class="task-meta">
          <span class="task-title">{{ task.title }}</span>
          <span class="task-owner">{{ task.owner }}</span>
        </div>
        <div class="progress-line">
          <span :style="{ width: `${task.progress}%` }" />
        </div>
        <div class="task-footer">
          <span>{{ task.status }}</span>
          <strong>{{ task.progress }}%</strong>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { InternshipProgress } from '@/types/dashboard';

defineProps<{
  progress: InternshipProgress;
}>();
</script>

<style scoped>
.internship-progress {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
  height: 100%;
  min-height: 0;
}

.overall-rate {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  color: var(--text-secondary);
  border: 1px solid rgba(94, 234, 212, 0.24);
  border-radius: 8px;
  background:
    linear-gradient(112deg, rgba(34, 211, 238, 0.16), transparent 42%),
    linear-gradient(248deg, rgba(165, 180, 252, 0.14), transparent 46%),
    rgba(20, 184, 166, 0.08);
}

.overall-rate strong {
  color: #f8feff;
  font-family: var(--font-number);
  font-size: 28px;
  text-shadow:
    0 0 16px rgba(34, 211, 238, 0.42),
    0 0 18px rgba(165, 180, 252, 0.18);
}

.task-list {
  display: grid;
  gap: 10px;
  min-height: 0;
  padding: 0;
  margin: 0;
  overflow: auto;
  list-style: none;
}

.task-item {
  display: grid;
  gap: 8px;
  padding: 10px;
  border: 1px solid rgba(125, 211, 252, 0.1);
  border-radius: 8px;
  background: rgba(7, 18, 36, 0.36);
}

.task-meta,
.task-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.task-title {
  color: #edfaff;
  font-size: 14px;
}

.task-owner,
.task-footer {
  color: var(--text-muted);
  font-size: 12px;
}

.task-footer strong {
  color: #c4b5fd;
}

.progress-line {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(148, 210, 255, 0.12);
}

.progress-line span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #67e8f9, #5eead4, #a5b4fc, #c4b5fd);
  box-shadow: 0 0 14px rgba(34, 211, 238, 0.44);
}

.task-item:nth-child(2) .progress-line span {
  background: linear-gradient(90deg, #60a5fa, #a5b4fc, #c4b5fd);
  box-shadow: 0 0 14px rgba(167, 139, 250, 0.42);
}

.task-item:nth-child(3) .progress-line span {
  background: linear-gradient(90deg, #5eead4, #a7f3d0, #fde68a);
  box-shadow: 0 0 14px rgba(167, 243, 208, 0.34);
}

.task-item:nth-child(4) .progress-line span {
  background: linear-gradient(90deg, #bae6fd, #a5b4fc, #fde68a);
  box-shadow: 0 0 14px rgba(165, 180, 252, 0.34);
}
</style>
