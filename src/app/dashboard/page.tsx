'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { useAuth } from '@/hooks/useAuth'
import { useStore } from '@/lib/store'
import { usePrompts } from '@/hooks/usePrompts'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { FileText, Heart, DollarSign, Users, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { currentUser } = useAuth()
  const { myPrompts } = usePrompts()
  const { prompts } = useStore()

  const totalLikes = myPrompts.reduce((s, p) => s + p.likes, 0)
  const totalSales = myPrompts.reduce((s, p) => s + p.purchases, 0)

  return (
    <AppLayout title="Dashboard">
      {/* Welcome */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-100">
          Welcome back, <span className="text-[#00f5ff]">@{currentUser?.username}</span> 👋
        </h2>
        <p className="text-sm text-slate-500 mt-1">Here&apos;s your studio overview for today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatsCard
          title="My Prompts"
          value={myPrompts.length.toString()}
          change="2 this week"
          icon={<FileText size={18} />}
          glow="cyan"
        />
        <StatsCard
          title="Total Likes"
          value={formatNumber(totalLikes)}
          change="48 this week"
          icon={<Heart size={18} />}
          glow="magenta"
        />
        <StatsCard
          title="Revenue"
          value={formatCurrency(currentUser?.revenue || 0)}
          change="$340 this week"
          icon={<DollarSign size={18} />}
          glow="green"
        />
        <StatsCard
          title="Followers"
          value={formatNumber(currentUser?.followers || 0)}
          change="23 this week"
          icon={<Users size={18} />}
          glow="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>

        {/* Quick links */}
        <div className="space-y-3">
          <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { href: '/editor/new', label: 'Create New Prompt', color: 'text-[#00f5ff]', bg: 'bg-[#00f5ff]/5 hover:bg-[#00f5ff]/10 border-[#00f5ff]/20' },
                { href: '/marketplace', label: 'Browse Marketplace', color: 'text-[#ff00ff]', bg: 'bg-[#ff00ff]/5 hover:bg-[#ff00ff]/10 border-[#ff00ff]/20' },
                { href: '/profile', label: 'View Profile', color: 'text-[#00ff88]', bg: 'bg-[#00ff88]/5 hover:bg-[#00ff88]/10 border-[#00ff88]/20' },
                { href: '/notifications', label: 'Notifications', color: 'text-yellow-400', bg: 'bg-yellow-500/5 hover:bg-yellow-500/10 border-yellow-500/20' },
              ].map(({ href, label, color, bg }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all ${bg}`}
                >
                  <span className={`text-xs font-medium ${color}`}>{label}</span>
                  <ArrowRight size={12} className={color} />
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-1.5">
              <TrendingUp size={13} className="text-[#00f5ff]" />
              Trending Now
            </h3>
            <div className="space-y-2.5">
              {prompts.filter(p => p.visibility === 'public').sort((a, b) => b.likes - a.likes).slice(0, 4).map((p, i) => (
                <Link key={p.id} href={`/editor/${p.id}`} className="flex items-center gap-2 group">
                  <span className="text-xs font-bold text-slate-600 w-4">#{i + 1}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 truncate group-hover:text-slate-200 transition-colors">{p.title}</p>
                    <p className="text-[10px] text-slate-600">❤️ {formatNumber(p.likes)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
