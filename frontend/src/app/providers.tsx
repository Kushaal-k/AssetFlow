import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/clerk-react'

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

interface ProvidersProps {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </ClerkProvider>
  )
}
export default Providers
