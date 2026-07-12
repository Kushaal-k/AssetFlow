import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/clerk-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Key, AlertTriangle } from 'lucide-react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || ''

// Validates if the key matches Clerk's standard base64 format to prevent startup crashes
const checkIsValidClerkKey = (key: string): boolean => {
  if (!key || key === 'pk_test_placeholder_key_assetflow') return false
  if (!key.startsWith('pk_test_') && !key.startsWith('pk_live_')) return false
  
  const parts = key.split('_')
  const base64Part = parts[2]
  if (!base64Part) return false
  
  try {
    // Check if the payload is valid base64
    atob(base64Part.replace(/~/g, '=').replace(/_/g, '/').replace(/-/g, '+'))
    return true
  } catch (e) {
    return false
  }
}

const isValidKey = checkIsValidClerkKey(clerkPublishableKey)

interface ProvidersProps {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  if (!isValidKey) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans text-slate-100">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-10 left-10 h-2 w-2 rounded-full bg-indigo-400/30 animate-pulse" />
        <div className="absolute bottom-10 right-10 h-2 w-2 rounded-full bg-blue-400/30 animate-pulse delay-500" />
        
        <Card className="w-full max-w-md border border-white/10 bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          
          <CardHeader className="text-center pb-2 pt-8">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30 mb-4 animate-bounce">
              <AlertTriangle className="h-6 w-6 text-amber-400" />
            </div>
            <CardTitle className="text-2xl font-black text-white">Clerk Configuration Required</CardTitle>
            <CardDescription className="text-slate-400 text-sm">
              Vite was unable to initialize the authentication service.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 pb-8 pt-4 px-6 text-sm">
            <p className="text-slate-300 text-center leading-relaxed">
              To proceed with the frontend UI, please configure a valid **Clerk Publishable Key** in your environment file.
            </p>
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="h-3.5 w-3.5 text-indigo-400" /> Edit your configuration file
              </span>
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-xs text-indigo-300 break-all select-all">
                # d:\AssetFlow\AssetFlow\frontend\.env<br />
                VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-xs text-slate-400 leading-relaxed">
              <Shield className="h-4 w-4 text-indigo-400 flex-shrink-0" />
              <span>You can get your keys from the API Keys tab in your <strong>Clerk Dashboard</strong>.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </ClerkProvider>
  )
}
export default Providers
