import { clsx, type ClassValue } from 'clsx'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const colorStyles = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
  gray: 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
}

export interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: string
  trendUp?: boolean
  color?: keyof typeof colorStyles
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  color = 'blue',
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p
              className={cn(
                'text-xs font-medium',
                trendUp ? 'text-green-600' : 'text-red-600',
              )}
            >
              {trend}
            </p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              'flex size-10 items-center justify-center rounded-lg',
              colorStyles[color],
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
