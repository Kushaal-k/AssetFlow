import { Navigate, Outlet } from 'react-router-dom'
import { useRole } from '../hooks/useRole'
import { ROUTES } from '../constants'

interface RoleRouteProps {
  allowedRoles: string[]
}

export const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const { hasRole, role } = useRole()

  if (!role) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (!hasRole(allowedRoles)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />
  }

  return <Outlet />
}
