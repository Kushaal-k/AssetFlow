import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Skeleton } from '@/components/loader/Skeleton'
import { EmptyState } from '@/components/loader/EmptyState'
import { FormField } from '@/components/forms/FormField'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { departmentService } from '@/services/department.service'

const departmentSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  description: z.string().optional(),
})

type DepartmentFormData = z.infer<typeof departmentSchema>

const DepartmentDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['departments', id],
    queryFn: () => departmentService.getById(id!),
    enabled: !!id,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    values: data
      ? { name: data.name, description: data.description ?? '' }
      : undefined,
  })

  const updateMutation = useMutation({
    mutationFn: (formData: DepartmentFormData) =>
      departmentService.update(id!, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      queryClient.invalidateQueries({ queryKey: ['departments', id] })
    },
  })

  if (isLoading) {
    return (
      <div className="space-y-4 text-left">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <EmptyState
        title="Department not found"
        description="The department you're looking for doesn't exist."
        action={
          <Button onClick={() => navigate('/departments')}>
            <ArrowLeft className="size-4" />
            Back to Departments
          </Button>
        }
      />
    )
  }

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/departments')}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{data.name}</h1>
          <p className="text-sm text-muted-foreground">
            Created {new Date(data.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit((formData) => updateMutation.mutate(formData))}
        className="max-w-lg space-y-4 rounded-xl border border-border bg-card p-6"
      >
        <FormField label="Name" error={errors.name?.message} required>
          <Input {...register('name')} error={!!errors.name} />
        </FormField>
        <FormField label="Description" error={errors.description?.message}>
          <Textarea {...register('description')} />
        </FormField>
        <Button type="submit" isLoading={updateMutation.isPending}>
          Save Changes
        </Button>
      </form>
    </div>
  )
}

export default DepartmentDetail
