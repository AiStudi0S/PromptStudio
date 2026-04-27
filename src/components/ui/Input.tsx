'use client'

import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-400 mb-1.5">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{icon}</div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-[#111118] border border-[#2a2a3e] rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600',
              'transition-all duration-200',
              'focus:outline-none focus:border-[#00f5ff] focus:shadow-[0_0_0_1px_#00f5ff,0_0_20px_rgba(0,245,255,0.1)]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.5)]',
              icon && 'pl-10',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-400 mb-1.5">{label}</label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full bg-[#111118] border border-[#2a2a3e] rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600',
            'transition-all duration-200 resize-vertical min-h-[100px]',
            'focus:outline-none focus:border-[#00f5ff] focus:shadow-[0_0_0_1px_#00f5ff,0_0_20px_rgba(0,245,255,0.1)]',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
