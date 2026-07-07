import type {
  DashboardOverview,
  EquipmentStatusItem,
  InternshipProgress,
  ProductionTrendPoint,
  QualityAnalysisItem,
  RealtimeEvent,
  WorkshopLine,
} from '@/types/dashboard';

export const dashboardOverview: DashboardOverview = {
  statusText: 'Mock 数据模式运行中',
  dataSource: 'mock',
  metrics: [
    {
      key: 'production',
      title: '今日产量',
      value: 12860,
      unit: '件',
      change: 8.4,
      direction: 'up',
      icon: 'factory',
    },
    {
      key: 'onlineRate',
      title: '设备在线率',
      value: 96.8,
      unit: '%',
      change: 2.1,
      direction: 'up',
      icon: 'activity',
    },
    {
      key: 'taskRate',
      title: '实习任务完成率',
      value: 82.5,
      unit: '%',
      change: 6.7,
      direction: 'up',
      icon: 'clipboard',
    },
    {
      key: 'alerts',
      title: '异常告警数量',
      value: 4,
      unit: '条',
      change: -12.5,
      direction: 'down',
      icon: 'alert',
    },
  ],
};

export const productionTrend: ProductionTrendPoint[] = [
  { date: '07-01', output: 10580, target: 11000 },
  { date: '07-02', output: 11240, target: 11200 },
  { date: '07-03', output: 11890, target: 11500 },
  { date: '07-04', output: 11620, target: 11600 },
  { date: '07-05', output: 12360, target: 11900 },
  { date: '07-06', output: 12640, target: 12200 },
  { date: '07-07', output: 12860, target: 12500 },
];

export const equipmentStatus: EquipmentStatusItem[] = [
  { name: '运行', value: 42 },
  { name: '待机', value: 7 },
  { name: '维护', value: 4 },
  { name: '异常', value: 2 },
];

export const qualityAnalysis: QualityAnalysisItem[] = [
  { label: 'A线', passRate: 98.2, defects: 18, rework: 11 },
  { label: 'B线', passRate: 96.9, defects: 26, rework: 15 },
  { label: 'C线', passRate: 97.6, defects: 21, rework: 12 },
  { label: 'D线', passRate: 95.8, defects: 34, rework: 19 },
];

export const internshipProgress: InternshipProgress = {
  overallRate: 82.5,
  tasks: [
    { id: 'task-1', title: '安全规范学习', owner: '第一小组', progress: 100, status: '已完成' },
    { id: 'task-2', title: '产线流程记录', owner: '第二小组', progress: 88, status: '进行中' },
    { id: 'task-3', title: '设备点检实操', owner: '第三小组', progress: 76, status: '进行中' },
    { id: 'task-4', title: '质量分析报告', owner: '第四小组', progress: 62, status: '进行中' },
  ],
};

export const realtimeEvents: RealtimeEvent[] = [
  {
    id: 'event-1',
    time: '14:32:18',
    type: '生产',
    content: 'A线完成本小时产量 860 件',
    status: '正常',
  },
  {
    id: 'event-2',
    time: '14:27:45',
    type: '实习',
    content: '第三小组完成设备点检打卡',
    status: '正常',
  },
  {
    id: 'event-3',
    time: '14:18:09',
    type: '设备',
    content: 'D线贴标机进入预防维护',
    status: '关注',
  },
  {
    id: 'event-4',
    time: '14:06:53',
    type: '告警',
    content: 'B线检测工位出现连续不良预警',
    status: '告警',
  },
  {
    id: 'event-5',
    time: '13:58:24',
    type: '生产',
    content: 'C线节拍稳定在 42 秒/件',
    status: '正常',
  },
  {
    id: 'event-6',
    time: '13:49:36',
    type: '实习',
    content: '第二小组提交产线流程记录',
    status: '正常',
  },
];

export const workshopLines: WorkshopLine[] = [
  { id: 'line-a', name: 'A线 装配', status: '高效', output: 3520, onlineRate: 98.6 },
  { id: 'line-b', name: 'B线 检测', status: '预警', output: 2940, onlineRate: 94.2 },
  { id: 'line-c', name: 'C线 包装', status: '稳定', output: 3260, onlineRate: 97.5 },
  { id: 'line-d', name: 'D线 入库', status: '维护', output: 3140, onlineRate: 92.8 },
];
