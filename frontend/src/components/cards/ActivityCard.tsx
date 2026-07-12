import type { ReactNode } from 'react'

export interface ActivityItem {
  id: string
  title: string
  description?: string
  timestamp: string
  icon?: ReactNode
}

export interface ActivityCardProps {
  title: string
  items: ActivityItem[]
  emptyMessage?: string
}

export function ActivityCard({
  title,
  items,
  emptyMessage = 'No recent activity',
}: ActivityCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3">
              {item.icon && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  {item.icon}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">{item.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
