import { Link } from 'react-router-dom'
import { Menu, Bell, Sun, Moon, LogOut, User } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useSidebar } from '../../hooks/useSidebar'
import { useTheme } from '../../hooks/useTheme'
import { ROUTES } from '../../constants'

export const Navbar = () => {
  const { user, logout } = useAuth()
  const { toggle } = useSidebar()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-300">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section: Toggle & Navigation Info */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Right Section: Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications Trigger */}
          <Link
            to={ROUTES.NOTIFICATIONS}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          </Link>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />

          {/* User Section */}
          <div className="flex items-center space-x-3">
            <Link
              to={ROUTES.PROFILE}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                {user?.full_name?.charAt(0) || user?.email.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden md:inline text-sm font-medium">
                {user?.full_name || user?.email}
              </span>
            </Link>

            {/* Logout Trigger */}
            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              aria-label="Log Out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
