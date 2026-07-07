import { defineStore } from 'pinia';

import { dashboardService } from '@/services/dashboardService';
import type {
  DashboardOverview,
  EquipmentStatusItem,
  HubNode,
  InternshipProgress,
  ProductionTrendPoint,
  QualityAnalysisItem,
  RealtimeEvent,
  WorkshopLine,
} from '@/types/dashboard';
import { logger } from '@/utils/logger';

interface DashboardState {
  loading: boolean;
  error: string;
  overview: DashboardOverview | null;
  productionTrend: ProductionTrendPoint[];
  equipmentStatus: EquipmentStatusItem[];
  qualityAnalysis: QualityAnalysisItem[];
  hubNodes: HubNode[];
  internshipProgress: InternshipProgress | null;
  realtimeEvents: RealtimeEvent[];
  workshopLines: WorkshopLine[];
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    loading: false,
    error: '',
    overview: null,
    productionTrend: [],
    equipmentStatus: [],
    qualityAnalysis: [],
    hubNodes: [],
    internshipProgress: null,
    realtimeEvents: [],
    workshopLines: [],
  }),
  actions: {
    async loadDashboard() {
      this.loading = true;
      this.error = '';
      logger.info('Loading dashboard data');

      try {
        const [
          overview,
          productionTrend,
          equipmentStatus,
          qualityAnalysis,
          hubNodes,
          internshipProgress,
          realtimeEvents,
          workshopLines,
        ] = await Promise.all([
          dashboardService.getDashboardOverview(),
          dashboardService.getProductionTrend(),
          dashboardService.getEquipmentStatus(),
          dashboardService.getQualityAnalysis(),
          dashboardService.getHubNodes(),
          dashboardService.getInternshipProgress(),
          dashboardService.getRealtimeEvents(),
          dashboardService.getWorkshopLines(),
        ]);

        this.overview = overview;
        this.productionTrend = productionTrend;
        this.equipmentStatus = equipmentStatus;
        this.qualityAnalysis = qualityAnalysis;
        this.hubNodes = hubNodes;
        this.internshipProgress = internshipProgress;
        this.realtimeEvents = realtimeEvents;
        this.workshopLines = workshopLines;
      } catch (error) {
        this.error = '大屏数据加载失败';
        logger.error('Dashboard data load failed', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
