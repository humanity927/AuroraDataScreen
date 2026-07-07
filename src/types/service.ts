import type {
  DashboardOverview,
  EquipmentStatusItem,
  HubNode,
  InternshipProgress,
  ProductionTrendPoint,
  QualityAnalysisItem,
  RealtimeEvent,
  WorkshopLine,
} from './dashboard';

export interface DashboardDataProvider {
  getDashboardOverview(): Promise<DashboardOverview>;
  getProductionTrend(): Promise<ProductionTrendPoint[]>;
  getEquipmentStatus(): Promise<EquipmentStatusItem[]>;
  getQualityAnalysis(): Promise<QualityAnalysisItem[]>;
  getHubNodes(): Promise<HubNode[]>;
  getInternshipProgress(): Promise<InternshipProgress>;
  getRealtimeEvents(): Promise<RealtimeEvent[]>;
  getWorkshopLines(): Promise<WorkshopLine[]>;
}
