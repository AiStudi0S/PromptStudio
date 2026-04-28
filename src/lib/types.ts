export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  role: 'user' | 'admin' | 'moderator'
  followers: number
  following: number
  promptCount: number
  revenue: number
  joinedAt: string
  isBanned: boolean
}

export interface Prompt {
  id: string
  title: string
  content: string
  description?: string
  authorId: string
  authorUsername: string
  model: AIModel
  temperature: number
  maxTokens: number
  visibility: 'public' | 'private'
  price: number
  likes: number
  purchases: number
  tags: string[]
  category: string
  createdAt: string
  updatedAt: string
  versions: PromptVersion[]
  isLiked?: boolean
  isPurchased?: boolean
}

export interface PromptVersion {
  id: string
  content: string
  description?: string
  createdAt: string
  version: number
}

export type AIModel =
  | 'gpt-4o'
  | 'gpt-4-turbo'
  | 'gpt-3.5-turbo'
  | 'claude-3-opus'
  | 'claude-3-sonnet'
  | 'claude-3-haiku'
  | 'gemini-pro'
  | 'gemini-ultra'
  | 'llama-3-70b'
  | 'mistral-large'

export interface Notification {
  id: string
  type: 'follow' | 'like' | 'purchase' | 'reply' | 'mention' | 'system'
  message: string
  fromUser?: string
  promptId?: string
  read: boolean
  createdAt: string
}

export interface MarketplaceFilter {
  type: 'all' | 'free' | 'paid' | 'trending'
  category?: string
  model?: AIModel
  search?: string
}

export interface AdminStats {
  totalUsers: number
  totalRevenue: number
  activePrompts: number
  flaggedItems: number
  newUsersToday: number
  salesThisWeek: number
}

export interface PaymentIntegration {
  provider: 'stripe' | 'cashapp' | 'paypal' | 'gcash'
  enabled: boolean
  apiKey?: string
  webhookSecret?: string
}

export interface AppSettings {
  platformFeePercent: number
  paymentIntegrations: PaymentIntegration[]
  aiModels: AIModelConfig[]
  maintenanceMode: boolean
  allowRegistration: boolean
}

export interface AIModelConfig {
  id: string
  name: string
  provider: string
  apiKey?: string
  isActive: boolean
  maxTokens: number
  costPer1kTokens: number
}

export interface ActivityItem {
  id: string
  type: 'prompt_created' | 'prompt_liked' | 'prompt_sold' | 'user_followed' | 'prompt_updated'
  description: string
  timestamp: string
  userId?: string
  username?: string
  promptId?: string
  promptTitle?: string
}
