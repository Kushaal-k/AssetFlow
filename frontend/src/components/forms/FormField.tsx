import type { ReactNode } from 'react'

export interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  hint?: string
  children: ReactNode
}

export function FormField({ label, error, required, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
