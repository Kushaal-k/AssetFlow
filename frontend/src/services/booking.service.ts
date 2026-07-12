import { supabase } from '@/lib/supabase'
import type { Booking, BookingStatus } from '@/types'

export interface CreateBookingInput {
  asset_id: string
  requested_by: string
  start_date: string
  end_date: string
  reason?: string
}

export interface UpdateBookingInput {
  status?: BookingStatus
  start_date?: string
  end_date?: string
  reason?: string
}

export const bookingService = {
  async getAll(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data ?? []
  },

  async getByUser(userId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('requested_by', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data ?? []
  },

  async getById(id: string): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async create(input: CreateBookingInput): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert({ ...input, status: 'pending' })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, input: UpdateBookingInput): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .update(input)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('bookings').delete().eq('id', id)
    if (error) throw error
  },
}
