import { AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
  itemName?: string
  title?: string
  description?: string
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  itemName,
  title = 'Delete item?',
  description,
}: DeleteModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const defaultDescription = itemName
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : 'Are you sure you want to delete this item? This action cannot be undone.'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        className="relative z-10 w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-lg"
      >
        <div className="mb-4 flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="size-5 text-destructive" />
          </div>
          <div>
            <h2 id="delete-modal-title" className="text-lg font-semibold text-foreground">
              {title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {description ?? defaultDescription}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} isLoading={isLoading}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
