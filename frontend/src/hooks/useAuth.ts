import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  login: (token: string, user: User) => void
  logout: () => void
  initializeAuth: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      login: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      initializeAuth: () => {
        // With Zustand persist, the state is rehydrated automatically from localStorage.
        // If we needed to validate the token on load, we could do it here via API.
      }
    }),
    {
      name: 'assetflow-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
)
