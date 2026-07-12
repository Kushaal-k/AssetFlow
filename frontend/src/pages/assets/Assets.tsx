import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Filter, Plus, Box, Cpu, Monitor, Wrench } from 'lucide-react'

// Mock asset data for demo purposes
const mockAssets = [
  { id: '1', name: 'MacBook Pro M3 Max', serial: 'C02FX4H9Q05D', category: 'Electronics', status: 'Allocated', assignee: 'Rahul Sharma' },
  { id: '2', name: 'Dell UltraSharp 27"', serial: 'DEL-U2723DE', category: 'Peripherals', status: 'Available', assignee: '—' },
  { id: '3', name: 'HP LaserJet Pro', serial: 'HP-LJ-3021B', category: 'Office Equipment', status: 'Maintenance', assignee: '—' },
  { id: '4', name: 'iPhone 15 Pro', serial: 'DNPX23F9GHR1', category: 'Electronics', status: 'Allocated', assignee: 'Priya Kapoor' },
  { id: '5', name: 'Ergonomic Chair', serial: 'CHAIR-ERG-097', category: 'Furniture', status: 'Available', assignee: '—' },
]

const statusConfig: Record<string, { label: string; classes: string }> = {
  Allocated: { label: 'Allocated', classes: 'bg-blue-500/15 text-blue-400 border border-blue-500/20' },
  Available: { label: 'Available', classes: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' },
  Maintenance: { label: 'Maintenance', classes: 'bg-rose-500/15 text-rose-400 border border-rose-500/20' },
}

const categoryIcon: Record<string, React.ElementType> = {
  Electronics: Cpu,
  Peripherals: Monitor,
  'Office Equipment': Box,
  Furniture: Box,
}

export const Assets = () => {
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
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/20 gap-2 h-11 px-5 rounded-xl font-semibold">
          <Plus className="w-4 h-4" />
          Add New Asset
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: '1,248', color: 'from-blue-600/10 to-indigo-600/10 dark:from-blue-500/10 dark:to-indigo-500/10', text: 'text-blue-600 dark:text-blue-400', icon: Box },
          { label: 'Allocated', value: '842', color: 'from-emerald-600/10 to-teal-600/10 dark:from-emerald-500/10 dark:to-teal-500/10', text: 'text-emerald-600 dark:text-emerald-400', icon: Cpu },
          { label: 'Available', value: '394', color: 'from-violet-600/10 to-purple-600/10 dark:from-violet-500/10 dark:to-purple-500/10', text: 'text-violet-600 dark:text-violet-400', icon: Monitor },
          { label: 'In Repair', value: '12', color: 'from-rose-600/10 to-orange-600/10 dark:from-rose-500/10 dark:to-orange-500/10', text: 'text-rose-600 dark:text-rose-400', icon: Wrench },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className={`border-0 shadow-sm bg-gradient-to-br ${stat.color} dark:border dark:border-slate-800/60 transition-all hover:-translate-y-0.5`}>
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
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 dark:border-slate-800/60 hover:bg-transparent">
                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-6">Asset</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Serial No.</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Category</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Assignee</TableHead>
                <TableHead className="text-right pr-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAssets.map((asset) => {
                const Icon = categoryIcon[asset.category] ?? Box
                const status = statusConfig[asset.status]
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
                    <TableCell className="font-mono text-sm text-slate-500 dark:text-slate-400">{asset.serial}</TableCell>
                    <TableCell className="text-sm text-slate-600 dark:text-slate-300">{asset.category}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${status.classes}`}>
                        {status.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 dark:text-slate-300">{asset.assignee}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  )
}
