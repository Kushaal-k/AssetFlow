import { supabase } from '@/lib/supabase'
import type { Allocation } from '@/types'

export const allocationService = {
  getAll: async (): Promise<Allocation[]> => {
    const { data, error } = await supabase
      .from('allocations')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return (data as Allocation[]) || []
  },

  getByEmployeeId: async (employeeId: string): Promise<Allocation[]> => {
    const { data, error } = await supabase
      .from('allocations')
      .select('*')
      .eq('employeeId', employeeId)
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return (data as Allocation[]) || []
  },

  allocate: async (data: Omit<Allocation, 'id' | 'status'>): Promise<Allocation> => {
    const payload = {
      assetId: data.assetId,
      assetName: data.assetName,
      assetTag: data.assetTag,
      category: data.category,
      employeeId: data.employeeId,
      employeeName: data.employeeName,
      department: data.department,
      allocatedAt: data.allocatedAt,
      dueDate: data.dueDate || null,
      notes: data.notes || null,
      status: 'active',
    }
    const { data: created, error } = await supabase
      .from('allocations')
      .insert([payload])
      .select()
      .single()
    if (error) throw new Error(error.message)
    return created as Allocation
  },

  deallocate: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('allocations')
      .update({ status: 'returned' })
      .eq('id', id)
    if (error) throw new Error(error.message)
  },
}
