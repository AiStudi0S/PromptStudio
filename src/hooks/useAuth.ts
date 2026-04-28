'use client'

import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const { currentUser, isAuthenticated, login, register, logout } = useStore()
  const router = useRouter()

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password)
    if (success) {
      router.push('/dashboard')
    }
    return success
  }

  const handleRegister = async (username: string, email: string, password: string) => {
    const success = await register(username, email, password)
    if (success) {
      router.push('/dashboard')
    }
    return success
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return {
    currentUser,
    isAuthenticated,
    isAdmin: currentUser?.role === 'admin',
    isModerator: currentUser?.role === 'admin' || currentUser?.role === 'moderator',
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  }
}
