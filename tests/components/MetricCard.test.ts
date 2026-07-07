import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import MetricCard from '@/components/dashboard/MetricCard.vue';
import type { MetricItem } from '@/types/dashboard';

const metric: MetricItem = {
  key: 'production',
  title: '今日产量',
  value: 12860,
  unit: '件',
  change: 8.4,
  direction: 'up',
  icon: 'factory',
};

describe('MetricCard', () => {
  it('renders the metric title and value', () => {
    const wrapper = mount(MetricCard, {
      props: { metric },
    });

    expect(wrapper.text()).toContain('今日产量');
    expect(wrapper.text()).toContain('12,860');
  });
});
