import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MAINTENANCE_STATUS } from '@/constants'
import { useAuth } from '@/hooks/useAuth'
import { Filters } from '@/components/common/Filters'
import { StatusBadge } from '@/components/badges/StatusBadge'
import { DataTable, type Column } from '@/components/table/DataTable'
import { ConfirmationModal } from '@/components/modal/ConfirmationModal'
import { FormModal } from '@/components/modal/FormModal'
import { FormField } from '@/components/forms/FormField'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { maintenanceService } from '@/services/maintenance.service'
import type { MaintenanceRequest } from '@/types'

const maintenanceSchema = z.object({
  asset_id: z.string().min(1, 'Asset is required'),
  description: z.string().min(1, 'Description is required'),
})

type MaintenanceFormData = z.infer<typeof maintenanceSchema>

const statusOptions = Object.values(MAINTENANCE_STATUS).map((status) => ({
  label: status.replace(/_/g, ' '),
  value: status,
}))

const Maintenance = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [resolvingRequest, setResolvingRequest] = useState<MaintenanceRequest | null>(null)
  const [filters, setFilters] = useState<Record<string, string>>({ status: '' })

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['maintenance'],
    queryFn: maintenanceService.getAll,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MaintenanceFormData>({
    resolver: zodResolver(maintenanceSchema),
  })

  const createMutation = useMutation({
    mutationFn: maintenanceService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] })
      setIsFormOpen(false)
      reset()
    },
  })

  const resolveMutation = useMutation({
    mutationFn: (id: string) =>
      maintenanceService.update(id, {
        status: 'resolved',
        resolved_at: new Date().toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] })
      setResolvingRequest(null)
    },
  })

  const filteredData = data.filter((request) => {
    if (filters.status && request.status !== filters.status) return false
    return true
  })

  const columns: Column<MaintenanceRequest>[] = [
    { key: 'asset_id', header: 'Asset ID', sortable: true },
    {
      key: 'description',
      header: 'Description',
      render: (row) => (
        <span className="line-clamp-2 max-w-xs">{row.description}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'created_at',
      header: 'Created',
      sortable: true,
      render: (row) => new Date(row.created_at).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) =>
        row.status === 'open' || row.status === 'in_progress' ? (
          <Button variant="ghost" size="sm" onClick={() => setResolvingRequest(row)}>
            Resolve
          </Button>
        ) : null,
    },
  ]

  const onSubmit = handleSubmit((formData) => {
    if (!user?.id) return
    createMutation.mutate({
      ...formData,
      raised_by: user.id,
    })
  })

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Maintenance</h1>
          <p className="text-sm text-muted-foreground">
            Track and resolve maintenance requests
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="size-4" />
          Raise Request
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
        emptyTitle="No maintenance requests"
        emptyDescription="Raise a request when an asset needs attention."
      />

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Raise Maintenance Request"
        onSubmit={onSubmit}
        isLoading={createMutation.isPending}
        submitLabel="Submit Request"
      >
        <FormField label="Asset ID" error={errors.asset_id?.message} required>
          <Input {...register('asset_id')} error={!!errors.asset_id} />
        </FormField>
        <FormField label="Description" error={errors.description?.message} required>
          <Textarea {...register('description')} />
        </FormField>
      </FormModal>

      <ConfirmationModal
        isOpen={!!resolvingRequest}
        onClose={() => setResolvingRequest(null)}
        onConfirm={() => resolvingRequest && resolveMutation.mutate(resolvingRequest.id)}
        title="Mark as Resolved?"
        description="This will close the maintenance request."
        confirmLabel="Resolve"
        variant="success"
        isLoading={resolveMutation.isPending}
      />
    </div>
  )
}

export default Maintenance
