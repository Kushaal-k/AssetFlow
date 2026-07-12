import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { ExportButton } from '@/components/common/ExportButton'
import { DataTable, type Column } from '@/components/table/DataTable'
import { DeleteModal } from '@/components/modal/DeleteModal'
import { FormModal } from '@/components/modal/FormModal'
import { FormField } from '@/components/forms/FormField'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { departmentService } from '@/services/department.service'
import type { Department } from '@/types'

const departmentSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  description: z.string().optional(),
})

type DepartmentFormData = z.infer<typeof departmentSchema>

const columns: Column<Department>[] = [
  { key: 'name', header: 'Name', sortable: true },
  {
    key: 'description',
    header: 'Description',
    render: (row) => row.description ?? '—',
  },
  {
    key: 'created_at',
    header: 'Created',
    sortable: true,
    render: (row) => new Date(row.created_at).toLocaleDateString(),
  },
]

const Departments = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [deletingDepartment, setDeletingDepartment] = useState<Department | null>(null)

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['departments'],
    queryFn: departmentService.getAll,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
  })

  const createMutation = useMutation({
    mutationFn: departmentService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      setIsFormOpen(false)
      reset()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: DepartmentFormData }) =>
      departmentService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      setIsFormOpen(false)
      setEditingDepartment(null)
      reset()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: departmentService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      setDeletingDepartment(null)
    },
  })

  const openCreateModal = () => {
    setEditingDepartment(null)
    reset({ name: '', description: '' })
    setIsFormOpen(true)
  }

  const openEditModal = (department: Department) => {
    setEditingDepartment(department)
    reset({
      name: department.name,
      description: department.description ?? '',
    })
    setIsFormOpen(true)
  }

  const onSubmit = handleSubmit((formData) => {
    if (editingDepartment) {
      updateMutation.mutate({ id: editingDepartment.id, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  })

  const tableColumns: Column<Department>[] = [
    ...columns,
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => openEditModal(row)}>
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeletingDepartment(row)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Departments</h1>
          <p className="text-sm text-muted-foreground">
            Manage organization departments
          </p>
        </div>
        <div className="flex gap-2">
          <ExportButton data={data} filename="departments" />
          <Button onClick={openCreateModal}>
            <Plus className="size-4" />
            Add Department
          </Button>
        </div>
      </div>

      <DataTable
        columns={tableColumns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        searchKey="name"
        emptyTitle="No departments found"
        emptyDescription="Create your first department to get started."
        onRowClick={(row) => navigate(`/departments/${row.id}`)}
      />

      <FormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingDepartment(null)
        }}
        title={editingDepartment ? 'Edit Department' : 'Add Department'}
        onSubmit={onSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      >
        <FormField label="Name" error={errors.name?.message} required>
          <Input {...register('name')} error={!!errors.name} />
        </FormField>
        <FormField label="Description" error={errors.description?.message}>
          <Textarea {...register('description')} />
        </FormField>
      </FormModal>

      <DeleteModal
        isOpen={!!deletingDepartment}
        onClose={() => setDeletingDepartment(null)}
        onConfirm={() =>
          deletingDepartment && deleteMutation.mutate(deletingDepartment.id)
        }
        isLoading={deleteMutation.isPending}
        itemName={deletingDepartment?.name}
      />
    </div>
  )
}

export default Departments
