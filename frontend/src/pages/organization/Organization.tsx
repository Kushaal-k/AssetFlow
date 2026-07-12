import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Building2, Save } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export const Organization = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center">
          <Building2 className="mr-3 h-10 w-10 text-indigo-600 dark:text-indigo-500" />
          Organization Profile
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
          Manage your enterprise company details and metadata settings.
        </p>
      </div>

      <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-indigo-900/10 dark:bg-slate-950/50 backdrop-blur-xl dark:border dark:border-slate-800">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 pb-6">
          <CardTitle className="text-2xl text-slate-800 dark:text-slate-200">Company Settings</CardTitle>
          <CardDescription className="text-base">
            These details will be used on all generated reports and asset tags.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-slate-700 dark:text-slate-300 font-semibold">Company Name</Label>
              <Input 
                id="companyName" 
                defaultValue="AssetFlow Tech Inc." 
                className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-indigo-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationId" className="text-slate-700 dark:text-slate-300 font-semibold">Registration ID</Label>
              <Input 
                id="registrationId" 
                defaultValue="AF-2026-X99" 
                className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-indigo-500/50"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="headquarters" className="text-slate-700 dark:text-slate-300 font-semibold">Headquarters Address</Label>
              <Input 
                id="headquarters" 
                defaultValue="123 Tech Boulevard, Innovation District, CA" 
                className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-indigo-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-slate-700 dark:text-slate-300 font-semibold">Primary Contact Email</Label>
              <Input 
                id="contactEmail" 
                type="email"
                defaultValue="admin@assetflow.com" 
                className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-indigo-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 font-semibold">Contact Phone</Label>
              <Input 
                id="phone" 
                type="tel"
                defaultValue="+1 (555) 000-0000" 
                className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-indigo-500/50"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-slate-100 dark:border-slate-800/50 pt-6 flex justify-end">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 px-8">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
