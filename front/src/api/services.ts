import apiClient from './client';
import type { Campaign, User, AIInsight, FilterOptions, ApiResponse } from '../types';

export const authService = {
  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('authToken');
  },
};

export const campaignService = {
  getCampaigns: async (filters?: FilterOptions): Promise<ApiResponse<Campaign[]>> => {
    const params = new URLSearchParams();
    if (filters?.platform) params.append('platform', filters.platform);
    if (filters?.dateFrom) params.append('from', filters.dateFrom);
    if (filters?.dateTo) params.append('to', filters.dateTo);
    if (filters?.status) params.append('status', filters.status);

    const response = await apiClient.get(`/campaigns?${params.toString()}`);
    return response.data;
  },

  getCampaignMetrics: async (campaignId: string, dateFrom?: string, dateTo?: string): Promise<ApiResponse<any>> => {
    const params = new URLSearchParams();
    if (dateFrom) params.append('from', dateFrom);
    if (dateTo) params.append('to', dateTo);

    const response = await apiClient.get(`/campaigns/${campaignId}/metrics?${params.toString()}`);
    return response.data;
  },

  syncPlatform: async (platform: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.post(`/sync/${platform}`);
    return response.data;
  },
};

export const aiService = {
  getInsights: async (): Promise<ApiResponse<AIInsight[]>> => {
    const response = await apiClient.get('/ai/insights');
    return response.data;
  },

  generateRecommendations: async (campaignId?: string): Promise<ApiResponse<AIInsight[]>> => {
    const params = campaignId ? `?campaignId=${campaignId}` : '';
    const response = await apiClient.post(`/ai/recommendations${params}`);
    return response.data;
  },
};

export const metricsService = {
  getKPIs: async (filters?: FilterOptions): Promise<ApiResponse<any>> => {
    const params = new URLSearchParams();
    if (filters?.platform) params.append('platform', filters.platform);
    if (filters?.dateFrom) params.append('from', filters.dateFrom);
    if (filters?.dateTo) params.append('to', filters.dateTo);

    const response = await apiClient.get(`/metrics/kpis?${params.toString()}`);
    return response.data;
  },

  getChartData: async (metric: string, filters?: FilterOptions): Promise<ApiResponse<any>> => {
    const params = new URLSearchParams();
    params.append('metric', metric);
    if (filters?.platform) params.append('platform', filters.platform);
    if (filters?.dateFrom) params.append('from', filters.dateFrom);
    if (filters?.dateTo) params.append('to', filters.dateTo);

    const response = await apiClient.get(`/metrics/chart?${params.toString()}`);
    return response.data;
  },
}; 