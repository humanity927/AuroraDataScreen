import { beforeEach, describe, expect, it } from 'vitest';

import {
  nextDashboardFrame,
  resetRealtimeDashboardSimulator,
} from '@/services/mock/realtimeDashboardSimulator';

describe('realtime dashboard simulator', () => {
  beforeEach(() => {
    resetRealtimeDashboardSimulator();
  });

  it('creates changing dashboard frames with a stable shape', () => {
    const firstFrame = nextDashboardFrame();
    const secondFrame = nextDashboardFrame();

    expect(secondFrame.updatedAt).not.toBe(firstFrame.updatedAt);
    expect(secondFrame.overview.metrics).toHaveLength(4);
    expect(secondFrame.productionTrend.length).toBeGreaterThanOrEqual(7);
    expect(secondFrame.productionTrend.length).toBeLessThanOrEqual(10);
  });

  it('keeps realtime events and hub nodes within safe ranges', () => {
    const frame = Array.from({ length: 12 }).reduce(
      () => nextDashboardFrame(),
      nextDashboardFrame(),
    );

    expect(frame.realtimeEvents.length).toBeGreaterThanOrEqual(6);
    expect(frame.realtimeEvents.length).toBeLessThanOrEqual(8);
    expect(frame.hubNodes.every((node) => node.value >= 40 && node.value <= 100)).toBe(true);
    expect(frame.hubNodes.every((node) => node.coord.length === 2)).toBe(true);
  });

  it('keeps equipment counts and internship progress valid', () => {
    const frame = nextDashboardFrame();

    expect(frame.equipmentStatus.every((item) => item.value >= 0)).toBe(true);
    expect(frame.internshipProgress.overallRate).toBeLessThanOrEqual(100);
    expect(
      frame.internshipProgress.tasks.every((task) => task.progress >= 0 && task.progress <= 100),
    ).toBe(true);
  });
});
