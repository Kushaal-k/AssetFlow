import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Building2, Save, Tags, Plus, Search, Edit, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Modal } from '@/components/ui/modal'
import { DropdownMenu } from '@/components/ui/dropdown'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

// Mock Data
const mockCategories = [
  { id: '1', name: 'Electronics', description: 'Laptops, Phones, Tablets', count: 420 },
  { id: '2', name: 'Furniture', description: 'Desks, Chairs, Cabinets', count: 185 },
  { id: '3', name: 'Peripherals', description: 'Monitors, Keyboards, Mice', count: 350 },
  { id: '4', name: 'Software', description: 'Licenses and Subscriptions', count: 12 },
]

const categorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  description: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof categorySchema>

export const Organization = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', description: '' }
  })

  const onSubmitCategory = (data: CategoryFormValues) => {
    console.log('Submitted category:', data)
    setIsModalOpen(false)
    form.reset()
  }

  const filteredCategories = mockCategories.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center">
          <Building2 className="mr-3 h-10 w-10 text-indigo-600 dark:text-indigo-500" />
          Organization Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
          Manage your enterprise details and asset classification rules.
        </p>
      </div>

      <Tabs defaultValue="company">
        <TabsList className="mb-6">
          <TabsTrigger value="company">Company Profile</TabsTrigger>
          <TabsTrigger value="categories">Asset Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
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
        </TabsContent>

        <TabsContent value="categories">
          <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none dark:border dark:border-slate-800">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-xl">Asset Categories</CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input 
                      type="text" 
                      placeholder="Search categories..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-full sm:w-[250px] bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    />
                  </div>
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                  <TableRow className="border-slate-200 dark:border-slate-800">
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-400 pl-6">Category Name</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-400">Description</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-slate-400">Active Assets</TableHead>
                    <TableHead className="text-right pr-6"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map(cat => (
                    <TableRow key={cat.id} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center border border-violet-100 dark:border-violet-800/50">
                            <Tags className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white">{cat.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-300">
                        {cat.description}
                      </TableCell>
                      <TableCell className="font-mono text-sm text-slate-600 dark:text-slate-300">
                        {cat.count} items
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <DropdownMenu 
                          items={[
                            { label: 'Edit', icon: <Edit />, onClick: () => console.log('Edit', cat.id) },
                            { label: 'Delete', icon: <Trash2 />, onClick: () => console.log('Delete', cat.id), danger: true }
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCategories.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center text-slate-500">
                        No categories found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Category"
        description="Add a new classification group for your assets."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitCategory)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Audio Visual" {...field} className="bg-slate-50 dark:bg-slate-900/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="What goes in this category?" {...field} className="bg-slate-50 dark:bg-slate-900/50" />
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
                Save Category
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  )
}
