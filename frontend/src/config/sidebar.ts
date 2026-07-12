import {
  LayoutDashboard,
  Building2,
  Users,
  Package,
  Calendar,
  Wrench,
  FileSpreadsheet,
  Bell,
  ClipboardList,
  User,
} from 'lucide-react'
import { ROUTES, ROLES } from '../constants'

export interface SidebarItem {
  title: string
  path: string
  icon: React.ComponentType<{ className?: string }>
  roles: string[]
}

export const sidebarConfig: SidebarItem[] = [
  {
    title: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD, ROLES.EMPLOYEE],
  },
  {
    title: 'Organization',
    path: ROUTES.ORGANIZATION,
    icon: Building2,
    roles: [ROLES.ADMIN],
  },
  {
    title: 'Departments',
    path: ROUTES.DEPARTMENTS,
    icon: Building2,
    roles: [ROLES.ADMIN, ROLES.DEPARTMENT_HEAD],
  },
  {
    title: 'Employees',
    path: ROUTES.EMPLOYEES,
    icon: Users,
    roles: [ROLES.ADMIN],
  },
  {
    title: 'Assets',
    path: ROUTES.ASSETS,
    icon: Package,
    roles: [ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD, ROLES.EMPLOYEE],
  },
  {
    title: 'Booking Calendar',
    path: ROUTES.BOOKING,
    icon: Calendar,
    roles: [ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD, ROLES.EMPLOYEE],
  },
  {
    title: 'Maintenance',
    path: ROUTES.MAINTENANCE,
    icon: Wrench,
    roles: [ROLES.ASSET_MANAGER, ROLES.EMPLOYEE],
  },
  {
    title: 'Audit Logs',
    path: ROUTES.AUDIT,
    icon: ClipboardList,
    roles: [ROLES.ADMIN],
  },
  {
    title: 'Reports',
    path: ROUTES.REPORTS,
    icon: FileSpreadsheet,
    roles: [ROLES.ADMIN, ROLES.DEPARTMENT_HEAD],
  },
  {
    title: 'Notifications',
    path: ROUTES.NOTIFICATIONS,
    icon: Bell,
    roles: [ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD, ROLES.EMPLOYEE],
  },
  {
    title: 'Profile',
    path: ROUTES.PROFILE,
    icon: User,
    roles: [ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD, ROLES.EMPLOYEE],
  },
]
