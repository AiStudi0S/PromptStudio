'use client'

import { useState } from 'react'
import { User } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { UserPlus, UserCheck, Settings } from 'lucide-react'
import Link from 'next/link'

interface ProfileHeaderProps {
  user: User
  isOwnProfile?: boolean
}

export function ProfileHeader({ user, isOwnProfile = false }: ProfileHeaderProps) {
  const { currentUser, followUser } = useStore()
  const [following, setFollowing] = useState(false)

  const handleFollow = () => {
    followUser(user.id)
    setFollowing(!following)
  }

  const roleColors: Record<string, 'cyan' | 'magenta' | 'yellow' | 'gray'> = {
    admin: 'magenta',
    moderator: 'yellow',
    user: 'gray',
  }

  return (
    <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] overflow-hidden">
      {/* Banner */}
      <div className="h-28 bg-gradient-to-r from-[#00f5ff]/20 via-[#ff00ff]/10 to-[#00ff88]/20 relative">
        <div className="absolute inset-0 cyber-grid opacity-30" />
      </div>

      <div className="px-4 pb-4">
        {/* Avatar */}
        <div className="flex items-end justify-between -mt-8 mb-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#ff00ff] flex items-center justify-center text-2xl font-bold text-[#0a0a0f] border-4 border-[#111118] shadow-[0_0_20px_rgba(0,245,255,0.3)]">
            {user.username[0].toUpperCase()}
          </div>
          {isOwnProfile ? (
            <Link href="/profile/settings">
              <Button variant="secondary" size="sm">
                <Settings size={13} />
                Edit Profile
              </Button>
            </Link>
          ) : (
            <Button
              variant={following ? 'secondary' : 'primary'}
              size="sm"
              onClick={handleFollow}
            >
              {following ? <UserCheck size={13} /> : <UserPlus size={13} />}
              {following ? 'Following' : 'Follow'}
            </Button>
          )}
        </div>

        {/* Info */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-bold text-slate-100 text-lg">@{user.username}</h1>
            <Badge variant={roleColors[user.role] || 'gray'}>{user.role}</Badge>
          </div>
          {user.bio && (
            <p className="text-sm text-slate-400 leading-relaxed">{user.bio}</p>
          )}
          <p className="text-xs text-slate-600 mt-1">Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Prompts', value: formatNumber(user.promptCount) },
            { label: 'Followers', value: formatNumber(user.followers) },
            { label: 'Following', value: formatNumber(user.following) },
          ].map(stat => (
            <div key={stat.label} className="text-center bg-[#0a0a0f] rounded-lg p-2.5 border border-[#1e1e2e]">
              <p className="text-base font-bold text-slate-100">{stat.value}</p>
              <p className="text-[10px] text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
