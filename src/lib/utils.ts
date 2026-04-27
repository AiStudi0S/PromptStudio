import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  if (amount === 0) return 'Free'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toString()
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return formatDate(dateStr)
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export const MODEL_LABELS: Record<string, string> = {
  'gpt-4o': 'GPT-4o',
  'gpt-4-turbo': 'GPT-4 Turbo',
  'gpt-3.5-turbo': 'GPT-3.5',
  'claude-3-opus': 'Claude 3 Opus',
  'claude-3-sonnet': 'Claude 3 Sonnet',
  'claude-3-haiku': 'Claude 3 Haiku',
  'gemini-pro': 'Gemini Pro',
  'gemini-ultra': 'Gemini Ultra',
  'llama-3-70b': 'LLaMA 3 70B',
  'mistral-large': 'Mistral Large',
}

export const MODEL_COLORS: Record<string, string> = {
  'gpt-4o': 'bg-green-500/20 text-green-400 border-green-500/30',
  'gpt-4-turbo': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'gpt-3.5-turbo': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'claude-3-opus': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'claude-3-sonnet': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'claude-3-haiku': 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
  'gemini-pro': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'gemini-ultra': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  'llama-3-70b': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'mistral-large': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
}
