import { useState, useEffect } from 'react'
import { maintenanceService } from '@/services/maintenance.service'
import type { MaintenanceRequest } from '@/mocks/maintenance.mock'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StatusBadge } from '@/components/ui/status-badge'
import { LoadingState, ErrorState, EmptyState } from '@/components/ui/page-state'
import { toast } from 'sonner'
import { RefreshCw, CheckCircle, Play, XCircle } from 'lucide-react'

export const MaintenancePage = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const loadRequests = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await maintenanceService.getAll()
      setRequests(data)
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch maintenance queue.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadRequests()
  }, [])

  const handleStartRepair = async (id: string) => {
    try {
      await maintenanceService.approve(id) // stub
      setRequests((prev) => 
        prev.map((r) => r.id === id ? { ...r, status: 'in_progress' } : r)
      )
      toast.success('Repair process started.')
    } catch (err: any) {
      toast.error('Failed to change status.')
    }
  }

  const handleResolveRepair = async (id: string) => {
    try {
      await maintenanceService.resolve(id) // stub
      setRequests((prev) => 
        prev.map((r) => r.id === id ? { ...r, status: 'resolved', resolvedAt: new Date().toISOString().split('T')[0] } : r)
      )
      toast.success('Ticket marked as Resolved.')
    } catch (err: any) {
      toast.error('Failed to change status.')
    }
  }

  const handleCloseTicket = async (id: string) => {
    try {
      await maintenanceService.close(id) // stub
      setRequests((prev) => 
        prev.map((r) => r.id === id ? { ...r, status: 'closed' } : r)
      )
      toast.success('Ticket closed successfully.')
    } catch (err: any) {
      toast.error('Failed to close ticket.')
    }
  }

  const getPriorityClasses = (p: string) => {
    switch (p) {
      case 'critical': return 'bg-red-600/15 text-red-400 border border-red-500/20'
      case 'high': return 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
      case 'medium': return 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
      default: return 'bg-slate-500/15 text-slate-400 border border-slate-500/20'
    }
  }

  const filteredRequests = requests.filter((r) => {
    if (filterStatus === 'all') return true
    return r.status === filterStatus
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Maintenance Tickets
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Diagnose issues, manage repairs, and track resolved tickets.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadRequests} className="border-slate-200 dark:border-slate-700 h-11 px-4 rounded-xl" disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Filter and Queue */}
      <div className="flex items-center gap-2">
        {['all', 'open', 'in_progress', 'resolved', 'closed'].map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? 'default' : 'outline'}
            onClick={() => setFilterStatus(status)}
            className={`capitalize rounded-xl px-4 text-xs font-bold ${
              filterStatus === status 
                ? 'bg-indigo-600 text-white' 
                : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            {status.replace('_', ' ')}
          </Button>
        ))}
      </div>

      <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800/60">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Repair Queue</CardTitle>
          <CardDescription className="text-slate-400">View current tickets reported by employees</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingState message="Fetching maintenance queue..." />
          ) : error ? (
            <ErrorState message={error} retry={loadRequests} />
          ) : filteredRequests.length === 0 ? (
            <EmptyState 
              title="No tickets found" 
              description="Everything is currently clean and fully operational."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100 dark:border-slate-800/60 hover:bg-transparent">
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-6">Device</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Issue / Details</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Reporter</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Severity</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</TableHead>
                  <TableHead className="text-right pr-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((req) => (
                  <TableRow key={req.id} className="border-slate-100 dark:border-slate-800/40 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="pl-6 font-semibold">
                      <div className="text-slate-800 dark:text-slate-200">{req.assetName}</div>
                      <div className="text-xs text-indigo-500 font-bold mt-0.5">{req.assetTag}</div>
                    </TableCell>
                    <TableCell className="max-w-[280px]">
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 line-clamp-2 leading-relaxed">
                        {req.issue}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">Reported: {req.createdAt}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">{req.reportedByName}</div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getPriorityClasses(req.priority)}`}>
                        {req.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={req.status} />
                    </TableCell>
                    <TableCell className="text-right pr-6 space-x-2">
                      {req.status === 'open' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStartRepair(req.id)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs gap-1 shadow-lg shadow-indigo-600/20 border-0"
                        >
                          <Play className="w-3.5 h-3.5" /> Start Repair
                        </Button>
                      )}
                      {req.status === 'in_progress' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleResolveRepair(req.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs gap-1 shadow-lg shadow-emerald-600/20 border-0"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Resolve
                        </Button>
                      )}
                      {req.status === 'resolved' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleCloseTicket(req.id)}
                          className="bg-slate-600 hover:bg-slate-700 text-white rounded-xl text-xs gap-1 border-0"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Close Ticket
                        </Button>
                      )}
                      {req.status === 'closed' && (
                        <span className="text-xs text-slate-400 font-medium italic">Archived</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
export default MaintenancePage
