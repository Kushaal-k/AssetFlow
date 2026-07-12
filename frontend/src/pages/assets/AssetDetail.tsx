import { useParams, Link } from 'react-router-dom'
import { ROUTES } from '../../constants'

export const AssetDetail = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="text-sm">
          <Link to={ROUTES.ASSETS} className="text-blue-600 hover:underline">
            &larr; Back to Assets
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Asset Details</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Showing item detail for ID: {id}
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase">Asset Name</h4>
            <p className="text-lg font-medium">MacBook Pro M3 Max</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase">Serial Number</h4>
            <p className="text-lg font-medium">C02FX4H9Q05D</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase">Category</h4>
            <p className="text-lg font-medium">Electronics</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase">Status</h4>
            <p className="text-lg font-medium">Allocated</p>
          </div>
        </div>
      </div>
    </div>
  )
}
