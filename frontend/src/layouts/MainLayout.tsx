import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useSidebar } from '../hooks/useSidebar'
import { ROUTES } from '../constants'
import { Navbar } from '../components/layout/Navbar'
import { Sidebar } from '../components/layout/Sidebar'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { Footer } from '../components/layout/Footer'

export const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const { isOpen } = useSidebar()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0b0f] text-slate-900 dark:text-slate-50 transition-colors duration-300 flex">
      {/* Subtle dark background gradient for dashboard */}
      <div className="fixed inset-0 dark:bg-[radial-gradient(ellipse_at_top_right,_#1e1b4b20_0%,_transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 dark:bg-[radial-gradient(ellipse_at_bottom_left,_#0f172a40_0%,_transparent_60%)] pointer-events-none" />
      {/* Sidebar - Collapsible on desktop, drawer on mobile */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isOpen ? 'md:pl-64' : 'md:pl-20'
        }`}
      >
        {/* Navbar */}
        <Navbar />

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 flex flex-col space-y-6">
          {/* Breadcrumbs for navigation context */}
          <Breadcrumb />

          {/* Subpage Router View */}
          <div className="flex-1">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
