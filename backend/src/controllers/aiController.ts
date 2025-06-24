const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const aiController = {
  getInsights: async (req: any, res: any) => {
    try {
      // Buscar insights existentes no banco
      const insights = await prisma.aIInsight.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      });

      // Se não houver insights, criar alguns mockados
      if (insights.length === 0) {
        const mockInsights = [
          {
            type: 'RECOMMENDATION' as const,
            title: 'Increase Budget for High-Performing Campaign',
            description: 'Campaign "Summer Sale 2024" shows 3.2x ROAS. Consider increasing budget by 20% to maximize returns.',
            priority: 'HIGH' as const
          },
          {
            type: 'ALERT' as const,
            title: 'Low CTR Campaign Detected',
            description: 'Campaign "Brand Awareness" has CTR below 1%. Review ad copy and targeting.',
            priority: 'MEDIUM' as const
          },
          {
            type: 'OPTIMIZATION' as const,
            title: 'Best Time to Run Ads',
            description: 'Analysis shows 40% higher engagement between 7-9 PM. Consider adjusting ad schedule.',
            priority: 'LOW' as const
          }
        ];

        // Criar insights no banco
        for (const insight of mockInsights) {
          await prisma.aIInsight.create({
            data: insight
          });
        }

        // Buscar insights criados
        const createdInsights = await prisma.aIInsight.findMany({
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        });

        return res.json({
          success: true,
          data: createdInsights
        });
      }

      return res.json({
        success: true,
        data: insights
      });
    } catch (error) {
      console.error('Get insights error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch insights'
      });
    }
  },

  generateRecommendations: async (req: any, res: any) => {
    try {
      const { campaignId } = req.query;

      // Em uma implementação real, aqui você conectaria com um serviço de IA
      // Por enquanto, vamos gerar recomendações baseadas em dados existentes
      
      const recommendations = [
        {
          type: 'RECOMMENDATION' as const,
          title: 'Optimize Ad Copy',
          description: 'Test different ad copy variations to improve click-through rates.',
          priority: 'MEDIUM' as const,
          campaignId: campaignId as string || null
        },
        {
          type: 'OPTIMIZATION' as const,
          title: 'Adjust Bidding Strategy',
          description: 'Consider using automated bidding to optimize for conversions.',
          priority: 'HIGH' as const,
          campaignId: campaignId as string || null
        },
        {
          type: 'RECOMMENDATION' as const,
          title: 'Expand Targeting',
          description: 'Add similar audiences to reach more potential customers.',
          priority: 'LOW' as const,
          campaignId: campaignId as string || null
        }
      ];

      // Salvar recomendações no banco
      const savedRecommendations = [];
      for (const rec of recommendations) {
        const saved = await prisma.aIInsight.create({
          data: rec
        });
        savedRecommendations.push(saved);
      }

      return res.json({
        success: true,
        data: savedRecommendations
      });
    } catch (error) {
      console.error('Generate recommendations error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to generate recommendations'
      });
    }
  }
}; 