'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { useStore } from '@/lib/store'
import { formatCurrency, MODEL_LABELS, MODEL_COLORS, cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { ArrowLeft, Search, Flag, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

const FLAGS = [
  { promptId: 'prompt-1', reason: 'Potential copyright infringement', severity: 'medium', reportedBy: 'user-4' },
  { promptId: 'prompt-3', reason: 'Spam / low quality', severity: 'low', reportedBy: 'user-2' },
  { promptId: 'prompt-6', reason: 'Misleading description', severity: 'high', reportedBy: 'user-1' },
]

export default function AdminMarketplacePage() {
  const { prompts } = useStore()
  const [search, setSearch] = useState('')
  const [resolved, setResolved] = useState<string[]>([])

  const publicPrompts = prompts.filter(p => p.visibility === 'public')
  const filtered = search
    ? publicPrompts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.authorUsername.toLowerCase().includes(search.toLowerCase())
      )
    : publicPrompts

  return (
    <AppLayout title="Marketplace Moderation">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#16161f] transition-all">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h2 className="text-lg font-bold text-slate-100">Marketplace Moderation</h2>
          <p className="text-sm text-slate-500">Review flagged content and manage listings</p>
        </div>
      </div>

      {/* Flagged items */}
      <div className="bg-[#111118] rounded-xl border border-red-500/20 p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={14} className="text-red-400" />
          <h3 className="text-sm font-semibold text-slate-300">Flagged Items ({FLAGS.filter(f => !resolved.includes(f.promptId)).length})</h3>
        </div>
        <div className="space-y-3">
          {FLAGS.map(flag => {
            const prompt = prompts.find(p => p.id === flag.promptId)
            if (!prompt || resolved.includes(flag.promptId)) return null
            return (
              <div key={flag.promptId} className="flex items-center justify-between gap-3 p-3 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm text-slate-200 font-medium">{prompt.title}</span>
                    <Badge variant={flag.severity === 'high' ? 'red' : flag.severity === 'medium' ? 'yellow' : 'gray'}>
                      {flag.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">{flag.reason}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setResolved(r => [...r, flag.promptId])}
                    className="flex items-center gap-1 text-xs text-[#00ff88] bg-[#00ff88]/10 hover:bg-[#00ff88]/20 px-2 py-1 rounded-lg transition-all"
                  >
                    <CheckCircle size={12} /> Dismiss
                  </button>
                  <button className="flex items-center gap-1 text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded-lg transition-all">
                    <XCircle size={12} /> Remove
                  </button>
                </div>
              </div>
            )
          })}
          {FLAGS.every(f => resolved.includes(f.promptId)) && (
            <p className="text-xs text-slate-600 text-center py-2">All flagged items resolved ✓</p>
          )}
        </div>
      </div>

      {/* All prompts */}
      <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] overflow-hidden">
        <div className="p-4 border-b border-[#1e1e2e] flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-300">All Public Prompts ({publicPrompts.length})</h3>
          <div className="w-56">
            <Input
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              icon={<Search size={14} />}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#1e1e2e]">
                {['Title', 'Author', 'Model', 'Price', 'Likes', 'Sales', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-[#1e1e2e]/50 hover:bg-[#16161f]/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-slate-200 font-medium">{p.title}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">@{p.authorUsername}</td>
                  <td className="px-4 py-3">
                    <span className={cn('text-[11px] px-1.5 py-0.5 rounded border', MODEL_COLORS[p.model] || 'bg-slate-500/10 text-slate-400 border-slate-500/20')}>
                      {MODEL_LABELS[p.model]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#00f5ff]">{formatCurrency(p.price)}</td>
                  <td className="px-4 py-3 text-slate-400">{p.likes}</td>
                  <td className="px-4 py-3 text-slate-400">{p.purchases}</td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-[11px] text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20 px-2 py-1 rounded-lg transition-all">
                      <Flag size={10} /> Flag
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
