import { supabase } from '@/lib/supabase'
import type { AuditLog, AuditStatus } from '@/types'

export interface CreateAuditInput {
  asset_id: string
  audited_by: string
  notes?: string
}

export interface UpdateAuditInput {
  status?: AuditStatus
  notes?: string
}

export const auditService = {
  async getAll(): Promise<AuditLog[]> {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data ?? []
  },

  async getById(id: string): Promise<AuditLog> {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async create(input: CreateAuditInput): Promise<AuditLog> {
    const { data, error } = await supabase
      .from('audit_logs')
      .insert({ ...input, status: 'pending' })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, input: UpdateAuditInput): Promise<AuditLog> {
    const { data, error } = await supabase
      .from('audit_logs')
      .update(input)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('audit_logs').delete().eq('id', id)
    if (error) throw error
  },
}
