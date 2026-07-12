import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { ROUTES } from '../../constants'

export const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
      <ShieldAlert className="h-16 w-16 text-rose-500 animate-pulse" />
      <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-md">
        You do not have the permissions required to access this resource. Please contact your administrator.
      </p>
      <Link
        to={ROUTES.DASHBOARD}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/20"
      >
        Go to Dashboard
      </Link>
    </div>
  )
}
