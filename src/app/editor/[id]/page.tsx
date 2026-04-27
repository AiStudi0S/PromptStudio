'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import { AppLayout } from '@/components/layout/AppLayout'
import { PromptEditor } from '@/components/editor/PromptEditor'
import { PromptOptimizer } from '@/components/editor/PromptOptimizer'
import { VersionHistory } from '@/components/editor/VersionHistory'
import { useStore } from '@/lib/store'
import { generateId } from '@/lib/utils'
import { Prompt } from '@/lib/types'
import { ArrowLeft, Wand2, History, Edit3 } from 'lucide-react'
import Link from 'next/link'

type Tab = 'editor' | 'optimizer' | 'history'

const NEW_PROMPT_TEMPLATE: Prompt = {
  id: 'new',
  title: 'Untitled Prompt',
  content: '',
  description: '',
  authorId: '',
  authorUsername: '',
  model: 'gpt-4o',
  temperature: 0.7,
  maxTokens: 1000,
  visibility: 'private',
  price: 0,
  likes: 0,
  purchases: 0,
  tags: [],
  category: 'General',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  versions: [],
}

export default function PromptEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { prompts, createPrompt, currentUser } = useStore()
  const [activeTab, setActiveTab] = useState<Tab>('editor')
  const [appliedContent, setAppliedContent] = useState<string | undefined>()

  const isNew = id === 'new'
  let prompt: Prompt | undefined

  if (!isNew) {
    prompt = prompts.find(p => p.id === id)
    if (!prompt) return notFound()
  } else {
    prompt = {
      ...NEW_PROMPT_TEMPLATE,
      id: generateId(),
      authorId: currentUser?.id || '',
      authorUsername: currentUser?.username || '',
    }
  }

  const tabs = [
    { id: 'editor' as Tab, label: 'Editor', icon: Edit3 },
    { id: 'optimizer' as Tab, label: 'AI Optimizer', icon: Wand2 },
    { id: 'history' as Tab, label: 'History', icon: History },
  ]

  return (
    <AppLayout title={isNew ? 'New Prompt' : 'Edit Prompt'}>
      <div className="mb-4 flex items-center gap-3">
        <Link href="/editor" className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#16161f] transition-all">
          <ArrowLeft size={16} />
        </Link>
        <h2 className="font-semibold text-slate-200 truncate">{isNew ? 'New Prompt' : prompt.title}</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-[#111118] rounded-xl border border-[#1e1e2e] p-1 w-fit">
        {tabs.map(({ id: tabId, label, icon: Icon }) => (
          <button
            key={tabId}
            onClick={() => setActiveTab(tabId)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === tabId
                ? 'bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/20'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'editor' && (
        <PromptEditor
          prompt={appliedContent ? { ...prompt, content: appliedContent } : prompt}
        />
      )}
      {activeTab === 'optimizer' && (
        <div className="max-w-2xl">
          <PromptOptimizer
            onApply={(content) => {
              setAppliedContent(content)
              setActiveTab('editor')
            }}
          />
        </div>
      )}
      {activeTab === 'history' && (
        <div className="max-w-xl">
          <VersionHistory prompt={prompt} />
        </div>
      )}
    </AppLayout>
  )
}
