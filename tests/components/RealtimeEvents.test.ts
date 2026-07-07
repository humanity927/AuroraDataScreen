import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import RealtimeEvents from '@/components/dashboard/RealtimeEvents.vue';
import type { RealtimeEvent } from '@/types/dashboard';

const events: RealtimeEvent[] = [
  {
    id: 'event-1',
    time: '14:32:18',
    type: '生产',
    content: 'A线完成本小时产量 860 件',
    status: '正常',
  },
];

describe('RealtimeEvents', () => {
  it('renders realtime event items', () => {
    const wrapper = mount(RealtimeEvents, {
      props: { events },
    });

    expect(wrapper.text()).toContain('14:32:18');
    expect(wrapper.text()).toContain('A线完成本小时产量 860 件');
  });
});
