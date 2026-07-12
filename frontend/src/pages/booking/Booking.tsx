import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { bookingService } from '@/services/booking.service'
import { assetService } from '@/services/asset.service'
import type { Booking } from '@/mocks/bookings.mock'
import type { Asset } from '@/mocks/assets.mock'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { StatusBadge } from '@/components/ui/status-badge'
import { LoadingState, ErrorState, EmptyState } from '@/components/ui/page-state'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Plus, RefreshCw, AlertCircle, Clock } from 'lucide-react'

const bookingSchema = z.object({
  assetId: z.string().min(1, 'Please select an asset'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  purpose: z.string().min(5, 'Purpose must be at least 5 characters'),
}).refine(data => new Date(data.endDate) >= new Date(data.startDate), {
  message: 'End date must be on or after start date',
  path: ['endDate'],
})

type BookingValues = z.infer<typeof bookingSchema>

export const BookingPage = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [bookableAssets, setBookableAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isBookOpen, setIsBookOpen] = useState(false)

  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      assetId: '',
      startDate: '',
      endDate: '',
      purpose: '',
    },
  })

  const loadData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [bookData, assetData] = await Promise.all([
        bookingService.getAll(),
        assetService.getAll(),
      ])
      setBookings(bookData)
      // Allow booking any available or reserved gear
      setBookableAssets(assetData.filter((a) => a.status === 'available' || a.status === 'reserved'))
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch bookings data.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const onSubmit = async (values: BookingValues) => {
    try {
      const selectedAsset = bookableAssets.find((a) => a.id === values.assetId)
      if (!selectedAsset) throw new Error('Selected asset is not valid.')

      // Native UI Overlap checking
      const rangeStart = new Date(values.startDate).getTime()
      const rangeEnd = new Date(values.endDate).getTime()

      const hasOverlap = bookings.some((b) => {
        if (b.assetId !== selectedAsset.id) return false
        if (b.status === 'rejected') return false

        const bStart = new Date(b.startDate).getTime()
        const bEnd = new Date(b.endDate).getTime()

        // Overlap formula: (StartA <= EndB) and (EndA >= StartB)
        return rangeStart <= bEnd && rangeEnd >= bStart
      })

      if (hasOverlap) {
        toast.error(`Overlap Conflict: ${selectedAsset.name} is already reserved during those dates.`)
        return
      }

      const newBooking = await bookingService.create({
        assetId: selectedAsset.id,
        assetName: selectedAsset.name,
        assetTag: selectedAsset.tag,
        employeeId: user?.id || 'u-temp',
        employeeName: user?.full_name || 'Guest User',
        department: 'Engineering',
        startDate: values.startDate,
        endDate: values.endDate,
        purpose: values.purpose,
      })

      setBookings((prev) => [newBooking, ...prev])
      setIsBookOpen(false)
      form.reset()
      toast.success(`Booking request submitted for ${selectedAsset.name}`)
    } catch (err: any) {
      toast.error(err?.message || 'Booking submission failed.')
    }
  }

  // Quick Calendar Weekly View simulation
  const getUpcomingSevenDays = () => {
    const dates = []
    const base = new Date()
    for (let i = 0; i < 7; i++) {
      const d = new Date(base)
      d.setDate(base.getDate() + i)
      dates.push(d.toISOString().split('T')[0])
    }
    return dates
  }

  const upcomingDays = getUpcomingSevenDays()

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Booking Calendar
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Reserve equipment and devices for temporary trials, events, and projects.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadData} className="border-slate-200 dark:border-slate-700 h-11 px-4 rounded-xl" disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            onClick={() => setIsBookOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/20 gap-2 h-11 px-5 rounded-xl font-semibold border-0"
          >
            <Plus className="w-4 h-4" />
            Book Time Slot
          </Button>
        </div>
      </div>

      {/* Week Timeline Visualization */}
      <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200">Asset Timeline (Next 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-100 dark:border-slate-850 pb-2">
            {upcomingDays.map((day) => {
              const formattedDate = new Date(day).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
              return <div key={day}>{formattedDate}</div>
            })}
          </div>

          <div className="space-y-3">
            {bookableAssets.slice(0, 3).map((asset) => (
              <div key={asset.id} className="grid grid-cols-7 gap-2 items-center">
                {upcomingDays.map((day) => {
                  const isReserved = bookings.some((b) => {
                    if (b.assetId !== asset.id || b.status === 'rejected') return false
                    return day >= b.startDate && day <= b.endDate
                  })

                  return (
                    <div 
                      key={day} 
                      className={`h-11 rounded-xl flex flex-col justify-center items-center font-bold text-[10px] transition-all border ${
                        isReserved 
                          ? 'bg-indigo-600/15 text-indigo-400 border-indigo-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}
                      title={isReserved ? `${asset.name} Reserved` : `${asset.name} Available`}
                    >
                      <span className="truncate max-w-[90%]">{asset.name.split(' ')[0]}</span>
                      <span className="font-semibold uppercase opacity-80 mt-0.5">{isReserved ? 'Booked' : 'Free'}</span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800/60">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Reservations Directory</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingState message="Fetching reservations..." />
          ) : error ? (
            <ErrorState message={error} retry={loadData} />
          ) : bookings.length === 0 ? (
            <EmptyState 
              title="No bookings recorded" 
              description="Make slot bookings for training rooms or dev rigs."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100 dark:border-slate-800/60 hover:bg-transparent">
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-6">Resource</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Reserved By</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Duration</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Purpose</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id} className="border-slate-100 dark:border-slate-800/40 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="pl-6">
                      <div className="font-bold text-slate-800 dark:text-slate-200">{booking.assetName}</div>
                      <div className="text-xs font-semibold text-indigo-500 mt-0.5">{booking.assetTag}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-slate-700 dark:text-slate-200">{booking.employeeName}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{booking.department}</div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {booking.startDate} to {booking.endDate}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 dark:text-slate-350">{booking.purpose}</TableCell>
                    <TableCell>
                      <StatusBadge status={booking.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Book Slot Modal */}
      <Modal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} title="Reserve Asset">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="assetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Select Shared Resource</FormLabel>
                  <FormControl>
                    {bookableAssets.length === 0 ? (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm font-medium">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        No bookable assets available.
                      </div>
                    ) : (
                      <select 
                        {...field} 
                        className="flex h-10 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="">-- Choose Gear --</option>
                        {bookableAssets.map((asset) => (
                          <option key={asset.id} value={asset.id}>
                            {asset.name} ({asset.tag})
                          </option>
                        ))}
                      </select>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="bg-slate-900 border-slate-800 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="bg-slate-900 border-slate-800 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Booking Purpose</FormLabel>
                  <FormControl>
                    <textarea 
                      placeholder="Specify why you need this asset (e.g. testing app compatibility on iOS)..." 
                      {...field} 
                      className="flex min-h-[80px] w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 justify-end pt-2">
              <Button type="button" variant="outline" onClick={() => setIsBookOpen(false)} className="border-slate-800 rounded-xl">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={bookableAssets.length === 0}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl shadow-lg border-0"
              >
                Book Resource
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  )
}
export default BookingPage
