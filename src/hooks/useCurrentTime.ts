import { computed, onBeforeUnmount, ref } from 'vue';

export const useCurrentTime = () => {
  const now = ref(new Date());
  const timer = window.setInterval(() => {
    now.value = new Date();
  }, 1000);

  onBeforeUnmount(() => window.clearInterval(timer));

  const displayTime = computed(() =>
    now.value.toLocaleString('zh-CN', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  );

  return {
    now,
    displayTime,
  };
};
