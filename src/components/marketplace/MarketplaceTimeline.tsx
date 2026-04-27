'use client'

import { timeAgo } from '@/lib/utils'
import { ShoppingCart, Heart, UserPlus, Star } from 'lucide-react'

const TIMELINE = [
  { id: 't1', type: 'purchase', text: '@techguru purchased "Code Review Pro"', time: '2024-07-15T14:00:00Z' },
  { id: 't2', type: 'like', text: '@neonmind liked "Cyberpunk Story Gen"', time: '2024-07-15T13:30:00Z' },
  { id: 't3', type: 'new', text: '@voidrunner published "Startup Pitch Pro"', time: '2024-07-15T12:00:00Z' },
  { id: 't4', type: 'follow', text: '@datawitch joined PromptStudio', time: '2024-07-15T11:00:00Z' },
  { id: 't5', type: 'purchase', text: '@aibuilder purchased "SEO Optimizer"', time: '2024-07-14T20:00:00Z' },
  { id: 't6', type: 'like', text: '@creative99 liked "Data Wizard"', time: '2024-07-14T18:30:00Z' },
  { id: 't7', type: 'new', text: '@alexcyber published "Legal Analyzer"', time: '2024-07-14T16:00:00Z' },
  { id: 't8', type: 'purchase', text: '@prompter purchased "Code Review Pro"', time: '2024-07-14T14:00:00Z' },
]

const typeConfig = {
  purchase: { icon: ShoppingCart, color: 'text-[#00ff88]', bg: 'bg-[#00ff88]/10', dot: 'bg-[#00ff88]' },
  like: { icon: Heart, color: 'text-[#ff00ff]', bg: 'bg-[#ff00ff]/10', dot: 'bg-[#ff00ff]' },
  new: { icon: Star, color: 'text-[#00f5ff]', bg: 'bg-[#00f5ff]/10', dot: 'bg-[#00f5ff]' },
  follow: { icon: UserPlus, color: 'text-yellow-400', bg: 'bg-yellow-500/10', dot: 'bg-yellow-400' },
}

export function MarketplaceTimeline() {
  return (
    <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4">
      <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
        Live Activity
      </h3>
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-[#1e1e2e]" />
        <div className="space-y-3">
          {TIMELINE.map((item) => {
            const cfg = typeConfig[item.type as keyof typeof typeConfig]
            const Icon = cfg.icon
            return (
              <div key={item.id} className="flex items-start gap-3 pl-1">
                <div className={`relative z-10 p-1 rounded-md flex-shrink-0 ${cfg.bg}`}>
                  <Icon size={11} className={cfg.color} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 leading-relaxed">{item.text}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">{timeAgo(item.time)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
