<template>
  <ul class="event-list" data-testid="realtime-events">
    <li
      v-for="event in events"
      :key="event.id"
      class="event-item"
      :class="[event.status, event.type]"
    >
      <span class="event-time">{{ event.time }}</span>
      <span class="event-type">{{ event.type }}</span>
      <span class="event-content">{{ event.content }}</span>
      <span class="event-status">{{ event.status }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { RealtimeEvent } from '@/types/dashboard';

defineProps<{
  events: RealtimeEvent[];
}>();
</script>

<style scoped>
.event-list {
  display: grid;
  gap: 9px;
  height: 100%;
  min-height: 0;
  padding: 0;
  margin: 0;
  overflow: auto;
  list-style: none;
}

.event-item {
  display: grid;
  grid-template-columns: 72px 46px 1fr 44px;
  gap: 8px;
  align-items: center;
  min-width: 0;
  padding: 9px 10px;
  color: #cfefff;
  border: 1px solid rgba(125, 211, 252, 0.16);
  border-radius: 8px;
  background:
    linear-gradient(90deg, rgba(34, 211, 238, 0.08), transparent 58%),
    linear-gradient(270deg, rgba(165, 180, 252, 0.06), transparent 58%),
    rgba(15, 23, 42, 0.54);
}

.event-time {
  color: #80f7ff;
  font-family: var(--font-number);
  font-size: 12px;
}

.event-type,
.event-status {
  font-size: 12px;
  text-align: center;
}

.event-type {
  padding: 3px 6px;
  color: #f0fdff;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(34, 211, 238, 0.22), rgba(52, 211, 153, 0.14));
}

.event-content {
  min-width: 0;
  overflow: hidden;
  color: #c6e4f3;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.event-status {
  color: #34d399;
}

.event-item.关注 .event-status {
  color: #fbbf24;
}

.event-item.告警 .event-status {
  color: #fcd34d;
}

.event-item.告警 {
  border-color: rgba(253, 230, 138, 0.3);
  background:
    linear-gradient(90deg, rgba(253, 230, 138, 0.14), transparent 62%),
    linear-gradient(270deg, rgba(165, 180, 252, 0.08), transparent 62%),
    rgba(15, 23, 42, 0.58);
}

.event-item.生产 .event-type {
  background: linear-gradient(90deg, rgba(34, 211, 238, 0.28), rgba(52, 211, 153, 0.16));
}

.event-item.设备 .event-type {
  background: linear-gradient(90deg, rgba(253, 230, 138, 0.22), rgba(94, 234, 212, 0.12));
}

.event-item.实习 .event-type {
  background: linear-gradient(90deg, rgba(165, 180, 252, 0.24), rgba(196, 181, 253, 0.16));
}

.event-item.告警 .event-type {
  background: linear-gradient(90deg, rgba(253, 230, 138, 0.24), rgba(165, 180, 252, 0.12));
}
</style>
