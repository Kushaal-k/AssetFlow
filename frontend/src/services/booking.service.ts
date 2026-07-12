import { supabase } from '@/lib/supabase'
import type { Booking } from '@/types'

export const bookingService = {
  getAll: async (): Promise<Booking[]> => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return (data as Booking[]) || []
  },

  create: async (data: Omit<Booking, 'id' | 'status'>): Promise<Booking> => {
    const { data: created, error } = await supabase
      .from('bookings')
      .insert([{ ...data, status: 'pending' }])
      .select()
      .single()
    if (error) throw new Error(error.message)
    return created as Booking
  },

  updateStatus: async (id: string, status: string): Promise<void> => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
    if (error) throw new Error(error.message)
  },

  cancel: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'rejected' })
      .eq('id', id)
    if (error) throw new Error(error.message)
  },
}
