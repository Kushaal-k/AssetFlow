import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from './button'

interface AlertDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmLabel?: string
  isLoading?: boolean
}

export const AlertDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Delete',
  isLoading = false,
}: AlertDialogProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl w-full max-w-sm p-6 animate-in zoom-in-95 fade-in duration-200 z-50">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40 flex items-center justify-center">
            <AlertTriangle className="h-7 w-7 text-rose-500" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">{title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{description}</p>
          </div>
          <div className="flex gap-3 w-full pt-2">
            <Button
              variant="outline"
              className="flex-1 border-slate-200 dark:border-slate-700"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white border-0 shadow-lg shadow-rose-500/20"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook for easy use
export const useAlertDialog = () => {
  const [state, setState] = useState<{
    isOpen: boolean
    title: string
    description: string
    confirmLabel: string
    onConfirm: () => void
  }>({
    isOpen: false,
    title: '',
    description: '',
    confirmLabel: 'Delete',
    onConfirm: () => {},
  })

  const open = (opts: { title: string; description: string; confirmLabel?: string; onConfirm: () => void }) => {
    setState({ isOpen: true, confirmLabel: 'Delete', ...opts })
  }

  const close = () => setState((s) => ({ ...s, isOpen: false }))

  return { dialogProps: { ...state, onClose: close }, open }
}
