import { supabase } from '@/lib/supabase'

export interface ReportSummary {
  totalAssets: number
  totalDepartments: number
  totalBookings: number
  openMaintenance: number
  assetsByStatus: Record<string, number>
  bookingsByStatus: Record<string, number>
}

export const reportService = {
  async getSummary(): Promise<ReportSummary> {
    const [assets, departments, bookings, maintenance] = await Promise.all([
      supabase.from('assets').select('status'),
      supabase.from('departments').select('id', { count: 'exact', head: true }),
      supabase.from('bookings').select('status'),
      supabase
        .from('maintenance_requests')
        .select('id', { count: 'exact', head: true })
        .in('status', ['open', 'in_progress']),
    ])

    if (assets.error) throw assets.error
    if (departments.error) throw departments.error
    if (bookings.error) throw bookings.error
    if (maintenance.error) throw maintenance.error

    const assetsByStatus: Record<string, number> = {}
    for (const asset of assets.data ?? []) {
      const status = asset.status as string
      assetsByStatus[status] = (assetsByStatus[status] ?? 0) + 1
    }

    const bookingsByStatus: Record<string, number> = {}
    for (const booking of bookings.data ?? []) {
      const status = booking.status as string
      bookingsByStatus[status] = (bookingsByStatus[status] ?? 0) + 1
    }

    return {
      totalAssets: assets.data?.length ?? 0,
      totalDepartments: departments.count ?? 0,
      totalBookings: bookings.data?.length ?? 0,
      openMaintenance: maintenance.count ?? 0,
      assetsByStatus,
      bookingsByStatus,
    }
  },
}
