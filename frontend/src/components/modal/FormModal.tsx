import { X } from 'lucide-react'
import { useEffect, type FormEvent, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'

export interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading?: boolean
  submitLabel?: string
  children: ReactNode
}

export function FormModal({
  isOpen,
  onClose,
  title,
  onSubmit,
  isLoading = false,
  submitLabel = 'Save',
  children,
}: FormModalProps) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-modal-title"
        className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-background p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="form-modal-title" className="text-lg font-semibold text-foreground">
            {title}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {children}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              {submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
