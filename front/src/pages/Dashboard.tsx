import { useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';
import { campaignService, metricsService, aiService } from '../api/services';
import type { KPICard, ChartData } from '../types';

export default function Dashboard() {
  const { 
    campaigns, 
    insights, 
    filters, 
    isLoading, 
    setCampaigns, 
    setInsights, 
    setFilters, 
    setLoading, 
    setError 
  } = useStore();

  const [kpis, setKpis] = useState<KPICard[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, [filters]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Carregar campanhas
      const campaignsResponse = await campaignService.getCampaigns(filters);
      if (campaignsResponse.success && campaignsResponse.data) {
        setCampaigns(campaignsResponse.data);
      }

      // Carregar KPIs
      const kpisResponse = await metricsService.getKPIs(filters);
      if (kpisResponse.success && kpisResponse.data) {
        setKpis(kpisResponse.data);
      }

      // Carregar dados do gráfico
      const chartResponse = await metricsService.getChartData('revenue', filters);
      if (chartResponse.success && chartResponse.data) {
        setChartData(chartResponse.data);
      }

      // Carregar insights de IA
      const insightsResponse = await aiService.getInsights();
      if (insightsResponse.success && insightsResponse.data) {
        setInsights(insightsResponse.data);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleSyncPlatform = async (platform: string) => {
    try {
      await campaignService.syncPlatform(platform);
      await loadDashboardData();
    } catch (error: any) {
      setError(`Failed to sync ${platform}: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Campaign Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor and analyze your advertising campaigns across all platforms</p>
        </div>

        {/* Filtros */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select 
              className="input-field"
              value={filters.platform || ''}
              onChange={(e) => handleFilterChange({ platform: e.target.value })}
            >
              <option value="">All Platforms</option>
              <option value="google">Google Ads</option>
              <option value="meta">Meta Ads</option>
              <option value="tiktok">TikTok Ads</option>
            </select>
            
            <input
              type="date"
              className="input-field"
              value={filters.dateFrom || ''}
              onChange={(e) => handleFilterChange({ dateFrom: e.target.value })}
            />
            
            <input
              type="date"
              className="input-field"
              value={filters.dateTo || ''}
              onChange={(e) => handleFilterChange({ dateTo: e.target.value })}
            />
            
            <button
              onClick={() => handleSyncPlatform('google')}
              className="btn-secondary"
            >
              Sync Data
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                </div>
                <div className={`text-sm ${kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.changeType === 'increase' ? '+' : '-'}{kpi.change}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gráfico de Performance */}
          <div className="lg:col-span-2">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Performance</h3>
              <div className="h-64 flex items-center justify-center text-gray-500">
                Chart component will be implemented here
              </div>
            </div>
          </div>

          {/* Insights de IA */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div key={insight.id} className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">{insight.title}</h4>
                    <p className="text-sm text-blue-700 mt-1">{insight.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Campanhas */}
        <div className="mt-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaigns</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ROAS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {campaign.platform}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                          campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${campaign.budget.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.metrics.roas.toFixed(2)}x
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 