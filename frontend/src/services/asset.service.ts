import { supabase } from '@/lib/supabase'
import type { Asset } from '@/types'

export const assetService = {
  getAll: async (): Promise<Asset[]> => {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return (data as Asset[]) || []
  },

  getById: async (id: string): Promise<Asset | undefined> => {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('id', id)
      .single()
    if (error) return undefined
    return data as Asset
  },

  getAvailable: async (): Promise<Asset[]> => {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return (data as Asset[]) || []
  },

  create: async (data: Omit<Asset, 'id'>): Promise<Asset> => {
    const payload = {
      name: data.name,
      category: data.category,
      serial_number: data.serial_number || data.serial || '',
      status: data.status || 'available',
      department_id: data.department_id || null,
      purchase_date: data.purchase_date || null,
      purchase_price: data.purchase_price || null,
      created_at: data.created_at || new Date().toISOString(),
    }
    const { data: created, error } = await supabase
      .from('assets')
      .insert([payload])
      .select()
      .single()
    if (error) throw new Error(error.message)
    return created as Asset
  },

  update: async (id: string, data: Partial<Asset>): Promise<Asset> => {
    const { data: updated, error } = await supabase
      .from('assets')
      .update(data)
      .eq('id', id)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return updated as Asset
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from('assets').delete().eq('id', id)
    if (error) throw new Error(error.message)
  },
}
