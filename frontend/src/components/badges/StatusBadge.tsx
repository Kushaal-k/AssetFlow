import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const statusStyles: Record<string, string> = {
  available: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  allocated: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  reserved: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  maintenance: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  lost: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  retired: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  open: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  in_progress: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  closed: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
}

function formatStatus(status: string) {
  return status.replace(/_/g, ' ')
}

export interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalized = status.toLowerCase()
  const style = statusStyles[normalized] ?? statusStyles.pending

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
        style,
        className,
      )}
    >
      {formatStatus(normalized)}
    </span>
  )
}
