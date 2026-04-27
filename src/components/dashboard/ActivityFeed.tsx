'use client'

import { timeAgo } from '@/lib/utils'
import { ActivityItem } from '@/lib/types'
import { Heart, ShoppingCart, UserPlus, PenSquare, RefreshCw } from 'lucide-react'

const ACTIVITY: ActivityItem[] = [
  { id: '1', type: 'prompt_sold', description: 'SEO Optimizer sold to @voidrunner', timestamp: '2024-07-15T13:00:00Z', username: 'voidrunner', promptTitle: 'SEO Optimizer' },
  { id: '2', type: 'user_followed', description: '@neonmind started following you', timestamp: '2024-07-15T12:30:00Z', username: 'neonmind' },
  { id: '3', type: 'prompt_liked', description: '@datawitch liked "Code Review Assistant"', timestamp: '2024-07-15T11:00:00Z', username: 'datawitch', promptTitle: 'Code Review Assistant' },
  { id: '4', type: 'prompt_created', description: 'You published "Legal Document Analyzer"', timestamp: '2024-07-14T18:00:00Z', promptTitle: 'Legal Document Analyzer' },
  { id: '5', type: 'prompt_updated', description: 'Updated "Enterprise Code Review"', timestamp: '2024-07-14T15:00:00Z', promptTitle: 'Enterprise Code Review' },
  { id: '6', type: 'prompt_sold', description: '"Code Review" sold to @techguru', timestamp: '2024-07-13T10:00:00Z', username: 'techguru', promptTitle: 'Code Review' },
]

const iconMap = {
  prompt_created: { icon: PenSquare, color: 'text-[#00f5ff]', bg: 'bg-[#00f5ff]/10' },
  prompt_liked: { icon: Heart, color: 'text-[#ff00ff]', bg: 'bg-[#ff00ff]/10' },
  prompt_sold: { icon: ShoppingCart, color: 'text-[#00ff88]', bg: 'bg-[#00ff88]/10' },
  user_followed: { icon: UserPlus, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  prompt_updated: { icon: RefreshCw, color: 'text-slate-400', bg: 'bg-slate-500/10' },
}

export function ActivityFeed() {
  return (
    <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4">
      <h3 className="text-sm font-semibold text-slate-300 mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {ACTIVITY.map((item) => {
          const { icon: Icon, color, bg } = iconMap[item.type]
          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className={`p-1.5 rounded-lg flex-shrink-0 ${bg}`}>
                <Icon size={14} className={color} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{timeAgo(item.timestamp)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
