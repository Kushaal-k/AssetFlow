import { useAuth } from './useAuth'
import { ROLES } from '../constants'

export const useRole = () => {
  const { user } = useAuth()

  return {
    role: user?.role || null,
    isAdmin: user?.role === ROLES.ADMIN,
    isAssetManager: user?.role === ROLES.ASSET_MANAGER,
    isDepartmentHead: user?.role === ROLES.DEPARTMENT_HEAD,
    isEmployee: user?.role === ROLES.EMPLOYEE,
    hasRole: (allowedRoles: string[]) => {
      if (!user?.role) return false
      return allowedRoles.includes(user.role)
    },
  }
}
