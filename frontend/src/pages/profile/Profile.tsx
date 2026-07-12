import { useAuth } from '../../hooks/useAuth'

export const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Manage your personal details and app settings.
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl shadow-sm space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase">Full Name</h4>
          <p className="text-lg font-medium">{user?.full_name || 'N/A'}</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase">Email</h4>
          <p className="text-lg font-medium">{user?.email || 'N/A'}</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase">Current Role</h4>
          <p className="text-lg font-medium capitalize">{user?.role || 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}
