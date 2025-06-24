const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const setupCronJobs = () => {
  console.log('⏰ Setting up cron jobs...');

  // Sincronizar dados diariamente às 6h da manhã
  cron.schedule('0 6 * * *', async () => {
    console.log('🔄 Running daily sync job...');
    
    try {
      // Sincronizar Google Ads
      await syncPlatformData('google');
      
      // Sincronizar Meta Ads
      await syncPlatformData('meta');
      
      // Sincronizar TikTok Ads
      await syncPlatformData('tiktok');
      
      console.log('✅ Daily sync completed successfully');
    } catch (error) {
      console.error('❌ Daily sync failed:', error);
    }
  });

  // Gerar insights de IA semanalmente aos domingos às 8h
  cron.schedule('0 8 * * 0', async () => {
    console.log('🧠 Running weekly AI insights generation...');
    
    try {
      await generateWeeklyInsights();
      console.log('✅ Weekly AI insights generated successfully');
    } catch (error) {
      console.error('❌ Weekly AI insights generation failed:', error);
    }
  });

  console.log('✅ Cron jobs configured successfully');
};

async function syncPlatformData(platform: string) {
  try {
    console.log(`🔄 Syncing ${platform} data...`);
    
    // Em uma implementação real, aqui você conectaria com as APIs das plataformas
    // Por enquanto, vamos apenas logar a ação
    
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`✅ ${platform} sync completed`);
  } catch (error) {
    console.error(`❌ ${platform} sync failed:`, error);
    throw error;
  }
}

async function generateWeeklyInsights() {
  try {
    console.log('🧠 Generating weekly AI insights...');
    
    // Buscar dados da semana passada
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const metrics = await prisma.metric.findMany({
      where: {
        date: {
          gte: lastWeek
        }
      },
      include: {
        campaign: true
      }
    });

    if (metrics.length === 0) {
      console.log('📊 No metrics found for weekly analysis');
      return;
    }

    // Análise simples dos dados
    const totalRevenue = metrics.reduce((sum: number, m: any) => sum + m.revenue, 0);
    const totalCost = metrics.reduce((sum: number, m: any) => sum + m.cost, 0);
    const avgROAS = totalCost > 0 ? totalRevenue / totalCost : 0;

    // Criar insight baseado na análise
    let insightTitle = '';
    let insightDescription = '';
    let priority: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';

    if (avgROAS > 3) {
      insightTitle = 'Excellent Performance This Week';
      insightDescription = `Your campaigns achieved an average ROAS of ${avgROAS.toFixed(2)}x this week. Consider scaling successful campaigns.`;
      priority = 'LOW';
    } else if (avgROAS > 2) {
      insightTitle = 'Good Performance, Room for Improvement';
      insightDescription = `Your campaigns achieved an average ROAS of ${avgROAS.toFixed(2)}x this week. Review underperforming campaigns.`;
      priority = 'MEDIUM';
    } else {
      insightTitle = 'Performance Needs Attention';
      insightDescription = `Your campaigns achieved an average ROAS of ${avgROAS.toFixed(2)}x this week. Immediate optimization recommended.`;
      priority = 'HIGH';
    }

    // Salvar insight
    await prisma.aIInsight.create({
      data: {
        type: 'RECOMMENDATION',
        title: insightTitle,
        description: insightDescription,
        priority
      }
    });

    console.log('📊 Weekly insight generated and saved');
  } catch (error) {
    console.error('❌ Weekly insights generation failed:', error);
    throw error;
  }
} 