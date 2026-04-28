'use client'

import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { Prompt } from '@/lib/types'
import { cn, formatCurrency, formatNumber, MODEL_LABELS, MODEL_COLORS, truncate } from '@/lib/utils'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/Button'

interface PromptCardProps {
  prompt: Prompt
}

export function PromptCard({ prompt }: PromptCardProps) {
  const { likePrompt, purchasePrompt, currentUser } = useStore()
  const isOwn = currentUser?.id === prompt.authorId

  return (
    <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] hover:border-[#2a2a3e] transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,245,255,0.07)] flex flex-col">
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/editor/${prompt.id}`} className="font-semibold text-slate-200 hover:text-[#00f5ff] transition-colors text-sm leading-tight line-clamp-2">
            {prompt.title}
          </Link>
          <span className={cn('text-xs px-1.5 py-0.5 rounded border flex-shrink-0', MODEL_COLORS[prompt.model] || 'bg-slate-500/10 text-slate-400 border-slate-500/20')}>
            {MODEL_LABELS[prompt.model] || prompt.model}
          </span>
        </div>

        {prompt.description && (
          <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{truncate(prompt.description, 100)}</p>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {prompt.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        <div className="flex items-center gap-1 mb-3">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#ff00ff] flex items-center justify-center text-[10px] font-bold text-[#0a0a0f]">
            {prompt.authorUsername[0].toUpperCase()}
          </div>
          <Link href={`/profile/${prompt.authorUsername}`} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            @{prompt.authorUsername}
          </Link>
        </div>
      </div>

      <div className="border-t border-[#1e1e2e] p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => likePrompt(prompt.id)}
            className={cn(
              'flex items-center gap-1 text-xs transition-all',
              prompt.isLiked ? 'text-[#ff00ff]' : 'text-slate-500 hover:text-[#ff00ff]'
            )}
          >
            <Heart size={13} fill={prompt.isLiked ? 'currentColor' : 'none'} />
            {formatNumber(prompt.likes)}
          </button>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <ShoppingCart size={13} />
            {formatNumber(prompt.purchases)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={cn(
            'text-sm font-bold',
            prompt.price === 0 ? 'text-[#00ff88]' : 'text-[#00f5ff]'
          )}>
            {formatCurrency(prompt.price)}
          </span>
          {!isOwn && (
            <Button
              size="sm"
              variant={prompt.isPurchased || prompt.price === 0 ? 'secondary' : 'primary'}
              onClick={() => !prompt.isPurchased && purchasePrompt(prompt.id)}
              className="text-xs px-2 py-1"
            >
              {prompt.isPurchased || prompt.price === 0 ? 'Use' : 'Buy'}
            </Button>
          )}
          {isOwn && (
            <Link href={`/editor/${prompt.id}`}>
              <Button size="sm" variant="secondary" className="text-xs px-2 py-1">Edit</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
