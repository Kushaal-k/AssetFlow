// Placeholder pages for features owned by other team members.
// These render a consistent "Under Construction" UI.
import { Card, CardContent } from '@/components/ui/card'
import { Construction, BarChart3, Bell, Building2, User } from 'lucide-react'

interface ComingSoonPageProps {
  title: string
  description: string
  icon: React.ElementType
  owner?: string
  accentColor?: string
}

const ComingSoonPage = ({
  title,
  description,
  icon: Icon,
  owner,
  accentColor = 'from-indigo-500 to-blue-600',
}: ComingSoonPageProps) => (
  <div className="animate-in fade-in duration-500 flex flex-col space-y-6">
    <div className="space-y-1">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">{title}</h1>
      <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">{description}</p>
    </div>

    <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800/60">
      <CardContent className="flex flex-col items-center justify-center py-20 px-8 text-center space-y-6">
        <div className={`relative h-24 w-24 rounded-3xl bg-gradient-to-br ${accentColor} flex items-center justify-center shadow-2xl`}>
          <Icon className="h-12 w-12 text-white" />
          <div className="absolute -top-1 -right-1 h-7 w-7 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
            <Construction className="h-4 w-4 text-amber-900" />
          </div>
        </div>
        <div className="space-y-3 max-w-md">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Coming Soon</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            This module is actively being developed. It will be live very soon.
          </p>
          {owner && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-400 text-sm font-semibold">
              <User className="h-4 w-4" /> Developed by {owner}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
)

export const DepartmentDetailPlaceholder = () => (
  <ComingSoonPage
    title="Department Details"
    description="Detailed view for a specific department and its members."
    icon={Building2}
    owner="Sukanshi"
    accentColor="from-violet-500 to-purple-600"
  />
)

export const ReportsPlaceholder = () => (
  <ComingSoonPage
    title="Reports & Analytics"
    description="Generate and export insights on asset utilization."
    icon={BarChart3}
    owner="Sukanshi"
    accentColor="from-blue-500 to-cyan-600"
  />
)

export const NotificationsPlaceholder = () => (
  <ComingSoonPage
    title="Notifications"
    description="Stay updated with real-time alerts and activity feeds."
    icon={Bell}
    accentColor="from-amber-500 to-orange-600"
  />
)
