import { useParams, Link } from 'react-router-dom'
import { ROUTES } from '../../constants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Cpu, Tag, Hash, Calendar, User, Building2, Edit, Trash2, Share2 } from 'lucide-react'

export const AssetDetail = () => {
  const { id } = useParams<{ id: string }>()

  const asset = {
    id,
    name: 'MacBook Pro M3 Max',
    serial: 'C02FX4H9Q05D',
    category: 'Electronics',
    status: 'Allocated',
    assignee: 'Rahul Sharma',
    department: 'Engineering',
    purchaseDate: '2024-03-15',
    value: '$3,499',
    location: 'Mumbai HQ - Floor 3',
    notes: 'Assigned for remote work setup. Device enrolled in MDM.',
  }

  const statusClasses =
    asset.status === 'Allocated'
      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
      : asset.status === 'Available'
      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
      : 'bg-rose-500/15 text-rose-400 border border-rose-500/20'

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      {/* Back nav */}
      <Link
        to={ROUTES.ASSETS}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Assets
      </Link>

      {/* Hero card */}
      <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800/60 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <CardContent className="pt-0 px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center border-4 border-white dark:border-slate-950 shadow-xl shadow-indigo-500/30">
              <Cpu className="h-9 w-9 text-white" />
            </div>
            <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{asset.name}</h1>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${statusClasses}`}>
                  {asset.status}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-mono text-sm mt-1">{asset.serial}</p>
            </div>
            <div className="flex gap-2 pb-1">
              <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700 rounded-xl gap-1.5">
                <Share2 className="h-3.5 w-3.5" /> Share
              </Button>
              <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700 rounded-xl gap-1.5">
                <Edit className="h-3.5 w-3.5" /> Edit
              </Button>
              <Button variant="outline" size="sm" className="border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl gap-1.5">
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Asset Info */}
        <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800/60">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 pb-4">
            <CardTitle className="text-base font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Tag className="h-4 w-4 text-indigo-500" /> Asset Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 space-y-4">
            {[
              { label: 'Category', value: asset.category, icon: Tag },
              { label: 'Serial Number', value: asset.serial, icon: Hash },
              { label: 'Purchase Date', value: asset.purchaseDate, icon: Calendar },
              { label: 'Asset Value', value: asset.value, icon: Tag },
              { label: 'Location', value: asset.location, icon: Building2 },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="h-3.5 w-3.5 text-indigo-500" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Assignment Info */}
        <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800/60">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 pb-4">
            <CardTitle className="text-base font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <User className="h-4 w-4 text-indigo-500" /> Assignment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 space-y-5">
            {/* Assignee Avatar */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800/30">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/30">
                {asset.assignee.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{asset.assignee}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{asset.department}</p>
              </div>
            </div>
            {/* Notes */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Notes</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                {asset.notes}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
