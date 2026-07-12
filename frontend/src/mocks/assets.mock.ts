import type { AssetStatus } from '@/components/ui/status-badge'

export interface Asset {
  id: string
  name: string
  tag: string
  serial: string
  category: string
  status: AssetStatus
  assigneeId: string | null
  assigneeName: string | null
  department: string | null
  purchaseDate: string
  value: string
  location: string
  notes: string
}

export const mockAssets: Asset[] = [
  { id: '1', name: 'MacBook Pro M3 Max', tag: 'AF-EL-001', serial: 'C02FX4H9Q05D', category: 'Electronics', status: 'allocated', assigneeId: 'u4', assigneeName: 'Rahul Sharma', department: 'Engineering', purchaseDate: '2024-03-15', value: '$3,499', location: 'Mumbai HQ - Floor 3', notes: 'Assigned for remote work setup. Device enrolled in MDM.' },
  { id: '2', name: 'Dell UltraSharp 27"', tag: 'AF-PR-002', serial: 'DEL-U2723DE', category: 'Peripherals', status: 'available', assigneeId: null, assigneeName: null, department: null, purchaseDate: '2023-11-20', value: '$649', location: 'IT Storage Room', notes: '' },
  { id: '3', name: 'HP LaserJet Pro', tag: 'AF-OE-003', serial: 'HP-LJ-3021B', category: 'Office Equipment', status: 'maintenance', assigneeId: null, assigneeName: null, department: null, purchaseDate: '2022-05-10', value: '$320', location: 'HR Department', notes: 'Paper jam issue reported.' },
  { id: '4', name: 'iPhone 15 Pro', tag: 'AF-EL-004', serial: 'DNPX23F9GHR1', category: 'Electronics', status: 'allocated', assigneeId: 'u3', assigneeName: 'Priya Kapoor', department: 'HR', purchaseDate: '2024-01-08', value: '$1,199', location: 'Remote', notes: '' },
  { id: '5', name: 'Ergonomic Chair', tag: 'AF-FU-005', serial: 'CHAIR-ERG-097', category: 'Furniture', status: 'available', assigneeId: null, assigneeName: null, department: null, purchaseDate: '2023-06-01', value: '$450', location: 'Office Floor 2', notes: '' },
  { id: '6', name: 'Sony WH-1000XM5', tag: 'AF-PR-006', serial: 'SNY-WH-X5-203', category: 'Peripherals', status: 'reserved', assigneeId: null, assigneeName: null, department: null, purchaseDate: '2024-02-14', value: '$350', location: 'IT Storage Room', notes: 'Reserved for Q3 onboarding batch.' },
  { id: '7', name: 'Surface Pro 9', tag: 'AF-EL-007', serial: 'MS-SP9-7812', category: 'Electronics', status: 'retired', assigneeId: null, assigneeName: null, department: null, purchaseDate: '2020-09-10', value: '$1,299', location: 'Archive', notes: 'End of life. Decommissioned.' },
]
