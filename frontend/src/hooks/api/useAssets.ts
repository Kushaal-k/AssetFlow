import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'

export interface Category {
  id: string
  name: string
}

export interface Department {
  id: string
  name: string
}

export interface Asset {
  id: string
  name: string
  tag: string
  serialNumber: string | null
  categoryId: string
  departmentId: string | null
  status: string
  condition: string
  isBookable: boolean
  createdAt: string
  category: Category
  department: Department | null
}

export interface FetchAssetsQuery {
  search?: string
  categoryId?: string
  departmentId?: string
  status?: string
}

export interface CreateAssetInput {
  name: string
  categoryId: string
  departmentId?: string
  serialNumber?: string
  condition?: string
  isBookable?: boolean
}

export const useAssets = (query: FetchAssetsQuery = {}) => {
  return useQuery({
    queryKey: ['assets', query],
    queryFn: async () => {
      const { data } = await api.get<Asset[]>('/assets', { params: query })
      return data
    },
  })
}

export const useCreateAsset = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateAssetInput) => {
      const { data } = await api.post<Asset>('/assets', input)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    }
  })
}
