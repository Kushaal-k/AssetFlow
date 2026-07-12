import { Link, useLocation } from 'react-router-dom'
import { Shield, ChevronRight } from 'lucide-react'
import { useSidebar } from '../../hooks/useSidebar'
import { useRole } from '../../hooks/useRole'
import { sidebarConfig } from '../../config/sidebar'
import { APP_NAME } from '../../constants'

export const Sidebar = () => {
  const { isOpen } = useSidebar()
  const { role } = useRole()
  const location = useLocation()

  const filteredItems = sidebarConfig.filter((item) => {
    if (!item.roles || item.roles.length === 0) return true
    return role ? item.roles.includes(role) : false
  })

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200/60 dark:border-slate-800/60 shrink-0">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex-shrink-0 shadow-lg shadow-indigo-500/30">
            <Shield className="h-5 w-5" />
          </div>
          {isOpen && (
            <span className="font-black text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
              {APP_NAME}
            </span>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {filteredItems.map((item) => {
          const IconComponent = item.icon
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')

          return (
            <Link
              key={item.title}
              to={item.path}
              title={!isOpen ? item.title : undefined}
              className={`relative flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-500/15 dark:to-indigo-500/15 text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-gradient-to-b from-blue-500 to-indigo-600" />
              )}
              <IconComponent
                className={`h-5 w-5 flex-shrink-0 transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                } ${isOpen ? 'ml-2' : 'mx-auto'}`}
              />
              {isOpen && (
                <>
                  <span className="ml-3 text-sm font-semibold truncate flex-1">{item.title}</span>
                  {isActive && <ChevronRight className="h-4 w-4 text-blue-500 ml-auto flex-shrink-0" />}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Sidebar Footer */}
      {role && (
        <div className={`border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/80 dark:bg-slate-900/50 transition-all ${isOpen ? 'p-4' : 'py-4 px-2'}`}>
          {isOpen ? (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Logged in as</p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 capitalize mt-0.5">
                  {role.replace('_', ' ')}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center" title={role}>
                <Shield className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  )
}
