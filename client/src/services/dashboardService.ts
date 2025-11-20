import api from './api';
import { DashboardSummary, ChartDataItem, Transaction } from '../types';

export const dashboardService = {
  async getSummary(month?: number, year?: number): Promise<DashboardSummary> {
    const response = await api.get<{ summary: DashboardSummary }>(
      '/dashboard/summary',
      { params: { month, year } }
    );
    return response.data.summary;
  },

  async getChartData(
    type: 'INCOME' | 'EXPENSE',
    month?: number,
    year?: number
  ): Promise<ChartDataItem[]> {
    const response = await api.get<{ chartData: ChartDataItem[] }>(
      '/dashboard/chart',
      { params: { type, month, year } }
    );
    return response.data.chartData;
  },

  async getRecentTransactions(limit = 5): Promise<Transaction[]> {
    const response = await api.get<{ transactions: Transaction[] }>(
      '/dashboard/recent',
      { params: { limit } }
    );
    return response.data.transactions;
  },
};
