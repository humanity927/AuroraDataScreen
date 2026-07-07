import { describe, expect, it } from 'vitest';

import {
  getDashboardOverview,
  getEquipmentStatus,
  getHubNodes,
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

  it('returns aurora hub nodes through the service layer', async () => {
    const hubNodes = await getHubNodes();

    expect(hubNodes).toHaveLength(8);
    expect(hubNodes.some((node) => node.name === '生产计划')).toBe(true);
    expect(hubNodes.every((node) => Array.isArray(node.coord))).toBe(true);
  });
});
