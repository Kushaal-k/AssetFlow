import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react'
import type { User, UserRole } from '../types'

export const useAuth = () => {
  const { isLoaded, isSignedIn, sessionId, signOut } = useClerkAuth()
  const { user: clerkUser } = useUser()

  const user: User | null = clerkUser ? {
    id: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    full_name: clerkUser.fullName || '',
    role: (clerkUser.publicMetadata?.role as UserRole) || 'employee',
    created_at: clerkUser.createdAt ? clerkUser.createdAt.toISOString() : new Date().toISOString()
  } : null

  return {
    user,
    token: sessionId || null,
    isAuthenticated: isLoaded ? !!isSignedIn : false,
    setUser: () => {}, // No-op since Clerk handles state
    setToken: () => {}, // No-op since Clerk handles state
    logout: signOut,
  }
}
