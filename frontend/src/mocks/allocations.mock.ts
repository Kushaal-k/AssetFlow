import type { AssetStatus } from '@/components/ui/status-badge'

export interface Allocation {
  id: string
  assetId: string
  assetName: string
  assetTag: string
  category: string
  employeeId: string
  employeeName: string
  department: string
  allocatedAt: string
  dueDate: string | null
  status: AssetStatus
  notes: string
}

export const mockAllocations: Allocation[] = [
  { id: 'al1', assetId: '1', assetName: 'MacBook Pro M3 Max', assetTag: 'AF-EL-001', category: 'Electronics', employeeId: 'u4', employeeName: 'Rahul Sharma', department: 'Engineering', allocatedAt: '2024-03-16', dueDate: null, status: 'allocated', notes: 'Primary work device.' },
  { id: 'al2', assetId: '4', assetName: 'iPhone 15 Pro', assetTag: 'AF-EL-004', category: 'Electronics', employeeId: 'u3', employeeName: 'Priya Kapoor', department: 'HR', allocatedAt: '2024-01-09', dueDate: null, status: 'allocated', notes: '' },
]
