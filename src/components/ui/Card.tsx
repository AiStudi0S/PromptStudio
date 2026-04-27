'use client'

import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'cyan' | 'magenta' | 'green' | 'none'
  hover?: boolean
}

export function Card({ className, glow = 'none', hover = false, children, ...props }: CardProps) {
  const glowClasses = {
    cyan: 'border-[#00f5ff]/30 shadow-[0_0_20px_rgba(0,245,255,0.1)]',
    magenta: 'border-[#ff00ff]/30 shadow-[0_0_20px_rgba(255,0,255,0.1)]',
    green: 'border-[#00ff88]/30 shadow-[0_0_20px_rgba(0,255,136,0.1)]',
    none: 'border-[#1e1e2e]',
  }

  return (
    <div
      className={cn(
        'bg-[#111118] rounded-xl border p-4 transition-all duration-200',
        glowClasses[glow],
        hover && 'hover:border-[#00f5ff]/40 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn('mb-3', className)} {...props}>
      {children}
    </div>
  )
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}
export function CardBody({ className, children, ...props }: CardBodyProps) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}
export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={cn('mt-3 pt-3 border-t border-[#1e1e2e]', className)} {...props}>
      {children}
    </div>
  )
}
