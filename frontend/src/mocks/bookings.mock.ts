import type { BookingStatus } from '@/components/ui/status-badge'

export interface Booking {
  id: string
  assetId: string
  assetName: string
  assetTag: string
  employeeId: string
  employeeName: string
  department: string
  startDate: string
  endDate: string
  purpose: string
  status: BookingStatus
}

export const mockBookings: Booking[] = [
  { id: 'bk1', assetId: '6', assetName: 'Sony WH-1000XM5', assetTag: 'AF-PR-006', employeeId: 'u3', employeeName: 'Priya Kapoor', department: 'HR', startDate: '2026-07-15', endDate: '2026-07-17', purpose: 'Team offsite recording', status: 'approved' },
  { id: 'bk2', assetId: '2', assetName: 'Dell UltraSharp 27"', assetTag: 'AF-PR-002', employeeId: 'u4', employeeName: 'Rahul Sharma', department: 'Engineering', startDate: '2026-07-20', endDate: '2026-07-22', purpose: 'Presentation at client site', status: 'pending' },
  { id: 'bk3', assetId: '5', assetName: 'Ergonomic Chair', assetTag: 'AF-FU-005', employeeId: 'u3', employeeName: 'Priya Kapoor', department: 'HR', startDate: '2026-07-10', endDate: '2026-07-12', purpose: 'Physiotherapy consultation setup', status: 'completed' },
]
