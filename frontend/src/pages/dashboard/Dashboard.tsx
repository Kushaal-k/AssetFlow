import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Box, CheckCircle2, AlertCircle, CalendarClock, ArrowUp } from 'lucide-react'

export const Dashboard = () => {
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
            <div className="text-3xl font-black text-slate-900 dark:text-white">1,248</div>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
              <ArrowUp className="h-3 w-3" /> 12% from last month
            </p>
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
            <div className="text-3xl font-black text-slate-900 dark:text-white">842</div>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
              <ArrowUp className="h-3 w-3" /> 4% from last week
            </p>
          </CardContent>
        </Card>

        {/* In Maintenance Card */}
        <Card className="border-0 shadow-lg shadow-rose-500/5 dark:shadow-rose-900/10 bg-gradient-to-br from-white to-rose-50/50 dark:from-slate-900 dark:to-slate-900/90 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-500/10 dark:border dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              In Maintenance
            </CardTitle>
            <div className="h-10 w-10 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">12</div>
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-2 flex items-center">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        {/* Pending Bookings Card */}
        <Card className="border-0 shadow-lg shadow-indigo-500/5 dark:shadow-indigo-900/10 bg-gradient-to-br from-white to-indigo-50/50 dark:from-slate-900 dark:to-slate-900/90 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 dark:border dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pending Bookings
            </CardTitle>
            <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
              <CalendarClock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">5</div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 flex items-center">
              Awaiting admin approval
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-500 flex items-center justify-center h-48 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              Activity chart will appear here
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200">Asset Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-500 flex items-center justify-center h-48 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              Distribution map will appear here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
