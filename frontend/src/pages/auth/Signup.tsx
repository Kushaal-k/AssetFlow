import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { authService } from '../../services/auth.service'
import { ROUTES } from '../../constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Loader2, Zap, Mail, Lock, User, CheckCircle2 } from 'lucide-react'

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type SignupFormValues = z.infer<typeof signupSchema>

export const Signup = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  })

  const onSubmit = async (data: SignupFormValues) => {
    setError(null)
    try {
      await authService.signup(data.email, data.password, data.fullName)
      setSuccess(true)
      setTimeout(() => navigate(ROUTES.LOGIN), 4000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up. Try a different email.')
    }
  }

  if (success) {
    return (
      <div className="py-8 flex flex-col items-center justify-center text-center space-y-5">
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          </div>
          <div className="absolute inset-0 h-20 w-20 rounded-full bg-emerald-400/20 animate-ping" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white">Account Created!</h3>
          <p className="text-slate-400 text-sm">Redirecting you to sign in...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-7">
      {/* Brand */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/40 mb-2">
          <Zap className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white">
          Create Account
        </h1>
        <p className="text-slate-400 text-sm font-medium">
          Get started with <span className="text-indigo-400 font-semibold">AssetFlow</span> today
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
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-sm font-semibold flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-indigo-400" /> Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500/60 h-11 rounded-xl transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-rose-400" />
              </FormItem>
            )}
          />

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
                    type="email"
                    placeholder="john@example.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500/60 h-11 rounded-xl transition-all"
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
            className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-violet-600/30 hover:shadow-violet-500/50 transition-all hover:-translate-y-0.5 active:translate-y-0 mt-2 text-base"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creating Account...</>
            ) : 'Create Account'}
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
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
          Sign in securely →
        </Link>
      </p>
    </div>
  )
}
