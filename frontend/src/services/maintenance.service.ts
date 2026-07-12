import { supabase } from '@/lib/supabase'
import type { MaintenanceRequest, MaintenanceStatus } from '@/types'

export interface CreateMaintenanceInput {
  asset_id: string
  raised_by: string
  description: string
}

export interface UpdateMaintenanceInput {
  status?: MaintenanceStatus
  description?: string
  resolved_at?: string
}

export const maintenanceService = {
  async getAll(): Promise<MaintenanceRequest[]> {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data ?? []
  },

  async getByUser(userId: string): Promise<MaintenanceRequest[]> {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*')
      .eq('raised_by', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data ?? []
  },

  async getById(id: string): Promise<MaintenanceRequest> {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async create(input: CreateMaintenanceInput): Promise<MaintenanceRequest> {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .insert({ ...input, status: 'open' })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, input: UpdateMaintenanceInput): Promise<MaintenanceRequest> {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .update(input)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('maintenance_requests').delete().eq('id', id)
    if (error) throw error
  },
}
