import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AUDIT_STATUS } from '@/constants'
import { useAuth } from '@/hooks/useAuth'
import { ExportButton } from '@/components/common/ExportButton'
import { Filters } from '@/components/common/Filters'
import { StatusBadge } from '@/components/badges/StatusBadge'
import { DataTable, type Column } from '@/components/table/DataTable'
import { ConfirmationModal } from '@/components/modal/ConfirmationModal'
import { FormModal } from '@/components/modal/FormModal'
import { FormField } from '@/components/forms/FormField'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { auditService } from '@/services/audit.service'
import type { AuditLog } from '@/types'

const auditSchema = z.object({
  asset_id: z.string().min(1, 'Asset is required'),
  notes: z.string().optional(),
})

type AuditFormData = z.infer<typeof auditSchema>

const statusOptions = Object.values(AUDIT_STATUS).map((status) => ({
  label: status,
  value: status,
}))

const Audit = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [completingAudit, setCompletingAudit] = useState<AuditLog | null>(null)
  const [filters, setFilters] = useState<Record<string, string>>({ status: '' })

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['audit'],
    queryFn: auditService.getAll,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditSchema),
  })

  const createMutation = useMutation({
    mutationFn: auditService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audit'] })
      setIsFormOpen(false)
      reset()
    },
  })

  const completeMutation = useMutation({
    mutationFn: (id: string) => auditService.update(id, { status: 'completed' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audit'] })
      setCompletingAudit(null)
    },
  })

  const filteredData = data.filter((log) => {
    if (filters.status && log.status !== filters.status) return false
    return true
  })

  const columns: Column<AuditLog>[] = [
    { key: 'asset_id', header: 'Asset ID', sortable: true },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'notes',
      header: 'Notes',
      render: (row) => row.notes ?? '—',
    },
    {
      key: 'created_at',
      header: 'Date',
      sortable: true,
      render: (row) => new Date(row.created_at).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) =>
        row.status === 'pending' ? (
          <Button variant="ghost" size="sm" onClick={() => setCompletingAudit(row)}>
            Complete
          </Button>
        ) : null,
    },
  ]

  const onSubmit = handleSubmit((formData) => {
    if (!user?.id) return
    createMutation.mutate({
      ...formData,
      audited_by: user.id,
    })
  })

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit</h1>
          <p className="text-sm text-muted-foreground">
            Track asset audit logs and compliance
          </p>
        </div>
        <div className="flex gap-2">
          <ExportButton data={filteredData} filename="audit-logs" />
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="size-4" />
            New Audit
          </Button>
        </div>
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
        emptyTitle="No audit logs"
        emptyDescription="Start an audit to track asset compliance."
      />

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="New Audit"
        onSubmit={onSubmit}
        isLoading={createMutation.isPending}
      >
        <FormField label="Asset ID" error={errors.asset_id?.message} required>
          <Input {...register('asset_id')} error={!!errors.asset_id} />
        </FormField>
        <FormField label="Notes" error={errors.notes?.message}>
          <Textarea {...register('notes')} />
        </FormField>
      </FormModal>

      <ConfirmationModal
        isOpen={!!completingAudit}
        onClose={() => setCompletingAudit(null)}
        onConfirm={() => completingAudit && completeMutation.mutate(completingAudit.id)}
        title="Complete Audit?"
        description="Mark this audit as completed."
        confirmLabel="Complete"
        variant="success"
        isLoading={completeMutation.isPending}
      />
    </div>
  )
}

export default Audit
