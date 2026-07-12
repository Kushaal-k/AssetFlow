import { useQuery } from '@tanstack/react-query'
import { Building2, Calendar, Package, Wrench } from 'lucide-react'
import { ChartCard } from '@/components/cards/ChartCard'
import { StatCard } from '@/components/cards/StatCard'
import { ExportButton } from '@/components/common/ExportButton'
import { Skeleton } from '@/components/loader/Skeleton'
import { EmptyState } from '@/components/loader/EmptyState'
import { reportService } from '@/services/report.service'

const Reports = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['reports', 'summary'],
    queryFn: reportService.getSummary,
  })

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <EmptyState
        title="Failed to load reports"
        description="Unable to fetch report data. Please try again later."
      />
    )
  }

  const exportData = [
    { metric: 'Total Assets', value: data.totalAssets },
    { metric: 'Total Departments', value: data.totalDepartments },
    { metric: 'Total Bookings', value: data.totalBookings },
    { metric: 'Open Maintenance', value: data.openMaintenance },
    ...Object.entries(data.assetsByStatus).map(([status, count]) => ({
      metric: `Assets - ${status}`,
      value: count,
    })),
    ...Object.entries(data.bookingsByStatus).map(([status, count]) => ({
      metric: `Bookings - ${status}`,
      value: count,
    })),
  ]

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground">
            Organization-wide analytics and summaries
          </p>
        </div>
        <ExportButton data={exportData} filename="assetflow-report" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Assets"
          value={data.totalAssets}
          icon={<Package className="size-5" />}
          color="blue"
        />
        <StatCard
          title="Departments"
          value={data.totalDepartments}
          icon={<Building2 className="size-5" />}
          color="green"
        />
        <StatCard
          title="Bookings"
          value={data.totalBookings}
          icon={<Calendar className="size-5" />}
          color="amber"
        />
        <StatCard
          title="Open Maintenance"
          value={data.openMaintenance}
          icon={<Wrench className="size-5" />}
          color="red"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Assets by Status">
          <div className="space-y-3">
            {Object.entries(data.assetsByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm capitalize text-muted-foreground">
                  {status.replace(/_/g, ' ')}
                </span>
                <span className="font-semibold text-foreground">{count}</span>
              </div>
            ))}
            {Object.keys(data.assetsByStatus).length === 0 && (
              <p className="text-sm text-muted-foreground">No asset data available</p>
            )}
          </div>
        </ChartCard>

        <ChartCard title="Bookings by Status">
          <div className="space-y-3">
            {Object.entries(data.bookingsByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm capitalize text-muted-foreground">
                  {status.replace(/_/g, ' ')}
                </span>
                <span className="font-semibold text-foreground">{count}</span>
              </div>
            ))}
            {Object.keys(data.bookingsByStatus).length === 0 && (
              <p className="text-sm text-muted-foreground">No booking data available</p>
            )}
          </div>
        </ChartCard>
      </div>
    </div>
  )
}

export default Reports
