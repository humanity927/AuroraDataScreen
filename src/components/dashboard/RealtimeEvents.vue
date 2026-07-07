<template>
  <ul class="event-list" data-testid="realtime-events">
    <li v-for="event in events" :key="event.id" class="event-item" :class="event.status">
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
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.54);
}

.event-time {
  color: #80f7ff;
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
}

.event-type,
.event-status {
  font-size: 12px;
  text-align: center;
}

.event-type {
  color: #f0fdff;
}

.event-content {
  min-width: 0;
  overflow: hidden;
  color: #b9d8ed;
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
  color: #fb7185;
}
</style>
