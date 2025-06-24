const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const syncController = {
  syncPlatform: async (req: any, res: any) => {
    try {
      const { platform } = req.params;

      // Validar plataforma
      const validPlatforms = ['google', 'meta', 'tiktok'];
      if (!validPlatforms.includes(platform)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid platform. Supported platforms: google, meta, tiktok'
        });
      }

      // Em uma implementação real, aqui você conectaria com as APIs das plataformas
      // Por enquanto, vamos simular uma sincronização

      console.log(`🔄 Starting sync for ${platform}...`);

      // Simular delay de sincronização
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Criar dados mockados para demonstração
      const mockCampaigns = [
        {
          name: `${platform.toUpperCase()} Campaign 1`,
          platform: platform.toUpperCase(),
          budget: 1000 + Math.random() * 5000,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
        },
        {
          name: `${platform.toUpperCase()} Campaign 2`,
          platform: platform.toUpperCase(),
          budget: 2000 + Math.random() * 3000,
          startDate: new Date(),
          endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 dias
        }
      ];

      // Criar campanhas
      const createdCampaigns = [];
      for (const campaignData of mockCampaigns) {
        const campaign = await prisma.campaign.create({
          data: campaignData
        });

        // Criar métricas mockadas para cada campanha
        const mockMetrics = {
          campaignId: campaign.id,
          date: new Date(),
          impressions: Math.floor(Math.random() * 10000) + 1000,
          clicks: Math.floor(Math.random() * 500) + 50,
          cost: Math.random() * 500 + 100,
          conversions: Math.floor(Math.random() * 20) + 5,
          revenue: Math.random() * 1000 + 200,
          ctr: Math.random() * 5 + 1,
          cpc: Math.random() * 2 + 0.5,
          roas: Math.random() * 4 + 1
        };

        await prisma.metric.create({
          data: mockMetrics
        });

        createdCampaigns.push(campaign);
      }

      console.log(`✅ Sync completed for ${platform}. Created ${createdCampaigns.length} campaigns.`);

      return res.json({
        success: true,
        message: `Successfully synced ${platform} data`,
        data: {
          campaignsCreated: createdCampaigns.length,
          platform
        }
      });
    } catch (error) {
      console.error('Sync platform error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to sync platform data'
      });
    }
  }
}; 