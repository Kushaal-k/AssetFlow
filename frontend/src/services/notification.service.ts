import { supabase } from '@/lib/supabase'
import type { Notification } from '@/types'

export const notificationService = {
  async getByUser(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data ?? []
  },

  async markAsRead(id: string): Promise<Notification> {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async markAllAsRead(userId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false)

    if (error) throw error
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('notifications').delete().eq('id', id)
    if (error) throw error
  },
}
