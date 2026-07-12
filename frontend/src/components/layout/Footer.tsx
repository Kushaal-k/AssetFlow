import { APP_NAME } from '../../constants'

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-slate-200/50 dark:border-slate-800/50 py-4 px-6 text-center text-xs text-slate-400 dark:text-slate-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-colors duration-300">
      <p>
        &copy; {year} {APP_NAME} Enterprise Resource Management System. All rights reserved.
      </p>
    </footer>
  )
}
