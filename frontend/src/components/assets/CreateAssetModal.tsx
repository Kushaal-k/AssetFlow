import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { useCreateAsset } from '../../hooks/api/useAssets'
import { useCategories, useDepartments } from '../../hooks/api/useReferenceData'

const createAssetSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  categoryId: z.string().min(1, 'Category is required'),
  departmentId: z.string().optional(),
  serialNumber: z.string().optional(),
  condition: z.string().optional(),
})

type CreateAssetFormValues = z.infer<typeof createAssetSchema>

export const CreateAssetModal = ({ onClose }: { onClose: () => void }) => {
  const [error, setError] = useState<string | null>(null)
  const { data: categories, isLoading: isLoadingCats } = useCategories()
  const { data: departments, isLoading: isLoadingDepts } = useDepartments()
  
  const createAssetMutation = useCreateAsset()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateAssetFormValues>({
    resolver: zodResolver(createAssetSchema),
    defaultValues: { condition: 'NEW' }
  })

  const onSubmit = async (data: CreateAssetFormValues) => {
    setError(null)
    try {
      await createAssetMutation.mutateAsync({
        name: data.name,
        categoryId: data.categoryId,
        departmentId: data.departmentId || undefined,
        serialNumber: data.serialNumber || undefined,
        condition: data.condition
      })
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create asset')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Asset</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Asset Name *</Label>
            <Input id="name" {...register('name')} placeholder="e.g. MacBook Pro 16" />
            {errors.name && <p className="text-xs text-rose-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">Category *</Label>
            <select
              id="categoryId"
              {...register('categoryId')}
              className="w-full h-10 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isLoadingCats}
            >
              <option value="">Select Category...</option>
              {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {errors.categoryId && <p className="text-xs text-rose-500">{errors.categoryId.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="departmentId">Department (Optional)</Label>
            <select
              id="departmentId"
              {...register('departmentId')}
              className="w-full h-10 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isLoadingDepts}
            >
              <option value="">Select Department...</option>
              {departments?.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serialNumber">Serial Number (Optional)</Label>
            <Input id="serialNumber" {...register('serialNumber')} placeholder="e.g. C02FX..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <select
              id="condition"
              {...register('condition')}
              className="w-full h-10 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="NEW">New</option>
              <option value="GOOD">Good</option>
              <option value="FAIR">Fair</option>
              <option value="POOR">Poor</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || createAssetMutation.isPending} className="bg-blue-600 hover:bg-blue-700 text-white">
              {(isSubmitting || createAssetMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Asset
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
