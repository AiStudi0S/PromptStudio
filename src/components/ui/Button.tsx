'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'neon'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0f]'

    const variants = {
      primary:
        'bg-[#00f5ff] text-[#0a0a0f] hover:bg-cyan-300 focus:ring-[#00f5ff] shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]',
      secondary:
        'bg-[#16161f] text-slate-200 border border-[#2a2a3e] hover:border-[#00f5ff]/50 hover:bg-[#1e1e2e] focus:ring-slate-500',
      ghost:
        'text-slate-400 hover:text-slate-200 hover:bg-[#16161f] focus:ring-slate-500',
      danger:
        'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 focus:ring-red-500',
      neon:
        'bg-transparent text-[#ff00ff] border border-[#ff00ff]/50 hover:bg-[#ff00ff]/10 hover:border-[#ff00ff] shadow-[0_0_10px_rgba(255,0,255,0.2)] focus:ring-[#ff00ff]',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
