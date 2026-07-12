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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Loader2, Zap, Mail, Lock } from 'lucide-react'

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
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setError(null)
    try {
      const { user, session } = await authService.login(data.email, data.password)
      setUser(user)
      if (session) setToken(session.access_token)
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in. Please verify credentials.')
    }
  }

  return (
    <div className="space-y-7">
      {/* Brand */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/40 mb-2">
          <Zap className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white">
          Welcome back
        </h1>
        <p className="text-slate-400 text-sm font-medium">
          Sign in to your <span className="text-indigo-400 font-semibold">AssetFlow</span> account
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-sm font-semibold flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-indigo-400" /> Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="admin@assetflow.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500/60 focus:bg-white/8 h-11 rounded-xl transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-rose-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-sm font-semibold flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-indigo-400" /> Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500/60 h-11 rounded-xl transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-rose-400" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-0.5 active:translate-y-0 mt-2 text-base"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Authenticating...</>
            ) : 'Sign In'}
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative text-center">
          <span className="bg-slate-900/80 px-3 text-slate-500 text-xs">or</span>
        </div>
      </div>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link to={ROUTES.SIGNUP} className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
          Create one free →
        </Link>
      </p>
    </div>
  )
}
