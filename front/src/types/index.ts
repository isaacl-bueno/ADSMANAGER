export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Campaign {
  id: string;
  name: string;
  platform: 'google' | 'meta' | 'tiktok';
  status: 'active' | 'paused' | 'completed';
  budget: number;
  startDate: string;
  endDate?: string;
  metrics: CampaignMetrics;
}

export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  revenue: number;
  ctr: number;
  cpc: number;
  roas: number;
  date: string;
}

export interface KPICard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

export interface FilterOptions {
  platform?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}

export interface AIInsight {
  id: string;
  type: 'recommendation' | 'alert' | 'optimization';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  campaignId?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 