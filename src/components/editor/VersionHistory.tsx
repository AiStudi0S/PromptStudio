'use client'

import { useState } from 'react'
import { History, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import { Prompt, PromptVersion } from '@/lib/types'
import { useStore } from '@/lib/store'
import { timeAgo } from '@/lib/utils'

interface VersionHistoryProps {
  prompt: Prompt
}

export function VersionHistory({ prompt }: VersionHistoryProps) {
  const { updatePrompt } = useStore()
  const [expanded, setExpanded] = useState<string | null>(null)

  const handleRollback = (version: PromptVersion) => {
    updatePrompt(prompt.id, { content: version.content })
  }

  if (prompt.versions.length === 0) {
    return (
      <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4">
        <div className="flex items-center gap-2 mb-3">
          <History size={14} className="text-[#00f5ff]" />
          <h3 className="text-sm font-semibold text-slate-300">Version History</h3>
        </div>
        <p className="text-xs text-slate-600">No versions yet. Save the prompt to create your first version.</p>
      </div>
    )
  }

  return (
    <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4">
      <div className="flex items-center gap-2 mb-4">
        <History size={14} className="text-[#00f5ff]" />
        <h3 className="text-sm font-semibold text-slate-300">Version History</h3>
        <span className="ml-auto text-xs text-slate-600">{prompt.versions.length} versions</span>
      </div>
      <div className="space-y-2">
        {[...prompt.versions].reverse().map((version, idx) => {
          const isLatest = idx === 0
          const isExpanded = expanded === version.id
          return (
            <div
              key={version.id}
              className={`rounded-lg border transition-all ${
                isLatest
                  ? 'border-[#00f5ff]/30 bg-[#00f5ff]/5'
                  : 'border-[#1e1e2e] bg-[#0a0a0f]/50'
              }`}
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold ${isLatest ? 'text-[#00f5ff]' : 'text-slate-400'}`}>
                    v{version.version}
                  </span>
                  {isLatest && (
                    <span className="text-[10px] bg-[#00f5ff]/20 text-[#00f5ff] px-1.5 py-0.5 rounded-full border border-[#00f5ff]/30">
                      Current
                    </span>
                  )}
                  <span className="text-[11px] text-slate-600">{timeAgo(version.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setExpanded(isExpanded ? null : version.id)}
                    className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                  {!isLatest && (
                    <button
                      onClick={() => handleRollback(version)}
                      className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-[#ff00ff] transition-colors px-1.5 py-1 rounded hover:bg-[#ff00ff]/10"
                    >
                      <RotateCcw size={10} />
                      Restore
                    </button>
                  )}
                </div>
              </div>
              {isExpanded && (
                <div className="px-3 pb-3">
                  <div className="bg-[#0a0a0f] rounded-lg p-3 text-[11px] text-slate-400 font-mono whitespace-pre-wrap max-h-[120px] overflow-y-auto border border-[#1e1e2e]">
                    {version.content}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
