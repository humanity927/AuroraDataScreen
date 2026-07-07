import {
  dashboardOverview,
  equipmentStatus,
  hubNodes,
  internshipProgress,
  productionTrend,
  qualityAnalysis,
  realtimeEvents,
  workshopLines,
} from '@/services/mock/dashboardMock';
import type {
  DashboardFrame,
  DashboardOverview,
  EquipmentStatusItem,
  HubNode,
  InternshipProgress,
  InternshipTask,
  MetricItem,
  ProductionTrendPoint,
  QualityAnalysisItem,
  RealtimeEvent,
  TrendDirection,
  WorkshopLine,
} from '@/types/dashboard';

const TREND_WINDOW_SIZE = 9;
const EVENT_LIMIT = 8;
const TOTAL_EQUIPMENT_COUNT = 55;
const SAME_FRAME_WINDOW_MS = 700;

let frameIndex = 0;
let eventIndex = realtimeEvents.length;
let lastAutoAdvanceAt = 0;
let nextEventInFrames = 2;

const clone = <T>(value: T): T => structuredClone(value);

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomFloat = (min: number, max: number, precision = 1) => {
  const multiplier = 10 ** precision;
  return Math.round((Math.random() * (max - min) + min) * multiplier) / multiplier;
};

const round1 = (value: number) => Math.round(value * 10) / 10;

const directionFromDelta = (delta: number): TrendDirection => {
  if (delta > 0) {
    return 'up';
  }
  if (delta < 0) {
    return 'down';
  }
  return 'stable';
};

const getCurrentTimeLabel = () =>
  new Date().toLocaleTimeString('zh-CN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

const getMetric = (overview: DashboardOverview, key: MetricItem['key']) => {
  const metric = overview.metrics.find((item) => item.key === key);

  if (!metric) {
    throw new Error(`Missing dashboard metric: ${key}`);
  }

  return metric;
};

const createInitialFrame = (): DashboardFrame => ({
  updatedAt: new Date().toISOString(),
  overview: clone(dashboardOverview),
  productionTrend: clone(productionTrend),
  equipmentStatus: clone(equipmentStatus),
  qualityAnalysis: clone(qualityAnalysis),
  hubNodes: clone(hubNodes),
  internshipProgress: clone(internshipProgress),
  realtimeEvents: clone(realtimeEvents),
  workshopLines: clone(workshopLines),
});

let currentFrame = createInitialFrame();

const updateOverviewMetrics = (overview: DashboardOverview) => {
  const nextOverview = clone(overview);

  const production = getMetric(nextOverview, 'production');
  const onlineRate = getMetric(nextOverview, 'onlineRate');
  const taskRate = getMetric(nextOverview, 'taskRate');
  const alerts = getMetric(nextOverview, 'alerts');

  const productionIncrement = randomInt(15, 180);
  const previousProduction = production.value;
  production.value += productionIncrement;
  production.change = round1((productionIncrement / Math.max(previousProduction, 1)) * 100);
  production.direction = 'up';

  const previousOnlineRate = onlineRate.value;
  onlineRate.value = round1(clamp(onlineRate.value + randomFloat(-0.4, 0.5), 92, 99.5));
  onlineRate.change = round1(onlineRate.value - previousOnlineRate);
  onlineRate.direction = directionFromDelta(onlineRate.change);

  const previousTaskRate = taskRate.value;
  taskRate.value = round1(clamp(taskRate.value + randomFloat(0, 0.25), 0, 100));
  taskRate.change = round1(taskRate.value - previousTaskRate);
  taskRate.direction = taskRate.change > 0 ? 'up' : 'stable';

  const previousAlerts = alerts.value;
  const alertDelta = Math.random() < 0.16 ? randomInt(-1, 1) : 0;
  alerts.value = clamp(alerts.value + alertDelta, 0, 8);
  alerts.change = round1(alerts.value - previousAlerts);
  alerts.direction = directionFromDelta(alerts.change);

  return {
    overview: nextOverview,
    productionIncrement,
    alertDelta,
    onlineRateLow: onlineRate.value < 95,
  };
};

const updateProductionTrend = (
  trend: ProductionTrendPoint[],
  productionValue: number,
  productionIncrement: number,
) => {
  const lastPoint = trend.at(-1);
  const baseOutput = lastPoint?.output ?? productionValue;
  const baseTarget = lastPoint?.target ?? productionValue;
  const nextOutput = Math.max(
    baseOutput + Math.round(productionIncrement * randomFloat(0.72, 1.08)),
    0,
  );
  const nextTarget = Math.max(baseTarget + randomInt(25, 120), nextOutput - randomInt(120, 420));

  return [
    ...trend,
    {
      date: getCurrentTimeLabel(),
      output: nextOutput,
      target: nextTarget,
    },
  ].slice(-TREND_WINDOW_SIZE);
};

const updateEquipmentStatus = (
  statusItems: EquipmentStatusItem[],
  alertCount: number,
  frameNumber: number,
) => {
  const previousStandby = statusItems.find((item) => item.name === '待机')?.value ?? 7;
  const previousMaintenance = statusItems.find((item) => item.name === '维护')?.value ?? 4;
  const abnormal = clamp(Math.round(alertCount / 2) + randomInt(-1, 1), 0, 5);
  const maintenance =
    frameNumber % 5 === 0
      ? clamp(previousMaintenance + randomInt(-1, 1), 2, 6)
      : clamp(previousMaintenance, 2, 6);
  const standby = clamp(previousStandby + randomInt(-1, 1), 5, 10);
  const running = Math.max(TOTAL_EQUIPMENT_COUNT - standby - maintenance - abnormal, 0);

  return [
    { name: '运行', value: running },
    { name: '待机', value: standby },
    { name: '维护', value: maintenance },
    { name: '异常', value: abnormal },
  ] satisfies EquipmentStatusItem[];
};

const updateQualityAnalysis = (quality: QualityAnalysisItem[], frameNumber: number) => {
  if (frameNumber % 4 !== 0) {
    return clone(quality);
  }

  return quality.map((item) => {
    const nextDefects = clamp(item.defects + randomInt(-2, 3), 8, 42);
    const nextRework = clamp(item.rework + randomInt(-1, 2), 5, 24);

    return {
      ...item,
      passRate: round1(clamp(item.passRate + randomFloat(-0.35, 0.28), 94, 99.5)),
      defects: nextDefects,
      rework: Math.min(nextRework, nextDefects),
    };
  });
};

const updateInternshipTask = (task: InternshipTask): InternshipTask => {
  if (task.progress >= 100) {
    return { ...task, progress: 100, status: '已完成' };
  }

  const progress = round1(clamp(task.progress + randomFloat(0, 0.4), 0, 100));

  return {
    ...task,
    progress,
    status: progress >= 100 ? '已完成' : progress > 0 ? '进行中' : '待开始',
  };
};

const updateInternshipProgress = (progress: InternshipProgress) => {
  const tasks = progress.tasks.map(updateInternshipTask);
  const overallRate = round1(
    clamp(tasks.reduce((sum, task) => sum + task.progress, 0) / Math.max(tasks.length, 1), 0, 100),
  );

  return {
    overallRate,
    tasks,
  };
};

const getHubDescription = (node: HubNode, status: HubNode['status']) => {
  if (status === 'danger') {
    return `${node.name}出现明显波动，已进入告警观察`;
  }
  if (status === 'warning') {
    return `${node.name}存在轻微波动，建议持续关注`;
  }
  if (status === 'maintenance') {
    return `${node.name}处于例行维护窗口，数据链路保持可用`;
  }
  return `${node.name}运行稳定，数据同步保持正常`;
};

const getHubStatus = (node: HubNode, value: number, frameNumber: number): HubNode['status'] => {
  if (node.id === 'finished-storage' && frameNumber % 14 < 3) {
    return 'maintenance';
  }
  if (node.id === 'equipment-monitor' && frameNumber % 18 === 0) {
    return 'maintenance';
  }
  if (value >= 75) {
    return 'normal';
  }
  if (value >= 60) {
    return 'warning';
  }
  return Math.random() < 0.2 ? 'danger' : 'warning';
};

const updateHubNodes = (nodes: HubNode[], frameNumber: number) =>
  nodes.map((node) => {
    const value = clamp(node.value + randomInt(-3, 4), 40, 100);
    const status = getHubStatus(node, value, frameNumber);

    return {
      ...node,
      value,
      status,
      description: getHubDescription(node, status),
    };
  });

const updateWorkshopLines = (lines: WorkshopLine[], productionIncrement: number) =>
  lines.map((line) => {
    const output = line.output + Math.round(productionIncrement * randomFloat(0.18, 0.32));
    const onlineRate = round1(clamp(line.onlineRate + randomFloat(-0.25, 0.28), 90, 99.4));
    const status: WorkshopLine['status'] =
      onlineRate >= 97 ? '高效' : onlineRate >= 95 ? '稳定' : onlineRate >= 93 ? '预警' : '维护';

    return {
      ...line,
      output,
      onlineRate,
      status,
    };
  });

const eventTemplates: Array<Omit<RealtimeEvent, 'id' | 'time'>> = [
  { type: '生产', content: 'A线完成本轮产量同步', status: '正常' },
  { type: '实习', content: '实习任务“质量分析报告”进度更新', status: '正常' },
  { type: '设备', content: 'D线入库扫码设备完成维护巡检', status: '正常' },
  { type: '生产', content: 'C线包装节拍保持稳定', status: '正常' },
  { type: '生产', content: '生产计划与实际产量偏差收敛', status: '正常' },
  { type: '设备', content: '数据服务完成一次产线采集同步', status: '正常' },
  { type: '告警', content: '告警中心发现轻微波动，正在持续观察', status: '关注' },
  { type: '设备', content: '设备在线率低于阈值，已推送关注提醒', status: '关注' },
  { type: '告警', content: 'B线检测工位不良率轻微上升，已标记关注', status: '关注' },
  { type: '实习', content: '第三小组完成设备点检打卡', status: '正常' },
];

const createRealtimeEvent = (
  frameNumber: number,
  alertDelta: number,
  onlineRateLow: boolean,
): RealtimeEvent => {
  eventIndex += 1;

  if (alertDelta > 0) {
    return {
      id: `event-live-${frameNumber}-${eventIndex}`,
      time: getCurrentTimeLabel(),
      type: '告警',
      content: '告警中心发现轻微波动，正在持续观察',
      status: '告警',
    };
  }

  if (onlineRateLow) {
    return {
      id: `event-live-${frameNumber}-${eventIndex}`,
      time: getCurrentTimeLabel(),
      type: '设备',
      content: '设备在线率低于阈值，已推送关注提醒',
      status: '关注',
    };
  }

  const template = eventTemplates[randomInt(0, eventTemplates.length - 1)];

  return {
    ...template,
    id: `event-live-${frameNumber}-${eventIndex}`,
    time: getCurrentTimeLabel(),
  };
};

const updateRealtimeEvents = (
  events: RealtimeEvent[],
  frameNumber: number,
  alertDelta: number,
  onlineRateLow: boolean,
) => {
  if (frameNumber < nextEventInFrames) {
    return clone(events).slice(0, EVENT_LIMIT);
  }

  nextEventInFrames = frameNumber + randomInt(2, 3);
  return [createRealtimeEvent(frameNumber, alertDelta, onlineRateLow), ...events].slice(
    0,
    EVENT_LIMIT,
  );
};

export const nextDashboardFrame = (): DashboardFrame => {
  frameIndex += 1;

  const { overview, productionIncrement, alertDelta, onlineRateLow } = updateOverviewMetrics(
    currentFrame.overview,
  );
  const productionValue = getMetric(overview, 'production').value;
  const alertCount = getMetric(overview, 'alerts').value;

  currentFrame = {
    updatedAt: new Date(Date.now() + frameIndex).toISOString(),
    overview,
    productionTrend: updateProductionTrend(
      currentFrame.productionTrend,
      productionValue,
      productionIncrement,
    ),
    equipmentStatus: updateEquipmentStatus(currentFrame.equipmentStatus, alertCount, frameIndex),
    qualityAnalysis: updateQualityAnalysis(currentFrame.qualityAnalysis, frameIndex),
    hubNodes: updateHubNodes(currentFrame.hubNodes, frameIndex),
    internshipProgress: updateInternshipProgress(currentFrame.internshipProgress),
    realtimeEvents: updateRealtimeEvents(
      currentFrame.realtimeEvents,
      frameIndex,
      alertDelta,
      onlineRateLow,
    ),
    workshopLines: updateWorkshopLines(currentFrame.workshopLines, productionIncrement),
  };

  return clone(currentFrame);
};

export const getRealtimeDashboardFrame = (): DashboardFrame => {
  const now = Date.now();
  if (now - lastAutoAdvanceAt > SAME_FRAME_WINDOW_MS) {
    currentFrame = nextDashboardFrame();
    lastAutoAdvanceAt = now;
  }

  return clone(currentFrame);
};

export const resetRealtimeDashboardSimulator = () => {
  frameIndex = 0;
  eventIndex = realtimeEvents.length;
  lastAutoAdvanceAt = 0;
  nextEventInFrames = 2;
  currentFrame = createInitialFrame();
};
