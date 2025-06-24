# 🌸 Campaign Analytics Platform

Uma aplicação web full stack moderna para integração e visualização de métricas de campanhas publicitárias, construída com React, TypeScript, Node.js e PostgreSQL.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **TailwindCSS** - Framework CSS utilitário
- **Zustand** - Gerenciamento de estado
- **Axios** - Cliente HTTP
- **Recharts** - Biblioteca de gráficos

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **node-cron** - Jobs agendados

## 📁 Estrutura do Projeto

```
flowers/
├── front/                    # Frontend React
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── hooks/           # Custom hooks (Zustand)
│   │   ├── api/             # Cliente API
│   │   └── types/           # Tipos TypeScript
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # Backend Node.js
│   ├── src/
│   │   ├── controllers/     # Lógica de negócio
│   │   ├── routes/          # Rotas da API
│   │   ├── prisma/          # Schema do banco
│   │   └── utils/           # Utilitários (cron)
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🎯 Funcionalidades

### ✅ Implementadas
- **Autenticação**: Login com JWT, credenciais mockadas
- **Dashboard**: KPIs, gráficos e métricas em tempo real
- **Campanhas**: CRUD completo com filtros e busca
- **Métricas**: Visualização de dados de performance
- **Integrações**: Estrutura para Google Ads, Meta Ads, TikTok
- **Jobs Agendados**: Sincronização automática de dados
- **IA**: Insights e recomendações automáticas

### 🔄 Em Desenvolvimento
- Integração real com APIs de publicidade
- Sistema de notificações
- Relatórios avançados
- Exportação de dados

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- PostgreSQL (opcional - servidor roda sem banco)

### 1. Clone o repositório
```bash
git clone <repository-url>
cd flowers
```

### 2. Backend
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### 3. Frontend
```bash
cd front
npm install
npm run dev
```

### 4. Banco de Dados (Opcional)
```bash
# Instalar PostgreSQL
# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações
npx prisma db push
```

## 🔧 Configuração

### Variáveis de Ambiente (Backend)
```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/campaign_analytics"
JWT_SECRET="your-secret-key"
CORS_ORIGIN="http://localhost:5173"
PORT=3001
```

### Credenciais de Login
- **Email**: admin@example.com
- **Senha**: admin123

## 🚀 Como Usar

1. **Inicie o backend**: `cd backend && npm run dev`
2. **Inicie o frontend**: `cd front && npm run dev`
3. **Acesse**: http://localhost:5173
4. **Faça login** com as credenciais acima
5. **Explore o dashboard** com KPIs e gráficos

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Usuário atual

### Campanhas
- `GET /api/campaigns` - Listar campanhas
- `GET /api/campaigns/:id` - Detalhes da campanha
- `POST /api/campaigns` - Criar campanha
- `PUT /api/campaigns/:id` - Atualizar campanha
- `DELETE /api/campaigns/:id` - Deletar campanha

### Métricas
- `GET /api/metrics/kpis` - KPIs agregados
- `GET /api/metrics/chart` - Dados para gráficos

### IA
- `GET /api/ai/insights` - Insights de IA
- `POST /api/ai/recommendations` - Gerar recomendações

### Sincronização
- `POST /api/sync/:platform` - Sincronizar plataforma

## 🔧 Problemas Resolvidos

### 1. Prisma Client
**Problema**: `PrismaClientInitializationError`
**Solução**: Executar `npx prisma generate` após instalar dependências

### 2. TailwindCSS
**Problema**: Erro de configuração PostCSS
**Solução**: Reverter para configuração tradicional e instalar versão compatível

### 3. Express Import
**Problema**: `TypeError: (0 , express_1.default) is not a function`
**Solução**: Converter importações ES modules para CommonJS (`require()`)

### 4. Banco de Dados
**Problema**: Servidor não iniciava sem PostgreSQL
**Solução**: Configurar conexão opcional - servidor roda sem banco

## 📈 Status do Projeto

- ✅ **Frontend**: Funcionando com interface moderna
- ✅ **Backend**: Servidor rodando na porta 3001
- ✅ **Autenticação**: Sistema completo implementado
- ✅ **Dashboard**: KPIs e gráficos funcionais
- ⚠️ **Banco**: PostgreSQL opcional (dados mockados)
- 🔄 **Integrações**: Estrutura pronta para APIs reais

## 🎨 Interface

A aplicação possui uma interface moderna e responsiva com:
- **Dashboard**: KPIs em cards, gráficos interativos
- **Filtros**: Por plataforma, período e status
- **Tabelas**: Lista de campanhas com métricas
- **Navegação**: Menu lateral intuitivo
- **Responsividade**: Funciona em desktop e mobile

## 🔮 Próximos Passos

1. **Integração Real**: Conectar com APIs de Google Ads, Meta Ads
2. **Banco de Dados**: Configurar PostgreSQL para dados reais
3. **Notificações**: Sistema de alertas e notificações
4. **Relatórios**: Exportação de dados em PDF/Excel
5. **IA Avançada**: Machine Learning para otimização

**Desenvolvido com ❤️ para análise de campanhas publicitárias** 
**Desenvolvido com ❤️ para análise de campanhas publicitárias** 
