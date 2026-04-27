'use client'

import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string
  change?: string
  positive?: boolean
  icon: React.ReactNode
  glow?: 'cyan' | 'magenta' | 'green' | 'yellow'
}

export function StatsCard({ title, value, change, positive = true, icon, glow = 'cyan' }: StatsCardProps) {
  const glowMap = {
    cyan: {
      border: 'border-[#00f5ff]/20',
      shadow: 'hover:shadow-[0_0_30px_rgba(0,245,255,0.15)]',
      iconBg: 'bg-[#00f5ff]/10',
      iconColor: 'text-[#00f5ff]',
    },
    magenta: {
      border: 'border-[#ff00ff]/20',
      shadow: 'hover:shadow-[0_0_30px_rgba(255,0,255,0.15)]',
      iconBg: 'bg-[#ff00ff]/10',
      iconColor: 'text-[#ff00ff]',
    },
    green: {
      border: 'border-[#00ff88]/20',
      shadow: 'hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]',
      iconBg: 'bg-[#00ff88]/10',
      iconColor: 'text-[#00ff88]',
    },
    yellow: {
      border: 'border-yellow-500/20',
      shadow: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]',
      iconBg: 'bg-yellow-500/10',
      iconColor: 'text-yellow-400',
    },
  }

  const g = glowMap[glow]

  return (
    <div
      className={cn(
        'bg-[#111118] rounded-xl border p-4 transition-all duration-200',
        g.border,
        g.shadow
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-slate-100 mt-1">{value}</p>
          {change && (
            <p className={cn('text-xs mt-1', positive ? 'text-[#00ff88]' : 'text-red-400')}>
              {positive ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className={cn('p-2.5 rounded-lg', g.iconBg, g.iconColor)}>
          {icon}
        </div>
      </div>
    </div>
  )
}
