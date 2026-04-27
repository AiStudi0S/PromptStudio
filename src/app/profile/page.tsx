'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { PromptFeed } from '@/components/profile/PromptFeed'
import { useAuth } from '@/hooks/useAuth'
import { useStore } from '@/lib/store'

export default function ProfilePage() {
  const { currentUser } = useAuth()
  const { prompts } = useStore()

  if (!currentUser) return null

  const myPrompts = prompts.filter(p => p.authorId === currentUser.id)
  const likedPrompts = prompts.filter(p => p.isLiked)
  const soldPrompts = myPrompts.filter(p => p.purchases > 0)

  return (
    <AppLayout title="Profile">
      <div className="max-w-2xl mx-auto space-y-4">
        <ProfileHeader user={currentUser} isOwnProfile />
        <PromptFeed
          prompts={myPrompts}
          likedPrompts={likedPrompts}
          soldPrompts={soldPrompts}
        />
      </div>
    </AppLayout>
  )
}
