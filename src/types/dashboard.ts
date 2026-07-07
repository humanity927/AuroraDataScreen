export type TrendDirection = 'up' | 'down' | 'stable';

export interface MetricItem {
  key: 'production' | 'onlineRate' | 'taskRate' | 'alerts';
  title: string;
  value: number;
  unit: string;
  change: number;
  direction: TrendDirection;
  icon: 'factory' | 'activity' | 'clipboard' | 'alert';
}

export interface DashboardOverview {
  metrics: MetricItem[];
  statusText: string;
  dataSource: 'mock' | 'api';
}

export interface ProductionTrendPoint {
  date: string;
  output: number;
  target: number;
}

export interface EquipmentStatusItem {
  name: '运行' | '待机' | '维护' | '异常';
  value: number;
}

export interface QualityAnalysisItem {
  label: string;
  passRate: number;
  defects: number;
  rework: number;
}

export interface HubNode {
  id: string;
  name: string;
  value: number;
  coord: [number, number];
  status: 'normal' | 'warning' | 'danger' | 'maintenance';
  description: string;
}

export interface InternshipTask {
  id: string;
  title: string;
  owner: string;
  progress: number;
  status: '已完成' | '进行中' | '待开始';
}

export interface InternshipProgress {
  overallRate: number;
  tasks: InternshipTask[];
}

export interface RealtimeEvent {
  id: string;
  time: string;
  type: '生产' | '设备' | '实习' | '告警';
  content: string;
  status: '正常' | '关注' | '告警';
}

export interface WorkshopLine {
  id: string;
  name: string;
  status: '高效' | '稳定' | '维护' | '预警';
  output: number;
  onlineRate: number;
}

export interface DashboardFrame {
  updatedAt: string;
  overview: DashboardOverview;
  productionTrend: ProductionTrendPoint[];
  equipmentStatus: EquipmentStatusItem[];
  qualityAnalysis: QualityAnalysisItem[];
  hubNodes: HubNode[];
  internshipProgress: InternshipProgress;
  realtimeEvents: RealtimeEvent[];
  workshopLines: WorkshopLine[];
}
