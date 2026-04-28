'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingBag,
  PenSquare,
  User,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Zap,
  Bell,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { useStore } from '@/lib/store'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
  { href: '/editor', icon: PenSquare, label: 'Editor' },
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/notifications', icon: Bell, label: 'Notifications' },
]

const adminItems = [{ href: '/admin', icon: ShieldCheck, label: 'Admin Panel' }]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { currentUser, isAdmin, logout } = useAuth()
  const notifications = useStore(s => s.notifications)
  const unreadCount = notifications.filter(n => !n.read).length

  const allItems = isAdmin ? [...navItems, ...adminItems] : navItems

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen bg-[#111118] border-r border-[#1e1e2e] transition-all duration-300 sticky top-0 flex-shrink-0',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center h-16 px-4 border-b border-[#1e1e2e]', collapsed && 'justify-center')}>
        <Zap size={20} className="text-[#00f5ff] flex-shrink-0" />
        {!collapsed && (
          <span className="ml-2 font-bold text-[#00f5ff] tracking-tight text-lg">PromptStudio</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {allItems.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href)
          const isNotif = href === '/notifications'
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                active
                  ? 'bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/20'
                  : 'text-slate-400 hover:bg-[#16161f] hover:text-slate-200',
                collapsed && 'justify-center'
              )}
            >
              <div className="relative flex-shrink-0">
                <Icon size={18} />
                {isNotif && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff00ff] rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              {!collapsed && <span className="text-sm font-medium">{label}</span>}
              {active && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00f5ff] shadow-[0_0_6px_#00f5ff]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-[#1e1e2e] p-3">
        {!collapsed && currentUser && (
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#ff00ff] flex items-center justify-center text-xs font-bold text-[#0a0a0f] flex-shrink-0">
              {currentUser.username[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{currentUser.username}</p>
              <p className="text-[10px] text-slate-500 truncate">{currentUser.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all',
            collapsed && 'justify-center'
          )}
        >
          <LogOut size={16} />
          {!collapsed && <span className="text-xs">Sign Out</span>}
        </button>
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-[#1e1e2e] border border-[#2a2a3e] rounded-full flex items-center justify-center text-slate-400 hover:text-[#00f5ff] transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  )
}
