import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Search, Filter, Plus, Users, Edit, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { DropdownMenu } from '@/components/ui/dropdown'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

// Mock Data
const mockDepartments = [
  { id: '1', name: 'Engineering', head: 'Sukanshi', employeesCount: 42, budget: '$1.2M' },
  { id: '2', name: 'Design', head: 'Kushaal', employeesCount: 12, budget: '$400K' },
  { id: '3', name: 'Human Resources', head: 'Priya Kapoor', employeesCount: 5, budget: '$150K' },
  { id: '4', name: 'Marketing', head: 'Rahul Sharma', employeesCount: 18, budget: '$800K' },
]

const departmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  head: z.string().min(2, 'Department head name is required'),
})

type DepartmentFormValues = z.infer<typeof departmentSchema>

export const Departments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: { name: '', head: '' }
  })

  const onSubmit = (data: DepartmentFormValues) => {
    console.log('Submitted department:', data)
    setIsModalOpen(false)
    form.reset()
  }

  const filteredDepartments = mockDepartments.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Departments
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Manage your organizational hierarchy, teams, and department heads.
          </p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-xl">Active Departments</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input 
                  type="text" 
                  placeholder="Search departments..." 
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
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400 pl-6">Department Name</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400">Department Head</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400">Team Size</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400">Budget Limit</TableHead>
                <TableHead className="text-right pr-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map(dept => (
                <TableRow key={dept.id} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center border border-indigo-100 dark:border-indigo-800/50">
                        <Building2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">{dept.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300 font-medium">
                    {dept.head}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{dept.employeesCount} members</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-slate-600 dark:text-slate-300">
                    {dept.budget}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu 
                      items={[
                        { label: 'Edit Department', icon: <Edit />, onClick: () => console.log('Edit', dept.id) },
                        { label: 'Delete', icon: <Trash2 />, onClick: () => console.log('Delete', dept.id), danger: true }
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {filteredDepartments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                    No departments found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Department"
        description="Add a new department to the organization structure."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">Department Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Engineering" {...field} className="bg-slate-50 dark:bg-slate-900/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="head"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">Department Head</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} className="bg-slate-50 dark:bg-slate-900/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
                Create Department
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  )
}
