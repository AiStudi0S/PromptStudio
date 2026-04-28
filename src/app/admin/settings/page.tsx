'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { useStore } from '@/lib/store'
import { AIModelConfig, AppSettings } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { generateId } from '@/lib/utils'
import { ArrowLeft, Plus, Trash2, Edit2, Settings, CreditCard, Cpu, DollarSign, ToggleLeft, ToggleRight } from 'lucide-react'
import Link from 'next/link'

export default function AdminSettingsPage() {
  const { settings, updateSettings, updateAIModel, deleteAIModel, addAIModel } = useStore()
  const [fee, setFee] = useState(settings.platformFeePercent.toString())
  const [feeSaved, setFeeSaved] = useState(false)
  const [modelModal, setModelModal] = useState(false)
  const [editingModel, setEditingModel] = useState<AIModelConfig | null>(null)
  const [newModel, setNewModel] = useState<Partial<AIModelConfig>>({
    name: '', provider: '', maxTokens: 4096, costPer1kTokens: 0.001, isActive: true,
  })

  const saveFee = () => {
    updateSettings({ platformFeePercent: parseFloat(fee) || 15 })
    setFeeSaved(true)
    setTimeout(() => setFeeSaved(false), 2000)
  }

  const togglePayment = (provider: string) => {
    updateSettings({
      paymentIntegrations: settings.paymentIntegrations.map(p =>
        p.provider === provider ? { ...p, enabled: !p.enabled } : p
      ),
    })
  }

  const openAddModel = () => {
    setEditingModel(null)
    setNewModel({ name: '', provider: '', maxTokens: 4096, costPer1kTokens: 0.001, isActive: true })
    setModelModal(true)
  }

  const openEditModel = (model: AIModelConfig) => {
    setEditingModel(model)
    setNewModel({ ...model })
    setModelModal(true)
  }

  const saveModel = () => {
    if (!newModel.name || !newModel.provider) return
    if (editingModel) {
      updateAIModel({ ...editingModel, ...newModel } as AIModelConfig)
    } else {
      addAIModel({ ...newModel, id: generateId() } as AIModelConfig)
    }
    setModelModal(false)
  }

  const providerColors: Record<string, 'cyan' | 'green' | 'magenta' | 'yellow' | 'gray'> = {
    stripe: 'cyan',
    paypal: 'yellow',
    cashapp: 'green',
    gcash: 'magenta',
  }

  return (
    <AppLayout title="App Settings">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#16161f] transition-all">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h2 className="text-lg font-bold text-slate-100">App Settings</h2>
          <p className="text-sm text-slate-500">Configure platform fees, integrations, and AI models</p>
        </div>
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* Platform Fee */}
        <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={14} className="text-[#00ff88]" />
            <h3 className="text-sm font-semibold text-slate-300">Platform Fee</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-32">
              <input
                type="number"
                min="0" max="50" step="0.5"
                value={fee}
                onChange={e => setFee(e.target.value)}
                className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-3 py-2 pr-8 text-sm text-slate-200 focus:outline-none focus:border-[#00f5ff]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">%</span>
            </div>
            <Button variant="primary" size="sm" onClick={saveFee}>
              {feeSaved ? 'Saved!' : 'Save'}
            </Button>
          </div>
          <p className="text-xs text-slate-600 mt-2">Current: {settings.platformFeePercent}% taken from each sale</p>
        </div>

        {/* Payment Integrations */}
        <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={14} className="text-[#00f5ff]" />
            <h3 className="text-sm font-semibold text-slate-300">Payment Integrations</h3>
          </div>
          <div className="space-y-3">
            {settings.paymentIntegrations.map(integration => (
              <div key={integration.provider} className={`flex items-center justify-between p-3 rounded-lg border ${
                integration.enabled ? 'border-[#1e1e2e] bg-[#0a0a0f]' : 'border-[#1e1e2e] bg-[#0a0a0f] opacity-60'
              }`}>
                <div className="flex items-center gap-3">
                  <Badge variant={providerColors[integration.provider] || 'gray'}>
                    {integration.provider.charAt(0).toUpperCase() + integration.provider.slice(1)}
                  </Badge>
                  {integration.apiKey && (
                    <span className="text-xs text-slate-600 font-mono">
                      {integration.apiKey.slice(0, 12)}...
                    </span>
                  )}
                </div>
                <button
                  onClick={() => togglePayment(integration.provider)}
                  className={`transition-colors ${integration.enabled ? 'text-[#00f5ff]' : 'text-slate-600'}`}
                >
                  {integration.enabled ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Models */}
        <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-[#ff00ff]" />
              <h3 className="text-sm font-semibold text-slate-300">AI Model Configuration</h3>
            </div>
            <Button variant="secondary" size="sm" onClick={openAddModel}>
              <Plus size={13} /> Add Model
            </Button>
          </div>
          <div className="space-y-2">
            {settings.aiModels.map(model => (
              <div key={model.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                model.isActive ? 'border-[#1e1e2e]' : 'border-[#1e1e2e] opacity-50'
              } bg-[#0a0a0f]`}>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateAIModel({ ...model, isActive: !model.isActive })}
                    className={model.isActive ? 'text-[#00ff88]' : 'text-slate-600'}
                  >
                    {model.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                  </button>
                  <div>
                    <p className="text-sm text-slate-200 font-medium">{model.name}</p>
                    <p className="text-[11px] text-slate-600">{model.provider} · {model.maxTokens.toLocaleString()} tokens · ${model.costPer1kTokens}/1k</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModel(model)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-[#00f5ff] hover:bg-[#00f5ff]/10 transition-all"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => deleteAIModel(model.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App toggles */}
        <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4">
          <div className="flex items-center gap-2 mb-4">
            <Settings size={14} className="text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-300">General Settings</h3>
          </div>
          <div className="space-y-3">
            {(
              [
                { key: 'maintenanceMode' as const, label: 'Maintenance Mode', desc: 'Block all non-admin access' },
                { key: 'allowRegistration' as const, label: 'Allow Registration', desc: 'New user sign-ups enabled' },
              ] satisfies Array<{ key: keyof Pick<AppSettings, 'maintenanceMode' | 'allowRegistration'>; label: string; desc: string }>
            ).map(setting => (
              <div key={setting.key} className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
                <div>
                  <p className="text-sm text-slate-300">{setting.label}</p>
                  <p className="text-xs text-slate-600">{setting.desc}</p>
                </div>
                <button
                  onClick={() => updateSettings({ [setting.key]: !settings[setting.key] })}
                  className={settings[setting.key] ? 'text-[#00f5ff]' : 'text-slate-600'}
                >
                  {settings[setting.key] ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Model Modal */}
      <Modal
        isOpen={modelModal}
        onClose={() => setModelModal(false)}
        title={editingModel ? 'Edit AI Model' : 'Add AI Model'}
        size="md"
      >
        <div className="space-y-3">
          <Input
            label="Model Name"
            value={newModel.name || ''}
            onChange={e => setNewModel({ ...newModel, name: e.target.value })}
            placeholder="e.g. GPT-5"
          />
          <Input
            label="Provider"
            value={newModel.provider || ''}
            onChange={e => setNewModel({ ...newModel, provider: e.target.value })}
            placeholder="e.g. OpenAI"
          />
          <Input
            label="API Key (optional)"
            value={newModel.apiKey || ''}
            onChange={e => setNewModel({ ...newModel, apiKey: e.target.value })}
            placeholder="sk-..."
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Max Tokens"
              type="number"
              value={newModel.maxTokens?.toString() || ''}
              onChange={e => setNewModel({ ...newModel, maxTokens: parseInt(e.target.value) })}
            />
            <Input
              label="Cost / 1k tokens ($)"
              type="number"
              step="0.0001"
              value={newModel.costPer1kTokens?.toString() || ''}
              onChange={e => setNewModel({ ...newModel, costPer1kTokens: parseFloat(e.target.value) })}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" className="flex-1" onClick={saveModel}>
              {editingModel ? 'Save Changes' : 'Add Model'}
            </Button>
            <Button variant="ghost" onClick={() => setModelModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  )
}
