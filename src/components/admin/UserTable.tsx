'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils'
import { User } from '@/lib/types'
import { Search, Ban, ShieldCheck } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

export function UserTable() {
  const { users, banUser, updateUserRole } = useStore()
  const [search, setSearch] = useState('')

  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-[#111118] rounded-xl border border-[#1e1e2e] overflow-hidden">
      <div className="p-4 border-b border-[#1e1e2e] flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-300">Users ({users.length})</h3>
        <div className="w-64">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            icon={<Search size={14} />}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#1e1e2e]">
              {['User', 'Role', 'Prompts', 'Revenue', 'Followers', 'Joined', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr
                key={user.id}
                className={`border-b border-[#1e1e2e]/50 hover:bg-[#16161f]/50 transition-colors ${
                  user.isBanned ? 'opacity-50' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#ff00ff] flex items-center justify-center text-[10px] font-bold text-[#0a0a0f] flex-shrink-0">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-slate-200">@{user.username}</p>
                      <p className="text-[10px] text-slate-600">{user.email}</p>
                    </div>
                    {user.isBanned && (
                      <Badge variant="red">Banned</Badge>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="relative">
                    <select
                      value={user.role}
                      onChange={e => updateUserRole(user.id, e.target.value as User['role'])}
                      className="bg-transparent border-0 text-xs text-slate-400 focus:outline-none cursor-pointer appearance-none pr-4"
                    >
                      {(['user', 'moderator', 'admin'] as const).map(r => (
                        <option key={r} value={r} className="bg-[#111118]">{r}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-400">{user.promptCount}</td>
                <td className="px-4 py-3 text-[#00ff88]">{formatCurrency(user.revenue)}</td>
                <td className="px-4 py-3 text-slate-400">{formatNumber(user.followers)}</td>
                <td className="px-4 py-3 text-slate-600">{formatDate(user.joinedAt)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => banUser(user.id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      user.isBanned
                        ? 'text-[#00ff88] bg-[#00ff88]/10 hover:bg-[#00ff88]/20'
                        : 'text-red-400 bg-red-500/10 hover:bg-red-500/20'
                    }`}
                  >
                    {user.isBanned ? (
                      <><ShieldCheck size={11} /> Unban</>
                    ) : (
                      <><Ban size={11} /> Ban</>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-slate-600 text-sm">No users found.</div>
        )}
      </div>
    </div>
  )
}
