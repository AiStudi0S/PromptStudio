'use client'

import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'cyan' | 'magenta' | 'green' | 'yellow' | 'red' | 'gray' | 'purple'
  className?: string
}

export function Badge({ children, variant = 'gray', className }: BadgeProps) {
  const variants = {
    cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    magenta: 'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30',
    green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    yellow: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    red: 'bg-red-500/15 text-red-400 border-red-500/30',
    gray: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
