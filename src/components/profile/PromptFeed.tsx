'use client'

import { useState } from 'react'
import { Prompt } from '@/lib/types'
import { PromptCard } from '@/components/marketplace/PromptCard'

interface PromptFeedProps {
  prompts: Prompt[]
  likedPrompts?: Prompt[]
  soldPrompts?: Prompt[]
}

const TABS = ['Prompts', 'Liked', 'Sold'] as const
type Tab = typeof TABS[number]

export function PromptFeed({ prompts, likedPrompts = [], soldPrompts = [] }: PromptFeedProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Prompts')

  const tabData: Record<Tab, Prompt[]> = {
    Prompts: prompts,
    Liked: likedPrompts,
    Sold: soldPrompts,
  }

  const currentItems = tabData[activeTab]

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-[#111118] rounded-xl border border-[#1e1e2e] p-1">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === tab
                ? 'bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/20'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab}
            <span className="ml-1 text-[10px] opacity-60">({tabData[tab].length})</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {currentItems.length === 0 ? (
        <div className="text-center py-12 text-slate-600 text-sm">
          No {activeTab.toLowerCase()} yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentItems.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  )
}
