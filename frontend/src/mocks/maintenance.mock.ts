import type { MaintenanceStatus } from '@/components/ui/status-badge'

export interface MaintenanceRequest {
  id: string
  assetId: string
  assetName: string
  assetTag: string
  reportedById: string
  reportedByName: string
  assignedToId: string | null
  assignedToName: string | null
  issue: string
  status: MaintenanceStatus
  priority: 'low' | 'medium' | 'high' | 'critical'
  createdAt: string
  resolvedAt: string | null
}

export const mockMaintenanceRequests: MaintenanceRequest[] = [
  { id: 'mt1', assetId: '3', assetName: 'HP LaserJet Pro', assetTag: 'AF-OE-003', reportedById: 'u3', reportedByName: 'Priya Kapoor', assignedToId: 'u2', assignedToName: 'Kushaal', issue: 'Persistent paper jam on tray 2, roller might need replacement.', status: 'in_progress', priority: 'high', createdAt: '2026-07-08', resolvedAt: null },
  { id: 'mt2', assetId: '2', assetName: 'Dell UltraSharp 27"', assetTag: 'AF-PR-002', reportedById: 'u4', reportedByName: 'Rahul Sharma', assignedToId: null, assignedToName: null, issue: 'Monitor flickering intermittently at 144Hz refresh rate.', status: 'open', priority: 'medium', createdAt: '2026-07-10', resolvedAt: null },
  { id: 'mt3', assetId: '1', assetName: 'MacBook Pro M3 Max', assetTag: 'AF-EL-001', reportedById: 'u4', reportedByName: 'Rahul Sharma', assignedToId: 'u2', assignedToName: 'Kushaal', issue: 'Battery draining abnormally fast. Needed replacement.', status: 'resolved', priority: 'critical', createdAt: '2026-06-28', resolvedAt: '2026-07-05' },
]
