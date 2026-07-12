import { cn } from '@/lib/utils'

export type AssetStatus = 'available' | 'allocated' | 'reserved' | 'maintenance' | 'lost' | 'retired'
export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'completed'
export type MaintenanceStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type AuditStatus = 'pending' | 'verified' | 'missing' | 'damaged'

type StatusVariant = AssetStatus | BookingStatus | MaintenanceStatus | AuditStatus

const variantMap: Record<string, string> = {
  // Asset
  available:   'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  allocated:   'bg-blue-500/15 text-blue-400 border border-blue-500/25',
  reserved:    'bg-violet-500/15 text-violet-400 border border-violet-500/25',
  maintenance: 'bg-rose-500/15 text-rose-400 border border-rose-500/25',
  lost:        'bg-red-600/15 text-red-400 border border-red-600/25',
  retired:     'bg-slate-500/15 text-slate-400 border border-slate-500/25',
  // Booking
  pending:     'bg-amber-500/15 text-amber-400 border border-amber-500/25',
  approved:    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  rejected:    'bg-rose-500/15 text-rose-400 border border-rose-500/25',
  completed:   'bg-slate-500/15 text-slate-400 border border-slate-500/25',
  // Maintenance
  open:        'bg-amber-500/15 text-amber-400 border border-amber-500/25',
  in_progress: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
  resolved:    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  closed:      'bg-slate-500/15 text-slate-400 border border-slate-500/25',
  // Audit
  verified:    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  missing:     'bg-red-600/15 text-red-400 border border-red-600/25',
  damaged:     'bg-rose-500/15 text-rose-400 border border-rose-500/25',
}

const labelMap: Record<string, string> = {
  available:   'Available',
  allocated:   'Allocated',
  reserved:    'Reserved',
  maintenance: 'Maintenance',
  lost:        'Lost',
  retired:     'Retired',
  pending:     'Pending',
  approved:    'Approved',
  rejected:    'Rejected',
  completed:   'Completed',
  open:        'Open',
  in_progress: 'In Progress',
  resolved:    'Resolved',
  closed:      'Closed',
  verified:    'Verified',
  missing:     'Missing',
  damaged:     'Damaged',
}

interface StatusBadgeProps {
  status: StatusVariant
  className?: string
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const classes = variantMap[status] ?? 'bg-slate-500/15 text-slate-400 border border-slate-500/25'
  const label = labelMap[status] ?? status
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold', classes, className)}>
      {label}
    </span>
  )
}
