'use client'

import Link from 'next/link'
import { AppLayout } from '@/components/layout/AppLayout'
import { usePrompts } from '@/hooks/usePrompts'
import { formatCurrency, formatNumber, MODEL_LABELS, MODEL_COLORS, timeAgo, cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Plus, Eye, EyeOff, Heart, ShoppingCart, Pencil, Trash2, PenSquare } from 'lucide-react'
import { useState } from 'react'

export default function EditorListPage() {
  const { myPrompts, deletePrompt } = usePrompts()
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  return (
    <AppLayout title="My Prompts">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-100">My Prompts</h2>
          <p className="text-sm text-slate-500">{myPrompts.length} prompts in your studio</p>
        </div>
        <Link href="/editor/new">
          <Button variant="primary">
            <Plus size={14} />
            New Prompt
          </Button>
        </Link>
      </div>

      {myPrompts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="p-4 bg-[#111118] rounded-2xl border border-[#1e1e2e] mb-4">
            <PenSquare size={32} className="text-slate-600" />
          </div>
          <h3 className="text-slate-300 font-semibold mb-2">No prompts yet</h3>
          <p className="text-sm text-slate-600 mb-4">Create your first prompt to get started</p>
          <Link href="/editor/new">
            <Button variant="primary">
              <Plus size={14} />
              Create Prompt
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {myPrompts.map(prompt => (
            <div
              key={prompt.id}
              className="bg-[#111118] rounded-xl border border-[#1e1e2e] hover:border-[#2a2a3e] transition-all p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Link
                      href={`/editor/${prompt.id}`}
                      className="font-semibold text-slate-200 hover:text-[#00f5ff] transition-colors truncate"
                    >
                      {prompt.title}
                    </Link>
                    <span className="flex-shrink-0">
                      {prompt.visibility === 'public' ? (
                        <Eye size={12} className="text-slate-500" />
                      ) : (
                        <EyeOff size={12} className="text-slate-600" />
                      )}
                    </span>
                  </div>
                  {prompt.description && (
                    <p className="text-xs text-slate-500 mb-2 line-clamp-1">{prompt.description}</p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <span className={cn('px-1.5 py-0.5 rounded text-[11px] border', MODEL_COLORS[prompt.model] || 'bg-slate-500/10 text-slate-400 border-slate-500/20')}>
                      {MODEL_LABELS[prompt.model]}
                    </span>
                    <span className="flex items-center gap-0.5"><Heart size={11} /> {formatNumber(prompt.likes)}</span>
                    <span className="flex items-center gap-0.5"><ShoppingCart size={11} /> {formatNumber(prompt.purchases)}</span>
                    <span className={prompt.price === 0 ? 'text-[#00ff88]' : 'text-[#00f5ff]'}>
                      {formatCurrency(prompt.price)}
                    </span>
                    <span className="text-slate-700">Updated {timeAgo(prompt.updatedAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/editor/${prompt.id}`}>
                    <Button variant="secondary" size="sm">
                      <Pencil size={12} />
                      Edit
                    </Button>
                  </Link>
                  {confirmDelete === prompt.id ? (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => { deletePrompt(prompt.id); setConfirmDelete(null) }}
                      >
                        Confirm
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(null)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(prompt.id)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  )
}
