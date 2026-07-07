import { apiDashboardProvider } from '@/services/api/dashboardApi';
import { mockDashboardProvider } from '@/services/mock/dashboardMockProvider';
import type { DashboardDataProvider } from '@/types/service';
import { logger } from '@/utils/logger';

const dataSource = import.meta.env.VITE_DATA_SOURCE ?? 'mock';

const provider: DashboardDataProvider =
  dataSource === 'api' ? apiDashboardProvider : mockDashboardProvider;

logger.info('Dashboard data source selected', { dataSource });

export const dashboardService: DashboardDataProvider = {
  getDashboardOverview: () => provider.getDashboardOverview(),
  getProductionTrend: () => provider.getProductionTrend(),
  getEquipmentStatus: () => provider.getEquipmentStatus(),
  getQualityAnalysis: () => provider.getQualityAnalysis(),
  getInternshipProgress: () => provider.getInternshipProgress(),
  getRealtimeEvents: () => provider.getRealtimeEvents(),
  getWorkshopLines: () => provider.getWorkshopLines(),
};

export const getDashboardOverview = dashboardService.getDashboardOverview;
export const getProductionTrend = dashboardService.getProductionTrend;
export const getEquipmentStatus = dashboardService.getEquipmentStatus;
export const getQualityAnalysis = dashboardService.getQualityAnalysis;
export const getInternshipProgress = dashboardService.getInternshipProgress;
export const getRealtimeEvents = dashboardService.getRealtimeEvents;
