const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const authController = {
  login: async (req: any, res: any) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required'
        });
      }

      // Em produção, você deve verificar a senha com hash
      // Por enquanto, vamos usar um login mockado
      if (email === 'admin@example.com' && password === 'admin123') {
        const user = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'ADMIN'
        };

        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || 'fallback-secret',
          { expiresIn: '24h' }
        );

        return res.json({
          success: true,
          data: {
            user,
            token
          }
        });
      }

      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  },

  logout: async (req: any, res: any) => {
    try {
      // Em uma implementação real, você pode invalidar o token
      // Por enquanto, apenas retornamos sucesso
      return res.json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      console.error('Logout error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  },

  getCurrentUser: async (req: any, res: any) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'No token provided'
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      
      // Em produção, você buscaria o usuário no banco de dados
      const user = {
        id: decoded.userId,
        email: decoded.email,
        name: 'Admin User',
        role: 'ADMIN'
      };

      return res.json({
        success: true,
        data: { user }
      });
    } catch (error) {
      console.error('Get current user error:', error);
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }
  }
}; 