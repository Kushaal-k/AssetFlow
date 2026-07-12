import { CheckCircle, HelpCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  isLoading?: boolean
  variant?: 'default' | 'success' | 'danger'
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isLoading = false,
  variant = 'default',
}: ConfirmationModalProps) {
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

  const Icon = variant === 'success' ? CheckCircle : HelpCircle
  const iconColor =
    variant === 'success'
      ? 'text-green-600'
      : variant === 'danger'
        ? 'text-destructive'
        : 'text-primary'

  const confirmVariant = variant === 'danger' ? 'destructive' : 'default'

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
        aria-labelledby="confirmation-modal-title"
        className="relative z-10 w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-lg"
      >
        <div className="mb-4 flex items-start gap-3">
          <Icon className={`mt-0.5 size-5 shrink-0 ${iconColor}`} />
          <div>
            <h2 id="confirmation-modal-title" className="text-lg font-semibold text-foreground">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
