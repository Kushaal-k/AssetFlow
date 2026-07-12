import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import type { Category, Department } from './useAssets'

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get<Category[]>('/categories')
      return data
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}

export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data } = await api.get<Department[]>('/departments')
      return data
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}
