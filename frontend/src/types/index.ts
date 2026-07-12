export type UserRole = 'admin' | 'asset_manager' | 'department_head' | 'employee'

export interface User {
  id: string
  email: string
  full_name?: string
  role: UserRole
  department_id?: string
  avatar_url?: string
  created_at: string
}

export interface Department {
  id: string
  name: string
  description?: string
  head_id?: string
  created_at: string
}

export type AssetStatus = 'available' | 'allocated' | 'reserved' | 'maintenance' | 'lost' | 'retired'

export interface Asset {
  id: string
  name: string
  category: string
  serial_number: string
  status: AssetStatus
  department_id?: string
  assigned_to?: string
  purchase_date?: string
  purchase_price?: number
  created_at: string
}

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'completed'

export interface Booking {
  id: string
  asset_id: string
  requested_by: string
  start_date: string
  end_date: string
  status: BookingStatus
  reason?: string
  created_at: string
}

export type MaintenanceStatus = 'open' | 'in_progress' | 'resolved' | 'closed'

export interface MaintenanceRequest {
  id: string
  asset_id: string
  raised_by: string
  description: string
  status: MaintenanceStatus
  resolved_at?: string
  created_at: string
}

export type AuditStatus = 'pending' | 'completed' | 'failed'

export interface AuditLog {
  id: string
  asset_id: string
  audited_by: string
  status: AuditStatus
  notes?: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  is_read: boolean
  created_at: string
}
