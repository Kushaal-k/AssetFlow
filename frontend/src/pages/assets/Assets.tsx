import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ROUTES } from '../../constants'
import { assetService } from '@/services/asset.service'
import type { Asset } from '@/mocks/assets.mock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { StatusBadge } from '@/components/ui/status-badge'
import { LoadingState, ErrorState, EmptyState } from '@/components/ui/page-state'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Search, Filter, Plus, Box, Cpu, Monitor, Wrench, RefreshCw } from 'lucide-react'

const registerAssetSchema = z.object({
  name: z.string().min(2, 'Asset name must be at least 2 characters'),
  tag: z.string().min(2, 'Asset tag must be at least 2 characters'),
  serial: z.string().min(2, 'Serial number is required'),
  category: z.string().min(2, 'Category is required'),
  value: z.string().min(1, 'Purchase value is required'),
  location: z.string().min(2, 'Location is required'),
  notes: z.string(),
})

type RegisterAssetValues = z.infer<typeof registerAssetSchema>

const categoryIcon: Record<string, React.ElementType> = {
  Electronics: Cpu,
  Peripherals: Monitor,
  'Office Equipment': Box,
  Furniture: Box,
}

export const Assets = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const form = useForm<RegisterAssetValues>({
    resolver: zodResolver(registerAssetSchema),
    defaultValues: {
      name: '',
      tag: '',
      serial: '',
      category: 'Electronics',
      value: '',
      location: '',
      notes: '',
    },
  })

  const loadAssets = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await assetService.getAll()
      setAssets(data)
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch asset inventory.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAssets()
  }, [])

  const onSubmit = async (values: RegisterAssetValues) => {
    try {
      const newAsset = await assetService.create({
        ...values,
        status: 'available',
        assigneeId: null,
        assigneeName: null,
        department: null,
        purchaseDate: new Date().toISOString().split('T')[0],
      })
      setAssets((prev) => [newAsset, ...prev])
      setIsRegisterOpen(false)
      form.reset()
      toast.success(`${newAsset.name} registered successfully.`)
    } catch (err: any) {
      toast.error(err?.message || 'Failed to register new asset.')
    }
  }

  const filteredAssets = assets.filter((asset) => {
    const query = searchQuery.toLowerCase()
    return (
      asset.name.toLowerCase().includes(query) ||
      asset.serial.toLowerCase().includes(query) ||
      asset.tag.toLowerCase().includes(query) ||
      asset.category.toLowerCase().includes(query)
    )
  })

  // Calculate totals
  const totalAssets = assets.length
  const allocatedAssets = assets.filter((a) => a.status === 'allocated').length
  const availableAssets = assets.filter((a) => a.status === 'available').length
  const maintenanceAssets = assets.filter((a) => a.status === 'maintenance').length

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Asset Inventory
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Manage all organization resources and assets.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={loadAssets} 
            className="border-slate-200 dark:border-slate-700 h-11 px-4 rounded-xl"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            onClick={() => setIsRegisterOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/20 gap-2 h-11 px-5 rounded-xl font-semibold border-0"
          >
            <Plus className="w-4 h-4" />
            Add New Asset
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: isLoading ? '...' : totalAssets, color: 'from-blue-600/10 to-indigo-600/10 dark:from-blue-500/10 dark:to-indigo-500/10', text: 'text-blue-600 dark:text-blue-400', icon: Box },
          { label: 'Allocated', value: isLoading ? '...' : allocatedAssets, color: 'from-emerald-600/10 to-teal-600/10 dark:from-emerald-500/10 dark:to-teal-500/10', text: 'text-emerald-600 dark:text-emerald-400', icon: Cpu },
          { label: 'Available', value: isLoading ? '...' : availableAssets, color: 'from-violet-600/10 to-purple-600/10 dark:from-violet-500/10 dark:to-purple-500/10', text: 'text-violet-600 dark:text-violet-400', icon: Monitor },
          { label: 'In Repair', value: isLoading ? '...' : maintenanceAssets, color: 'from-rose-600/10 to-orange-600/10 dark:from-rose-500/10 dark:to-orange-500/10', text: 'text-rose-600 dark:text-rose-400', icon: Wrench },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className={`border-0 shadow-sm bg-gradient-to-br ${stat.color} dark:border dark:border-slate-800/60 transition-all`}>
              <CardContent className="pt-5 pb-4 px-5 flex items-center gap-3">
                <Icon className={`h-8 w-8 ${stat.text} flex-shrink-0`} />
                <div>
                  <p className={`text-2xl font-black ${stat.text}`}>{stat.value}</p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Table card */}
      <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800/60">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800/60 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">All Assets</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 w-full sm:w-[280px] bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                />
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9 border-slate-200 dark:border-slate-700 rounded-xl flex-shrink-0">
                <Filter className="h-4 w-4 text-slate-500" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingState message="Fetching asset inventory..." />
          ) : error ? (
            <ErrorState message={error} retry={loadAssets} />
          ) : filteredAssets.length === 0 ? (
            <EmptyState 
              title="No assets found" 
              description={searchQuery ? "Try refining your search terms." : "Register an asset to start tracking inventory."} 
              action={
                !searchQuery ? (
                  <Button onClick={() => setIsRegisterOpen(true)} size="sm" className="bg-indigo-600 text-white rounded-xl">
                    Register First Asset
                  </Button>
                ) : undefined
              }
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100 dark:border-slate-800/60 hover:bg-transparent">
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-6">Asset</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Tag / Serial</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Category</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Assignee</TableHead>
                  <TableHead className="text-right pr-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => {
                  const Icon = categoryIcon[asset.category] ?? Box
                  return (
                    <TableRow key={asset.id} className="border-slate-100 dark:border-slate-800/40 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                          </div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{asset.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-bold text-indigo-500 dark:text-indigo-400">{asset.tag}</div>
                        <div className="font-mono text-xs text-slate-400 dark:text-slate-500 mt-0.5">{asset.serial}</div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 dark:text-slate-300">{asset.category}</TableCell>
                      <TableCell>
                        <StatusBadge status={asset.status} />
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                        {asset.assigneeName || <span className="text-slate-400 dark:text-slate-500">—</span>}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Link
                          to={`${ROUTES.ASSETS}/${asset.id}`}
                          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          View →
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Register Asset Modal */}
      <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} title="Register New Asset">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-4">
            <FormField
              control={form.control as any}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Asset Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. MacBook Pro 16\" {...field} className="bg-slate-900 border-slate-800 rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control as any}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Asset Tag</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. AF-EL-102" {...field} className="bg-slate-900 border-slate-800 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="serial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Serial Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. C02FX4H9..." {...field} className="bg-slate-900 border-slate-800 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control as any}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Category</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="flex h-10 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="Electronics">Electronics</option>
                        <option value="Peripherals">Peripherals</option>
                        <option value="Office Equipment">Office Equipment</option>
                        <option value="Furniture">Furniture</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Purchase Value</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $1,499" {...field} className="bg-slate-900 border-slate-800 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control as any}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Delhi HQ - Room 102" {...field} className="bg-slate-900 border-slate-800 rounded-xl" />
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
                  <FormLabel className="text-slate-300">Notes (Optional)</FormLabel>
                  <FormControl>
                    <textarea 
                      placeholder="Add any specific device details or conditions..." 
                      {...field} 
                      className="flex min-h-[80px] w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsRegisterOpen(false)} className="border-slate-800 rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl shadow-lg border-0">
                Register Asset
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  )
}
export default Assets
