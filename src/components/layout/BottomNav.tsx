'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, PenSquare, User, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/marketplace', icon: ShoppingBag, label: 'Market' },
  { href: '/editor', icon: PenSquare, label: 'Editor' },
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/admin', icon: ShieldCheck, label: 'Admin' },
]

export function BottomNav() {
  const pathname = usePathname()
  const { isAdmin } = useAuth()

  const items = isAdmin ? navItems : navItems.filter(i => i.href !== '/admin')

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#111118]/95 backdrop-blur-xl border-t border-[#1e1e2e]">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[56px]',
                active
                  ? 'text-[#00f5ff]'
                  : 'text-slate-500 hover:text-slate-300'
              )}
            >
              <div className="relative">
                <Icon size={20} />
                {active && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#00f5ff] rounded-full shadow-[0_0_6px_#00f5ff]" />
                )}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
