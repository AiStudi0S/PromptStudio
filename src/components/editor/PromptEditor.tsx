'use client'

import { useState } from 'react'
import { Prompt, AIModel } from '@/lib/types'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { MODEL_LABELS } from '@/lib/utils'
import { Save, Eye, EyeOff, DollarSign, Cpu } from 'lucide-react'

const MODELS: AIModel[] = [
  'gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo',
  'claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku',
  'gemini-pro', 'gemini-ultra', 'llama-3-70b', 'mistral-large',
]

interface PromptEditorProps {
  prompt: Prompt
}

export function PromptEditor({ prompt }: PromptEditorProps) {
  const { updatePrompt } = useStore()
  const [form, setForm] = useState({
    title: prompt.title,
    content: prompt.content,
    description: prompt.description || '',
    model: prompt.model,
    temperature: prompt.temperature,
    maxTokens: prompt.maxTokens,
    visibility: prompt.visibility,
    price: prompt.price,
    tags: prompt.tags.join(', '),
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updatePrompt(prompt.id, {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Main editor */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4">
          <Input
            label="Prompt Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Enterprise Code Review Assistant"
            className="mb-3"
          />
          <Textarea
            label="Prompt Content"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            placeholder="You are an expert AI assistant..."
            className="font-mono text-xs min-h-[280px]"
          />
          <div className="mt-3">
            <Input
              label="Description (optional)"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Brief description of what this prompt does"
            />
          </div>
          <div className="mt-3">
            <Input
              label="Tags (comma-separated)"
              value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              placeholder="code, review, enterprise"
            />
          </div>
        </div>
      </div>

      {/* Parameters panel */}
      <div className="space-y-4">
        <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4 space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Cpu size={14} className="text-[#00f5ff]" />
            Parameters
          </h3>

          {/* Model selector */}
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">AI Model</label>
            <select
              value={form.model}
              onChange={e => setForm({ ...form, model: e.target.value as AIModel })}
              className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#00f5ff]"
            >
              {MODELS.map(m => (
                <option key={m} value={m}>{MODEL_LABELS[m]}</option>
              ))}
            </select>
          </div>

          {/* Temperature */}
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-xs text-slate-500">Temperature</label>
              <span className="text-xs text-[#00f5ff] font-mono">{form.temperature.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0" max="2" step="0.1"
              value={form.temperature}
              onChange={e => setForm({ ...form, temperature: parseFloat(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>Precise</span>
              <span>Creative</span>
            </div>
          </div>

          {/* Max tokens */}
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-xs text-slate-500">Max Tokens</label>
              <span className="text-xs text-[#00f5ff] font-mono">{form.maxTokens.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="100" max="4000" step="100"
              value={form.maxTokens}
              onChange={e => setForm({ ...form, maxTokens: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>100</span>
              <span>4,000</span>
            </div>
          </div>
        </div>

        {/* Visibility & pricing */}
        <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4 space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <DollarSign size={14} className="text-[#00ff88]" />
            Publishing
          </h3>

          <div>
            <label className="block text-xs text-slate-500 mb-2">Visibility</label>
            <div className="grid grid-cols-2 gap-2">
              {(['public', 'private'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setForm({ ...form, visibility: v })}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    form.visibility === v
                      ? 'bg-[#00f5ff]/10 border-[#00f5ff]/40 text-[#00f5ff]'
                      : 'bg-[#0a0a0f] border-[#2a2a3e] text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {v === 'public' ? <Eye size={12} /> : <EyeOff size={12} />}
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Price (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg pl-7 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#00f5ff]"
              />
            </div>
            <p className="text-[10px] text-slate-600 mt-1">Set 0 for free. Platform fee: 15%</p>
          </div>
        </div>

        <Button
          variant="primary"
          className="w-full"
          onClick={handleSave}
        >
          <Save size={14} />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}
