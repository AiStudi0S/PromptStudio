'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('alex@promptstudio.io')
  const [password, setPassword] = useState('password')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const ok = await login(email, password)
    if (!ok) {
      setError('Invalid credentials or account is banned.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 cyber-grid">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="p-2 bg-[#00f5ff]/10 rounded-xl border border-[#00f5ff]/20">
              <Zap size={24} className="text-[#00f5ff]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">PromptStudio</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to your account</p>
        </div>

        <div className="bg-[#111118] rounded-2xl border border-[#1e1e2e] p-6 shadow-[0_0_60px_rgba(0,245,255,0.05)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={<Mail size={14} />}
              required
            />
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#111118] border border-[#2a2a3e] rounded-lg pl-10 pr-10 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#00f5ff] focus:shadow-[0_0_0_1px_#00f5ff]"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full" loading={loading}>
              Sign In
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-[#1e1e2e] text-center">
            <p className="text-xs text-slate-500">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-[#00f5ff] hover:text-cyan-300 transition-colors">
                Create one
              </Link>
            </p>
          </div>

          <div className="mt-3 p-3 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
            <p className="text-[10px] text-slate-600 text-center mb-1">Demo credentials</p>
            <p className="text-[11px] text-slate-500 text-center font-mono">alex@promptstudio.io / any password</p>
          </div>
        </div>
      </div>
    </div>
  )
}
