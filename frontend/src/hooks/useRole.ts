import { useAuthStore } from '../store/authStore'
import { ROLES } from '../constants'

export const useRole = () => {
  const user = useAuthStore((state) => state.user)

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
