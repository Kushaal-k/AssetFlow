import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Search, Filter, ShieldAlert, Key, UserCheck, Shield } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu } from '@/components/ui/dropdown'

// Mock Data
const mockEmployees = [
  { id: '1', name: 'Sukanshi', email: 'sukanshi@assetflow.com', department: 'Engineering', role: 'admin', active: true },
  { id: '2', name: 'Kushaal', email: 'kushaal@assetflow.com', department: 'Design', role: 'department_head', active: true },
  { id: '3', name: 'Priya Kapoor', email: 'priya@assetflow.com', department: 'Human Resources', role: 'employee', active: true },
  { id: '4', name: 'Rahul Sharma', email: 'rahul@assetflow.com', department: 'Marketing', role: 'asset_manager', active: true },
  { id: '5', name: 'Jane Doe', email: 'jane.doe@assetflow.com', department: 'Engineering', role: 'employee', active: false },
]

const RoleBadge = ({ role }: { role: string }) => {
  switch (role) {
    case 'admin':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-500 border border-rose-500/20"><ShieldAlert className="h-3.5 w-3.5" /> Admin</span>
    case 'department_head':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-violet-500/15 text-violet-500 border border-violet-500/20"><UserCheck className="h-3.5 w-3.5" /> Dept Head</span>
    case 'asset_manager':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-500 border border-blue-500/20"><Key className="h-3.5 w-3.5" /> Asset Mgr</span>
    default:
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-500/15 text-slate-500 border border-slate-500/20">Employee</span>
  }
}

export const Employees = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEmployees = mockEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Employee Directory
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Manage system users, departments, and roles mapping.
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400 pl-6">Employee Profile</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400">Department</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400">Role</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400">Status</TableHead>
                <TableHead className="text-right pr-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map(emp => (
                <TableRow key={emp.id} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{emp.name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{emp.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300 font-medium">
                    {emp.department}
                  </TableCell>
                  <TableCell>
                    <RoleBadge role={emp.role} />
                  </TableCell>
                  <TableCell>
                    {emp.active ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-500 text-sm font-semibold">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm font-semibold">
                        <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                        Inactive
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu 
                      items={[
                        { label: 'Promote to Admin', icon: <ShieldAlert />, onClick: () => console.log('Promote Admin', emp.id) },
                        { label: 'Make Asset Manager', icon: <Key />, onClick: () => console.log('Make Manager', emp.id) },
                        { label: 'Make Dept Head', icon: <UserCheck />, onClick: () => console.log('Make Head', emp.id) },
                        { label: 'Revoke Access', icon: <Shield />, danger: true, onClick: () => console.log('Revoke Access', emp.id) },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {filteredEmployees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="h-8 w-8 text-slate-300 dark:text-slate-600 mb-2" />
                      <p>No employees found matching your search.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
