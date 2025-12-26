
import { Campaign, Lead, UserProfile, CreativeTemplate, IntegrationStatus } from './types';

export const INITIAL_USER: UserProfile = {
  businessName: "Glow & Glam D2C",
  category: "D2C Fashion",
  city: "Mumbai",
  language: "English",
  defaultGoal: "Get WhatsApp leads",
  brandColors: ["#4B2BBE", "#E91E63", "#F44336", "#2196F3"] // Purple, Pink, Red, Blue
};

export const INITIAL_INTEGRATIONS: IntegrationStatus = {
  metaConnected: true,
  googleConnected: false,
  whatsappConnected: true,
  reelsConnected: true,
  localPartnerConnected: false,
  lastSyncedAt: new Date().toISOString()
};

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'c1',
    name: 'Summer Saree Fest',
    goal: 'Get WhatsApp leads',
    platforms: ['Meta', 'Google'],
    location: 'Mumbai, Pune',
    budgetPerDay: 500,
    durationDays: 7,
    status: 'Active',
    createdAt: '2024-05-10',
    leadsCount: 24,
    spend: 3500,
    cpl: 145.8
  },
  {
    id: 'c2',
    name: 'Lipstick Launch BOGO',
    goal: 'Get orders',
    platforms: ['Meta'],
    location: 'Bangalore',
    budgetPerDay: 1000,
    durationDays: 14,
    status: 'Paused',
    createdAt: '2024-05-01',
    leadsCount: 156,
    spend: 14000,
    cpl: 89.7
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'l1',
    sourceCampaignId: 'c1',
    nameMasked: 'Rajesh K. (****5678)',
    message: 'Hi, interested in the silk sarees shown in the ad.',
    status: 'New',
    timestamp: '2024-05-20 10:30 AM'
  },
  {
    id: 'l2',
    sourceCampaignId: 'c1',
    nameMasked: 'Anjali M. (****1234)',
    message: 'Is shipping available to Delhi?',
    status: 'Contacted',
    timestamp: '2024-05-20 11:15 AM'
  },
  {
    id: 'l3',
    sourceCampaignId: 'c2',
    nameMasked: 'Sneha P. (****9900)',
    message: 'Want to buy 3 shades of the new range.',
    status: 'Converted',
    timestamp: '2024-05-19 04:45 PM',
    valueAmount: 2500
  }
];

export const TEMPLATES: CreativeTemplate[] = [
  {
    id: 't1',
    category: 'D2C Fashion',
    type: 'Image',
    headline: 'Ethnic Elegance',
    offer: 'Flat 20% OFF on first order',
    cta: 'WhatsApp Us',
    imageUrl: 'https://picsum.photos/seed/fashion1/600/600'
  },
  {
    id: 't2',
    category: 'D2C Fashion',
    type: 'Video',
    headline: 'Walk in Style',
    offer: 'New Summer Collection out now',
    cta: 'Shop Now',
    imageUrl: 'https://picsum.photos/seed/fashion2/600/800'
  },
  {
    id: 't3',
    category: 'D2C Fashion',
    type: 'Carousel',
    headline: 'Bestsellers',
    offer: 'Most loved styles this month',
    cta: 'View More',
    imageUrl: 'https://picsum.photos/seed/fashion3/600/600'
  },
  {
    id: 't4',
    category: 'D2C Fashion',
    type: 'Image',
    headline: 'Festive Ready',
    offer: 'Buy 2 Get 1 FREE',
    cta: 'WhatsApp Us',
    imageUrl: 'https://picsum.photos/seed/fashion4/600/600'
  }
];
