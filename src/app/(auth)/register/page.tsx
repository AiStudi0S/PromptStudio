'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Mail, Lock, User } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function RegisterPage() {
  const { register } = useAuth()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    setError('')
    await register(form.username, form.email, form.password)
    setLoading(false)
  }

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: e.target.value })

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 cyber-grid">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="p-2 bg-[#00f5ff]/10 rounded-xl border border-[#00f5ff]/20">
              <Zap size={24} className="text-[#00f5ff]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">Create Account</h1>
          <p className="text-sm text-slate-500 mt-1">Join the PromptStudio community</p>
        </div>

        <div className="bg-[#111118] rounded-2xl border border-[#1e1e2e] p-6 shadow-[0_0_60px_rgba(0,245,255,0.05)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              value={form.username}
              onChange={update('username')}
              placeholder="coolpromptdev"
              icon={<User size={14} />}
              required
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={update('email')}
              placeholder="you@example.com"
              icon={<Mail size={14} />}
              required
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={update('password')}
              placeholder="Min. 8 characters"
              icon={<Lock size={14} />}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              value={form.confirm}
              onChange={update('confirm')}
              placeholder="Repeat password"
              icon={<Lock size={14} />}
              required
            />

            {error && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full" loading={loading}>
              Create Account
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-[#1e1e2e] text-center">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="text-[#00f5ff] hover:text-cyan-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <p className="mt-3 text-[10px] text-slate-600 text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
