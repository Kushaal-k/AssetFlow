import { useState, useEffect } from 'react'
import { auditService } from '@/services/audit.service'
import type { AuditItem } from '@/mocks/audit.mock'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { StatusBadge } from '@/components/ui/status-badge'
import { LoadingState, ErrorState, EmptyState } from '@/components/ui/page-state'
import { useAuth } from '@/hooks/useAuth'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Check, ShieldAlert, AlertTriangle, RefreshCw } from 'lucide-react'

const auditNoteSchema = z.object({
  notes: z.string().min(5, 'Verification notes must be at least 5 characters'),
})

type AuditNoteValues = z.infer<typeof auditNoteSchema>

export const AuditPage = () => {
  const { user } = useAuth()
  const [items, setItems] = useState<AuditItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<AuditItem | null>(null)
  const [targetStatus, setTargetStatus] = useState<'verified' | 'missing' | 'damaged' | null>(null)

  const form = useForm<AuditNoteValues>({
    resolver: zodResolver(auditNoteSchema),
    defaultValues: {
      notes: '',
    },
  })

  const loadAuditData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await auditService.getAll()
      setItems(data)
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch audit checklist.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAuditData()
  }, [])

  const handleActionClick = (item: AuditItem, status: 'verified' | 'missing' | 'damaged') => {
    setSelectedItem(item)
    setTargetStatus(status)
    // Pre-fill notes if already exist, otherwise reset
    form.setValue('notes', item.notes || '')
    setIsNoteOpen(true)
  }

  const onSubmitNotes = async (values: AuditNoteValues) => {
    if (!selectedItem || !targetStatus || !user) return
    try {
      await auditService.updateStatus(selectedItem.id, targetStatus, values.notes)
      setItems((prev) => 
        prev.map((item) => 
          item.id === selectedItem.id 
            ? { 
                ...item, 
                status: targetStatus, 
                notes: values.notes,
                lastVerifiedAt: new Date().toISOString().split('T')[0],
                verifiedById: user.id,
                verifiedByName: user.full_name || null
              }
            : item
        )
      )
      toast.success(`Asset status updated to ${targetStatus}`)
      setIsNoteOpen(false)
      form.reset()
    } catch (err: any) {
      toast.error('Failed to log audit report.')
    }
  }

  // Calculate statistics
  const total = items.length
  const verifiedCount = items.filter((i) => i.status === 'verified').length
  const missingCount = items.filter((i) => i.status === 'missing').length
  const damagedCount = items.filter((i) => i.status === 'damaged').length
  const pendingCount = items.filter((i) => i.status === 'pending').length

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Audit Checklist
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Verify hardware possession, flag missing assets, and log damaged gear.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadAuditData} className="border-slate-200 dark:border-slate-700 h-11 px-4 rounded-xl" disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Audit Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Audited', value: isLoading ? '...' : total, color: 'from-indigo-600/10 to-indigo-600/10 dark:from-indigo-500/10 dark:to-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400' },
          { label: 'Verified', value: isLoading ? '...' : verifiedCount, color: 'from-emerald-600/10 to-emerald-600/10 dark:from-emerald-500/10 dark:to-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Missing', value: isLoading ? '...' : missingCount, color: 'from-rose-600/10 to-rose-600/10 dark:from-rose-500/10 dark:to-rose-500/10', text: 'text-rose-600 dark:text-rose-400' },
          { label: 'Damaged', value: isLoading ? '...' : damagedCount, color: 'from-amber-600/10 to-amber-600/10 dark:from-amber-500/10 dark:to-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
          { label: 'Pending Audit', value: isLoading ? '...' : pendingCount, color: 'from-slate-600/10 to-slate-600/10 dark:from-slate-500/10 dark:to-slate-500/10', text: 'text-slate-600 dark:text-slate-400' },
        ].map((stat) => (
          <Card key={stat.label} className={`border-0 bg-gradient-to-br ${stat.color} dark:border dark:border-slate-800`}>
            <CardContent className="pt-4 pb-3 px-4 text-center">
              <p className={`text-2xl font-black ${stat.text}`}>{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Checklist Card */}
      <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800/60">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Asset Verification Check</CardTitle>
          <CardDescription className="text-slate-400">Perform physical stock verification and record findings below</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingState message="Fetching audit items..." />
          ) : error ? (
            <ErrorState message={error} retry={loadAuditData} />
          ) : items.length === 0 ? (
            <EmptyState title="No items in verification log" description="System is empty." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100 dark:border-slate-800/60 hover:bg-transparent">
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-6">Resource</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Registered Location</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Last Verified</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</TableHead>
                  <TableHead className="text-right pr-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="border-slate-100 dark:border-slate-800/40 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="pl-6">
                      <div className="font-bold text-slate-800 dark:text-slate-200">{item.assetName}</div>
                      <div className="text-xs text-indigo-500 font-bold mt-0.5">{item.assetTag}</div>
                      {item.notes && (
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium italic mt-1 bg-slate-900/40 p-1.5 rounded-lg border border-slate-800/50 max-w-[240px]">
                          Note: {item.notes}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.location}</TableCell>
                    <TableCell>
                      {item.lastVerifiedAt ? (
                        <div>
                          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.lastVerifiedAt}</div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">By {item.verifiedByName}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Never</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className="text-right pr-6 space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleActionClick(item, 'verified')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded-xl text-xs gap-1 border-0"
                      >
                        <Check className="w-3.5 h-3.5" /> Verify
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleActionClick(item, 'damaged')}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1 rounded-xl text-xs gap-1 border-0"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" /> Damage
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleActionClick(item, 'missing')}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1 rounded-xl text-xs gap-1 border-0"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" /> Missing
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Audit Notes Modal */}
      <Modal 
        isOpen={isNoteOpen} 
        onClose={() => setIsNoteOpen(false)} 
        title={`Audit Report: Mark as ${targetStatus}`}
      >
        {selectedItem && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitNotes)} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Asset undergoing audit</p>
                <p className="text-sm font-bold text-white mt-1">{selectedItem.assetName}</p>
                <p className="text-xs text-indigo-400 mt-0.5">{selectedItem.assetTag}</p>
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Observation Notes</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Log any physical remarks, barcode details, serial verification details..."
                        {...field}
                        className="flex min-h-[90px] w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 justify-end pt-2">
                <Button type="button" variant="outline" onClick={() => setIsNoteOpen(false)} className="border-slate-800 rounded-xl">
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl border-0 shadow-lg shadow-indigo-600/20">
                  Save Report
                </Button>
              </div>
            </form>
          </Form>
        )}
      </Modal>
    </div>
  )
}
export default AuditPage
