import { useEffect } from 'react'
import { AppRoutes } from '../routes/AppRoutes'
import { useTheme } from '../hooks/useTheme'

export const App = () => {
  // Initialize dark/light theme classes on body/documentElement
  const { theme } = useTheme()

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <AppRoutes />
    </div>
  )
}
export default App
