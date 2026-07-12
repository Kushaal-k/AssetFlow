import { supabase } from '../lib/supabase'
import type { User, UserRole } from '../types'

export const authService = {
  /**
   * Log in with email and password
   */
  async login(email: string, password: string) {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      throw new Error(authError.message)
    }

    // Fetch user profile info from users table
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    // Fallback if profiles table is not set up yet
    const resolvedUser: User = {
      id: authData.user.id,
      email: authData.user.email || email,
      full_name: profile?.full_name || 'Enterprise User',
      role: (profile?.role as UserRole) || 'employee',
      department_id: profile?.department_id,
      avatar_url: profile?.avatar_url,
      created_at: profile?.created_at || new Date().toISOString(),
    }

    return {
      user: resolvedUser,
      session: authData.session,
    }
  },

  /**
   * Sign up a new user (creates Employee account by default)
   */
  async signup(email: string, password: string, fullName: string) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      throw new Error(authError.message)
    }

    if (!authData.user) {
      throw new Error('Verification email sent or user could not be created.')
    }

    // Insert user into users profiles database table
    const { error: profileError } = await supabase.from('users').insert([
      {
        id: authData.user.id,
        email,
        full_name: fullName,
        role: 'employee', // Default signup is always employee
        created_at: new Date().toISOString(),
      },
    ])

    if (profileError) {
      throw new Error(profileError.message)
    }

    return {
      user: authData.user,
    }
  },

  /**
   * Log out current session
   */
  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
  },

  /**
   * Retrieve active session user details
   */
  async getCurrentUser() {
    const { data: { user }, error: sessionError } = await supabase.auth.getUser()
    
    if (sessionError || !user) return null

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    const resolvedUser: User = {
      id: user.id,
      email: user.email || '',
      full_name: profile?.full_name || 'Enterprise User',
      role: (profile?.role as UserRole) || 'employee',
      department_id: profile?.department_id,
      avatar_url: profile?.avatar_url,
      created_at: profile?.created_at || new Date().toISOString(),
    }

    return resolvedUser
  },
}
