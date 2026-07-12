import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BOOKING_STATUS } from '@/constants'
import { useAuth } from '@/hooks/useAuth'
import { ConfirmationModal } from '@/components/modal/ConfirmationModal'
import { Filters } from '@/components/common/Filters'
import { StatusBadge } from '@/components/badges/StatusBadge'
import { DataTable, type Column } from '@/components/table/DataTable'
import { FormModal } from '@/components/modal/FormModal'
import { FormField } from '@/components/forms/FormField'
import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { bookingService } from '@/services/booking.service'
import type { Booking } from '@/types'

const bookingSchema = z
  .object({
    asset_id: z.string().min(1, 'Asset is required'),
    start_date: z.string().min(1, 'Start date is required'),
    end_date: z.string().min(1, 'End date is required'),
    reason: z.string().optional(),
  })
  .refine((data) => data.end_date >= data.start_date, {
    message: 'End date must be after start date',
    path: ['end_date'],
  })

type BookingFormData = z.infer<typeof bookingSchema>

const statusOptions = Object.values(BOOKING_STATUS).map((status) => ({
  label: status.replace(/_/g, ' '),
  value: status,
}))

const Booking = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [approvingBooking, setApprovingBooking] = useState<Booking | null>(null)
  const [filters, setFilters] = useState<Record<string, string>>({ status: '' })

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['bookings'],
    queryFn: bookingService.getAll,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const createMutation = useMutation({
    mutationFn: bookingService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      setIsFormOpen(false)
      reset()
    },
  })

  const approveMutation = useMutation({
    mutationFn: (id: string) => bookingService.update(id, { status: 'approved' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      setApprovingBooking(null)
    },
  })

  const filteredData = data.filter((booking) => {
    if (filters.status && booking.status !== filters.status) return false
    return true
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
          <Button variant="ghost" size="sm" onClick={() => setApprovingBooking(row)}>
            Approve
          </Button>
        ) : null,
    },
  ]

  const onSubmit = handleSubmit((formData) => {
    if (!user?.id) return
    createMutation.mutate({
      ...formData,
      requested_by: user.id,
    })
  })

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Resource Booking</h1>
          <p className="text-sm text-muted-foreground">
            Book and manage resource reservations
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="size-4" />
          New Booking
        </Button>
      </div>

      <Filters
        filters={[{ label: 'Status', key: 'status', options: statusOptions }]}
        values={filters}
        onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
        onReset={() => setFilters({ status: '' })}
      />

      <DataTable
        columns={columns}
        data={filteredData}
        isLoading={isLoading}
        isError={isError}
        searchKey="asset_id"
        emptyTitle="No bookings found"
        emptyDescription="Create a booking to reserve a resource."
      />

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="New Booking"
        onSubmit={onSubmit}
        isLoading={createMutation.isPending}
        submitLabel="Book Resource"
      >
        <FormField label="Asset ID" error={errors.asset_id?.message} required>
          <Input {...register('asset_id')} error={!!errors.asset_id} />
        </FormField>
        <FormField label="Start Date" error={errors.start_date?.message} required>
          <DatePicker {...register('start_date')} error={!!errors.start_date} />
        </FormField>
        <FormField label="End Date" error={errors.end_date?.message} required>
          <DatePicker {...register('end_date')} error={!!errors.end_date} />
        </FormField>
        <FormField label="Reason" error={errors.reason?.message}>
          <Textarea {...register('reason')} />
        </FormField>
      </FormModal>

      <ConfirmationModal
        isOpen={!!approvingBooking}
        onClose={() => setApprovingBooking(null)}
        onConfirm={() => approvingBooking && approveMutation.mutate(approvingBooking.id)}
        title="Approve Booking?"
        description="This will notify the employee."
        confirmLabel="Approve"
        variant="success"
        isLoading={approveMutation.isPending}
      />
    </div>
  )
}

export default Booking
