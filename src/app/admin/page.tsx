'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { AdminStats } from '@/components/admin/AdminStats'
import { UserTable } from '@/components/admin/UserTable'
import Link from 'next/link'
import { Users, ShoppingBag, Settings, ShieldCheck, ArrowRight } from 'lucide-react'

export default function AdminPage() {
  return (
    <AppLayout title="Admin Panel">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck size={18} className="text-[#ff00ff]" />
          <h2 className="text-lg font-bold text-slate-100">Admin Panel</h2>
        </div>
        <p className="text-sm text-slate-500">Platform overview and management tools</p>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <AdminStats />
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[
          {
            href: '/admin/users',
            label: 'User Management',
            desc: 'Ban, role, search users',
            icon: Users,
            color: 'border-[#00f5ff]/20 bg-[#00f5ff]/5',
            iconColor: 'text-[#00f5ff]',
          },
          {
            href: '/admin/marketplace',
            label: 'Marketplace Mod',
            desc: 'Review & moderate prompts',
            icon: ShoppingBag,
            color: 'border-[#ff00ff]/20 bg-[#ff00ff]/5',
            iconColor: 'text-[#ff00ff]',
          },
          {
            href: '/admin/settings',
            label: 'App Settings',
            desc: 'Fees, APIs, integrations',
            icon: Settings,
            color: 'border-[#00ff88]/20 bg-[#00ff88]/5',
            iconColor: 'text-[#00ff88]',
          },
        ].map(item => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:scale-[1.01] ${item.color}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-black/20`}>
                  <Icon size={16} className={item.iconColor} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{item.label}</p>
                  <p className="text-[11px] text-slate-500">{item.desc}</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-slate-600" />
            </Link>
          )
        })}
      </div>

      {/* Recent users */}
      <UserTable />
    </AppLayout>
  )
}
