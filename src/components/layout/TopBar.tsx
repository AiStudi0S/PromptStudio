'use client'

import Link from 'next/link'
import { Bell, Search, Zap } from 'lucide-react'
import { useStore } from '@/lib/store'
import { useAuth } from '@/hooks/useAuth'

interface TopBarProps {
  title: string
}

export function TopBar({ title }: TopBarProps) {
  const { currentUser } = useAuth()
  const notifications = useStore(s => s.notifications)
  const unread = notifications.filter(n => !n.read).length

  return (
    <header className="h-14 bg-[#111118]/80 backdrop-blur-xl border-b border-[#1e1e2e] flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <Zap size={18} className="text-[#00f5ff]" />
        </div>
        <h1 className="font-semibold text-slate-200 text-sm md:text-base">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/notifications"
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#16161f] transition-all"
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#ff00ff] rounded-full text-[9px] font-bold flex items-center justify-center text-white shadow-[0_0_6px_#ff00ff]">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </Link>
        {currentUser && (
          <Link href="/profile" className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-[#16161f] transition-all">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#ff00ff] flex items-center justify-center text-xs font-bold text-[#0a0a0f]">
              {currentUser.username[0].toUpperCase()}
            </div>
            <span className="hidden md:block text-xs text-slate-400">{currentUser.username}</span>
          </Link>
        )}
      </div>
    </header>
  )
}
