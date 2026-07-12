import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const Employees = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Employee Directory
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Manage system users, departments, and roles mapping.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
          <Users className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-xl">All Employees</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  className="pl-9 w-full sm:w-[300px] bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                />
              </div>
              <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-800">
                <Filter className="h-4 w-4 text-slate-500" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
              <TableRow className="border-slate-200 dark:border-slate-800">
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400">Name</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400">Department</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400">Role</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Empty state for now */}
              <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                <TableCell colSpan={4} className="h-32 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center">
                    <Users className="h-8 w-8 text-slate-300 dark:text-slate-600 mb-2" />
                    <p>No employees found.</p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
