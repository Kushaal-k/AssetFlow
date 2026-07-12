import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'

export interface OverdueAllocation {
  id: string
  assetId: string
  assetName: string
  assetTag: string
  assignedToId?: string | null
  assignedToName?: string | null
  expectedReturnDate: string
}

export interface DashboardStats {
  totalAssets: number
  availableAssets: number
  allocatedAssets: number
  maintenanceAssets: number
  lostAssets: number
  overdueAllocations: OverdueAllocation[]
}

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await api.get<DashboardStats>('/dashboard')
      return data
    },
  })
}
