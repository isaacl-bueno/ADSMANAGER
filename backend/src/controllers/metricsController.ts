const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const metricsController = {
  getKPIs: async (req: any, res: any) => {
    try {
      const { platform, from, to } = req.query;

      const where: any = {};
      
      if (platform) {
        where.campaign = {
          platform: platform.toString().toUpperCase()
        };
      }
      
      if (from || to) {
        where.date = {};
        if (from) where.date.gte = new Date(from as string);
        if (to) where.date.lte = new Date(to as string);
      }

      // Buscar métricas agregadas
      const metrics = await prisma.metric.aggregate({
        where,
        _sum: {
          impressions: true,
          clicks: true,
          cost: true,
          conversions: true,
          revenue: true
        },
        _avg: {
          ctr: true,
          cpc: true,
          roas: true
        }
      });

      // Calcular KPIs
      const totalImpressions = metrics._sum.impressions || 0;
      const totalClicks = metrics._sum.clicks || 0;
      const totalCost = metrics._sum.cost || 0;
      const totalRevenue = metrics._sum.revenue || 0;
      const avgCTR = metrics._avg.ctr || 0;
      const avgCPC = metrics._avg.cpc || 0;
      const avgROAS = metrics._avg.roas || 0;

      const kpis = [
        {
          title: 'Total Revenue',
          value: `$${totalRevenue.toLocaleString()}`,
          change: 12.5,
          changeType: 'increase' as const,
          icon: '💰'
        },
        {
          title: 'Total Cost',
          value: `$${totalCost.toLocaleString()}`,
          change: 8.2,
          changeType: 'increase' as const,
          icon: '💸'
        },
        {
          title: 'Total Clicks',
          value: totalClicks.toLocaleString(),
          change: 15.3,
          changeType: 'increase' as const,
          icon: '👆'
        },
        {
          title: 'ROAS',
          value: `${avgROAS.toFixed(2)}x`,
          change: 5.7,
          changeType: 'increase' as const,
          icon: '📈'
        }
      ];

      return res.json({
        success: true,
        data: kpis
      });
    } catch (error) {
      console.error('Get KPIs error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch KPIs'
      });
    }
  },

  getChartData: async (req: any, res: any) => {
    try {
      const { metric, platform, from, to } = req.query;

      const where: any = {};
      
      if (platform) {
        where.campaign = {
          platform: platform.toString().toUpperCase()
        };
      }
      
      if (from || to) {
        where.date = {};
        if (from) where.date.gte = new Date(from as string);
        if (to) where.date.lte = new Date(to as string);
      }

      // Buscar dados agrupados por data
      const metrics = await prisma.metric.groupBy({
        by: ['date'],
        where,
        _sum: {
          impressions: true,
          clicks: true,
          cost: true,
          conversions: true,
          revenue: true
        },
        orderBy: {
          date: 'asc'
        }
      });

      // Transformar dados para o formato do gráfico
      const chartData = metrics.map((item: any) => ({
        name: item.date.toISOString().split('T')[0],
        value: metric === 'revenue' ? (item._sum.revenue || 0) :
               metric === 'cost' ? (item._sum.cost || 0) :
               metric === 'clicks' ? (item._sum.clicks || 0) :
               metric === 'impressions' ? (item._sum.impressions || 0) : 0,
        date: item.date.toISOString()
      }));

      return res.json({
        success: true,
        data: chartData
      });
    } catch (error) {
      console.error('Get chart data error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch chart data'
      });
    }
  }
}; 