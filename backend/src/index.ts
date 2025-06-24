const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const campaignRoutes = require('./routes/campaigns');
const metricsRoutes = require('./routes/metrics');
const aiRoutes = require('./routes/ai');
const syncRoutes = require('./routes/sync');
const { setupCronJobs } = require('./utils/cron');

// Configuração básica sem dotenv por enquanto
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/sync', syncRoutes);

// Health check
app.get('/api/health', (req: any, res: any) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req: any, res: any) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found' 
  });
});

// Inicializar servidor
async function startServer() {
  try {
    // Tentar conectar com banco de dados (opcional por enquanto)
    try {
      await prisma.$connect();
      console.log('✅ Database connected successfully');
    } catch (dbError) {
      console.log('⚠️ Database connection failed, running without database');
      console.log('💡 To use database features, make sure PostgreSQL is running');
    }

    // Configurar jobs agendados
    setupCronJobs();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Campaign Analytics API ready`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});

startServer(); 