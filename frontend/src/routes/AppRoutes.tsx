import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES, ROLES } from '../constants'

// Layouts
import { AuthLayout } from '../layouts/AuthLayout'
import { MainLayout } from '../layouts/MainLayout'

// Guards
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { RoleRoute } from './RoleRoute'

// Dev 1 Pages
import { Login } from '../pages/auth/Login'
import { Signup } from '../pages/auth/Signup'
import { Unauthorized } from '../pages/auth/Unauthorized'
import { Dashboard } from '../pages/dashboard/Dashboard'
import { Assets } from '../pages/assets/Assets'
import { AssetDetail } from '../pages/assets/AssetDetail'
import { Employees } from '../pages/employees/Employees'
import { Organization } from '../pages/organization/Organization'
import { Departments } from '../pages/departments/Departments'
import { Profile } from '../pages/profile/Profile'

// Sukanshi Page Placeholders
import {
  DepartmentDetailPlaceholder,
  BookingPlaceholder,
  MaintenancePlaceholder,
  ReportsPlaceholder,
  NotificationsPlaceholder,
  AuditPlaceholder,
} from '../pages/placeholder'

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Redirect */}
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      {/* Guest Only Routes (Login/Signup) */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Dashboard - Accessible to all roles */}
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          
          {/* Profile - Accessible to all roles */}
          <Route path={ROUTES.PROFILE} element={<Profile />} />

          {/* Notifications - Accessible to all roles */}
          <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPlaceholder />} />

          {/* Unauthorized Page */}
          <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />

          {/* Admin-only Routes */}
          <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path={ROUTES.ORGANIZATION} element={<Organization />} />
            <Route path={ROUTES.EMPLOYEES} element={<Employees />} />
            <Route path={ROUTES.AUDIT} element={<AuditPlaceholder />} />
          </Route>

          {/* Admin & Department Head Routes */}
          <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.DEPARTMENT_HEAD]} />}>
            <Route path={ROUTES.DEPARTMENTS} element={<Departments />} />
            <Route path={ROUTES.DEPARTMENTS + '/:id'} element={<DepartmentDetailPlaceholder />} />
            <Route path={ROUTES.REPORTS} element={<ReportsPlaceholder />} />
          </Route>

          {/* Asset Manager, Department Head, Employee Routes */}
          <Route element={<RoleRoute allowedRoles={[ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD, ROLES.EMPLOYEE, ROLES.ADMIN]} />}>
            <Route path={ROUTES.BOOKING} element={<BookingPlaceholder />} />
          </Route>

          {/* Asset Manager & Employee Routes */}
          <Route element={<RoleRoute allowedRoles={[ROLES.ASSET_MANAGER, ROLES.EMPLOYEE, ROLES.ADMIN]} />}>
            <Route path={ROUTES.MAINTENANCE} element={<MaintenancePlaceholder />} />
          </Route>

          {/* Assets - Shared view with detail path */}
          <Route path={ROUTES.ASSETS} element={<Assets />} />
          <Route path={ROUTES.ASSETS + '/:id'} element={<AssetDetail />} />
        </Route>
      </Route>

      {/* Fallback to Dashboard */}
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  )
}
