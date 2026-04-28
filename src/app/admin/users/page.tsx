'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { UserTable } from '@/components/admin/UserTable'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminUsersPage() {
  return (
    <AppLayout title="User Management">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#16161f] transition-all">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h2 className="text-lg font-bold text-slate-100">User Management</h2>
          <p className="text-sm text-slate-500">Manage roles, ban users, search accounts</p>
        </div>
      </div>
      <UserTable />
    </AppLayout>
  )
}
