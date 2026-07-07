import type { DashboardDataProvider } from '@/types/service';
import { logger } from '@/utils/logger';

import {
  dashboardOverview,
  equipmentStatus,
  internshipProgress,
  productionTrend,
  qualityAnalysis,
  realtimeEvents,
  workshopLines,
} from './dashboardMock';

const wait = <T>(data: T, delay = 120) =>
  new Promise<T>((resolve) => {
    window.setTimeout(() => resolve(structuredClone(data)), delay);
  });

export const mockDashboardProvider: DashboardDataProvider = {
  getDashboardOverview: () => wait(dashboardOverview),
  getProductionTrend: () => wait(productionTrend),
  getEquipmentStatus: () => wait(equipmentStatus),
  getQualityAnalysis: () => wait(qualityAnalysis),
  getInternshipProgress: () => wait(internshipProgress),
  getRealtimeEvents: () => wait(realtimeEvents),
  getWorkshopLines: () => wait(workshopLines),
};

logger.info('Dashboard mock provider ready');
