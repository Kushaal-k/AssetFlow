import type { AuditStatus } from '@/components/ui/status-badge'

export interface AuditItem {
  id: string
  assetId: string
  assetName: string
  assetTag: string
  category: string
  location: string
  lastVerifiedAt: string | null
  verifiedById: string | null
  verifiedByName: string | null
  status: AuditStatus
  notes: string
}

export const mockAuditItems: AuditItem[] = [
  { id: 'au1', assetId: '1', assetName: 'MacBook Pro M3 Max', assetTag: 'AF-EL-001', category: 'Electronics', location: 'Mumbai HQ - Floor 3', lastVerifiedAt: null, verifiedById: null, verifiedByName: null, status: 'pending', notes: '' },
  { id: 'au2', assetId: '2', assetName: 'Dell UltraSharp 27"', assetTag: 'AF-PR-002', category: 'Peripherals', location: 'IT Storage Room', lastVerifiedAt: '2026-07-10', verifiedById: 'u2', verifiedByName: 'Kushaal', status: 'verified', notes: 'Physically present and in good condition.' },
  { id: 'au3', assetId: '3', assetName: 'HP LaserJet Pro', assetTag: 'AF-OE-003', category: 'Office Equipment', location: 'HR Department', lastVerifiedAt: '2026-07-10', verifiedById: 'u2', verifiedByName: 'Kushaal', status: 'damaged', notes: 'Paper tray cracked. Maintenance ticket raised.' },
  { id: 'au4', assetId: '5', assetName: 'Ergonomic Chair', assetTag: 'AF-FU-005', category: 'Furniture', location: 'Office Floor 2', lastVerifiedAt: null, verifiedById: null, verifiedByName: null, status: 'missing', notes: 'Not found at registered location.' },
  { id: 'au5', assetId: '6', assetName: 'Sony WH-1000XM5', assetTag: 'AF-PR-006', category: 'Peripherals', location: 'IT Storage Room', lastVerifiedAt: null, verifiedById: null, verifiedByName: null, status: 'pending', notes: '' },
]
