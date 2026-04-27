'use client'

import { useStore } from '@/lib/store'
import { Prompt } from '@/lib/types'
import { useMemo } from 'react'

export function usePrompts(filter?: { authorId?: string; visibility?: string; search?: string }) {
  const { prompts, createPrompt, updatePrompt, deletePrompt, likePrompt, purchasePrompt, currentUser } = useStore()

  const filteredPrompts = useMemo(() => {
    let result = [...prompts]
    if (filter?.authorId) {
      result = result.filter(p => p.authorId === filter.authorId)
    }
    if (filter?.visibility) {
      result = result.filter(p => p.visibility === filter.visibility)
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase()
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [prompts, filter?.authorId, filter?.visibility, filter?.search])

  const publicPrompts = useMemo(() => prompts.filter(p => p.visibility === 'public'), [prompts])

  const myPrompts = useMemo(
    () => (currentUser ? prompts.filter(p => p.authorId === currentUser.id) : []),
    [prompts, currentUser]
  )

  const trendingPrompts = useMemo(
    () => [...publicPrompts].sort((a, b) => b.likes + b.purchases - (a.likes + a.purchases)).slice(0, 10),
    [publicPrompts]
  )

  return {
    prompts: filteredPrompts,
    publicPrompts,
    myPrompts,
    trendingPrompts,
    createPrompt,
    updatePrompt,
    deletePrompt,
    likePrompt,
    purchasePrompt,
  }
}

export function usePrompt(id: string): Prompt | undefined {
  const { prompts } = useStore()
  return prompts.find(p => p.id === id)
}
