import { ROUTES } from '../constants'

export const publicRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP]

export const routeRoleMap = {
  [ROUTES.ORGANIZATION]: ['admin'],
  [ROUTES.EMPLOYEES]: ['admin'],
  [ROUTES.AUDIT]: ['admin'],
  [ROUTES.REPORTS]: ['admin', 'department_head'],
  [ROUTES.DEPARTMENTS]: ['admin', 'department_head'],
  [ROUTES.MAINTENANCE]: ['asset_manager', 'employee'],
  [ROUTES.BOOKING]: ['asset_manager', 'department_head', 'employee'],
} as const
