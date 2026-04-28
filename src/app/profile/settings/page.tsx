'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function ProfileSettingsPage() {
  const { currentUser } = useStore()
  const [form, setForm] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
  })
  const [saved, setSaved] = useState(false)

  if (!currentUser) return null

  const handleSave = () => {
    // In a real app this would call an API to persist the changes
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AppLayout title="Profile Settings">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/profile" className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#16161f] transition-all">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h2 className="text-lg font-bold text-slate-100">Profile Settings</h2>
          <p className="text-sm text-slate-500">Update your public profile information</p>
        </div>
      </div>

      <div className="max-w-lg space-y-4">
        <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] p-4 space-y-4">
          <Input
            label="Username"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            placeholder="your_username"
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
          />
          <Textarea
            label="Bio"
            value={form.bio}
            onChange={e => setForm({ ...form, bio: e.target.value })}
            placeholder="Tell the world about yourself..."
          />
        </div>

        <Button variant="primary" className="w-full" onClick={handleSave}>
          <Save size={14} />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </AppLayout>
  )
}
