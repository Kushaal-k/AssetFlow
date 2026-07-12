import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { ROUTES } from '../../constants'

export const Breadcrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  if (location.pathname === ROUTES.DASHBOARD) return null

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
      <Link
        to={ROUTES.DASHBOARD}
        className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        const displayName = value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')

        return (
          <div key={to} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
            {isLast ? (
              <span className="font-semibold text-slate-900 dark:text-white capitalize">
                {displayName}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize"
              >
                {displayName}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
