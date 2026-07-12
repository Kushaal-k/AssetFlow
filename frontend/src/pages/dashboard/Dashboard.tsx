export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Welcome to the AssetFlow Enterprise Resource dashboard.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Total Assets</h3>
          <p className="text-2xl font-semibold mt-2">1,248</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Allocated Assets</h3>
          <p className="text-2xl font-semibold mt-2">842</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">In Maintenance</h3>
          <p className="text-2xl font-semibold mt-2">12</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Pending Bookings</h3>
          <p className="text-2xl font-semibold mt-2">5</p>
        </div>
      </div>
    </div>
  )
}
