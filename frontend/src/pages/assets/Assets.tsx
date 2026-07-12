import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants'

export const Assets = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage organization resources and assets inventory.
          </p>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl shadow-sm">
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          Detailed asset list will appear here once components are ready.
        </p>
        <Link
          to={`${ROUTES.ASSETS}/mock-id`}
          className="text-blue-600 hover:underline font-medium"
        >
          View Demo Asset Details &rarr;
        </Link>
      </div>
    </div>
  )
}
