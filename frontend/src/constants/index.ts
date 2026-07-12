export const ROLES = {
  ADMIN: 'admin',
  ASSET_MANAGER: 'asset_manager',
  DEPARTMENT_HEAD: 'department_head',
  EMPLOYEE: 'employee',
} as const

export const ASSET_STATUS = {
  AVAILABLE: 'available',
  ALLOCATED: 'allocated',
  RESERVED: 'reserved',
  MAINTENANCE: 'maintenance',
  LOST: 'lost',
  RETIRED: 'retired',
} as const

export const BOOKING_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
} as const

export const MAINTENANCE_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
} as const

export const AUDIT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  ORGANIZATION: '/organization',
  DEPARTMENTS: '/departments',
  EMPLOYEES: '/employees',
  ASSETS: '/assets',
  BOOKING: '/booking',
  MAINTENANCE: '/maintenance',
  AUDIT: '/audit',
  REPORTS: '/reports',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
  UNAUTHORIZED: '/unauthorized',
} as const
