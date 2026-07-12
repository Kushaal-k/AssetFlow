import { Link, useLocation } from 'react-router-dom'
import { Shield, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSidebar } from '../../hooks/useSidebar'
import { useRole } from '../../hooks/useRole'
import { sidebarConfig } from '../../config/sidebar'
import { APP_NAME } from '../../constants'

export const Sidebar = () => {
  const { isOpen, toggle } = useSidebar()
  const { role } = useRole()
  const location = useLocation()

  // Filter sidebar items according to user permissions
  const filteredItems = sidebarConfig.filter((item) => {
    if (!item.roles || item.roles.length === 0) return true
    return role ? item.roles.includes(role) : false
  })

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-blue-600 text-white flex-shrink-0 shadow-lg shadow-blue-500/30">
            <Shield className="h-5 w-5" />
          </div>
          {isOpen && (
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              {APP_NAME}
            </span>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto">
        {filteredItems.map((item) => {
          const IconComponent = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <IconComponent className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`} />
              {isOpen && <span className="text-sm truncate">{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Sidebar Footer Role Display */}
      {isOpen && role && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/30 text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-0.5">
            Signed in as
          </span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 capitalize bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full inline-block mt-1">
            {role.replace('_', ' ')}
          </span>
        </div>
      )}
    </aside>
  )
}
