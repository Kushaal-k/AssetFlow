import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Filter, Plus, Box, Cpu, Monitor, Activity, Package } from 'lucide-react'
import { useAssets } from '../../hooks/api/useAssets'
import { useCategories } from '../../hooks/api/useReferenceData'
import { CreateAssetModal } from '../../components/assets/CreateAssetModal'

const statusConfig: Record<string, { label: string; classes: string }> = {
  ALLOCATED: { label: 'Allocated', classes: 'bg-blue-500/15 text-blue-500 border border-blue-500/20' },
  AVAILABLE: { label: 'Available', classes: 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20' },
  MAINTENANCE: { label: 'Maintenance', classes: 'bg-amber-500/15 text-amber-500 border border-amber-500/20' },
  RESERVED: { label: 'Reserved', classes: 'bg-purple-500/15 text-purple-500 border border-purple-500/20' },
  LOST: { label: 'Lost', classes: 'bg-rose-500/15 text-rose-500 border border-rose-500/20' },
  RETIRED: { label: 'Retired', classes: 'bg-slate-500/15 text-slate-500 border border-slate-500/20' },
}

const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes('electronic') || name.includes('laptop')) return Cpu
  if (name.includes('peripheral') || name.includes('monitor')) return Monitor
  if (name.includes('furniture')) return Box
  return Package
}

export const Assets = () => {
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [status, setStatus] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Fetch data
  const { data: assets, isLoading, error } = useAssets({
    search: search || undefined,
    categoryId: categoryId || undefined,
    status: status || undefined,
  })
  
  const { data: categories } = useCategories()

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
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/20 gap-2 h-11 px-5 rounded-xl font-semibold"
        >
          <Plus className="w-4 h-4" />
          Add New Asset
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#0a0b0f]/50 backdrop-blur-xl shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, tag, or serial..." 
              className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-10 rounded-xl"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative w-[180px]">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full h-10 pl-9 pr-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">All Categories</option>
                {categories?.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div className="relative w-[160px]">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-10 px-3 pr-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">All Statuses</option>
                {Object.keys(statusConfig).map(s => (
                  <option key={s} value={s}>{statusConfig[s].label}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <div className="bg-white dark:bg-[#0a0b0f] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Activity className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center text-rose-500">
            Failed to load assets.
          </div>
        ) : assets?.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-slate-500">
            No assets found matching the criteria.
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50/80 dark:bg-slate-900/50">
              <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
                <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Asset Details</TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Category</TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Status</TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Department</TableHead>
                <TableHead className="text-right font-semibold text-slate-900 dark:text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {assets?.map((asset) => {
                const conf = statusConfig[asset.status] || { label: asset.status, classes: 'bg-slate-100 text-slate-700' }
                const IconComponent = getCategoryIcon(asset.category.name)
                
                return (
                  <TableRow key={asset.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors group border-slate-100 dark:border-slate-800/50">
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 dark:text-slate-200 text-base">{asset.name}</span>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">{asset.tag}</span>
                          {asset.serialNumber && <span>SN: {asset.serialNumber}</span>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                        <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-md">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        {asset.category.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${conf.classes}`}>
                        {conf.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {asset.department?.name || '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`${ROUTES.ASSETS}/${asset.id}`}>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 font-medium">
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {isCreateModalOpen && (
        <CreateAssetModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  )
}
