
export enum AppTab {
  Home = 'Home',
  Create = 'Create',
  Performance = 'Performance',
  Creatives = 'Creatives',
  Discover = 'Discover',
  Integrations = 'Integrations',
  Leads = 'Leads',
  Profile = 'Profile'
}

export type BusinessCategory = 'Restaurant' | 'Salon' | 'Coaching' | 'Local Services' | 'D2C Fashion' | 'Electronics Retail';

export interface UserProfile {
  businessName: string;
  category: BusinessCategory;
  city: string;
  language: 'English' | 'Hindi';
  defaultGoal: string;
  brandColors: string[];
}

export interface IntegrationStatus {
  metaConnected: boolean;
  googleConnected: boolean;
  whatsappConnected: boolean;
  reelsConnected: boolean;
  localPartnerConnected: boolean;
  lastSyncedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  goal: string;
  platforms: string[];
  location: string;
  budgetPerDay: number;
  durationDays: number;
  status: 'Active' | 'Paused' | 'Draft';
  createdAt: string;
  leadsCount: number;
  spend: number;
  cpl: number;
}

export interface Lead {
  id: string;
  sourceCampaignId: string;
  nameMasked: string;
  message: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Not interested';
  timestamp: string;
  valueAmount?: number;
}

export interface CreativeTemplate {
  id: string;
  category: BusinessCategory;
  type: 'Image' | 'Video' | 'Carousel';
  headline: string;
  offer: string;
  cta: string;
  imageUrl: string;
}
