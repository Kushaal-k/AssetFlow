import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../constants'

export const AuthLayout = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 p-4">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#1e1b4b_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#0f172a_0%,_transparent_60%)] pointer-events-none" />

      {/* Glowing orbs */}
      <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[700px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Floating decorative dots */}
      <div className="absolute top-20 left-20 h-2 w-2 rounded-full bg-indigo-400/50 animate-pulse" />
      <div className="absolute top-40 right-32 h-1.5 w-1.5 rounded-full bg-blue-400/40 animate-pulse delay-300" />
      <div className="absolute bottom-32 left-40 h-1 w-1 rounded-full bg-violet-400/60 animate-pulse delay-700" />
      <div className="absolute bottom-20 right-20 h-2 w-2 rounded-full bg-indigo-300/40 animate-pulse delay-500" />

      {/* Glass card */}
      <div className="relative w-full max-w-md">
        {/* Card glow */}
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500 opacity-20 blur-sm" />

        <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
