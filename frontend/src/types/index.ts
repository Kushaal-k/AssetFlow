export type UserRole = 'ADMIN' | 'ASSET_MANAGER' | 'DEPT_HEAD' | 'EMPLOYEE'

export interface Allocation {
  id: string
  assetId: string
  employeeId: string
  allocatedAt: string
  dueDate?: string
  status: 'active' | 'returned'
  notes?: string
  // Aliases for frontend mocks
  assetName?: string
  assetTag?: string
  category?: string
  employeeName?: string
  department?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
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
  // Aliases for frontend mocks
  tag?: string
  serial?: string
  assigneeId?: string
  assigneeName?: string
  departmentName?: string
}

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'completed'

export interface Booking {
  id: string
  asset_id: string
  requested_by: string
  start_date: string
  startDate?: string // Alias for frontend usage
  end_date: string
  status: BookingStatus
  reason?: string
  created_at: string
  // Joined properties from backend
  assetName?: string
  assetTag?: string
  employeeName?: string
  department?: string
  assetId?: string
  employeeId?: string
  endDate?: string
  purpose?: string
}

export type MaintenanceStatus = 'open' | 'in_progress' | 'resolved' | 'closed'

export interface MaintenanceRequest {
  id: string
  asset_id: string
  raised_by: string
  description: string
  issue?: string // Alias for description used in dashboard
  status: MaintenanceStatus
  resolved_at?: string
  created_at: string
  createdAt?: string // Alias for frontend usage
  // Joined properties from backend
  assetName?: string
  assetTag?: string
  reportedById?: string
  assetId?: string
  reportedByName?: string
  assignedToId?: string
  assignedToName?: string
  priority?: string
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
