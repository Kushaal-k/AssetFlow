import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Box, CheckCircle2, AlertCircle, CalendarClock, Activity } from 'lucide-react'
import { useDashboard } from '../../hooks/api/useDashboard'

export const Dashboard = () => {
  const { data: stats, isLoading, error } = useDashboard()

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Activity className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-rose-500">
        Failed to load dashboard statistics.
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
          Welcome back! Here is a summary of your enterprise resources.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Assets Card */}
        <Card className="border-0 shadow-lg shadow-blue-500/5 dark:shadow-blue-900/10 bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-900 dark:to-slate-900/90 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 dark:border dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Assets
            </CardTitle>
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Box className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalAssets.toLocaleString()}</div>
          </CardContent>
        </Card>

        {/* Allocated Assets Card */}
        <Card className="border-0 shadow-lg shadow-emerald-500/5 dark:shadow-emerald-900/10 bg-gradient-to-br from-white to-emerald-50/50 dark:from-slate-900 dark:to-slate-900/90 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 dark:border dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Allocated Assets
            </CardTitle>
            <div className="h-10 w-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.allocatedAssets.toLocaleString()}</div>
          </CardContent>
        </Card>

        {/* Available Assets Card */}
        <Card className="border-0 shadow-lg shadow-violet-500/5 dark:shadow-violet-900/10 bg-gradient-to-br from-white to-violet-50/50 dark:from-slate-900 dark:to-slate-900/90 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 dark:border dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Available Assets
            </CardTitle>
            <div className="h-10 w-10 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.availableAssets.toLocaleString()}</div>
          </CardContent>
        </Card>

        {/* Maintenance Card */}
        <Card className="border-0 shadow-lg shadow-amber-500/5 dark:shadow-amber-900/10 bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-slate-900/90 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 dark:border dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              In Maintenance
            </CardTitle>
            <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.maintenanceAssets.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Action required / Overdue returns */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-rose-500" />
          Overdue Returns
        </h2>
        <div className="bg-white dark:bg-[#0a0b0f] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          {stats.overdueAllocations.length > 0 ? (
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Asset</th>
                  <th className="px-6 py-4">Assigned To</th>
                  <th className="px-6 py-4">Expected Return</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {stats.overdueAllocations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">
                      <div>{item.assetName}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{item.assetTag}</div>
                    </td>
                    <td className="px-6 py-4">{item.assignedToName || 'Unknown'}</td>
                    <td className="px-6 py-4 font-medium">{new Date(item.expectedReturnDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        Overdue
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              No overdue returns at this time. All good!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
