import { create } from 'zustand';
import type { Campaign, User, AIInsight, FilterOptions } from '../types';

interface AppState {
  user: User | null;
  campaigns: Campaign[];
  insights: AIInsight[];
  filters: FilterOptions;
  isLoading: boolean;
  error: string | null;
}

interface AppActions {
  setUser: (user: User | null) => void;
  setCampaigns: (campaigns: Campaign[]) => void;
  setInsights: (insights: AIInsight[]) => void;
  setFilters: (filters: FilterOptions) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  logout: () => void;
}

type AppStore = AppState & AppActions;

export const useStore = create<AppStore>((set, get) => ({
  // State
  user: null,
  campaigns: [],
  insights: [],
  filters: {},
  isLoading: false,
  error: null,

  // Actions
  setUser: (user) => set({ user }),
  setCampaigns: (campaigns) => set({ campaigns }),
  setInsights: (insights) => set({ insights }),
  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  addCampaign: (campaign) => set((state) => ({
    campaigns: [...state.campaigns, campaign]
  })),
  
  updateCampaign: (id, updates) => set((state) => ({
    campaigns: state.campaigns.map(campaign =>
      campaign.id === id ? { ...campaign, ...updates } : campaign
    )
  })),
  
  logout: () => set({
    user: null,
    campaigns: [],
    insights: [],
    filters: {},
    error: null
  }),
})); 