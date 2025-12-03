export interface FeedbackItem {
  id: string;
  user: string;
  content: string;
  source: 'Twitter' | 'Intercom' | 'Email' | 'SalesForce';
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface InsightCluster {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impactScore: number;
  relatedFeedbackIds: string[];
  suggestedAction: string;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  STRATEGY = 'STRATEGY', // Shows the Architecture & Growth hooks requested
  SETTINGS = 'SETTINGS'
}
