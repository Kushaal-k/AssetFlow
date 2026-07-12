import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Bell, CheckCheck, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { EmptyState } from '@/components/loader/EmptyState'
import { Skeleton } from '@/components/loader/Skeleton'
import { DeleteModal } from '@/components/modal/DeleteModal'
import { Button } from '@/components/ui/Button'
import { notificationService } from '@/services/notification.service'
import type { Notification } from '@/types'

const Notifications = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [deletingNotification, setDeletingNotification] = useState<Notification | null>(null)

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () => notificationService.getByUser(user!.id),
    enabled: !!user?.id,
  })

  const markReadMutation = useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  const markAllReadMutation = useMutation({
    mutationFn: () => notificationService.markAllAsRead(user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: notificationService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      setDeletingNotification(null)
    },
  })

  const unreadCount = data.filter((n) => !n.is_read).length

  if (isLoading) {
    return (
      <div className="space-y-4 text-left">
        <Skeleton className="h-8 w-48" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load notifications"
        description="Something went wrong. Please try again."
      />
    )
  }

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'All caught up'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            onClick={() => markAllReadMutation.mutate()}
            isLoading={markAllReadMutation.isPending}
          >
            <CheckCheck className="size-4" />
            Mark all as read
          </Button>
        )}
      </div>

      {data.length === 0 ? (
        <EmptyState
          title="No notifications"
          description="You're all caught up. New notifications will appear here."
          icon={<Bell className="size-10" />}
        />
      ) : (
        <ul className="space-y-3">
          {data.map((notification) => (
            <li
              key={notification.id}
              className={`flex items-start justify-between gap-4 rounded-xl border border-border p-4 transition-colors ${
                notification.is_read ? 'bg-card' : 'bg-primary/5'
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{notification.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                {!notification.is_read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markReadMutation.mutate(notification.id)}
                    isLoading={markReadMutation.isPending}
                  >
                    Mark read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeletingNotification(notification)}
                  aria-label="Delete notification"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <DeleteModal
        isOpen={!!deletingNotification}
        onClose={() => setDeletingNotification(null)}
        onConfirm={() =>
          deletingNotification && deleteMutation.mutate(deletingNotification.id)
        }
        isLoading={deleteMutation.isPending}
        title="Delete notification?"
        description="This notification will be permanently removed."
      />
    </div>
  )
}

export default Notifications
