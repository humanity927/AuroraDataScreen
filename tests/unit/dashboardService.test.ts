import { describe, expect, it } from 'vitest';

import {
  getDashboardOverview,
  getEquipmentStatus,
  getProductionTrend,
} from '@/services/dashboardService';

describe('dashboard service', () => {
  it('returns mock overview data by default', async () => {
    const overview = await getDashboardOverview();

    expect(overview.dataSource).toBe('mock');
    expect(overview.metrics).toHaveLength(4);
  });

  it('returns chart datasets through the service layer', async () => {
    const trend = await getProductionTrend();
    const equipment = await getEquipmentStatus();

    expect(trend.length).toBeGreaterThanOrEqual(7);
    expect(equipment.some((item) => item.name === '运行')).toBe(true);
  });
});
