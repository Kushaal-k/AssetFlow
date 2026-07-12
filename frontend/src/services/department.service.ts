import { supabase } from '@/lib/supabase'
import type { Department } from '@/types'

export interface CreateDepartmentInput {
  name: string
  description?: string
  head_id?: string
}

export interface UpdateDepartmentInput {
  name?: string
  description?: string
  head_id?: string
}

export const departmentService = {
  async getAll(): Promise<Department[]> {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data ?? []
  },

  async getById(id: string): Promise<Department> {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async create(input: CreateDepartmentInput): Promise<Department> {
    const { data, error } = await supabase
      .from('departments')
      .insert(input)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, input: UpdateDepartmentInput): Promise<Department> {
    const { data, error } = await supabase
      .from('departments')
      .update(input)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('departments').delete().eq('id', id)
    if (error) throw error
  },
}
