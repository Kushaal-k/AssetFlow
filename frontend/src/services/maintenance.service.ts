import { supabase } from '@/lib/supabase'
import type { MaintenanceRequest } from '@/types'

export const maintenanceService = {
  getAll: async (): Promise<MaintenanceRequest[]> => {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return (data as MaintenanceRequest[]) || []
  },

  create: async (data: Omit<MaintenanceRequest, 'id' | 'status' | 'resolved_at'>): Promise<MaintenanceRequest> => {
    const { data: created, error } = await supabase
      .from('maintenance_requests')
      .insert([{ ...data, status: 'open' }])
      .select()
      .single()
    if (error) throw new Error(error.message)
    return created as MaintenanceRequest
  },

  updateStatus: async (id: string, status: string): Promise<void> => {
    const { error } = await supabase
      .from('maintenance_requests')
      .update({ status })
      .eq('id', id)
    if (error) throw new Error(error.message)
  },

  approve: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('maintenance_requests')
      .update({ status: 'in_progress' })
      .eq('id', id)
    if (error) throw new Error(error.message)
  },

  resolve: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('maintenance_requests')
      .update({ status: 'resolved', resolved_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw new Error(error.message)
  },

  close: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('maintenance_requests')
      .update({ status: 'closed' })
      .eq('id', id)
    if (error) throw new Error(error.message)
  },
}
