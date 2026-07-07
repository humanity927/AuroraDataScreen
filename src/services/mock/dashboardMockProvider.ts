import type { DashboardDataProvider } from '@/types/service';
import { logger } from '@/utils/logger';

import { getRealtimeDashboardFrame } from './realtimeDashboardSimulator';

const wait = <T>(factory: () => T, delay = 120) =>
  new Promise<T>((resolve) => {
    window.setTimeout(() => resolve(structuredClone(factory())), delay);
  });

export const mockDashboardProvider: DashboardDataProvider = {
  getDashboardOverview: () => wait(() => getRealtimeDashboardFrame().overview),
  getProductionTrend: () => wait(() => getRealtimeDashboardFrame().productionTrend),
  getEquipmentStatus: () => wait(() => getRealtimeDashboardFrame().equipmentStatus),
  getQualityAnalysis: () => wait(() => getRealtimeDashboardFrame().qualityAnalysis),
  getHubNodes: () => wait(() => getRealtimeDashboardFrame().hubNodes),
  getInternshipProgress: () => wait(() => getRealtimeDashboardFrame().internshipProgress),
  getRealtimeEvents: () => wait(() => getRealtimeDashboardFrame().realtimeEvents),
  getWorkshopLines: () => wait(() => getRealtimeDashboardFrame().workshopLines),
};

logger.info('Dashboard mock provider ready');
