import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuth } from '../../hooks/useAuth'
import { authService } from '../../services/auth.service'
import { ROUTES } from '../../constants'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Loader2 } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const Login = () => {
  const { setUser, setToken } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setError(null)

    try {
      const { user, session } = await authService.login(data.email, data.password)
      setUser(user)
      if (session) {
        setToken(session.access_token)
      }
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in. Please verify credentials.')
    }
  }

  return (
    <div className="w-full flex items-center justify-center p-4 min-h-[80vh]">
      <Card className="w-full max-w-md border-0 shadow-2xl shadow-blue-900/10 dark:shadow-indigo-900/20 bg-white/70 dark:bg-slate-950/50 backdrop-blur-xl">
        <CardHeader className="space-y-3 text-center pb-6">
          <CardTitle className="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AssetFlow
          </CardTitle>
          <CardDescription className="text-base text-slate-500 dark:text-slate-400 font-medium">
            Sign in to manage your enterprise resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 p-4 bg-rose-50/80 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400 text-sm font-medium animate-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 dark:text-slate-300">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="admin@assetflow.com" 
                        className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all focus:ring-2 focus:ring-indigo-500/50" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 dark:text-slate-300">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all focus:ring-2 focus:ring-indigo-500/50"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center border-t border-slate-100 dark:border-slate-800/50 pt-6 mt-2">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to={ROUTES.SIGNUP} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors">
              Sign up securely
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
