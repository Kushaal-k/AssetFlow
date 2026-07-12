import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import { StatusBadge } from '@/components/badges/StatusBadge'
import { DataTable, type Column } from '@/components/table/DataTable'
import { DeleteModal } from '@/components/modal/DeleteModal'
import { Button } from '@/components/ui/Button'
import { bookingService } from '@/services/booking.service'
import type { Booking } from '@/types'
import { useState } from 'react'

const MyBookings = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null)

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['bookings', 'my', user?.id],
    queryFn: () => bookingService.getByUser(user!.id),
    enabled: !!user?.id,
  })

  const cancelMutation = useMutation({
    mutationFn: bookingService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      setCancellingBooking(null)
    },
  })

  const columns: Column<Booking>[] = [
    { key: 'asset_id', header: 'Asset ID', sortable: true },
    {
      key: 'start_date',
      header: 'Start Date',
      sortable: true,
      render: (row) => new Date(row.start_date).toLocaleDateString(),
    },
    {
      key: 'end_date',
      header: 'End Date',
      sortable: true,
      render: (row) => new Date(row.end_date).toLocaleDateString(),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) =>
        row.status === 'pending' ? (
          <Button variant="ghost" size="sm" onClick={() => setCancellingBooking(row)}>
            Cancel
          </Button>
        ) : null,
    },
  ]

  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
        <p className="text-sm text-muted-foreground">
          View and manage your resource bookings
        </p>
      </div>

      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        searchKey="asset_id"
        emptyTitle="No bookings yet"
        emptyDescription="Your resource bookings will appear here."
      />

      <DeleteModal
        isOpen={!!cancellingBooking}
        onClose={() => setCancellingBooking(null)}
        onConfirm={() => cancellingBooking && cancelMutation.mutate(cancellingBooking.id)}
        isLoading={cancelMutation.isPending}
        title="Cancel booking?"
        description="Are you sure you want to cancel this booking request?"
      />
    </div>
  )
}

export default MyBookings
