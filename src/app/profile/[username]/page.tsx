'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { PromptFeed } from '@/components/profile/PromptFeed'
import { useStore } from '@/lib/store'

export default function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params)
  const { users, prompts, currentUser } = useStore()

  const user = users.find(u => u.username === username)
  if (!user) return notFound()

  const isOwn = currentUser?.id === user.id
  const userPrompts = prompts.filter(p => p.authorId === user.id && p.visibility === 'public')

  return (
    <AppLayout title={`@${user.username}`}>
      <div className="max-w-2xl mx-auto space-y-4">
        <ProfileHeader user={user} isOwnProfile={isOwn} />
        <PromptFeed prompts={userPrompts} />
      </div>
    </AppLayout>
  )
}
