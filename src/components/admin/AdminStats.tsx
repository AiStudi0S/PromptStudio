'use client'

import { useStore } from '@/lib/store'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { Users, DollarSign, FileText, AlertTriangle, TrendingUp, Activity } from 'lucide-react'

export function AdminStats() {
  const { users, prompts } = useStore()

  const stats = [
    {
      label: 'Total Users',
      value: formatNumber(users.length),
      sub: `${users.filter(u => !u.isBanned).length} active`,
      icon: Users,
      glow: 'cyan' as const,
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(users.reduce((s, u) => s + u.revenue, 0)),
      sub: 'Platform: 15%',
      icon: DollarSign,
      glow: 'green' as const,
    },
    {
      label: 'Active Prompts',
      value: formatNumber(prompts.filter(p => p.visibility === 'public').length),
      sub: `${prompts.length} total`,
      icon: FileText,
      glow: 'yellow' as const,
    },
    {
      label: 'Flagged Items',
      value: '3',
      sub: '1 critical',
      icon: AlertTriangle,
      glow: 'red' as const,
    },
    {
      label: 'New Users Today',
      value: '24',
      sub: '+12% vs yesterday',
      icon: TrendingUp,
      glow: 'magenta' as const,
    },
    {
      label: 'Active Sessions',
      value: '182',
      sub: 'Real-time',
      icon: Activity,
      glow: 'cyan' as const,
    },
  ]

  const glowMap = {
    cyan: { border: 'border-[#00f5ff]/20', iconBg: 'bg-[#00f5ff]/10', iconColor: 'text-[#00f5ff]' },
    green: { border: 'border-[#00ff88]/20', iconBg: 'bg-[#00ff88]/10', iconColor: 'text-[#00ff88]' },
    yellow: { border: 'border-yellow-500/20', iconBg: 'bg-yellow-500/10', iconColor: 'text-yellow-400' },
    red: { border: 'border-red-500/20', iconBg: 'bg-red-500/10', iconColor: 'text-red-400' },
    magenta: { border: 'border-[#ff00ff]/20', iconBg: 'bg-[#ff00ff]/10', iconColor: 'text-[#ff00ff]' },
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {stats.map((stat) => {
        const g = glowMap[stat.glow]
        const Icon = stat.icon
        return (
          <div key={stat.label} className={`bg-[#111118] rounded-xl border p-4 ${g.border}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-slate-100 mt-1">{stat.value}</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{stat.sub}</p>
              </div>
              <div className={`p-2 rounded-lg ${g.iconBg}`}>
                <Icon size={16} className={g.iconColor} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
