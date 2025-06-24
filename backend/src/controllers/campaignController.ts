const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const campaignController = {
  getCampaigns: async (req: any, res: any) => {
    try {
      const { platform, from, to, status } = req.query;

      const where: any = {};
      
      if (platform) {
        where.platform = platform;
      }
      
      if (status) {
        where.status = status;
      }

      const campaigns = await prisma.campaign.findMany({
        where,
        include: {
          metrics: {
            where: {
              date: {
                gte: from ? new Date(from as string) : undefined,
                lte: to ? new Date(to as string) : undefined,
              }
            },
            orderBy: {
              date: 'desc'
            },
            take: 1
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      // Transformar dados para o formato esperado pelo frontend
      const transformedCampaigns = campaigns.map((campaign: any) => ({
        id: campaign.id,
        name: campaign.name,
        platform: campaign.platform.toLowerCase(),
        status: campaign.status.toLowerCase(),
        budget: campaign.budget,
        startDate: campaign.startDate.toISOString(),
        endDate: campaign.endDate?.toISOString(),
        metrics: campaign.metrics[0] ? {
          impressions: campaign.metrics[0].impressions,
          clicks: campaign.metrics[0].clicks,
          cost: campaign.metrics[0].cost,
          conversions: campaign.metrics[0].conversions,
          revenue: campaign.metrics[0].revenue,
          ctr: campaign.metrics[0].ctr,
          cpc: campaign.metrics[0].cpc,
          roas: campaign.metrics[0].roas,
          date: campaign.metrics[0].date.toISOString()
        } : {
          impressions: 0,
          clicks: 0,
          cost: 0,
          conversions: 0,
          revenue: 0,
          ctr: 0,
          cpc: 0,
          roas: 0,
          date: new Date().toISOString()
        }
      }));

      return res.json({
        success: true,
        data: transformedCampaigns
      });
    } catch (error) {
      console.error('Get campaigns error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch campaigns'
      });
    }
  },

  getCampaignById: async (req: any, res: any) => {
    try {
      const { id } = req.params;

      const campaign = await prisma.campaign.findUnique({
        where: { id },
        include: {
          metrics: {
            orderBy: {
              date: 'desc'
            }
          }
        }
      });

      if (!campaign) {
        return res.status(404).json({
          success: false,
          error: 'Campaign not found'
        });
      }

      return res.json({
        success: true,
        data: campaign
      });
    } catch (error) {
      console.error('Get campaign by id error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch campaign'
      });
    }
  },

  getCampaignMetrics: async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const { from, to } = req.query;

      const where: any = {
        campaignId: id
      };

      if (from || to) {
        where.date = {};
        if (from) where.date.gte = new Date(from as string);
        if (to) where.date.lte = new Date(to as string);
      }

      const metrics = await prisma.metric.findMany({
        where,
        orderBy: {
          date: 'asc'
        }
      });

      return res.json({
        success: true,
        data: metrics
      });
    } catch (error) {
      console.error('Get campaign metrics error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch campaign metrics'
      });
    }
  },

  createCampaign: async (req: any, res: any) => {
    try {
      const { name, platform, budget, startDate, endDate } = req.body;

      const campaign = await prisma.campaign.create({
        data: {
          name,
          platform: platform.toUpperCase(),
          budget: parseFloat(budget),
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : null
        }
      });

      return res.status(201).json({
        success: true,
        data: campaign
      });
    } catch (error) {
      console.error('Create campaign error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to create campaign'
      });
    }
  },

  updateCampaign: async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const campaign = await prisma.campaign.update({
        where: { id },
        data: updateData
      });

      return res.json({
        success: true,
        data: campaign
      });
    } catch (error) {
      console.error('Update campaign error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to update campaign'
      });
    }
  },

  deleteCampaign: async (req: any, res: any) => {
    try {
      const { id } = req.params;

      await prisma.campaign.delete({
        where: { id }
      });

      return res.json({
        success: true,
        message: 'Campaign deleted successfully'
      });
    } catch (error) {
      console.error('Delete campaign error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to delete campaign'
      });
    }
  }
}; 