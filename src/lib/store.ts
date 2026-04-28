import { create } from 'zustand'
import { User, Prompt, Notification, AppSettings, AIModelConfig } from './types'
import { generateId } from './utils'

const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    username: 'alexcyber',
    email: 'alex@promptstudio.io',
    bio: 'AI prompt engineer | Building the future one token at a time',
    role: 'admin',
    followers: 1842,
    following: 234,
    promptCount: 47,
    revenue: 3240.5,
    joinedAt: '2024-01-15',
    isBanned: false,
  },
  {
    id: 'user-2',
    username: 'neonmind',
    email: 'neon@promptstudio.io',
    bio: 'Creative AI explorer & cyberpunk enthusiast',
    role: 'user',
    followers: 892,
    following: 156,
    promptCount: 23,
    revenue: 1120.0,
    joinedAt: '2024-02-20',
    isBanned: false,
  },
  {
    id: 'user-3',
    username: 'voidrunner',
    email: 'void@example.com',
    bio: 'Prompt alchemist turning ideas into gold',
    role: 'user',
    followers: 3201,
    following: 88,
    promptCount: 89,
    revenue: 8920.75,
    joinedAt: '2023-11-01',
    isBanned: false,
  },
  {
    id: 'user-4',
    username: 'datawitch',
    email: 'data@example.com',
    bio: 'Machine learning witch | NLP specialist',
    role: 'moderator',
    followers: 2100,
    following: 312,
    promptCount: 61,
    revenue: 4500.0,
    joinedAt: '2024-03-10',
    isBanned: false,
  },
  {
    id: 'user-5',
    username: 'spambot99',
    email: 'spam@bad.com',
    bio: '',
    role: 'user',
    followers: 3,
    following: 999,
    promptCount: 0,
    revenue: 0,
    joinedAt: '2024-07-01',
    isBanned: true,
  },
]

const MOCK_PROMPTS: Prompt[] = [
  {
    id: 'prompt-1',
    title: 'Enterprise Code Review Assistant',
    content:
      'You are an expert software engineer specializing in code review. Analyze the provided code for: 1) Security vulnerabilities 2) Performance bottlenecks 3) Code style violations 4) Architectural issues. Provide structured feedback with severity levels (critical/high/medium/low) and actionable suggestions.',
    description: 'Professional code review prompt for enterprise development teams',
    authorId: 'user-1',
    authorUsername: 'alexcyber',
    model: 'gpt-4o',
    temperature: 0.3,
    maxTokens: 2000,
    visibility: 'public',
    price: 9.99,
    likes: 342,
    purchases: 89,
    tags: ['code', 'review', 'enterprise', 'security'],
    category: 'Development',
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-07-01T10:00:00Z',
    versions: [
      { id: 'v1', content: 'You are a code reviewer...', version: 1, createdAt: '2024-06-01T10:00:00Z' },
      { id: 'v2', content: 'You are an expert software engineer...', version: 2, createdAt: '2024-07-01T10:00:00Z' },
    ],
    isLiked: false,
    isPurchased: false,
  },
  {
    id: 'prompt-2',
    title: 'Cyberpunk Story Generator',
    content:
      'You are a cyberpunk fiction author. Create immersive stories set in near-future dystopian megacities. Include: neon-lit streets, corporate megastructures, hackers, AI consciousness, social inequality. Writing style: gritty, atmospheric, noir-influenced.',
    description: 'Generate compelling cyberpunk fiction with rich world-building',
    authorId: 'user-2',
    authorUsername: 'neonmind',
    model: 'claude-3-opus',
    temperature: 0.9,
    maxTokens: 4000,
    visibility: 'public',
    price: 0,
    likes: 891,
    purchases: 0,
    tags: ['creative', 'cyberpunk', 'fiction', 'storytelling'],
    category: 'Creative Writing',
    createdAt: '2024-05-15T08:00:00Z',
    updatedAt: '2024-06-20T08:00:00Z',
    versions: [
      { id: 'v1', content: 'Write cyberpunk stories...', version: 1, createdAt: '2024-05-15T08:00:00Z' },
    ],
    isLiked: true,
    isPurchased: false,
  },
  {
    id: 'prompt-3',
    title: 'SEO Content Optimizer Pro',
    content:
      'You are an SEO content specialist. Optimize the provided content for search engines while maintaining readability. Tasks: keyword density analysis, meta description generation, heading structure optimization, internal linking suggestions, readability score improvement.',
    description: 'Enterprise-grade SEO optimization for content teams',
    authorId: 'user-3',
    authorUsername: 'voidrunner',
    model: 'gpt-4-turbo',
    temperature: 0.5,
    maxTokens: 3000,
    visibility: 'public',
    price: 14.99,
    likes: 156,
    purchases: 234,
    tags: ['seo', 'content', 'marketing', 'optimization'],
    category: 'Marketing',
    createdAt: '2024-04-10T12:00:00Z',
    updatedAt: '2024-07-05T12:00:00Z',
    versions: [
      { id: 'v1', content: 'Optimize content for SEO...', version: 1, createdAt: '2024-04-10T12:00:00Z' },
      { id: 'v2', content: 'You are an SEO specialist...', version: 2, createdAt: '2024-05-01T12:00:00Z' },
      { id: 'v3', content: 'You are an SEO content specialist...', version: 3, createdAt: '2024-07-05T12:00:00Z' },
    ],
    isLiked: false,
    isPurchased: true,
  },
  {
    id: 'prompt-4',
    title: 'Data Analysis Wizard',
    content:
      'You are a data scientist with expertise in statistical analysis. When given data or descriptions, provide: descriptive statistics, trend identification, anomaly detection, visualization recommendations, and actionable insights in plain language.',
    description: 'Transform raw data into actionable business insights',
    authorId: 'user-4',
    authorUsername: 'datawitch',
    model: 'gemini-ultra',
    temperature: 0.2,
    maxTokens: 2500,
    visibility: 'public',
    price: 7.99,
    likes: 423,
    purchases: 178,
    tags: ['data', 'analysis', 'statistics', 'insights'],
    category: 'Data Science',
    createdAt: '2024-03-22T15:00:00Z',
    updatedAt: '2024-07-10T15:00:00Z',
    versions: [
      { id: 'v1', content: 'Analyze data and provide insights...', version: 1, createdAt: '2024-03-22T15:00:00Z' },
    ],
    isLiked: false,
    isPurchased: false,
  },
  {
    id: 'prompt-5',
    title: 'Legal Document Analyzer',
    content:
      'You are a legal expert AI assistant. Analyze contracts and legal documents to identify: key clauses and obligations, potential risks and red flags, missing standard provisions, compliance issues. Provide analysis in structured format with risk ratings.',
    description: 'Professional legal document review for contracts and agreements',
    authorId: 'user-1',
    authorUsername: 'alexcyber',
    model: 'claude-3-opus',
    temperature: 0.1,
    maxTokens: 4000,
    visibility: 'public',
    price: 24.99,
    likes: 287,
    purchases: 145,
    tags: ['legal', 'contracts', 'compliance', 'enterprise'],
    category: 'Legal',
    createdAt: '2024-02-14T09:00:00Z',
    updatedAt: '2024-07-08T09:00:00Z',
    versions: [
      { id: 'v1', content: 'Analyze legal documents...', version: 1, createdAt: '2024-02-14T09:00:00Z' },
    ],
    isLiked: true,
    isPurchased: false,
  },
  {
    id: 'prompt-6',
    title: 'Startup Pitch Deck Writer',
    content:
      'You are a startup pitch coach who has helped 200+ companies raise funding. Create compelling pitch deck content including: problem statement, solution overview, market size (TAM/SAM/SOM), business model, competitive analysis, traction metrics, team highlights, and funding ask.',
    description: 'Create investor-ready startup pitch decks',
    authorId: 'user-3',
    authorUsername: 'voidrunner',
    model: 'gpt-4o',
    temperature: 0.7,
    maxTokens: 3500,
    visibility: 'public',
    price: 19.99,
    likes: 612,
    purchases: 312,
    tags: ['startup', 'pitch', 'fundraising', 'business'],
    category: 'Business',
    createdAt: '2024-01-30T11:00:00Z',
    updatedAt: '2024-07-12T11:00:00Z',
    versions: [
      { id: 'v1', content: 'Write a startup pitch...', version: 1, createdAt: '2024-01-30T11:00:00Z' },
    ],
    isLiked: false,
    isPurchased: false,
  },
]

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'follow', message: 'neonmind started following you', fromUser: 'neonmind', read: false, createdAt: '2024-07-15T14:30:00Z' },
  { id: 'n2', type: 'like', message: 'voidrunner liked your prompt "Enterprise Code Review Assistant"', fromUser: 'voidrunner', promptId: 'prompt-1', read: false, createdAt: '2024-07-15T12:00:00Z' },
  { id: 'n3', type: 'purchase', message: 'datawitch purchased "Legal Document Analyzer"', fromUser: 'datawitch', promptId: 'prompt-5', read: false, createdAt: '2024-07-15T10:15:00Z' },
  { id: 'n4', type: 'follow', message: 'datawitch started following you', fromUser: 'datawitch', read: true, createdAt: '2024-07-14T18:00:00Z' },
  { id: 'n5', type: 'like', message: 'neonmind liked your prompt "Legal Document Analyzer"', fromUser: 'neonmind', promptId: 'prompt-5', read: true, createdAt: '2024-07-14T16:45:00Z' },
  { id: 'n6', type: 'system', message: 'Welcome to PromptStudio! Complete your profile to get started.', read: true, createdAt: '2024-07-13T09:00:00Z' },
  { id: 'n7', type: 'purchase', message: 'voidrunner purchased "Enterprise Code Review Assistant"', fromUser: 'voidrunner', promptId: 'prompt-1', read: true, createdAt: '2024-07-12T20:00:00Z' },
]

const MOCK_SETTINGS: AppSettings = {
  platformFeePercent: 15,
  paymentIntegrations: [
    { provider: 'stripe', enabled: true },
    { provider: 'paypal', enabled: true },
    { provider: 'cashapp', enabled: false },
    { provider: 'gcash', enabled: false },
  ],
  aiModels: [
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', isActive: true, maxTokens: 128000, costPer1kTokens: 0.005 },
    { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', isActive: true, maxTokens: 128000, costPer1kTokens: 0.01 },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', isActive: true, maxTokens: 16385, costPer1kTokens: 0.0005 },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', isActive: true, maxTokens: 200000, costPer1kTokens: 0.015 },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic', isActive: true, maxTokens: 200000, costPer1kTokens: 0.003 },
    { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', isActive: true, maxTokens: 200000, costPer1kTokens: 0.00025 },
    { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', isActive: true, maxTokens: 32768, costPer1kTokens: 0.0005 },
    { id: 'gemini-ultra', name: 'Gemini Ultra', provider: 'Google', isActive: false, maxTokens: 32768, costPer1kTokens: 0.002 },
    { id: 'llama-3-70b', name: 'LLaMA 3 70B', provider: 'Meta', isActive: true, maxTokens: 8192, costPer1kTokens: 0.0009 },
    { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral AI', isActive: true, maxTokens: 32768, costPer1kTokens: 0.004 },
  ],
  maintenanceMode: false,
  allowRegistration: true,
}

interface AppState {
  currentUser: User | null
  users: User[]
  prompts: Prompt[]
  notifications: Notification[]
  settings: AppSettings
  isAuthenticated: boolean

  // Auth actions
  login: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void

  // Prompt actions
  createPrompt: (data: Partial<Prompt>) => Prompt
  updatePrompt: (id: string, data: Partial<Prompt>) => void
  deletePrompt: (id: string) => void
  likePrompt: (id: string) => void
  purchasePrompt: (id: string) => void

  // Notification actions
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void

  // User actions
  followUser: (userId: string) => void
  banUser: (userId: string) => void
  updateUserRole: (userId: string, role: User['role']) => void

  // Settings actions
  updateSettings: (settings: Partial<AppSettings>) => void
  updateAIModel: (model: AIModelConfig) => void
  deleteAIModel: (id: string) => void
  addAIModel: (model: AIModelConfig) => void
}

export const useStore = create<AppState>((set, get) => ({
  currentUser: MOCK_USERS[0],
  users: MOCK_USERS,
  prompts: MOCK_PROMPTS,
  notifications: MOCK_NOTIFICATIONS,
  settings: MOCK_SETTINGS,
  isAuthenticated: true,

  login: async (email: string, _password: string) => {
    const user = MOCK_USERS.find(u => u.email === email)
    if (user && !user.isBanned) {
      set({ currentUser: user, isAuthenticated: true })
      if (typeof window !== 'undefined') {
        localStorage.setItem('ps_user', JSON.stringify(user))
      }
      return true
    }
    return false
  },

  register: async (username: string, email: string, _password: string) => {
    const newUser: User = {
      id: generateId(),
      username,
      email,
      role: 'user',
      followers: 0,
      following: 0,
      promptCount: 0,
      revenue: 0,
      joinedAt: new Date().toISOString(),
      isBanned: false,
    }
    set(state => ({ users: [...state.users, newUser], currentUser: newUser, isAuthenticated: true }))
    return true
  },

  logout: () => {
    set({ currentUser: null, isAuthenticated: false })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ps_user')
    }
  },

  createPrompt: (data) => {
    const { currentUser } = get()
    const newPrompt: Prompt = {
      id: generateId(),
      title: data.title || 'Untitled Prompt',
      content: data.content || '',
      description: data.description,
      authorId: currentUser?.id || '',
      authorUsername: currentUser?.username || '',
      model: data.model || 'gpt-4o',
      temperature: data.temperature ?? 0.7,
      maxTokens: data.maxTokens ?? 1000,
      visibility: data.visibility || 'private',
      price: data.price ?? 0,
      likes: 0,
      purchases: 0,
      tags: data.tags || [],
      category: data.category || 'General',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      versions: [],
    }
    set(state => ({ prompts: [newPrompt, ...state.prompts] }))
    return newPrompt
  },

  updatePrompt: (id, data) => {
    set(state => ({
      prompts: state.prompts.map(p =>
        p.id === id
          ? {
              ...p,
              ...data,
              updatedAt: new Date().toISOString(),
              versions: [
                ...p.versions,
                {
                  id: generateId(),
                  content: data.content || p.content,
                  version: p.versions.length + 1,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : p
      ),
    }))
  },

  deletePrompt: (id) => {
    set(state => ({ prompts: state.prompts.filter(p => p.id !== id) }))
  },

  likePrompt: (id) => {
    set(state => ({
      prompts: state.prompts.map(p =>
        p.id === id
          ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked }
          : p
      ),
    }))
  },

  purchasePrompt: (id) => {
    set(state => ({
      prompts: state.prompts.map(p =>
        p.id === id ? { ...p, purchases: p.purchases + 1, isPurchased: true } : p
      ),
    }))
  },

  markNotificationRead: (id) => {
    set(state => ({
      notifications: state.notifications.map(n => (n.id === id ? { ...n, read: true } : n)),
    }))
  },

  markAllNotificationsRead: () => {
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
    }))
  },

  followUser: (userId) => {
    const { currentUser } = get()
    if (!currentUser) return
    set(state => ({
      users: state.users.map(u => {
        if (u.id === userId) return { ...u, followers: u.followers + 1 }
        if (u.id === currentUser.id) return { ...u, following: u.following + 1 }
        return u
      }),
    }))
  },

  banUser: (userId) => {
    set(state => ({
      users: state.users.map(u => (u.id === userId ? { ...u, isBanned: !u.isBanned } : u)),
    }))
  },

  updateUserRole: (userId, role) => {
    set(state => ({
      users: state.users.map(u => (u.id === userId ? { ...u, role } : u)),
    }))
  },

  updateSettings: (settings) => {
    set(state => ({ settings: { ...state.settings, ...settings } }))
  },

  updateAIModel: (model) => {
    set(state => ({
      settings: {
        ...state.settings,
        aiModels: state.settings.aiModels.map(m => (m.id === model.id ? model : m)),
      },
    }))
  },

  deleteAIModel: (id) => {
    set(state => ({
      settings: {
        ...state.settings,
        aiModels: state.settings.aiModels.filter(m => m.id !== id),
      },
    }))
  },

  addAIModel: (model) => {
    set(state => ({
      settings: {
        ...state.settings,
        aiModels: [...state.settings.aiModels, model],
      },
    }))
  },
}))
