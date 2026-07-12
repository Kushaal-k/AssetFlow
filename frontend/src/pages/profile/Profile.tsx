import { useAuth } from '../../hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { UserCircle, Mail, Shield, Save, LogOut } from 'lucide-react'

export const Profile = () => {
  const { user } = useAuth()

  const initials = user?.full_name
    ? user.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : 'U'

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          My Profile
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
          Manage your personal details and application settings.
        </p>
      </div>

      {/* Profile Hero Card */}
      <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800 overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <CardContent className="pt-0 pb-6 px-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-black text-white border-4 border-white dark:border-slate-950 shadow-xl shadow-indigo-500/30">
              {initials}
            </div>
            <div className="pb-2 flex-1">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {user?.full_name || 'Unknown User'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium capitalize">
                {user?.role || 'No Role Assigned'}
              </p>
            </div>
            <div className="pb-2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editable Details Card */}
      <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 pb-6">
          <CardTitle className="text-xl text-slate-800 dark:text-slate-200">Personal Information</CardTitle>
          <CardDescription>Update your profile details below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2">
                <UserCircle className="h-4 w-4 text-indigo-500" /> Full Name
              </Label>
              <Input
                id="fullName"
                defaultValue={user?.full_name || ''}
                placeholder="John Doe"
                className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-500" /> Email Address
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email || ''}
                placeholder="you@example.com"
                className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4 text-indigo-500" /> Role
              </Label>
              <Input
                id="role"
                defaultValue={user?.role || ''}
                disabled
                className="bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-slate-100 dark:border-slate-800/50 pt-6 flex justify-end gap-3">
          <Button variant="outline" className="border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 gap-2 px-8">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
