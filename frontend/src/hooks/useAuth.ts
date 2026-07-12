import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, UserRole } from '../types'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => Promise<void>
  initializeAuth: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      logout: async () => {
        await supabase.auth.signOut()
        set({ user: null, token: null, isAuthenticated: false })
      },
      initializeAuth: () => {
        // Fetch initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            get().setToken(session.access_token)
            // Map Supabase user to local user schema
            get().setUser({
              id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata?.full_name || 'User',
              role: (session.user.user_metadata?.role as UserRole) || 'employee',
              created_at: session.user.created_at
            })
          }
        })

        // Listen for auth changes
        supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            get().setToken(session.access_token)
            get().setUser({
              id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata?.full_name || 'User',
              role: (session.user.user_metadata?.role as UserRole) || 'employee',
              created_at: session.user.created_at
            })
          } else {
            get().setToken(null)
            get().setUser(null)
          }
        })
      }
    }),
    {
      name: 'assetflow-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
)
