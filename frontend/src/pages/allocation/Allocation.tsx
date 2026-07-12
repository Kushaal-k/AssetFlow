import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { allocationService } from '@/services/allocation.service'
import { assetService } from '@/services/asset.service'
import type { Allocation } from '@/types'
import type { Asset } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { StatusBadge } from '@/components/ui/status-badge'
import { LoadingState, ErrorState, EmptyState } from '@/components/ui/page-state'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { ShieldAlert, Plus, RefreshCw, Trash2, Calendar } from 'lucide-react'

// Simple mock employee array for assigning
const mockEmployees = [
  { id: 'u1', name: 'Kushaal K', department: 'Management' },
  { id: 'u3', name: 'Priya Kapoor', department: 'HR' },
  { id: 'u4', name: 'Rahul Sharma', department: 'Engineering' },
  { id: 'u5', name: 'Amit Verma', department: 'Marketing' },
]

const allocateSchema = z.object({
  assetId: z.string().min(1, 'Please select an asset'),
  employeeId: z.string().min(1, 'Please select an employee'),
  dueDate: z.string(),
  notes: z.string(),
})

type AllocateValues = z.infer<typeof allocateSchema>

export const AllocationPage = () => {
  const [allocations, setAllocations] = useState<Allocation[]>([])
  const [availableAssets, setAvailableAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAllocateOpen, setIsAllocateOpen] = useState(false)

  const form = useForm<AllocateValues>({
    resolver: zodResolver(allocateSchema),
    defaultValues: {
      assetId: '',
      employeeId: '',
      dueDate: '',
      notes: '',
    },
  })

  const loadData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [allocData, assetData] = await Promise.all([
        allocationService.getAll(),
        assetService.getAll(),
      ])
      setAllocations(allocData)
      setAvailableAssets(assetData.filter((a) => a.status === 'available'))
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch allocations.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const onSubmit = async (values: AllocateValues) => {
    try {
      const selectedAsset = availableAssets.find((a) => a.id === values.assetId)
      const selectedEmp = mockEmployees.find((e) => e.id === values.employeeId)

      if (!selectedAsset || !selectedEmp) {
        throw new Error('Invalid Asset or Employee selection')
      }

      // Perform allocation
      const newAlloc = await allocationService.allocate({
        assetId: selectedAsset.id,
        assetName: selectedAsset.name,
        assetTag: selectedAsset.tag,
        category: selectedAsset.category,
        employeeId: selectedEmp.id,
        employeeName: selectedEmp.name,
        department: selectedEmp.department,
        allocatedAt: new Date().toISOString().split('T')[0],
        dueDate: values.dueDate || undefined,
        notes: values.notes,
      })

      // Update assets mock in UI
      setAvailableAssets((prev) => prev.filter((a) => a.id !== selectedAsset.id))
      setAllocations((prev) => [newAlloc, ...prev])
      setIsAllocateOpen(false)
      form.reset()
      toast.success(`Successfully allocated ${selectedAsset.name} to ${selectedEmp.name}`)
    } catch (err: any) {
      toast.error(err?.message || 'Allocation failed')
    }
  }

  const handleDeallocate = async (id: string) => {
    try {
      await allocationService.deallocate(id)
      setAllocations((prev) => prev.filter((a) => a.id !== id))
      // Refetch assets to refresh available list
      const assetData = await assetService.getAll()
      setAvailableAssets(assetData.filter((a) => a.status === 'available'))
      toast.success('Asset deallocated successfully.')
    } catch (err: any) {
      toast.error(err?.message || 'Deallocation failed')
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Asset Allocations
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Track and manage active assignments of equipment to staff.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadData} className="border-slate-200 dark:border-slate-700 h-11 px-4 rounded-xl" disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            onClick={() => setIsAllocateOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/20 gap-2 h-11 px-5 rounded-xl font-semibold border-0"
          >
            <Plus className="w-4 h-4" />
            Allocate Asset
          </Button>
        </div>
      </div>

      {/* Main Table */}
      <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800/60">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Active Allocations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingState message="Fetching active allocations..." />
          ) : error ? (
            <ErrorState message={error} retry={loadData} />
          ) : allocations.length === 0 ? (
            <EmptyState 
              title="No active allocations" 
              description="Deploy equipment to staff by allocating assets." 
              action={
                <Button onClick={() => setIsAllocateOpen(true)} size="sm" className="bg-indigo-600 text-white rounded-xl">
                  Allocate First Asset
                </Button>
              }
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100 dark:border-slate-800/60 hover:bg-transparent">
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-6">Asset</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Assigned To</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Allocated At</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Due Date</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</TableHead>
                  <TableHead className="text-right pr-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allocations.map((alloc) => (
                  <TableRow key={alloc.id} className="border-slate-100 dark:border-slate-800/40 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                    <TableCell className="pl-6 font-semibold text-slate-800 dark:text-slate-200">
                      <div>{alloc.assetName}</div>
                      <div className="text-xs text-indigo-500 font-bold mt-0.5">{alloc.assetTag}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-slate-700 dark:text-slate-200">{alloc.employeeName}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{alloc.department}</div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-slate-600 dark:text-slate-400">{alloc.allocatedAt}</TableCell>
                    <TableCell className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {alloc.dueDate ? (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                          {alloc.dueDate}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={alloc.status as any} />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeallocate(alloc.id)}
                        className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Allocation Form Modal */}
      <Modal isOpen={isAllocateOpen} onClose={() => setIsAllocateOpen(false)} title="Allocate Asset">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-4">
            <FormField
              control={form.control as any}
              name="assetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Select Available Asset</FormLabel>
                  <FormControl>
                    {availableAssets.length === 0 ? (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm font-medium">
                        <ShieldAlert className="h-5 w-5 flex-shrink-0" />
                        No assets currently available for allocation.
                      </div>
                    ) : (
                      <select 
                        {...field} 
                        className="flex h-10 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="">-- Choose Asset --</option>
                        {availableAssets.map((asset) => (
                          <option key={asset.id} value={asset.id}>
                            {asset.name} ({asset.tag}) - {asset.category}
                          </option>
                        ))}
                      </select>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Assign To Employee</FormLabel>
                  <FormControl>
                    <select 
                      {...field} 
                      className="flex h-10 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="">-- Choose Employee --</option>
                      {mockEmployees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name} ({emp.department})
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Due Date (Optional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="bg-slate-900 border-slate-800 rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Allocation Notes</FormLabel>
                  <FormControl>
                    <textarea 
                      placeholder="e.g. Assigned for remote work setup. Expected return in 6 months." 
                      {...field} 
                      className="flex min-h-[80px] w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsAllocateOpen(false)} className="border-slate-800 rounded-xl">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={availableAssets.length === 0}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl shadow-lg border-0"
              >
                Confirm Allocation
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  )
}
export default AllocationPage
