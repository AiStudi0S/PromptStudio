'use client'

import { useState, useMemo } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { PromptCard } from '@/components/marketplace/PromptCard'
import { MarketplaceTimeline } from '@/components/marketplace/MarketplaceTimeline'
import { useStore } from '@/lib/store'
import { Input } from '@/components/ui/Input'
import { Search } from 'lucide-react'

const FILTERS = ['All', 'Free', 'Paid', 'Trending'] as const
type Filter = typeof FILTERS[number]

export default function MarketplacePage() {
  const { prompts } = useStore()
  const [filter, setFilter] = useState<Filter>('All')
  const [search, setSearch] = useState('')

  const publicPrompts = prompts.filter(p => p.visibility === 'public')

  const filtered = useMemo(() => {
    let result = [...publicPrompts]

    if (filter === 'Free') result = result.filter(p => p.price === 0)
    if (filter === 'Paid') result = result.filter(p => p.price > 0)
    if (filter === 'Trending') result = result.sort((a, b) => (b.likes + b.purchases * 2) - (a.likes + a.purchases * 2))

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q)) ||
          p.authorUsername.toLowerCase().includes(q)
      )
    }

    return result
  }, [publicPrompts, filter, search])

  return (
    <AppLayout title="Marketplace">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Marketplace</h2>
              <p className="text-xs text-slate-500">{filtered.length} prompts available</p>
            </div>
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search prompts..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                icon={<Search size={14} />}
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 mb-4 bg-[#111118] rounded-xl border border-[#1e1e2e] p-1 w-fit">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === f
                    ? 'bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/20'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-600">
              No prompts found. Try adjusting your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar timeline */}
        <div className="w-full md:w-72 flex-shrink-0">
          <MarketplaceTimeline />
        </div>
      </div>
    </AppLayout>
  )
}
