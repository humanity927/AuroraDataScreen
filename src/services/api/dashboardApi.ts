import type { DashboardDataProvider } from '@/types/service';

import { httpClient } from './httpClient';

export const apiDashboardProvider: DashboardDataProvider = {
  async getDashboardOverview() {
    const { data } = await httpClient.get('/dashboard/overview');
    return data;
  },
  async getProductionTrend() {
    const { data } = await httpClient.get('/dashboard/production-trend');
    return data;
  },
  async getEquipmentStatus() {
    const { data } = await httpClient.get('/dashboard/equipment-status');
    return data;
  },
  async getQualityAnalysis() {
    const { data } = await httpClient.get('/dashboard/quality-analysis');
    return data;
  },
  async getInternshipProgress() {
    const { data } = await httpClient.get('/dashboard/internship-progress');
    return data;
  },
  async getRealtimeEvents() {
    const { data } = await httpClient.get('/dashboard/realtime-events');
    return data;
  },
  async getWorkshopLines() {
    const { data } = await httpClient.get('/dashboard/workshop-lines');
    return data;
  },
};
