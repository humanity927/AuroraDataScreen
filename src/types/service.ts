import type {
  DashboardOverview,
  EquipmentStatusItem,
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
  getInternshipProgress(): Promise<InternshipProgress>;
  getRealtimeEvents(): Promise<RealtimeEvent[]>;
  getWorkshopLines(): Promise<WorkshopLine[]>;
}
