import { Link } from 'react-router-dom'
import { Menu, Bell, Sun, Moon, LogOut, Search } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useSidebar } from '../../hooks/useSidebar'
import { useTheme } from '../../hooks/useTheme'
import { ROUTES } from '../../constants'
import { Button } from '@/components/ui/button'

export const Navbar = () => {
  const { user, logout } = useAuth()
  const { toggle } = useSidebar()
  const { theme, toggleTheme } = useTheme()

  const initials = user?.full_name
    ? user.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.charAt(0).toUpperCase() || 'U'

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-300">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search bar */}
          <div className="hidden md:flex items-center h-9 px-3 gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer w-60">
            <Search className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">Quick search...</span>
            <span className="ml-auto text-xs bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono">⌘K</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1.5">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Notifications */}
          <Link
            to={ROUTES.NOTIFICATIONS}
            className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-indigo-500/50 animate-pulse" />
          </Link>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* User Profile Link */}
          <Link
            to={ROUTES.PROFILE}
            className="flex items-center space-x-2.5 px-2 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"
          >
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/30 flex-shrink-0">
              {initials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate max-w-[120px]">
                {user?.full_name || user?.email}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 capitalize leading-tight">
                {user?.role || 'Guest'}
              </p>
            </div>
          </Link>

          {/* Logout */}
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-all"
            aria-label="Log Out"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
