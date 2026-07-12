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
    staleTime: 60 * 60 * 1000 // 1 hour
  })
}

export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data } = await api.get<Department[]>('/departments')
      return data
    },
    staleTime: 60 * 60 * 1000 // 1 hour
  })
}
