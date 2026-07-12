import type { ReactNode } from 'react'

export interface ChartCardProps {
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
}

export function ChartCard({ title, description, action, children }: ChartCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className="min-h-[200px]">{children}</div>
    </div>
  )
}
