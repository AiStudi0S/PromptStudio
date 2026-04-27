'use client'

import { useState } from 'react'
import { Wand2, Loader2, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Input'

const STEPS = [
  { id: 'parse', label: 'Parse & Normalize', desc: 'Analyzing intent and extracting key requirements...' },
  { id: 'spec', label: 'Spec Completion', desc: 'Auto-filling missing parameters and context...' },
  { id: 'optimize', label: 'Optimization Layer', desc: 'Rewriting to professional enterprise style...' },
]

function optimizePrompt(raw: string): string {
  const lines = raw.split('\n').filter(Boolean)
  const mainIdea = lines[0] || raw

  return `You are an expert ${extractRole(mainIdea)} with extensive industry experience. Your task is to ${mainIdea.toLowerCase().replace(/^(write|create|make|build|generate)/i, 'produce')}.

## Context & Scope
- Audience: Professional / Enterprise
- Output Format: Structured, actionable, and comprehensive
- Quality Standard: Senior-level expertise expected

## Core Requirements
${lines.map((l, i) => `${i + 1}. ${l.charAt(0).toUpperCase() + l.slice(1)}`).join('\n')}

## Behavioral Guidelines
- Maintain professional, precise language throughout
- Provide concrete examples where appropriate
- Flag assumptions and edge cases explicitly
- Structure output with clear sections and hierarchy
- Prioritize accuracy and completeness over brevity

## Output Constraints
- Begin with a structured overview
- Use numbered lists for sequential steps
- Use bullet points for parallel items
- Include severity/priority labels where applicable
- End with a summary and recommended next actions

Proceed systematically and ensure all aspects of the request are addressed comprehensively.`
}

function extractRole(text: string): string {
  if (/code|develop|program|software|bug/i.test(text)) return 'software engineer'
  if (/seo|content|market|copy/i.test(text)) return 'content strategist'
  if (/data|analys|statistic/i.test(text)) return 'data scientist'
  if (/legal|contract|law/i.test(text)) return 'legal advisor'
  if (/design|ui|ux/i.test(text)) return 'UX designer'
  if (/business|startup|pitch/i.test(text)) return 'business consultant'
  return 'domain expert'
}

interface PromptOptimizerProps {
  onApply?: (content: string) => void
}

export function PromptOptimizer({ onApply }: PromptOptimizerProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [completed, setCompleted] = useState(false)

  const runOptimizer = async () => {
    if (!input.trim()) return
    setIsRunning(true)
    setCompleted(false)
    setOutput('')

    for (let i = 0; i < STEPS.length; i++) {
      setCurrentStep(i)
      await new Promise(res => setTimeout(res, 900))
    }

    const result = optimizePrompt(input)
    setOutput(result)
    setCurrentStep(-1)
    setIsRunning(false)
    setCompleted(true)
  }

  return (
    <div className="bg-[#111118] rounded-xl border border-[#ff00ff]/20 p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-[#ff00ff]/10 rounded-lg">
          <Wand2 size={16} className="text-[#ff00ff]" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-200">Prompt Optimizer</h3>
          <p className="text-[11px] text-slate-500">Transform plain text into enterprise-grade prompts</p>
        </div>
      </div>

      <Textarea
        label="Plain text input"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="e.g. Review my code for security issues and bugs"
        className="min-h-[80px] text-xs"
      />

      {/* Pipeline steps */}
      <div className="my-4 space-y-2">
        {STEPS.map((step, i) => {
          const isDone = completed || (isRunning && i < currentStep)
          const isActive = isRunning && currentStep === i

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                isActive
                  ? 'border-[#ff00ff]/40 bg-[#ff00ff]/5'
                  : isDone
                  ? 'border-[#00ff88]/30 bg-[#00ff88]/5'
                  : 'border-[#1e1e2e] bg-transparent'
              }`}
            >
              <div className="flex-shrink-0">
                {isDone ? (
                  <CheckCircle size={14} className="text-[#00ff88]" />
                ) : isActive ? (
                  <Loader2 size={14} className="text-[#ff00ff] animate-spin" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-[#2a2a3e]" />
                )}
              </div>
              <div>
                <p className={`text-xs font-medium ${isActive ? 'text-[#ff00ff]' : isDone ? 'text-[#00ff88]' : 'text-slate-500'}`}>
                  {step.label}
                </p>
                {isActive && <p className="text-[10px] text-slate-600">{step.desc}</p>}
              </div>
            </div>
          )
        })}
      </div>

      {output && (
        <div className="mb-4">
          <label className="block text-xs text-slate-500 mb-1.5">Optimized Output</label>
          <div className="bg-[#0a0a0f] border border-[#00ff88]/20 rounded-lg p-3 text-xs text-slate-300 font-mono whitespace-pre-wrap max-h-[200px] overflow-y-auto leading-relaxed">
            {output}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          variant="neon"
          className="flex-1"
          onClick={runOptimizer}
          loading={isRunning}
          disabled={!input.trim()}
        >
          <Wand2 size={13} />
          {isRunning ? 'Optimizing...' : 'Optimize'}
        </Button>
        {output && onApply && (
          <Button variant="primary" onClick={() => onApply(output)} className="flex-1">
            <ArrowRight size={13} />
            Apply to Editor
          </Button>
        )}
      </div>
    </div>
  )
}
