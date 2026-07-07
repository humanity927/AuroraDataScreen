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
  color: #bdefff;
  border: 1px solid rgba(94, 234, 212, 0.18);
  border-radius: 8px;
  background: rgba(20, 184, 166, 0.08);
}

.overall-rate strong {
  color: #5eead4;
  font-size: 28px;
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
  padding: 10px 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
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
  color: #8fb6d8;
  font-size: 12px;
}

.task-footer strong {
  color: #c4b5fd;
}

.progress-line {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.14);
}

.progress-line span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #22d3ee, #34d399, #a78bfa);
  box-shadow: 0 0 14px rgba(34, 211, 238, 0.44);
}
</style>
