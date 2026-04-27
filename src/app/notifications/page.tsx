'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { useStore } from '@/lib/store'
import { useAuth } from '@/hooks/useAuth'
import { timeAgo } from '@/lib/utils'
import { Bell, Heart, ShoppingCart, UserPlus, MessageSquare, Zap, CheckCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

const notifIcons = {
  follow: { icon: UserPlus, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  like: { icon: Heart, color: 'text-[#ff00ff]', bg: 'bg-[#ff00ff]/10' },
  purchase: { icon: ShoppingCart, color: 'text-[#00ff88]', bg: 'bg-[#00ff88]/10' },
  reply: { icon: MessageSquare, color: 'text-[#00f5ff]', bg: 'bg-[#00f5ff]/10' },
  mention: { icon: Zap, color: 'text-[#00f5ff]', bg: 'bg-[#00f5ff]/10' },
  system: { icon: Bell, color: 'text-slate-400', bg: 'bg-slate-500/10' },
}

const PREFS = [
  { key: 'follows', label: 'New followers', enabled: true },
  { key: 'likes', label: 'Likes on my prompts', enabled: true },
  { key: 'purchases', label: 'Prompt purchases', enabled: true },
  { key: 'replies', label: 'Replies and mentions', enabled: false },
  { key: 'system', label: 'System announcements', enabled: true },
]

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useStore()
  const [prefs, setPrefs] = useState(PREFS)

  const unread = notifications.filter(n => !n.read)
  const sorted = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const togglePref = (key: string) => {
    setPrefs(p => p.map(pref => pref.key === key ? { ...pref, enabled: !pref.enabled } : pref))
  }

  return (
    <AppLayout title="Notifications">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-100">Notifications</h2>
            {unread.length > 0 && (
              <p className="text-xs text-slate-500">{unread.length} unread</p>
            )}
          </div>
          {unread.length > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllNotificationsRead}>
              <CheckCheck size={13} />
              Mark all read
            </Button>
          )}
        </div>

        {/* Notifications list */}
        <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] overflow-hidden mb-4">
          {sorted.length === 0 ? (
            <div className="py-12 text-center text-slate-600 text-sm">No notifications yet.</div>
          ) : (
            sorted.map((notif, i) => {
              const cfg = notifIcons[notif.type]
              const Icon = cfg.icon
              return (
                <button
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 transition-all hover:bg-[#16161f] text-left ${
                    i < sorted.length - 1 ? 'border-b border-[#1e1e2e]' : ''
                  } ${!notif.read ? 'bg-[#00f5ff]/[0.02]' : ''}`}
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 ${cfg.bg}`}>
                    <Icon size={14} className={cfg.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-relaxed ${notif.read ? 'text-slate-500' : 'text-slate-200'}`}>
                      {notif.message}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">{timeAgo(notif.createdAt)}</p>
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-[#00f5ff] flex-shrink-0 mt-1.5 shadow-[0_0_6px_#00f5ff]" />
                  )}
                </button>
              )
            })
          )}
        </div>

        {/* Preferences */}
        <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            {prefs.map(pref => (
              <div key={pref.key} className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{pref.label}</span>
                <button
                  onClick={() => togglePref(pref.key)}
                  className={`relative w-10 h-5.5 rounded-full transition-all duration-200 flex-shrink-0 ${
                    pref.enabled ? 'bg-[#00f5ff]/30' : 'bg-[#1e1e2e]'
                  }`}
                  style={{ width: '40px', height: '22px' }}
                >
                  <span
                    className={`absolute top-0.5 w-4.5 h-4.5 rounded-full transition-all duration-200 shadow-sm ${
                      pref.enabled ? 'bg-[#00f5ff] translate-x-5' : 'bg-slate-600 translate-x-0.5'
                    }`}
                    style={{ width: '18px', height: '18px', top: '2px', left: pref.enabled ? '18px' : '2px' }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
