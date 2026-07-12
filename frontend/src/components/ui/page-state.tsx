import { Loader2, PackageSearch, AlertTriangle } from 'lucide-react'

interface LoadingStateProps {
  message?: string
}
export const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => (
  <div className="flex flex-col items-center justify-center h-48 gap-3 text-slate-400">
    <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
    <p className="text-sm font-medium">{message}</p>
  </div>
)

interface EmptyStateProps {
  title?: string
  description?: string
  action?: React.ReactNode
}
export const EmptyState = ({ title = 'No results found', description = 'Nothing to show yet.', action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center h-48 gap-3 text-center px-4">
    <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
      <PackageSearch className="h-7 w-7 text-slate-400" />
    </div>
    <div>
      <p className="font-bold text-slate-700 dark:text-slate-300">{title}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
    </div>
    {action}
  </div>
)

interface ErrorStateProps {
  message?: string
  retry?: () => void
}
export const ErrorState = ({ message = 'Something went wrong.', retry }: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center h-48 gap-3 text-center px-4">
    <div className="h-14 w-14 rounded-2xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
      <AlertTriangle className="h-7 w-7 text-rose-500" />
    </div>
    <div>
      <p className="font-bold text-rose-600 dark:text-rose-400">Error</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{message}</p>
    </div>
    {retry && (
      <button
        onClick={retry}
        className="text-xs font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
      >
        Try again
      </button>
    )}
  </div>
)
