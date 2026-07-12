import { useState, useEffect } from 'react'
import { assetService } from '@/services/asset.service'
import { bookingService } from '@/services/booking.service'
import { maintenanceService } from '@/services/maintenance.service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { LoadingState, ErrorState } from '@/components/ui/page-state'
import { Box, CheckCircle2, AlertCircle, CalendarClock, BarChart3, RefreshCw } from 'lucide-react'

export const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    allocated: 0,
    maintenance: 0,
    pendingBookings: 0,
  })
  const [recentActivities, setRecentActivities] = useState<any[]>([])
  const [distribution, setDistribution] = useState<{ name: string; count: number; percentage: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadDashboardData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [assets, bookings, maintenance] = await Promise.all([
        assetService.getAll(),
        bookingService.getAll(),
        maintenanceService.getAll(),
      ])

      // Totals
      const total = assets.length
      const allocated = assets.filter((a) => a.status === 'allocated').length
      const inMaintenance = assets.filter((a) => a.status === 'maintenance').length
      const pendingBookings = bookings.filter((b) => b.status === 'pending').length

      setStats({
        total,
        allocated,
        maintenance: inMaintenance,
        pendingBookings,
      })

      // Category Distribution
      const categories = assets.reduce((acc: Record<string, number>, asset) => {
        acc[asset.category] = (acc[asset.category] || 0) + 1
        return acc
      }, {})

      const distData = Object.entries(categories).map(([name, count]) => ({
        name,
        count,
        percentage: total ? Math.round((count / total) * 100) : 0,
      }))
      setDistribution(distData)

      // Recent Activity Combine
      const activities: any[] = []
      bookings.forEach((b) => {
        activities.push({
          id: `bk-${b.id}`,
          type: 'booking',
          title: `Booking Request: ${b.assetName}`,
          description: `Requested by ${b.employeeName} (${b.department})`,
          date: b.startDate,
          status: b.status,
        })
      })

      maintenance.forEach((m) => {
        activities.push({
          id: `mt-${m.id}`,
          type: 'maintenance',
          title: `Maintenance Request: ${m.assetName}`,
          description: `Issue: ${m.issue}`,
          date: m.createdAt,
          status: m.status,
        })
      })

      // Sort by date desc
      activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setRecentActivities(activities.slice(0, 5))
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch dashboard overview data.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  if (isLoading) {
    return <LoadingState message="Loading dashboard metrics..." />
  }

  if (error) {
    return <ErrorState message={error} retry={loadDashboardData} />
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Welcome back! Here is a summary of your enterprise resources.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={loadDashboardData} 
          className="border-slate-200 dark:border-slate-700 h-11 px-4 rounded-xl self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Stats
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Assets Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-900 dark:to-slate-900/90 transition-all dark:border dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Assets
            </CardTitle>
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Box className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.total}</div>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-2">
              Registered items in system
            </p>
          </CardContent>
        </Card>

        {/* Allocated Assets Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50/50 dark:from-slate-900 dark:to-slate-900/90 transition-all dark:border dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Allocated Assets
            </CardTitle>
            <div className="h-10 w-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.allocated}</div>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
              {stats.total ? Math.round((stats.allocated / stats.total) * 100) : 0}% assignment rate
            </p>
          </CardContent>
        </Card>

        {/* In Maintenance Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-rose-50/50 dark:from-slate-900 dark:to-slate-900/90 transition-all dark:border dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              In Maintenance
            </CardTitle>
            <div className="h-10 w-10 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.maintenance}</div>
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-2">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        {/* Pending Bookings Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-indigo-50/50 dark:from-slate-900 dark:to-slate-900/90 transition-all dark:border dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pending Bookings
            </CardTitle>
            <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
              <CalendarClock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{stats.pendingBookings}</div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2">
              Awaiting admin approval
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        {/* Recent Activity */}
        <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200">Recent System Activity</CardTitle>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Latest Requests</span>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.length === 0 ? (
              <div className="text-center py-8 text-slate-400 font-medium">No recent activity found.</div>
            ) : (
              recentActivities.map((act) => (
                <div key={act.id} className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/60 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{act.title}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{act.description}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">{act.date}</p>
                  </div>
                  <StatusBadge status={act.status} className="ml-2 mt-0.5" />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Asset Distribution */}
        <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              Asset Distribution
            </CardTitle>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">By Category</span>
          </CardHeader>
          <CardContent className="space-y-5">
            {distribution.length === 0 ? (
              <div className="text-center py-8 text-slate-400 font-medium">No categories available.</div>
            ) : (
              distribution.map((dist) => (
                <div key={dist.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{dist.name}</span>
                    <span className="font-bold text-indigo-500 dark:text-indigo-400">
                      {dist.count} ({dist.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${dist.percentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default Dashboard
