import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../lib/api'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, Loader2, AlertCircle, User } from 'lucide-react'

const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type SignupFormValues = z.infer<typeof signupSchema>

export const Signup = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const login = useAuth(state => state.login)
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = async (data: SignupFormValues) => {
    setError(null)
    try {
      const response = await api.post('/auth/signup', {
        name: data.fullName,
        email: data.email,
        password: data.password
      })
      const { token, user } = response.data
      login(token, user)
      navigate(ROUTES.DASHBOARD)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to sign up')
    }
  }

  return (
    <div className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Create Account</h1>
        <p className="text-slate-400 font-medium">Join AssetFlow and start managing assets</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-rose-200">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-slate-300 font-semibold">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <Input 
              id="fullName" 
              placeholder="John Doe" 
              className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500/60 focus:bg-white/5 transition-all rounded-xl"
              {...register('fullName')}
            />
          </div>
          {errors.fullName && <p className="text-sm text-rose-400">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300 font-semibold">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <Input 
              id="email" 
              type="email" 
              placeholder="name@company.com" 
              className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500/60 focus:bg-white/5 transition-all rounded-xl"
              {...register('email')}
            />
          </div>
          {errors.email && <p className="text-sm text-rose-400">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-300 font-semibold">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500/60 focus:bg-white/5 transition-all rounded-xl"
              {...register('password')}
            />
          </div>
          {errors.password && <p className="text-sm text-rose-400">{errors.password.message}</p>}
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-11 text-sm font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 border-0"
        >
          {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Account'}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm font-medium text-slate-500">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-indigo-400 hover:text-indigo-300 transition-colors">
          Sign in here
        </Link>
      </div>
    </div>
  )
}
export default Signup
