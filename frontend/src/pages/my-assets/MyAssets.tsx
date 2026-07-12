import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { allocationService } from '@/services/allocation.service'
import { maintenanceService } from '@/services/maintenance.service'
import type { Allocation } from '@/mocks/allocations.mock'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { LoadingState, ErrorState, EmptyState } from '@/components/ui/page-state'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Wrench, Calendar, Inbox, AlertTriangle } from 'lucide-react'

const reportIssueSchema = z.object({
  issue: z.string().min(10, 'Please describe the issue in detail (at least 10 characters)'),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
})

type ReportIssueValues = z.infer<typeof reportIssueSchema>

export const MyAssets = () => {
  const { user } = useAuth()
  const [allocations, setAllocations] = useState<Allocation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [selectedAlloc, setSelectedAlloc] = useState<Allocation | null>(null)

  const form = useForm<ReportIssueValues>({
    resolver: zodResolver(reportIssueSchema),
    defaultValues: {
      issue: '',
      priority: 'medium',
    },
  })

  const loadMyAssets = async () => {
    if (!user) return
    setIsLoading(true)
    setError(null)
    try {
      const myData = await allocationService.getByEmployeeId(user.id)
      setAllocations(myData)
    } catch (err: any) {
      setError(err?.message || 'Failed to load assigned assets.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadMyAssets()
  }, [user])

  const handleReportIssue = (alloc: Allocation) => {
    setSelectedAlloc(alloc)
    setIsReportOpen(true)
  }

  const onSubmitIssue = async (values: ReportIssueValues) => {
    if (!selectedAlloc || !user) return
    try {
      await maintenanceService.create({
        assetId: selectedAlloc.assetId,
        assetName: selectedAlloc.assetName,
        assetTag: selectedAlloc.assetTag,
        reportedById: user.id,
        reportedByName: user.full_name || 'User',
        assignedToId: null,
        assignedToName: null,
        issue: values.issue,
        priority: values.priority,
        createdAt: new Date().toISOString().split('T')[0],
      })
      toast.success(`Maintenance request submitted for ${selectedAlloc.assetName}.`)
      setIsReportOpen(false)
      form.reset()
    } catch (err: any) {
      toast.error(err?.message || 'Failed to submit request.')
    }
  }

  const handleInitiateReturn = (alloc: Allocation) => {
    toast.success(`Return request for ${alloc.assetName} initiated. IT support will contact you.`)
  }

  if (!user) {
    return <ErrorState message="Please sign in to view your assigned assets." />
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          My Handed Assets
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
          Overview of company hardware and gear assigned to you.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* User Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-600 to-purple-700 text-white md:col-span-1">
          <CardHeader>
            <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner">
              {(user.full_name || 'U').charAt(0)}
            </div>
            <CardTitle className="text-xl font-bold mt-4">{user.full_name || 'User'}</CardTitle>
            <CardDescription className="text-indigo-200">{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between border-t border-white/10 pt-3">
              <span className="opacity-80">Department</span>
              <span className="font-bold">Engineering</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-80">Designation</span>
              <span className="font-bold capitalize">{user.role}</span>
            </div>
          </CardContent>
        </Card>

        {/* Assets Table */}
        <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800/60 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200">Current Assignments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <LoadingState message="Loading your items..." />
            ) : error ? (
              <ErrorState message={error} retry={loadMyAssets} />
            ) : allocations.length === 0 ? (
              <EmptyState 
                title="No assets assigned" 
                description="Currently you don't have any company equipment assigned to your account."
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100 dark:border-slate-800/60 hover:bg-transparent">
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-6">Equipment</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Assigned Date</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Due Date</TableHead>
                    <TableHead className="text-right pr-6"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocations.map((alloc) => (
                    <TableRow key={alloc.id} className="border-slate-100 dark:border-slate-800/40 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                      <TableCell className="pl-6">
                        <div className="font-bold text-slate-800 dark:text-slate-200">{alloc.assetName}</div>
                        <div className="text-xs font-semibold text-indigo-500 mt-0.5">{alloc.assetTag}</div>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-slate-600 dark:text-slate-400">{alloc.allocatedAt}</TableCell>
                      <TableCell className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {alloc.dueDate ? (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                            {alloc.dueDate}
                          </span>
                        ) : (
                          <span className="text-slate-400">No Limit</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right pr-6 space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleReportIssue(alloc)}
                          className="border-slate-200 dark:border-slate-800 text-xs font-bold gap-1 rounded-xl"
                        >
                          <Wrench className="w-3 h-3 text-indigo-500" /> Issue
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleInitiateReturn(alloc)}
                          className="border-slate-200 dark:border-slate-800 text-xs font-bold gap-1 rounded-xl"
                        >
                          <Inbox className="w-3 h-3 text-emerald-500" /> Return
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Report Issue Modal */}
      <Modal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} title="Report Gear Issue">
        {selectedAlloc && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitIssue)} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Asset to check</p>
                <p className="text-sm font-bold text-white mt-1">{selectedAlloc.assetName}</p>
                <p className="text-xs text-indigo-400 mt-0.5">{selectedAlloc.assetTag}</p>
              </div>

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Severity / Priority</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="flex h-10 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none"
                      >
                        <option value="low">Low - Minor cosmetic/non-blocking</option>
                        <option value="medium">Medium - Annoying issue but usable</option>
                        <option value="high">High - Blocking daily workflows</option>
                        <option value="critical">Critical - Safety risk / Total failure</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="issue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Describe the Issue</FormLabel>
                    <FormControl>
                      <textarea 
                        placeholder="Please detail the problem (e.g. screen flickering, battery swelling, broken keys)..." 
                        {...field} 
                        className="flex min-h-[100px] w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 justify-end pt-2">
                <Button type="button" variant="outline" onClick={() => setIsReportOpen(false)} className="border-slate-800 rounded-xl">
                  Cancel
                </Button>
                <Button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl border-0 shadow-lg shadow-rose-500/20 gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Submit Request
                </Button>
              </div>
            </form>
          </Form>
        )}
      </Modal>
    </div>
  )
}
export default MyAssets
